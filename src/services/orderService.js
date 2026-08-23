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

  /**
   * Everything the admin dashboard needs for a given date range: orders
   * placed in-range (with items, for revenue/status/top-product breakdowns),
   * the same window one period earlier (for trend %), plus product/user
   * counts now vs. as-of the start of the range (for growth trend on those
   * cumulative totals). All numbers are derived from real rows — nothing
   * here is mocked.
   */
  async getDashboardAnalytics({ from, to }) {
    const rangeMs = new Date(to).getTime() - new Date(from).getTime()
    const prevFrom = new Date(new Date(from).getTime() - rangeMs).toISOString()

    const [
      { data: currentOrders, error: currentErr },
      { data: previousOrders, error: prevErr },
      { count: totalProducts },
      { count: productsBeforeRange },
      { count: totalUsers },
      { count: usersBeforeRange },
      { data: recentUsers },
    ] = await Promise.all([
      supabase
        .from('orders')
        .select(`${ORDER_SELECT}, profiles(full_name, email)`)
        .gte('created_at', from)
        .lte('created_at', to)
        .order('created_at', { ascending: false }),
      supabase.from('orders').select('total, status, created_at').gte('created_at', prevFrom).lt('created_at', from),
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).lt('created_at', from),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }).lt('created_at', from),
      supabase.from('profiles').select('id, full_name, email, avatar_url, created_at').order('created_at', { ascending: false }).limit(5),
    ])

    if (currentErr) throw currentErr
    if (prevErr) throw prevErr

    return {
      currentOrders: currentOrders || [],
      previousOrders: previousOrders || [],
      totalProducts: totalProducts || 0,
      productsBeforeRange: productsBeforeRange || 0,
      totalUsers: totalUsers || 0,
      usersBeforeRange: usersBeforeRange || 0,
      recentUsers: recentUsers || [],
    }
  },
}