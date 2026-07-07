import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ROUTES } from '@/constants'

/**
 * Reusable horizontal-scrolling row used across category showcase pages.
 * Three variants:
 *  - 'product'  : image card with a title + tag underneath (Limited Time Deals)
 *  - 'brand'    : square logo-style tile with a name (Featured Brands)
 *  - 'sponsor'  : a single wide card listing several brand names (Sponsors)
 */
export default function ScrollRow({ title, variant = 'product', items = [], categoryId, accentClassName }) {
  if (!items.length) return null

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-ink-900 dark:text-white">{title}</h3>
        <Link
          to={`${ROUTES.PRODUCTS}?category=${categoryId}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 link-underline shrink-0"
        >
          See all <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div
        className="flex items-stretch gap-3 overflow-x-auto pb-1"
        // Only contain horizontal overscroll (stops this row's own
        // left/right scroll from triggering browser swipe-back/forward
        // navigation). Vertical is left as 'auto' — this row never scrolls
        // vertically itself, so a normal mouse-wheel scroll while the
        // cursor is hovering over it must be free to bubble up and scroll
        // the page. Setting overscroll-behavior-y to 'contain' here was
        // trapping vertical wheel scroll inside the row and made the whole
        // page feel "stuck" whenever the cursor was over any of these rows.
        style={{ overscrollBehaviorX: 'contain', overscrollBehaviorY: 'auto' }}
      >
        {variant === 'sponsor'
          ? items.map((sponsorGroup) => (
              <div
                key={sponsorGroup.label}
                className={`shrink-0 w-64 rounded-2xl p-5 ${accentClassName || 'bg-amber-50 dark:bg-amber-500/10'}`}
              >
                <p className="text-sm font-bold text-ink-900 dark:text-white mb-3">{sponsorGroup.label}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {sponsorGroup.names.map((name) => (
                    <span key={name} className="text-sm font-semibold text-ink-700 dark:text-ink-300">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))
          : variant === 'brand'
          ? items.map((brand) => (
              <Link
                key={brand.name}
                to={`${ROUTES.PRODUCTS}?category=${categoryId}&search=${encodeURIComponent(brand.name)}`}
                className="group shrink-0 w-32 rounded-xl overflow-hidden border border-ink-200 dark:border-ink-800"
              >
                <div className="aspect-square overflow-hidden bg-ink-100 dark:bg-ink-800">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="px-2 py-2 text-xs font-semibold text-ink-700 dark:text-ink-300 text-center truncate">
                  {brand.name}
                </p>
              </Link>
            ))
          : items.map((product) => (
              <Link
                key={product.title}
                to={`${ROUTES.PRODUCTS}?category=${categoryId}&search=${encodeURIComponent(product.title)}`}
                className="group shrink-0 w-36 rounded-xl overflow-hidden border border-ink-200 dark:border-ink-800"
              >
                <div className="aspect-square overflow-hidden bg-ink-100 dark:bg-ink-800">
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-2.5 py-2">
                  <p className="text-xs font-semibold text-ink-900 dark:text-white truncate">{product.title}</p>
                  <p className="text-[11px] text-brand-600 dark:text-brand-400 font-medium">{product.tag}</p>
                </div>
              </Link>
            ))}
      </div>
    </section>
  )
}