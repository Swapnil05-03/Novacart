import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const AUTOPLAY_MS = 5000

/**
 * Generic sliding carousel shell — background, autoplay, pause-on-hover,
 * prev/next arrows, and dot indicators. The actual visual content of each
 * slide is supplied by the caller via `renderSlide`, so this same component
 * powers both the "For You" hero and every category's themed slider.
 *
 * Props:
 *  - slides: array of slide data objects (shape is up to the caller)
 *  - renderSlide: (slide, index) => ReactNode
 *  - className: optional extra classes for the outer section (e.g. height)
 *  - contentClassName: optional override for the inner content padding
 */
export default function SlideCarousel({
  slides = [],
  renderSlide,
  className = '',
  contentClassName = 'px-6 sm:px-10 py-6 sm:py-7',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Reset to the first slide whenever the underlying slide set changes
  // (e.g. switching from one category's slides to another's).
  useEffect(() => {
    setActiveIndex(0)
  }, [slides])

  const goToSlide = useCallback(
    (index) => {
      setActiveIndex((index + slides.length) % slides.length)
    },
    [slides.length]
  )

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (isPaused || slides.length <= 1) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused, slides.length])

  if (!slides.length) return null

  const slide = slides[activeIndex]

  return (
    <section
      className={`relative overflow-hidden rounded-2xl bg-ink-950 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient gradient background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 15%, rgba(91,95,239,0.4), transparent 40%), radial-gradient(circle at 85% 75%, rgba(245,166,35,0.18), transparent 45%)',
        }}
        animate={{ opacity: [0.5, 0.65, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className={`relative z-10 ${contentClassName}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {renderSlide(slide, activeIndex)}
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <>
          {/* Prev / Next arrows */}
          <button
            onClick={goToPrevious}
            aria-label="Previous slide"
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white shadow-glass transition-all duration-200 hover:scale-110 hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next slide"
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white shadow-glass transition-all duration-200 hover:scale-110 hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dot indicators */}
          <div className="relative z-10 flex items-center justify-center gap-1.5 pb-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === activeIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}