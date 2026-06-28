import { Link } from 'react-router-dom'
import { ShieldCheck, Award, Sparkles, RotateCcw } from 'lucide-react'
import { ROUTES } from '@/constants'
import { getDefinitionForCategory } from '@/data/categoryContent'

const INLINE_BADGES = [
  { icon: ShieldCheck, label: '100% Authentic', sublabel: 'Genuine Products' },
  { icon: Award, label: 'Dermatologist Tested', sublabel: 'Safe & Trusted' },
  { icon: Sparkles, label: 'Premium Brands', sublabel: 'Handpicked for You' },
  { icon: RotateCcw, label: 'Easy Returns', sublabel: 'Hassle-free Returns' },
]

export default function CategoryBanner({ category }) {
  const definition = getDefinitionForCategory(category?.name)
  const bannerImage = definition.images[0]

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

      <div className="relative overflow-hidden rounded-2xl bg-ink-950 mb-6 min-h-[280px] sm:min-h-[260px]">
        {category && (
          <img
            src={bannerImage}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />

        <div className="relative z-10 px-6 sm:px-10 py-8 sm:py-10 h-full flex flex-col justify-center">
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {category ? category.name : 'All Products'}
          </h1>
          <p className="mt-2 text-sm text-ink-300 max-w-xl">
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
        </div>
      </div>
    </div>
  )
}