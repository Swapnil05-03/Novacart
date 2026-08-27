// api/nova-ai.js
//
// Server-side endpoint for Nova AI (NovaCart's shopping assistant).
// Deployed automatically by Vercel as a serverless function.
//
// React (NovaAIWidget) --> POST /api/nova-ai --> this file
//                                                   |
//                                                   |-- Gemini (function calling) decides what to search for
//                                                   |-- this file executes the search against Supabase
//                                                   |-- Gemini ranks/recommends from the REAL results
//                                                   v
//                                        { message, products, suggestions }
//
// Uses Google's Gemini API, which has a genuine free tier (no credit card
// required) — see https://ai.google.dev/gemini-api/docs/rate-limits.
//
// Secrets used here (GEMINI_API_KEY, SUPABASE_SERVICE_ROLE_KEY) are read
// from server-side environment variables only. They are never sent to, or
// reachable from, the browser bundle (this file never ships to the client —
// only Vite's `import.meta.env.VITE_*` variables do that).

import { createClient } from '@supabase/supabase-js'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Server-only Supabase client using the service role key. This bypasses RLS
// deliberately (products are already publicly readable, and this endpoint
// never accepts raw SQL or arbitrary table/column names from the client —
// only a small, fixed set of filter fields defined in SEARCH_FUNCTION below).
const supabaseAdmin =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null

// ---------------------------------------------------------------------------
// Basic in-memory rate limiting (best-effort — resets whenever the
// serverless instance cold-starts, but still deters casual abuse on warm
// instances without needing extra infra for a first implementation). This
// also protects against blowing through Gemini's free-tier per-minute quota.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 10
const rateBuckets = new Map()

function isRateLimited(key) {
  const now = Date.now()
  const bucket = rateBuckets.get(key) || []
  const recent = bucket.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  rateBuckets.set(key, recent)
  return recent.length > RATE_LIMIT_MAX_REQUESTS
}

// ---------------------------------------------------------------------------
// Function declarations given to Gemini. Gemini can only affect the world
// through these two functions — it never gets raw database or query access.
// ---------------------------------------------------------------------------
const SEARCH_FUNCTION = {
  name: 'search_products',
  description:
    "Search NovaCart's real product catalogue. Always call this before recommending anything — never recommend a product you haven't seen come back from this function. Call it again with different filters if the first search doesn't return good matches (e.g. widen the price range).",
  parameters: {
    type: 'OBJECT',
    properties: {
      query: {
        type: 'STRING',
        description: 'Free-text keywords, e.g. "wireless headphones" or "gaming keyboard". Optional.',
      },
      category: { type: 'STRING', description: 'Category name to filter by, e.g. "Electronics". Optional.' },
      subcategory: {
        type: 'STRING',
        description: 'More specific product type, e.g. "Headphones", "Laptops". Optional.',
      },
      brand: { type: 'STRING', description: 'Brand name filter. Optional.' },
      min_price: { type: 'NUMBER', description: 'Minimum price in INR. Optional.' },
      max_price: { type: 'NUMBER', description: 'Maximum price in INR. Optional.' },
      min_rating: { type: 'NUMBER', description: 'Minimum average rating, 1-5. Optional.' },
      min_discount_percent: { type: 'NUMBER', description: 'Minimum discount percentage. Optional.' },
      sort_by: {
        type: 'STRING',
        enum: ['relevance', 'price_asc', 'price_desc', 'rating', 'newest'],
        description: 'How to order results. Defaults to relevance.',
      },
      limit: { type: 'NUMBER', description: 'Max results to return (default 8, max 12).' },
    },
  },
}

const RESPOND_FUNCTION = {
  name: 'respond_to_user',
  description:
    "Send your final answer back to the shopper. Call this exactly once you're done searching. `products` must ONLY contain ids that were actually returned by search_products in this conversation — never invent an id.",
  parameters: {
    type: 'OBJECT',
    properties: {
      message: {
        type: 'STRING',
        description:
          'A short, friendly reply (1-3 sentences). Do not restate prices/specs already shown on the product cards.',
      },
      products: {
        type: 'ARRAY',
        description: 'Products to show as cards, best match first. Empty array if none fit.',
        items: {
          type: 'OBJECT',
          properties: {
            id: { type: 'STRING', description: 'Exact product id from a search_products result.' },
            reason: {
              type: 'STRING',
              description: 'One short phrase on why this was picked, e.g. "Best battery life".',
            },
          },
          required: ['id', 'reason'],
        },
      },
      suggestions: {
        type: 'ARRAY',
        description: 'Up to 3 short follow-up queries the user might tap next, e.g. "Show cheaper options".',
        items: { type: 'STRING' },
      },
    },
    required: ['message', 'products', 'suggestions'],
  },
}

