import { Link } from 'react-router-dom'
import { X, ShoppingBag, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'

// Two modes:
// - "browse" (default, no filter applied yet): part of the full gallery of
//   every brand image for the category. If a real product is tagged with
//   this brand (linkedProduct), the card behaves like a genuine product
//   card — click opens its detail page, with working Add to Cart /
//   Wishlist buttons (same pattern as ProductCard). If no matching product
//   exists yet, it falls back to a plain discovery card — click applies
//   that brand as a filter instead.
// - "selected" (this brand is the active filter): the only card shown.
//   Same linkedProduct-or-not split as browse mode, plus a remove (X)
//   button since it's the active filter.
// In both modes, the card's own image is always the curated local brand
// image passed in via `brand.image` — never the linked product's own
// image — so a broken/missing product image can never show up here.
export default function BrandCard({ brand, mode = 'browse', onSelect, onRemove, linkedProduct }) {
  const isSelected = mode === 'selected'
  const hasProduct = !!linkedProduct
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()

  const handleCardClick = (e) => {
    if (isSelected || hasProduct) return
    e.preventDefault()
    onSelect?.(brand.name)
  }

  const handleRemove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    onRemove?.(brand.name)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (linkedProduct) addToCart(linkedProduct, 1)
  }

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (linkedProduct) toggleWishlist(linkedProduct)
  }

  const wishlisted = hasProduct && isWishlisted(linkedProduct.id)

  const Wrapper = hasProduct ? Link : 'div'
  const wrapperProps = hasProduct
    ? { to: ROUTES.PRODUCT_DETAIL(linkedProduct.id) }
    : {
        onClick: handleCardClick,
        role: isSelected ? undefined : 'button',
        tabIndex: isSelected ? undefined : 0,
      }

  return (
    <Wrapper
      {...wrapperProps}
      title={
        isSelected
          ? `Remove ${brand.name} filter`
          : hasProduct
            ? `View ${linkedProduct.name}`
            : `Shop ${brand.name}`
      }
      className="group block w-full text-left rounded-2xl border border-brand-300 dark:border-brand-700 bg-elevated dark:bg-elevated-dark overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-50 dark:bg-ink-900">
        <LazyImage
          src={brand.image}
          alt={brand.name}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <Badge variant="brand">{isSelected ? 'Selected Brand' : 'Brand'}</Badge>
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

        {/* Floating wishlist button — only in browse mode; "selected" mode
            keeps the remove (X) button in this corner instead. */}
        {!isSelected && hasProduct && (
          <motion.button
            onClick={handleWishlistClick}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            whileTap={{ scale: 0.9 }}
            className={classNames(
              'absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full',
              'bg-white/90 dark:bg-ink-950/80 backdrop-blur shadow-soft ring-1 ring-transparent',
              'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card hover:ring-brand-400/50'
            )}
          >
            <Heart
              className={classNames('h-4 w-4', wishlisted ? 'fill-brand-500 text-brand-500' : 'text-ink-500')}
            />
          </motion.button>
        )}

        {/* Add to cart — always visible in "selected" mode (matches the
            original design), hover-reveal in "browse" mode (matches
            ProductCard's pattern), only rendered when a real product is
            linked. */}
        {hasProduct && (
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            className={classNames(
              'absolute z-10 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium',
              isSelected
                ? 'inset-x-3 bottom-3 bg-white dark:bg-ink-50 text-ink-900 shadow-card'
                : 'bottom-3 left-3 right-3 opacity-0 translate-y-3 shadow-card-hover bg-ink-900 text-white dark:bg-white dark:text-ink-900 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0'
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </motion.button>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">Brand</p>
        <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50 line-clamp-2 leading-snug">
          {brand.name}
        </h3>
        {!isSelected && !hasProduct && (
          <p className="mt-2 text-xs text-ink-400">Tap to shop this brand</p>
        )}
        {hasProduct && (
          <p className="mt-2 text-xs text-ink-400 line-clamp-1">{linkedProduct.name}</p>
        )}
        {isSelected && !hasProduct && (
          <p className="mt-2 text-xs text-ink-400">No products in stock yet</p>
        )}
      </div>
    </Wrapper>
  )
}