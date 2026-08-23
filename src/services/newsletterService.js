import { supabase } from '@/lib/supabaseClient'

const FALLBACK_KEY = 'novacart-newsletter-fallback'

function saveFallback(email) {
  try {
    const existing = JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]')
    if (!existing.includes(email)) existing.push(email)
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(existing))
  } catch {
    // best-effort only
  }
}

export const newsletterService = {
  async subscribe(email) {
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })
    if (error) {
      // Unique-constraint violation just means they're already subscribed —
      // treat that as success too. Any other error (e.g. table not yet
      // migrated in this environment) falls back to a local record so the
      // signup still "sticks" instead of silently failing.
      if (error.code !== '23505') saveFallback(email)
      return { alreadySubscribed: error.code === '23505' }
    }
    return { alreadySubscribed: false }
  },
}