// ---------------------------------------------------------------------------
// Executes search_products against the real Supabase schema. Mirrors the
// filtering logic in src/services/productService.js so results behave the
// same way they would on the Shop page.
// ---------------------------------------------------------------------------
async function runProductSearch(input = {}) {
  if (!supabaseAdmin) return { products: [], error: 'search_unavailable' }

  const limit = Math.min(Math.max(Number(input.limit) || 8, 1), 12)

  let categoryId = null
  if (input.category) {
    const { data: categories } = await supabaseAdmin
      .from('categories')
      .select('id, name')
      .ilike('name', `%${String(input.category).slice(0, 60)}%`)
      .limit(1)
    categoryId = categories?.[0]?.id || null
  }

  let query = supabaseAdmin
    .from('products')
    .select(
      `
      id, name, price, compare_at_price, brand, subcategory, stock, is_active,
      category:categories(name),
      images:product_images(url, is_primary),
      reviews(rating)
    `
    )
    .eq('is_active', true)

  if (input.query) {
    const words = String(input.query)
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.replace(/[,()%]/g, ''))
      .filter(Boolean)
      .slice(0, 6)
    for (const word of words) {
      query = query.or(`name.ilike.%${word}%,description.ilike.%${word}%,brand.ilike.%${word}%`)
    }
  }
  if (categoryId) query = query.eq('category_id', categoryId)
  if (input.subcategory) query = query.ilike('subcategory', `%${String(input.subcategory).slice(0, 60)}%`)
  if (input.brand) query = query.ilike('brand', `%${String(input.brand).slice(0, 60)}%`)
  if (typeof input.min_price === 'number') query = query.gte('price', input.min_price)
  if (typeof input.max_price === 'number') query = query.lte('price', input.max_price)

  if (input.sort_by === 'price_asc') query = query.order('price', { ascending: true })
  else if (input.sort_by === 'price_desc') query = query.order('price', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  // Fetch a slightly larger batch than requested so post-fetch filters
  // (rating/discount, which are aggregates) still leave enough to return.
  query = query.limit(Math.max(limit * 3, 24))

  const { data, error } = await query
  if (error) return { products: [], error: 'query_failed' }

  let results = (data || []).map((p) => {
    const reviews = p.reviews || []
    const reviewCount = reviews.length
    const averageRating = reviewCount
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviewCount) * 10) / 10
      : 0
    const discountPercent =
      p.compare_at_price && p.compare_at_price > p.price
        ? Math.round(((p.compare_at_price - p.price) / p.compare_at_price) * 100)
        : 0
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      compare_at_price: p.compare_at_price,
      discount_percent: discountPercent,
      brand: p.brand,
      category: p.category?.name || null,
      subcategory: p.subcategory,
      stock: p.stock,
      in_stock: p.stock > 0,
      average_rating: averageRating,
      review_count: reviewCount,
    }
  })

  if (typeof input.min_rating === 'number') {
    results = results.filter((p) => p.average_rating >= input.min_rating)
  }
  if (typeof input.min_discount_percent === 'number') {
    results = results.filter((p) => p.discount_percent >= input.min_discount_percent)
  }
  if (input.sort_by === 'rating') {
    results = results.sort((a, b) => b.average_rating - a.average_rating)
  }

  // Nudge in-stock items to the front without hiding out-of-stock matches.
  results.sort((a, b) => Number(b.in_stock) - Number(a.in_stock))

  return { products: results.slice(0, limit) }
}

// ---------------------------------------------------------------------------
// Talks to the Gemini API directly over fetch (no extra SDK dependency).
// GEMINI_API_KEY never leaves this server-side function.
// ---------------------------------------------------------------------------
async function callGemini(contents, { systemInstruction }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents,
      tools: [{ functionDeclarations: [SEARCH_FUNCTION, RESPOND_FUNCTION] }],
    }),
  })

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`gemini_error_${res.status}: ${errText.slice(0, 300)}`)
  }
  return res.json()
}

const SYSTEM_PROMPT = `You are Nova AI, the in-app shopping assistant for NovaCart, an e-commerce store. Prices are in Indian Rupees (INR).

Rules:
- You may ONLY recommend products that were returned by the search_products function during this conversation. Never invent a product, id, price, or spec.
- Call search_products at least once before answering a product question. If results are poor, call it again with broader/narrower filters (e.g. raise max_price) before giving up.
- If nothing matches, say so plainly in your final message and suggest a concrete adjustment (e.g. a higher budget) via the suggestions field — do not pretend something matched.
- Prefer in-stock items. Only mention out-of-stock items if nothing else fits, and say so.
- Keep your final message short (1-3 sentences) and friendly — the product cards themselves carry the detailed info, so don't repeat every spec in prose.
- Always finish by calling respond_to_user exactly once. That is the only way your answer reaches the shopper.
- If the user's message isn't about products/shopping, still call respond_to_user with an empty products array and a brief, helpful reply steering them back to shopping.`

