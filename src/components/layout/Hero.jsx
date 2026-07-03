import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'
import SlideCarousel from '@/components/layout/SlideCarousel'

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
  {
    badge: 'Best Sellers',
    heading: ['Loved by', 'thousands.'],
    description: 'Products that have earned their reputation — consistently high-rated, reordered again and again.',
    primaryCta: { label: 'Shop Best Sellers', to: `${ROUTES.PRODUCTS}?filter=best-sellers` },
    secondaryCta: { label: 'Top Rated', to: `${ROUTES.PRODUCTS}?sort=rating` },
    discount: '20',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80',
  },
  {
    badge: 'Flash Sale',
    heading: ['Big savings,', 'limited time.'],
    description: 'Hand-picked deals across every category — grab them before they\'re gone.',
    primaryCta: { label: 'See All Deals', to: `${ROUTES.PRODUCTS}?filter=featured` },
    secondaryCta: { label: 'New Arrivals', to: ROUTES.PRODUCTS },
    discount: '50',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900&q=80',
  },
]

function renderHeroSlide(slide) {
  return (
    <div className="grid sm:grid-cols-[1fr_auto] gap-10 items-center">
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

      {/* Product visual + floating badges */}
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
          <span className="text-[11px] font-bold text-ink-900 dark:text-white leading-none">Up to</span>
          <span className="text-sm font-bold text-ink-900 dark:text-white leading-none">{slide.discount}%</span>
          <span className="text-[9px] text-ink-500 dark:text-ink-400 leading-none">off</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="glass absolute -bottom-5 -left-4 z-20 flex items-center gap-1.5 rounded-2xl px-3.5 py-2.5 shadow-glass"
        >
          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span className="text-sm font-semibold text-ink-900 dark:text-white">4.9</span>
          <span className="text-xs text-ink-500 dark:text-ink-400">/ 5</span>
        </motion.div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <SlideCarousel
      slides={SLIDES}
      renderSlide={renderHeroSlide}
      className="flex-1 min-w-0"
      contentClassName="px-6 sm:px-10 py-14 sm:py-20"
    />
  )
}