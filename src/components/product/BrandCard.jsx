import { X } from 'lucide-react'
import { classNames } from '@/utils/helpers'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'

// Renders a selected brand as a tile matching ProductCard's exact layout
// (rounded-2xl card, aspect-square image, uppercase label, bold title) so
// that picking a brand in the sidebar surfaces its real image inline with
// the product grid — not as a small separate preview box.
export default function BrandCard({ brand, onRemove }) {
  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove?.(brand.name)
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      title={`Remove ${brand.name} filter`}
      className="group block w-full text-left rounded-2xl border border-brand-300 dark:border-brand-700 bg-elevated dark:bg-elevated-dark overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-50 dark:bg-ink-900">
        <LazyImage
          src={brand.image}
          alt={brand.name}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <Badge variant="brand">Selected Brand</Badge>
        </div>

        {/* Remove button — same corner spot as the wishlist heart on
            ProductCard, but here it clears this brand from the filter. */}
        <span
          className={classNames(
            'absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full',
            'bg-white/90 dark:bg-ink-950/80 backdrop-blur shadow-soft',
            'transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-card'
          )}
        >
          <X className="h-4 w-4 text-ink-500" />
        </span>
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
          Brand
        </p>
        <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50 line-clamp-2 leading-snug">
          {brand.name}
        </h3>
        <p className="mt-2 text-xs text-ink-400">Tap to remove filter</p>
      </div>
    </button>
  )
}