// Saved addresses and communication preferences don't have backing Supabase
// tables yet, so — mirroring the static-cart pattern in CartContext — they're
// kept client-side in localStorage, keyed per-user so they survive reloads.

const ADDRESS_KEY_PREFIX = 'novacart-addresses-'
const PREFS_KEY_PREFIX = 'novacart-comm-prefs-'

const DEFAULT_PREFS = { email: true, sms: false }

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage full or unavailable — not critical
  }
}

export function getAddresses(userId) {
  if (!userId) return []
  return readJSON(ADDRESS_KEY_PREFIX + userId, [])
}

export function saveAddresses(userId, addresses) {
  if (!userId) return
  writeJSON(ADDRESS_KEY_PREFIX + userId, addresses)
}

export function getCommPrefs(userId) {
  if (!userId) return DEFAULT_PREFS
  return readJSON(PREFS_KEY_PREFIX + userId, DEFAULT_PREFS)
}

export function saveCommPrefs(userId, prefs) {
  if (!userId) return
  writeJSON(PREFS_KEY_PREFIX + userId, prefs)
}