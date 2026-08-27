import { Link } from 'react-router-dom'
import { ShoppingBag, Sparkles } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { formatCurrency, calculateDiscount, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import { getStaticProductImages } from '@/data/productImages'
import LazyImage from '@/components/ui/LazyImage'
import Rating from '@/components/ui/Rating'
import Badge from '@/components/ui/Badge'

// Renders one real NovaCart product inside a Nova AI chat bubble. `reason`
// is Nova AI's short explanation for why this product was picked — the
// product data itself always comes from productService (the same source
// every other product card in the app uses), never from the AI response.
export default function NovaProductCard({ product, reason }) {
  const { addToCart } = useCart()

  const staticImages = getStaticProductImages(product.sku)
  const primaryImage =
    staticImages[0] || product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url

  const discount = calculateDiscount(product.price, product.compare_at_price)
  const outOfStock = product.stock <= 0

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  return (
    <div className="flex gap-3 rounded-xl border border-ink-100 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-2.5">
      <Link
        to={ROUTES.PRODUCT_DETAIL(product.id)}
        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ink-50 dark:bg-ink-900"
      >
        <LazyImage
          src={primaryImage}
          alt={product.name}
          containerClassName="h-full w-full"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <Link
          to={ROUTES.PRODUCT_DETAIL(product.id)}
          className="line-clamp-1 text-sm font-semibold text-ink-900 dark:text-ink-50 hover:text-brand-600 dark:hover:text-brand-400"
        >
          {product.name}
        </Link>

        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="price-mono text-sm font-semibold text-ink-900 dark:text-ink-50">
            {formatCurrency(product.price)}
          </span>
          {discount > 0 && (
            <>
              <span className="price-mono text-xs text-ink-400 line-through">
                {formatCurrency(product.compare_at_price)}
              </span>
              <Badge variant="amber" className="px-1.5 py-0.5 text-[10px]">
                -{discount}%
              </Badge>
            </>
          )}
          {outOfStock && (
            <Badge variant="danger" className="px-1.5 py-0.5 text-[10px]">
              Out of stock
            </Badge>
          )}
        </div>

        {product.review_count > 0 && (
          <div className="mt-0.5">
            <Rating value={product.average_rating} count={product.review_count} size="sm" />
          </div>
        )}

        {reason && (
          <p className="mt-1 flex items-start gap-1 text-xs text-ink-500 dark:text-ink-400">
            <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-brand-500" strokeWidth={2} />
            <span className="line-clamp-2">{reason}</span>
          </p>
        )}

        <div className="mt-2 flex gap-2">
          <Link
            to={ROUTES.PRODUCT_DETAIL(product.id)}
            className="rounded-lg border border-ink-200 dark:border-ink-700 px-2.5 py-1.5 text-xs font-medium text-ink-700 dark:text-ink-300 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors"
          >
            View Product
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={classNames(
              'inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
              'bg-ink-900 text-white dark:bg-white dark:text-ink-900',
              'disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90'
            )}
          >
            <ShoppingBag className="h-3 w-3" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
