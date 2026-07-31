import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import { classNames } from '@/utils/helpers'

export default function ProductGallery({
  images = [],
  productName,
  discount = 0,
  wishlisted = false,
  onToggleWishlist,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sortedImages = [...images].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
  const hasMultiple = sortedImages.length > 1

  const goTo = (index) => {
    setActiveIndex((index + sortedImages.length) % sortedImages.length)
  }

  return (
    <div className="flex gap-3 w-full">
      {/* Vertical thumbnail strip — desktop only */}
      {hasMultiple && (
        <div className="hidden sm:flex flex-col gap-3 w-20 shrink-0 max-h-[520px] overflow-y-auto pr-1">
          {sortedImages.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={classNames(
                'aspect-square w-20 shrink-0 rounded-xl overflow-hidden border-2 transition-colors',
                i === activeIndex
                  ? 'border-brand-500'
                  : 'border-ink-200 dark:border-ink-700 hover:border-ink-300 dark:hover:border-ink-600'
              )}
            >
              <LazyImage
                src={img.url}
                alt={img.alt_text || `${productName} thumbnail ${i + 1}`}
                containerClassName="h-full w-full"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800">
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <Badge variant="brand">{discount}% OFF</Badge>
            </div>
          )}

          {onToggleWishlist && (
            <button
              onClick={onToggleWishlist}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              aria-pressed={wishlisted}
              className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-ink-950/80 backdrop-blur shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <Heart
                className={classNames(
                  'h-4 w-4',
                  wishlisted ? 'fill-brand-500 text-brand-500' : 'text-ink-500'
                )}
              />
            </button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              <LazyImage
                src={sortedImages[activeIndex]?.url}
                alt={sortedImages[activeIndex]?.alt_text || productName}
                containerClassName="h-full w-full"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {hasMultiple && (
            <>
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-ink-950/80 shadow-soft"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 dark:bg-ink-950/80 shadow-soft"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        {/* Horizontal thumbnails — mobile only */}
        {hasMultiple && (
          <div className="mt-4 grid grid-cols-5 gap-3 sm:hidden">
            {sortedImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(i)}
                className={classNames(
                  'aspect-square rounded-xl overflow-hidden border-2 transition-colors',
                  i === activeIndex ? 'border-brand-500' : 'border-transparent'
                )}
              >
                <LazyImage
                  src={img.url}
                  alt={img.alt_text || `${productName} thumbnail ${i + 1}`}
                  containerClassName="h-full w-full"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}