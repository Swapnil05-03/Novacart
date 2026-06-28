import { supabase } from '@/lib/supabaseClient'

const CART_SELECT = `
  id,
  quantity,
  product:products(
    id, name, price, compare_at_price, stock, slug,
    images:product_images(url, is_primary)
  )
`

export const cartService = {
  async getCartItems(userId) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(CART_SELECT)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async addToCart(userId, productId, quantity = 1) {
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle()

    if (existing) {
      return this.updateQuantity(existing.id, existing.quantity + quantity)
    }

    const { data, error } = await supabase
      .from('cart_items')
      .insert({ user_id: userId, product_id: productId, quantity })
      .select(CART_SELECT)
      .single()
    if (error) throw error
    return data
  },

  async updateQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
      return this.removeFromCart(cartItemId)
    }
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select(CART_SELECT)
      .single()
    if (error) throw error
    return data
  },

  async removeFromCart(cartItemId) {
    const { error } = await supabase.from('cart_items').delete().eq('id', cartItemId)
    if (error) throw error
    return null
  },

  async clearCart(userId) {
    const { error } = await supabase.from('cart_items').delete().eq('user_id', userId)
    if (error) throw error
  },
}