function buildGeminiHistory(history) {
  // Keep a short, bounded window of prior turns so context doesn't grow
  // unbounded, per-message length is capped, and only role/content survive.
  return (Array.isArray(history) ? history : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-6)
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, 600) }],
    }))
}

// Validates that a message from Gemini's function-call args only references
// product ids we actually served it, stripping anything hallucinated.
function sanitizeFinalProducts(products, knownIds) {
  if (!Array.isArray(products)) return []
  return products
    .filter((p) => p && typeof p.id === 'string' && knownIds.has(p.id))
    .slice(0, 12)
    .map((p) => ({ id: p.id, reason: typeof p.reason === 'string' ? p.reason.slice(0, 120) : '' }))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  try {
    if (!GEMINI_API_KEY || !supabaseAdmin) {
      // Missing server configuration — never leak *why* to the client.
      console.error('Nova AI misconfigured: missing GEMINI_API_KEY or Supabase service credentials')
      return res.status(200).json({
        message: "Sorry, I'm having trouble right now. Please try again.",
        products: [],
        suggestions: [],
      })
    }

    const ipKey = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
    if (isRateLimited(ipKey)) {
      return res.status(429).json({
        message: "I'm getting a lot of requests right now — please try again in a moment.",
        products: [],
        suggestions: [],
      })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}
    const rawMessage = typeof body.message === 'string' ? body.message.trim() : ''

    if (!rawMessage) {
      return res.status(400).json({ error: 'empty_message' })
    }
    if (rawMessage.length > 500) {
      return res.status(400).json({ error: 'message_too_long' })
    }

    const history = buildGeminiHistory(body.history)
    const contents = [...history, { role: 'user', parts: [{ text: rawMessage }] }]

    const knownProductIds = new Set()
    let finalPayload = null

    // Function-calling loop: Gemini searches, we execute, Gemini ranks and
    // answers. Bounded to a handful of iterations so a misbehaving response
    // can't loop forever or run up API/quota usage.
    for (let iteration = 0; iteration < 4 && !finalPayload; iteration++) {
      const response = await callGemini(contents, { systemInstruction: SYSTEM_PROMPT })

      const candidate = response.candidates?.[0]
      const parts = candidate?.content?.parts || []
      const functionCalls = parts.filter((p) => p.functionCall)
      const textParts = parts.filter((p) => typeof p.text === 'string')

      if (functionCalls.length === 0) {
        // Gemini answered in plain text instead of calling respond_to_user.
        // Treat that text as the message with no product cards.
        finalPayload = {
          message: (textParts.map((p) => p.text).join(' ').trim() || "Here's what I found.").slice(0, 600),
          products: [],
          suggestions: [],
        }
        break
      }

      // Record the model's turn (including its function call(s)) in history.
      contents.push({ role: 'model', parts })

      const functionResponseParts = []
      for (const block of functionCalls) {
        const { name, args } = block.functionCall
        if (name === 'respond_to_user') {
          finalPayload = {
            message: String(args?.message || '').slice(0, 600),
            products: sanitizeFinalProducts(args?.products, knownProductIds),
            suggestions: Array.isArray(args?.suggestions)
              ? args.suggestions.filter((s) => typeof s === 'string').slice(0, 3)
              : [],
          }
          functionResponseParts.push({
            functionResponse: { name, response: { result: 'delivered' } },
          })
        } else if (name === 'search_products') {
          const { products } = await runProductSearch(args || {})
          products.forEach((p) => knownProductIds.add(p.id))
          functionResponseParts.push({
            functionResponse: { name, response: { count: products.length, products } },
          })
        } else {
          functionResponseParts.push({
            functionResponse: { name, response: { error: 'unknown_function' } },
          })
        }
      }

      if (functionResponseParts.length > 0) {
        contents.push({ role: 'user', parts: functionResponseParts })
      }
    }

    if (!finalPayload) {
      finalPayload = {
        message: "I couldn't quite finish that search — could you try rephrasing what you're looking for?",
        products: [],
        suggestions: [],
      }
    }

    return res.status(200).json(finalPayload)
  } catch (err) {
    console.error('Nova AI error:', err)
    return res.status(200).json({
      message: "Sorry, I'm having trouble right now. Please try again.",
      products: [],
      suggestions: [],
    })
  }
}
