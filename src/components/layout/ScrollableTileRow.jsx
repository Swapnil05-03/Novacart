import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'

// Renders a tile image with a graceful fallback — if the URL 404s or fails
// to load for any reason, shows a neutral icon instead of a broken-image
// glyph with overflowing alt text spilling into the layout.
function TileImage({ src, alt, className }) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className={classNames('flex items-center justify-center bg-ink-100 dark:bg-ink-800', className)}>
        <ImageOff className="h-5 w-5 text-ink-400" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={className}
    />
  )
}

/**
 * Horizontally-scrolling tile row with prev/next arrow buttons. Used when a
 * category has more tiles than comfortably fit in one row — instead of
 * letting the row overflow/scroll invisibly, visible arrows page through
 * the remaining items a "screen" at a time.
 *
 * Accepts EITHER:
 *  - tiles (string[]) + images (string[]) — cycles images across tile names
 *  - items ({ label, image }[]) — explicit pairs, used for brand-style rows
 *    where each entry already has its own distinct name + image
 *
 * variant: 'circle' (small round image + label, used for Trending rows)
 *          'card'   (bigger card with image + name + tag, used for Shop by Category / Featured Brands / Trending)
 * cardSize (only for variant 'card'): 'sm' (w-36, default — Shop by
 *          Category / Featured Brands) or 'lg' (w-56 sm:w-64, matching the
 *          real ProductCard grid size — used for Trending/New Releases,
 *          which used to render actual ProductCards in that grid size
 *          before always switching to this curated tile row).
 */
export default function ScrollableTileRow({ title, tiles, images, items, categoryId, variant = 'circle', cardSize = 'sm', tagLabel = 'Shop now', linkParam = 'subcategory' }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // Normalize both input shapes into a single { label, image } list
  const entries = items || tiles.map((tile, i) => ({ label: tile, image: images[i % images.length] }))

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries.length])

  const scrollByPage = (direction) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  const isCard = variant === 'card'

  return (
    <div className="mb-8">
      {title && (
        <h3 className="text-sm font-bold text-ink-900 dark:text-white mb-3">{title}</h3>
      )}
      <div className="relative group/row">
        <div
          ref={scrollRef}
          className={classNames(
            'flex overflow-x-auto scroll-smooth pb-1',
            isCard ? 'gap-4' : 'items-center gap-4'
          )}
          // Only contain horizontal overscroll (stops the row's own
          // left/right scroll from triggering browser swipe-back/forward
          // navigation). Vertical is left as 'auto' — this row has no
          // vertical scroll of its own, so a normal mouse-wheel scroll
          // while hovering over it must be free to bubble up and scroll
          // the page. Setting overscroll-behavior-y to 'contain' here was
          // trapping vertical wheel scroll inside the row and made the
          // whole page feel "stuck" whenever the cursor was over any tile
          // row.
          style={{ overscrollBehaviorX: 'contain', overscrollBehaviorY: 'auto' }}
        >
          {entries.map((entry) => (
            <Link
              key={entry.label}
              // linkParam controls which filter this row's tiles apply:
              // 'subcategory' (the default — Shop by Category / Trending
              // rows) pre-selects that exact subcategory chip on the
              // Products page and filters to only its products, the same
              // as clicking a SubcategoryCard there. 'brands' does the
              // same for the Featured Brands row. Previously this always
              // used a free-text `search=` param instead, which landed on
              // the category but left the subcategory/brand unselected and
              // matched loosely on product names rather than filtering
              // exactly.
              to={`${ROUTES.PRODUCTS}?category=${categoryId}&${linkParam}=${encodeURIComponent(entry.label)}`}
              className={classNames(
                'group shrink-0',
                isCard
                  ? classNames(
                      cardSize === 'lg' ? 'w-56 sm:w-64' : 'w-36',
                      'rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark overflow-hidden transition-shadow duration-200 hover:shadow-card'
                    )
                  : 'flex flex-col items-center gap-2'
              )}
            >
              <div
                className={classNames(
                  'overflow-hidden bg-ink-100 dark:bg-ink-800',
                  isCard ? 'aspect-square' : 'h-16 w-16 rounded-2xl transition-transform duration-200 group-hover:scale-105'
                )}
              >
                <TileImage
                  src={entry.image}
                  alt={entry.label}
                  className={classNames(
                    'h-full w-full object-cover',
                    isCard && 'transition-transform duration-300 group-hover:scale-105'
                  )}
                />
              </div>
              {isCard ? (
                <div className="px-3 py-2.5">
                  <p className="text-sm font-semibold text-ink-900 dark:text-white truncate">{entry.label}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{tagLabel}</p>
                </div>
              ) : (
                <span className="text-xs text-ink-600 dark:text-ink-300 whitespace-nowrap">{entry.label}</span>
              )}
            </Link>
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scrollByPage(-1)}
            aria-label="Show previous"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-elevated dark:bg-elevated-dark border border-ink-200 dark:border-ink-700 shadow-card opacity-0 group-hover/row:opacity-100 transition-opacity"
          >
            <ChevronLeft className="h-4 w-4 text-ink-700 dark:text-ink-200" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scrollByPage(1)}
            aria-label="Show more"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-elevated dark:bg-elevated-dark border border-ink-200 dark:border-ink-700 shadow-card hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-ink-700 dark:text-ink-200" />
          </button>
        )}
      </div>
    </div>
  )
}