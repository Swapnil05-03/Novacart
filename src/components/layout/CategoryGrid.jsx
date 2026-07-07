import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTES } from '@/constants'

// Themed stock photography per category — purely visual, not from product data.
// Falls back to a generic shot for any category name not listed here, so new
// categories added in Supabase never render a broken image.
const CATEGORY_IMAGES = {
  electronics: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
  apparel: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
  fashion: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
  mobiles: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80',
  'home & living': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80',
  'home-living': 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80',
  furniture: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80',
  beauty: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
  accessories: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&q=80',
  fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
  office: 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=500&q=80',
}
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80'

function getImageForCategory(name = '') {
  return CATEGORY_IMAGES[name.toLowerCase()] || FALLBACK_IMAGE
}

// The categories table is typically fetched sorted alphabetically, so a
// plain `categories.slice(0, 6)` ends up showing whichever categories
// happen to start with the earliest letters (Accessories, Apparel,
// Appliances, Auto Accessories, Beauty, Books & Stationery) rather than the
// storefront's actual "main" categories. This priority list lets the most
// important, highest-traffic categories always appear first in this row,
// regardless of how they come back from the database. Any category not
// listed here just falls to the end, sorted alphabetically among themselves,
// so nothing is ever hidden — it's a reordering, not a filter.
const PRIORITY_ORDER = [
  'electronics',
  'apparel',
  'mobiles',
  'beauty',
  'home & living',
  'furniture',
  'fashion',
  'accessories',
  'fitness',
  'office',
]

function sortByPriority(categories) {
  return [...categories].sort((a, b) => {
    const aIndex = PRIORITY_ORDER.indexOf(a.name.toLowerCase())
    const bIndex = PRIORITY_ORDER.indexOf(b.name.toLowerCase())
    const aRank = aIndex === -1 ? PRIORITY_ORDER.length : aIndex
    const bRank = bIndex === -1 ? PRIORITY_ORDER.length : bIndex
    if (aRank !== bRank) return aRank - bRank
    return a.name.localeCompare(b.name)
  })
}

export default function CategoryGrid({ categories }) {
  if (!categories?.length) return null

  const orderedCategories = sortByPriority(categories)

  return (
    <section className="container-page py-16">
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
          Shop by category
        </h2>
        <Link to={ROUTES.PRODUCTS} className="text-sm font-medium text-brand-600 dark:text-brand-400 link-underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {orderedCategories.slice(0, 6).map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              to={`${ROUTES.PRODUCTS}?category=${cat.id}`}
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-ink-900 isolate"
            >
              {/* Glow on hover */}
              <div className="absolute -inset-4 z-0 rounded-3xl bg-brand-500/0 blur-2xl transition-colors duration-300 group-hover:bg-brand-500/30" />

              {/* Image with zoom */}
              <motion.img
                src={getImageForCategory(cat.name)}
                alt={cat.name}
                loading="lazy"
                className="absolute inset-0 z-10 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient overlay for legibility */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent transition-opacity duration-300 group-hover:from-ink-950/95" />

              {/* Ring on hover */}
              <div className="absolute inset-0 z-30 rounded-2xl ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-2 group-hover:ring-brand-400/60" />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 z-30 p-3.5">
                <span className="block text-sm font-semibold text-white leading-tight transition-transform duration-300 group-hover:-translate-y-0.5">
                  {cat.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}