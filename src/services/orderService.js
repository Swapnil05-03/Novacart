import { supabase } from '@/lib/supabaseClient'
import { generateOrderNumber } from '@/utils/helpers'

const ORDER_SELECT = `
  *,
  order_items(
    id, quantity, price_at_purchase,
    product:products(
      id, name, slug, sku, subcategory, price, stock, is_active,
      category:categories(id, name),
      images:product_images(url, is_primary)
    )
  )
`

export const orderService = {
  async createOrder({ userId, items, shippingAddress, subtotal, discount, shipping, tax, total, couponCode }) {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        order_number: generateOrderNumber(),
        status: 'pending',
        shipping_address: shippingAddress,
        subtotal,
        discount,
        shipping_fee: shipping,
        tax,
        total,
        coupon_code: couponCode || null,
      })
      .select()
      .single()
    if (orderError) throw orderError

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price_at_purchase: item.product.price,
    }))

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems)
    if (itemsError) throw itemsError

    // Cart is intentionally NOT cleared here. With a payment step now
    // between order creation and success, clearing the cart immediately
    // would lose the customer's items if the payment attempt fails. Call
    // clearCartAfterPayment() only once payment has actually succeeded.

    return order
  },

  async clearCartAfterPayment(userId) {
    const { error } = await supabase.from('cart_items').delete().eq('user_id', userId)
    if (error) throw error
  },

  async getOrderById(id) {
    const { data, error } = await supabase.from('orders').select(ORDER_SELECT).eq('id', id).single()
    if (error) throw error
    return data
  },

  async getUserOrders(userId, { includeHidden = false } = {}) {
    let query = supabase
      .from('orders')
      .select(ORDER_SELECT)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!includeHidden) {
      query = query.eq('hidden_from_history', false)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  /**
   * Cancels a customer's own order. Only allowed while the order is still
   * pending/processing — the UI enforces this too, but the RLS policy plus
   * this status list keep it consistent if called directly.
   */
  async cancelOrder(orderId, { previousPaymentStatus } = {}) {
    const updates = {
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
    }
    // If the order had already been paid for, reflect that the payment is
    // now being reversed rather than leaving it marked "paid".
    if (previousPaymentStatus === 'paid') {
      updates.payment_status = 'refunded'
    }
    const { data, error } = await supabase.from('orders').update(updates).eq('id', orderId).select(ORDER_SELECT).single()
    if (error) throw error
    return data
  },

  /**
   * Submits a return/refund request for a delivered order.
   */
  async requestReturn(orderId, { reason, comment, refundMethod }) {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'return_requested',
        return_requested_at: new Date().toISOString(),
        return_reason: reason,
        return_comment: comment || null,
        refund_method: refundMethod,
      })
      .eq('id', orderId)
      .select(ORDER_SELECT)
      .single()
    if (error) throw error
    return data
  },

  /**
   * Hides a cancelled/returned order from the customer's visible order
   * history. This never deletes the underlying order row.
   */
  async hideFromHistory(orderId) {
    const { data, error } = await supabase
      .from('orders')
      .update({ hidden_from_history: true })
      .eq('id', orderId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getAllOrders({ status = null, page = 1, perPage = 20 } = {}) {
    const from = (page - 1) * perPage
    const to = from + perPage - 1
    let query = supabase
      .from('orders')
      .select(`${ORDER_SELECT}, profiles(full_name, email)`, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query
    if (error) throw error
    return { data, count }
  },

  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async getDashboardStats() {
    const [{ count: totalOrders }, { count: totalProducts }, { count: totalUsers }, { data: revenueData }] =
      await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total, created_at, status'),
      ])

    const totalRevenue = (revenueData || [])
      .filter((o) => o.status !== 'cancelled')
      .reduce((sum, o) => sum + Number(o.total), 0)

    return {
      totalOrders: totalOrders || 0,
      totalProducts: totalProducts || 0,
      totalUsers: totalUsers || 0,
      totalRevenue,
      ordersByDate: revenueData || [],
    }
  },
}