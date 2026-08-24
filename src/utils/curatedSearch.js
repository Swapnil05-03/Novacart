import { getDefinitionForCategory } from '@/data/categoryContent'
import { getBrandsForCategory } from '@/constants/featuredBrands'

// Most tile labels are found by plain singular/plural substring matching
// (e.g. "headphone" -> "Headphones", "refrigerator" -> "Refrigerators"),
// so this list only needs to cover the real exceptions — common
// abbreviations/synonyms that don't literally appear inside their tile's
// label. Values are either a subcategory tile label (resolved against
// whichever category actually has that tile) or, for a couple of
// category-level terms, the category name itself.
const ALIASES = {
  tv: 'Televisions',
  fridge: 'Refrigerators',
  ac: 'Air Conditioners',
  'water heater': 'Geysers',
  earbud: 'Earphones',
  earbuds: 'Earphones',
  smartphone: 'Mobiles',
  smartphones: 'Mobiles',
  'cell phone': 'Mobiles',
  'mobile phone': 'Mobiles',
}

// Every subcategory tile label for a category definition, flattened the
// same way ProductsPage's gallery does (gendered categories store two
// tile groups instead of one flat list).
function getAllTileLabels(definition) {
  if (definition.tileGroups) {
    return definition.tileGroups.flatMap((group) => group.tiles || [])
  }
  return definition.tiles || []
}

function scoreMatch(label, query) {
  const l = label.toLowerCase()
  if (l === query) return 100
  if (l.startsWith(query)) return 80
  if (query.startsWith(l)) return 70
  if (l.includes(query)) return 60
  return 0
}

/**
 * @param {string} query
 * @param {{id: string, name: string}[]} categories - live categories from the DB
 * @returns {{ categoryId: string, categoryName: string, subcategory: string|null, brand: string|null } | null}
 */
export function resolveCuratedMatch(query, categories) {
  const q = query.trim().toLowerCase()
  if (!q || !categories?.length) return null

  const aliasTarget = ALIASES[q]
  if (aliasTarget) {
    // Alias target is a category name (e.g. "smartphone" -> "Mobiles").
    const categoryHit = categories.find((c) => c.name.toLowerCase() === aliasTarget.toLowerCase())
    if (categoryHit) {
      return { categoryId: categoryHit.id, categoryName: categoryHit.name, subcategory: null, brand: null }
    }
    // Alias target is a subcategory tile — find which category has it.
    for (const cat of categories) {
      const labels = getAllTileLabels(getDefinitionForCategory(cat.name))
      const hit = labels.find((label) => label.toLowerCase() === aliasTarget.toLowerCase())
      if (hit) {
        return { categoryId: cat.id, categoryName: cat.name, subcategory: hit, brand: null }
      }
    }
  }

  // Fuzzy match requires at least 3 characters so a single letter doesn't
  // "match" half the catalog.
  if (q.length < 3) return null

  let best = null // { score, categoryId, categoryName, subcategory, brand }

  for (const cat of categories) {
    const definition = getDefinitionForCategory(cat.name)

    const categoryScore = scoreMatch(cat.name, q)
    if (categoryScore > (best?.score || 0)) {
      best = { score: categoryScore, categoryId: cat.id, categoryName: cat.name, subcategory: null, brand: null }
    }

    for (const label of getAllTileLabels(definition)) {
      const score = scoreMatch(label, q)
      if (score > (best?.score || 0)) {
        best = { score, categoryId: cat.id, categoryName: cat.name, subcategory: label, brand: null }
      }
    }

    for (const { name: brand } of getBrandsForCategory(cat.name)) {
      const score = scoreMatch(brand, q)
      if (score > (best?.score || 0)) {
        best = { score, categoryId: cat.id, categoryName: cat.name, subcategory: null, brand }
      }
    }
  }

  // Require a reasonably confident match (at least a "starts with" or
  // exact hit) — a loose substring-only hit on something this important
  // (it fully replaces the search results view) is more likely to
  // surprise someone than help them.
  if (best && best.score >= 60) {
    // eslint-disable-next-line no-unused-vars
    const { score, ...match } = best
    return match
  }
  return null
}