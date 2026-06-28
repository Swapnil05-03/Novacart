import { supabase } from '@/lib/supabaseClient'

const WISHLIST_SELECT = `
  id,
  created_at,
  product:products(
    id, name, price, compare_at_price, stock, slug,
    images:product_images(url, is_primary)
  )
`

export const wishlistService = {
  async getWishlist(userId) {
    const { data, error } = await supabase
      .from('wishlist')
      .select(WISHLIST_SELECT)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async addToWishlist(userId, productId) {
    const { data, error } = await supabase
      .from('wishlist')
      .insert({ user_id: userId, product_id: productId })
      .select(WISHLIST_SELECT)
      .single()
    if (error) throw error
    return data
  },

  async removeFromWishlist(userId, productId) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId)
    if (error) throw error
  },

  async isInWishlist(userId, productId) {
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle()
    if (error) throw error
    return !!data
  },
}
