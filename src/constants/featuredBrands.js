// Brand filter data — sourced from the SAME real, per-category brand data
// already used by the "Featured Brands" carousel (src/data/categoryContent.js
// -> CATEGORY_DEFINITIONS[category].brands + .brandImages).
//
// This replaces the old hardcoded fake-brand list (Northwind, Aurelle,
// Craftline, etc.) so the sidebar Brand filter always shows the *actual*
// real-world brands for whichever category is selected — e.g. selecting
// "Auto Accessories" surfaces 3M, Turtle Wax, Michelin, Armor All,
// Bridgestone, CEAT, Auravya, with their real locally-hosted logo images,
// exactly as they appear in the category's Featured Brands carousel.

import { CATEGORY_DEFINITIONS } from '@/data/categoryContent'

// A safe fallback icon for the rare case a brand name exists in `brands`
// but has no matching entry in `brandImages` (keeps the UI from breaking
// on a missing import rather than silently dropping the brand).
const fallbackIcon = (name) =>
  `https://placehold.co/56x56/6366f1/ffffff?text=${encodeURIComponent(
    name.slice(0, 2).toUpperCase()
  )}&font=roboto`

// Build a { name, image }[] list for one category, using its real brand
// list and real logo/storefront images from CATEGORY_DEFINITIONS.
function buildBrandList(categoryName) {
  const def = CATEGORY_DEFINITIONS[categoryName?.toLowerCase()]
  if (!def || !def.brands) return []

  return def.brands.map((name) => ({
    name,
    image: def.brandImages?.[name] || fallbackIcon(name),
  }))
}

export function getBrandsForCategory(categoryName) {
  return buildBrandList(categoryName)
}

// "All categories" view: a random mix pulled from every category's real
// brand list, so the Brand filter isn't empty (or stuck on one category)
// when nothing specific is selected.
export function getRandomMixBrands(count = 10) {
  const all = Object.keys(CATEGORY_DEFINITIONS).flatMap((catKey) =>
    buildBrandList(catKey)
  )

  const shuffled = [...all].sort(() => Math.random() - 0.5)

  // De-dupe by name — some brands (e.g. Godrej, Philips, Nilkamal) appear
  // as real featured brands in more than one category.
  const seen = new Set()
  const unique = shuffled.filter((b) => {
    if (seen.has(b.name)) return false
    seen.add(b.name)
    return true
  })

  return unique.slice(0, count)
}