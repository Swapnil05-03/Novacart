import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, Package } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'
import { PageLoader } from '@/components/ui/Loader'

export default function OrderConfirmationPage() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService
      .getOrderById(id)
      .then(setOrder)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <PageLoader />
  if (!order) return null

  return (
    <div className="container-page py-16 max-w-2xl mx-auto text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success-50 dark:bg-success-500/10 mb-6">
        <CheckCircle2 className="h-8 w-8 text-success-600" />
      </div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        Order confirmed!
      </h1>
      <p className="mt-2 text-ink-500 dark:text-ink-400">
        Thanks for your order. We&rsquo;ve sent a confirmation summary for order{' '}
        <span className="font-mono font-medium text-ink-700 dark:text-ink-200">{order.order_number}</span>.
      </p>

      <div className="mt-8 rounded-2xl border border-ink-200 dark:border-ink-800 p-6 text-left">
        <div className="flex items-center justify-between pb-4 border-b border-ink-100 dark:border-ink-800">
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <Package className="h-4 w-4" />
            Placed on {formatDate(order.created_at)}
          </div>
          <span className="text-sm font-medium capitalize text-brand-600 dark:text-brand-400">{order.status}</span>
        </div>

        <div className="py-4 space-y-3">
          {order.order_items?.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-ink-600 dark:text-ink-300">
                {item.product?.name} × {item.quantity}
              </span>
              <span className="price-mono font-medium text-ink-900 dark:text-white">
                {formatCurrency(item.price_at_purchase * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-ink-100 dark:border-ink-800 flex justify-between">
          <span className="font-semibold text-ink-900 dark:text-white">Total paid</span>
          <span className="price-mono font-bold text-ink-900 dark:text-white">{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <Link to={ROUTES.ORDERS}>
          <Button variant="outline">View order history</Button>
        </Link>
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="brand">Continue shopping</Button>
        </Link>
      </div>
    </div>
  )
}
