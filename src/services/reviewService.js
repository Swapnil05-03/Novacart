import { supabase } from '@/lib/supabaseClient'

export const reviewService = {
  async getAllReviews({ page = 1, perPage = 20 } = {}) {
    const from = (page - 1) * perPage
    const to = from + perPage - 1
    const { data, error, count } = await supabase
      .from('reviews')
      .select(
        `
        id, rating, comment, created_at,
        product:products(id, name, slug),
        profile:profiles(id, full_name, email)
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range(from, to)
    if (error) throw error
    return { data: data || [], count: count || 0 }
  },

  async deleteReview(id) {
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) throw error
  },
}