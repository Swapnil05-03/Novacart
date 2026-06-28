import { supabase } from '@/lib/supabaseClient'
import { STORAGE_BUCKETS } from '@/constants'

const PRODUCT_SELECT = `
  *,
  category:categories(id, name, slug),
  images:product_images(id, url, alt_text, is_primary, sort_order),
  reviews(id, rating)
`

function applySort(query, sortBy) {
  switch (sortBy) {
    case 'price_asc':
      return query.order('price', { ascending: true })
    case 'price_desc':
      return query.order('price', { ascending: false })
    case 'name_asc':
      return query.order('name', { ascending: true })
    case 'rating':
      // Rating sort is handled client-side after fetch since it's an aggregate
      return query.order('created_at', { ascending: false })
    case 'newest':
    default:
      return query.order('created_at', { ascending: false })
  }
}

export const productService = {
  async getProducts({
    page = 1,
    perPage = 12,
    search = '',
    categoryId = null,
    minPrice = null,
    maxPrice = null,
    minRating = null,
    minDiscount = null,
    brands = [],
    sortBy = 'newest',
    isFeatured = null,
    isTrending = null,
    isBestSeller = null,
  } = {}) {
    const from = (page - 1) * perPage
    const to = from + perPage - 1

    let query = supabase.from('products').select(PRODUCT_SELECT, { count: 'exact' })

    if (search) {
      query = query.ilike('name', `%${search}%`)
    }
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    if (minPrice !== null) {
      query = query.gte('price', minPrice)
    }
    if (maxPrice !== null) {
      query = query.lte('price', maxPrice)
    }
    if (brands.length > 0) {
      query = query.in('brand', brands)
    }
    if (isFeatured !== null) {
      query = query.eq('is_featured', isFeatured)
    }
    if (isTrending !== null) {
      query = query.eq('is_trending', isTrending)
    }
    if (isBestSeller !== null) {
      query = query.eq('is_best_seller', isBestSeller)
    }

    query = applySort(query, sortBy)
    query = query.range(from, to)

    const { data, error, count } = await query
    if (error) throw error

    let results = data.map(this._withRatingStats)

    if (minRating) {
      results = results.filter((p) => p.average_rating >= minRating)
    }
    if (minDiscount) {
      results = results.filter((p) => this._computeDiscountPercent(p) >= minDiscount)
    }
    if (sortBy === 'rating') {
      results = results.sort((a, b) => b.average_rating - a.average_rating)
    }

    return { data: results, count }
  },

  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug),
        images:product_images(id, url, alt_text, is_primary, sort_order),
        reviews(id, rating, comment, created_at, user_id, profiles(full_name, avatar_url))
      `)
      .eq('id', id)
      .single()
    if (error) throw error
    return this._withRatingStats(data)
  },

  async getRelatedProducts(categoryId, excludeId, limit = 4) {
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_SELECT)
      .eq('category_id', categoryId)
      .neq('id', excludeId)
      .limit(limit)
    if (error) throw error
    return data.map(this._withRatingStats)
  },

  async getCategories() {
    const { data, error } = await supabase.from('categories').select('*').order('name')
    if (error) throw error
    return data
  },

  async getBrands(categoryId = null) {
    let query = supabase.from('products').select('brand').not('brand', 'is', null)
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    const { data, error } = await query
    if (error) throw error

    const counts = {}
    data.forEach((row) => {
      if (!row.brand) return
      counts[row.brand] = (counts[row.brand] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  },

  async getCategoryProductCounts() {
    const { data, error } = await supabase.from('products').select('category_id')
    if (error) throw error

    const counts = {}
    data.forEach((row) => {
      if (!row.category_id) return
      counts[row.category_id] = (counts[row.category_id] || 0) + 1
    })
    return counts
  },

  async createProduct(payload) {
    const { data, error } = await supabase.from('products').insert(payload).select().single()
    if (error) throw error
    return data
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteProduct(id) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
  },

  async uploadProductImage(productId, file, isPrimary = false) {
    const fileExt = file.name.split('.').pop()
    const filePath = `${productId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
      .upload(filePath, file)
    if (uploadError) throw uploadError

    const { data: urlData } = supabase.storage
      .from(STORAGE_BUCKETS.PRODUCT_IMAGES)
      .getPublicUrl(filePath)

    const { data, error } = await supabase
      .from('product_images')
      .insert({
        product_id: productId,
        url: urlData.publicUrl,
        is_primary: isPrimary,
      })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteProductImage(imageId) {
    const { error } = await supabase.from('product_images').delete().eq('id', imageId)
    if (error) throw error
  },

  async addReview({ productId, userId, rating, comment }) {
    const { data, error } = await supabase
      .from('reviews')
      .upsert(
        { product_id: productId, user_id: userId, rating, comment },
        { onConflict: 'product_id,user_id' }
      )
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Internal helper — attaches computed rating stats to a product row
  _withRatingStats(product) {
    const reviews = product.reviews || []
    const reviewCount = reviews.length
    const average_rating = reviewCount
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviewCount) * 10) / 10
      : 0
    return { ...product, average_rating, review_count: reviewCount }
  },

  // Internal helper — % discount between compare_at_price and price, used by
  // the minDiscount filter. Returns 0 when there's no valid compare price.
  _computeDiscountPercent(product) {
    const { price, compare_at_price } = product
    if (!compare_at_price || compare_at_price <= price) return 0
    return Math.round(((compare_at_price - price) / compare_at_price) * 100)
  },
}