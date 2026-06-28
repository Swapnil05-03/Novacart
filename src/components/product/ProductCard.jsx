import { Link } from 'react-router-dom'
import { Heart, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { formatCurrency, calculateDiscount, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import LazyImage from '@/components/ui/LazyImage'
import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToCart } = useCart()

  const primaryImage =
    product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url
  const discount = calculateDiscount(product.price, product.compare_at_price)
  const wishlisted = isWishlisted(product.id)
  const outOfStock = product.stock <= 0

  const handleWishlistClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
  }

  return (
    <Link
      to={ROUTES.PRODUCT_DETAIL(product.id)}
      className="group block rounded-2xl border border-ink-100 dark:border-ink-800 bg-elevated dark:bg-elevated-dark overflow-hidden shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative aspect-square overflow-hidden bg-ink-50 dark:bg-ink-900">
        <LazyImage
          src={primaryImage}
          alt={product.name}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discount > 0 && <Badge variant="amber">-{discount}%</Badge>}
          {product.is_best_seller && <Badge variant="brand">Best Seller</Badge>}
          {outOfStock && <Badge variant="danger">Out of stock</Badge>}
        </div>

        {/* Floating wishlist button */}
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
          <motion.span
            animate={wishlisted ? { scale: [1, 1.35, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={classNames(
                'h-4 w-4',
                wishlisted ? 'fill-brand-500 text-brand-500' : 'text-ink-500'
              )}
            />
          </motion.span>
        </motion.button>

        {/* Add to cart — slides up on hover, pops on tap */}
        <motion.button
          onClick={handleAddToCart}
          disabled={outOfStock}
          whileTap={{ scale: 0.95 }}
          className={classNames(
            'absolute bottom-3 left-3 right-3 z-10 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium',
            'opacity-0 translate-y-3 shadow-card-hover',
            'transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0',
            'bg-ink-900 text-white dark:bg-white dark:text-ink-900 disabled:opacity-0'
          )}
        >
          <ShoppingBag className="h-4 w-4" />
          Add to cart
        </motion.button>
      </div>

      <div className="p-4">
        {product.category?.name && (
          <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-1">
            {product.category.name}
          </p>
        )}
        <h3 className="text-sm font-semibold text-ink-900 dark:text-ink-50 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {product.review_count > 0 && (
          <div className="mt-1.5">
            <Rating value={product.average_rating} count={product.review_count} size="sm" />
          </div>
        )}

        <div className="mt-2 flex items-baseline gap-2">
          <span className="price-mono text-base font-semibold text-ink-900 dark:text-ink-50">
            {formatCurrency(product.price)}
          </span>
          {discount > 0 && (
            <span className="price-mono text-sm text-ink-400 line-through">
              {formatCurrency(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}