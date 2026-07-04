import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Award,
  Sparkles,
  RotateCcw,
  ArrowRight,
  Star,
  ShoppingBag,
  Tag,
  Truck,
} from 'lucide-react'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'
import { getDefinitionForCategory } from '@/data/categoryContent'

const INLINE_BADGES = [
  { icon: ShieldCheck, label: '100% Authentic', sublabel: 'Genuine Products' },
  { icon: Award, label: 'Dermatologist Tested', sublabel: 'Safe & Trusted' },
  { icon: Sparkles, label: 'Premium Brands', sublabel: 'Handpicked for You' },
  { icon: RotateCcw, label: 'Easy Returns', sublabel: 'Hassle-free Returns' },
]

// Generic, category-agnostic stats shown under the banner. Not tied to real
// order/brand counts in the DB — purely a trust-building visual strip.
const STATS = [
  { icon: ShoppingBag, value: '50K+', label: 'Orders Delivered' },
  { icon: Tag, value: '500+', label: 'Top Brands' },
  { icon: Truck, value: '24H', label: 'Fast Shipping' },
  { icon: Star, value: '4.9/5', label: 'Customer Rating' },
]

export default function CategoryBanner({ category }) {
  const definition = getDefinitionForCategory(category?.name)
  const bannerImage = definition.images[0]
  const discount = definition.discounts?.[0]
  const categoryUrl = category ? `${ROUTES.PRODUCTS}?category=${category.id}` : ROUTES.PRODUCTS

  return (
    <div className="container-page pt-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-400 mb-4 flex items-center gap-1.5">
        <Link to={ROUTES.HOME} className="hover:text-ink-700 dark:hover:text-ink-200">
          Home
        </Link>
        <span>/</span>
        <span className="text-ink-700 dark:text-ink-200 font-medium">
          {category ? category.name : 'All Products'}
        </span>
      </nav>

      <div className="relative overflow-hidden rounded-2xl bg-ink-950 mb-4 min-h-[320px] sm:min-h-[300px]">
        <img
          src={bannerImage}
          alt={category ? category.name : 'All Products'}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/60 to-transparent" />

        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10 h-full flex flex-col justify-center max-w-2xl">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-ink-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            {category ? 'Premium Collection' : 'Full Catalog'}
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {category ? category.name : 'All Products'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ink-300 max-w-xl">
            {category
              ? definition.description
              : 'Browse our full catalog — curated products across every category, all in one place.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {INLINE_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5">
                <badge.icon className="h-4 w-4 text-brand-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">{badge.label}</p>
                  <p className="text-[11px] text-ink-400 leading-tight">{badge.sublabel}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to={categoryUrl}>
              <Button variant="brand" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {category ? `Shop ${category.name}` : 'Shop Now'}
              </Button>
            </Link>
            <Link to={categoryUrl}>
              <Button variant="outline" size="md" className="border-white/20 text-white hover:bg-white/10">
                View Collections
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating discount badge */}
        {category && discount && (
          <div className="glass hidden sm:flex absolute top-6 right-6 z-10 flex-col items-center justify-center rounded-2xl px-5 py-4 text-center shadow-glass">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-ink-500 dark:text-ink-400">
              <Sparkles className="h-3 w-3 text-amber-500" /> Up to
            </span>
            <span className="text-2xl font-bold text-ink-900 dark:text-white leading-tight">{discount}%</span>
            <span className="text-[11px] font-semibold text-ink-900 dark:text-white">OFF</span>
            <span className="text-[10px] text-ink-500 dark:text-ink-400 mt-1">Limited Time Offer</span>
          </div>
        )}

        {/* Floating rating badge */}
        {category && (
          <div className="glass hidden sm:flex absolute bottom-6 right-6 z-10 items-center gap-2 rounded-2xl px-4 py-3 shadow-glass">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-ink-900 dark:text-white leading-tight">4.9/5</p>
              <p className="text-[10px] text-ink-500 dark:text-ink-400 leading-tight">12k+ Reviews</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats strip */}
      <div className="rounded-2xl border border-ink-100 dark:border-white/10 bg-ink-50 dark:bg-white/5 mb-6 px-6 sm:px-10 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <stat.icon className="h-5 w-5 text-brand-500 dark:text-brand-400 shrink-0" />
            <div>
              <p className="text-base font-bold text-ink-900 dark:text-white leading-tight">{stat.value}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400 leading-tight">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}