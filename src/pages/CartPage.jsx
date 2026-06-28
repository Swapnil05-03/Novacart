import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { ROUTES } from '@/constants'
import CartItem from '@/components/cart/CartItem'
import OrderSummary from '@/components/cart/OrderSummary'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'

export default function CartPage() {
  const { items, loading } = useCart()
  const navigate = useNavigate()

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
        Shopping Cart
      </h1>

      {loading ? (
        <ProductGridSkeleton count={3} />
      ) : items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Let's fix that."
          action={
            <Link to={ROUTES.PRODUCTS}>
              <Button variant="brand" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Start shopping
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-10">
          <div className="rounded-2xl border border-ink-200 dark:border-ink-800 p-6">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <OrderSummary ctaLabel="Proceed to checkout" onCtaClick={() => navigate(ROUTES.CHECKOUT)} />
        </div>
      )}
    </div>
  )
}
