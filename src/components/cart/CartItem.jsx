import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatCurrency, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import { useCart } from '@/context/CartContext'
import LazyImage from '@/components/ui/LazyImage'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const { product, quantity } = item
  const image = product.images?.find((i) => i.is_primary)?.url || product.images?.[0]?.url
  const maxedOut = quantity >= (product.stock ?? 99)

  return (
    <div className="flex gap-4 py-5 border-b border-ink-100 dark:border-ink-800 last:border-0">
      <Link to={ROUTES.PRODUCT_DETAIL(product.id)} className="shrink-0">
        <LazyImage
          src={image}
          alt={product.name}
          containerClassName="h-24 w-24 rounded-xl"
          className="h-24 w-24 object-cover"
        />
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <Link to={ROUTES.PRODUCT_DETAIL(product.id)} className="min-w-0">
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white line-clamp-2 hover:text-brand-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <button
            onClick={() => removeFromCart(item.id, product.name)}
            className="text-ink-400 hover:text-danger-500 transition-colors shrink-0"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="inline-flex items-center rounded-lg border border-ink-200 dark:border-ink-700">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-l-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-medium tabular-nums">{quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              disabled={maxedOut}
              className={classNames(
                'flex h-8 w-8 items-center justify-center text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 rounded-r-lg transition-colors',
                maxedOut && 'opacity-40 cursor-not-allowed'
              )}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="price-mono text-sm font-semibold text-ink-900 dark:text-white">
            {formatCurrency(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  )
}
