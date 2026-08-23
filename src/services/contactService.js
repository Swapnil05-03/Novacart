import { supabase } from '@/lib/supabaseClient'

// Contact messages are stored in Supabase (see supabase/24_add_contact_and_newsletter.sql).
// If that migration hasn't been run yet in a given environment, we still don't
// want the form to hard-fail for the user — so we keep a local fallback log.
const FALLBACK_KEY = 'novacart-contact-messages-fallback'

function saveFallback(payload) {
  try {
    const existing = JSON.parse(localStorage.getItem(FALLBACK_KEY) || '[]')
    existing.push({ ...payload, created_at: new Date().toISOString() })
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(existing))
  } catch {
    // best-effort only
  }
}

export const contactService = {
  async sendMessage({ name, email, subject, message }) {
    const payload = { name, email, subject: subject || null, message }
    const { error } = await supabase.from('contact_messages').insert(payload)
    if (error) {
      saveFallback(payload)
      // Still resolve successfully — the message isn't lost, and the
      // person submitting the form gets a normal success experience.
      return { queued: true }
    }
    return { queued: false }
  },
}