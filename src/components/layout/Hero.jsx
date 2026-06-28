import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'

const SLIDES = [
  {
    badge: 'New Arrival',
    heading: ['Next-level performance.', 'Next-level you.'],
    description: 'Latest tech, stunning design, and unbeatable performance. Upgrade your lifestyle today.',
    primaryCta: { label: 'Shop Now', to: ROUTES.PRODUCTS },
    secondaryCta: { label: 'Explore Deals', to: `${ROUTES.PRODUCTS}?filter=featured` },
    discount: '40',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80',
  },
  {
    badge: 'Trending',
    heading: ['Sound that moves', 'with you.'],
    description: 'Premium audio, all-day battery, and a fit that disappears. Hear every detail, everywhere.',
    primaryCta: { label: 'Shop Audio', to: `${ROUTES.PRODUCTS}?filter=trending` },
    secondaryCta: { label: 'Best Sellers', to: `${ROUTES.PRODUCTS}?filter=best-sellers` },
    discount: '25',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80',
  },
  {
    badge: 'Limited Time',
    heading: ['Everyday essentials,', 'considered.'],
    description: 'Curated pieces built to last. Transparent pricing, no chaos — just things worth owning.',
    primaryCta: { label: 'Shop Collection', to: ROUTES.PRODUCTS },
    secondaryCta: { label: 'View Deals', to: `${ROUTES.PRODUCTS}?filter=featured` },
    discount: '30',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80',
  },
]

const AUTOPLAY_MS = 5000

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((index) => {
    setActiveIndex((index + SLIDES.length) % SLIDES.length)
  }, [])

  const goToPrevious = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused])

  const slide = SLIDES[activeIndex]

  return (
    <section
      className="relative flex-1 min-w-0 overflow-hidden rounded-2xl bg-ink-950"
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

      <div className="relative z-10 px-6 sm:px-10 py-12 sm:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid sm:grid-cols-[1fr_auto] gap-10 items-center"
          >
            {/* Copy column */}
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-300 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400 animate-pulse" />
                {slide.badge}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.1]">
                {slide.heading[0]}
                <br />
                <span className="text-brand-400">{slide.heading[1]}</span>
              </h1>

              <p className="mt-4 text-base text-ink-300 max-w-sm">{slide.description}</p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link to={slide.primaryCta.to}>
                  <Button variant="brand" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    {slide.primaryCta.label}
                  </Button>
                </Link>
                <Link to={slide.secondaryCta.to}>
                  <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">
                    {slide.secondaryCta.label}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Product visual + floating discount badge */}
            <div className="relative hidden sm:block w-56 lg:w-72 shrink-0">
              <div className="absolute inset-0 scale-90 rounded-[2rem] bg-brand-500/30 blur-3xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 overflow-hidden rounded-2xl aspect-[4/5] bg-ink-900 shadow-glass"
              >
                <img
                  src={slide.image}
                  alt={slide.heading.join(' ')}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="glass absolute -right-3 -top-3 z-20 flex flex-col items-center justify-center rounded-full h-16 w-16 shadow-glass"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500 mb-0.5" />
                <span className="text-[11px] font-bold text-ink-900 dark:text-white leading-none">
                  Up to
                </span>
                <span className="text-sm font-bold text-ink-900 dark:text-white leading-none">
                  {slide.discount}%
                </span>
                <span className="text-[9px] text-ink-500 dark:text-ink-400 leading-none">off</span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

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
      <div className="relative z-10 flex items-center justify-center gap-1.5 pb-5">
        {SLIDES.map((_, i) => (
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
    </section>
  )
}