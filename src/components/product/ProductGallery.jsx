import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import { classNames } from '@/utils/helpers'

export default function ProductGallery({ images = [], productName }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const sortedImages = [...images].sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
  const hasMultiple = sortedImages.length > 1

  const goTo = (index) => {
    setActiveIndex((index + sortedImages.length) % sortedImages.length)
  }

  return (
    <div className="w-full">
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-ink-50 dark:bg-ink-900 border border-ink-200 dark:border-ink-800">
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

      {hasMultiple && (
        <div className="mt-4 grid grid-cols-5 gap-3">
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
  )
}
