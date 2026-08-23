import { supabase } from '@/lib/supabaseClient'

export const adminSearchService = {
  /** Returns up to a few matches from each entity type for the header search dropdown. */
  async search(query) {
    const q = query.trim()
    if (!q) return { products: [], orders: [], users: [] }

    const [{ data: products }, { data: orders }, { data: users }] = await Promise.all([
      supabase.from('products').select('id, name, price').ilike('name', `%${q}%`).limit(4),
      supabase.from('orders').select('id, order_number, total, status').ilike('order_number', `%${q}%`).limit(4),
      supabase
        .from('profiles')
        .select('id, full_name, email')
        .or(`full_name.ilike.%${q}%,email.ilike.%${q}%`)
        .limit(4),
    ])

    return { products: products || [], orders: orders || [], users: users || [] }
  },
}