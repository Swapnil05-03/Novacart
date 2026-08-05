import { Link } from 'react-router-dom'
import { X, ShoppingBag } from 'lucide-react'
import { classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import { useCart } from '@/context/CartContext'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'

// Same two modes as BrandCard. In "selected" mode, if a real product
// exists for this subcategory (linkedProduct), the card behaves like a
// normal ProductCard — click opens its detail page, Add to Cart adds that
// real product. With no matching product yet, it's a non-clickable preview.
export default function SubcategoryCard({ name, image, mode = 'browse', onSelect, onRemove, linkedProduct }) {
  const isSelected = mode === 'selected'
  const { addToCart } = useCart()

  const handleCardClick = (e) => {
    if (isSelected) return
    e.preventDefault()
    onSelect?.(name)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove?.()
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (linkedProduct) addToCart(linkedProduct, 1)
  }

  const Wrapper = isSelected && linkedProduct ? Link : 'div'
  const wrapperProps =
    isSelected && linkedProduct
      ? { to: ROUTES.PRODUCT_DETAIL(linkedProduct.id) }
      : { onClick: handleCardClick, role: isSelected ? undefined : 'button', tabIndex: isSelected ? undefined : 0 }

  return (
    <Wrapper
      {...wrapperProps}
      title={isSelected ? `Remove ${name} filter` : `Shop ${name}`}
      className="group block w-full text-left rounded-2xl border border-brand-300 dark:border-brand-700 bg-elevated dark:bg-elevated-dark overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-50 dark:bg-ink-900">
        <LazyImage
          src={image}
          alt={name}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <Badge variant="brand">{isSelected ? 'Selected' : 'Subcategory'}</Badge>
        </div>

        {isSelected && (
          <span
            onClick={handleRemove}
            className={classNames(
              'absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full cursor-pointer',
              'bg-white/90 dark:bg-ink-950/80 backdrop-blur shadow-soft',
              'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card'
            )}
          >
            <X className="h-4 w-4 text-ink-500" />
          </span>
        )}

        {isSelected && linkedProduct && (
          <span
            onClick={handleAddToCart}
            className={classNames(
              'absolute inset-x-3 bottom-3 z-10 flex items-center justify-center gap-1.5 rounded-xl py-2.5',
              'bg-white dark:bg-ink-50 text-ink-900 text-sm font-semibold shadow-card cursor-pointer',
              'transition-transform duration-200 hover:-translate-y-0.5'
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
          Subcategory
        </p>
        <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50 line-clamp-2 leading-snug">
          {name}
        </h3>
        {!isSelected && (
          <p className="mt-2 text-xs text-ink-400">Tap to shop this subcategory</p>
        )}
        {isSelected && !linkedProduct && (
          <p className="mt-2 text-xs text-ink-400">No products in stock yet</p>
        )}
      </div>
    </Wrapper>
  )
}