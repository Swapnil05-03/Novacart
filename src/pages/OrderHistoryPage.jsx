import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { useAuth } from '@/context/AuthContext'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import EmptyState from '@/components/ui/EmptyState'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { TextSkeleton } from '@/components/ui/Skeleton'

export default function OrderHistoryPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService
      .getUserOrders(user.id)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user.id])

  if (loading) {
    return (
      <Card>
        <TextSkeleton lines={5} />
      </Card>
    )
  }

  if (!orders.length) {
    return (
      <Card>
        <EmptyState
          icon={Package}
          title="No orders yet"
          description="Your order history will show up here once you've made a purchase."
          action={
            <Link to={ROUTES.PRODUCTS}>
              <Button variant="brand">Start shopping</Button>
            </Link>
          }
        />
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} padding={false} className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-ink-50 dark:bg-ink-900/40 border-b border-ink-100 dark:border-ink-800">
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-white">{order.order_number}</p>
              <p className="text-xs text-ink-400">{formatDate(order.created_at)}</p>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="px-5 py-4 space-y-2">
            {order.order_items?.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-ink-600 dark:text-ink-300">
                  {item.product?.name} × {item.quantity}
                </span>
                <span className="price-mono text-ink-900 dark:text-white">
                  {formatCurrency(item.price_at_purchase * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-t border-ink-100 dark:border-ink-800">
            <span className="text-sm font-semibold text-ink-900 dark:text-white">Total</span>
            <span className="price-mono font-bold text-ink-900 dark:text-white">{formatCurrency(order.total)}</span>
          </div>
        </Card>
      ))}
    </div>
  )
}
