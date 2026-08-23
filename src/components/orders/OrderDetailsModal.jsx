import { Link } from 'react-router-dom'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import LazyImage from '@/components/ui/LazyImage'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import OrderTrackingTimeline from '@/components/orders/OrderTrackingTimeline'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { getPaymentMethodLabel, getDeliveryInfoText } from '@/utils/orderTracking'
import { ROUTES } from '@/constants'

const SHIPPABLE_STATUSES = ['pending', 'processing', 'shipped', 'delivered']

export default function OrderDetailsModal({ isOpen, onClose, order }) {
  if (!order) return null

  const address = order.shipping_address || {}
  const showTimeline = SHIPPABLE_STATUSES.includes(order.status)

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order #${order.order_number}`} size="xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <p className="text-sm text-ink-500 dark:text-ink-400">{formatDate(order.created_at)}</p>
        <OrderStatusBadge status={order.status} dot />
      </div>

      <p className="text-sm text-ink-600 dark:text-ink-300 mb-6">{getDeliveryInfoText(order)}</p>

      {/* Items */}
      <div className="rounded-xl border border-ink-200 dark:border-ink-800 divide-y divide-ink-100 dark:divide-ink-800 mb-6">
        {order.order_items?.map((item) => {
          const images = item.product?.images || []
          const primary = images.find((img) => img.is_primary) || images[0]
          return (
            <div key={item.id} className="flex items-center gap-3 p-3">
              <LazyImage
                src={primary?.url}
                alt={item.product?.name}
                containerClassName="h-14 w-14 rounded-lg shrink-0"
                className="h-full w-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-900 dark:text-white truncate">
                  {item.product?.name || 'Product no longer available'}
                </p>
                <p className="text-xs text-ink-400">Qty {item.quantity}</p>
              </div>
              <p className="price-mono text-sm font-semibold text-ink-900 dark:text-white shrink-0">
                {formatCurrency(item.price_at_purchase * item.quantity)}
              </p>
            </div>
          )
        })}
      </div>

      {/* Pricing breakdown */}
      <div className="rounded-xl border border-ink-200 dark:border-ink-800 p-4 mb-6 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-ink-500 dark:text-ink-400">Subtotal</span>
          <span className="price-mono text-ink-900 dark:text-white">{formatCurrency(order.subtotal)}</span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-success-600 dark:text-success-500">
            <span>Discount{order.coupon_code ? ` (${order.coupon_code})` : ''}</span>
            <span className="price-mono">−{formatCurrency(order.discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-ink-500 dark:text-ink-400">Shipping</span>
          <span className="price-mono text-ink-900 dark:text-white">
            {order.shipping_fee > 0 ? formatCurrency(order.shipping_fee) : 'Free'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-ink-500 dark:text-ink-400">Tax</span>
          <span className="price-mono text-ink-900 dark:text-white">{formatCurrency(order.tax)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-ink-100 dark:border-ink-800 font-semibold">
          <span className="text-ink-900 dark:text-white">Total</span>
          <span className="price-mono text-ink-900 dark:text-white">{formatCurrency(order.total)}</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* Delivery address */}
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-2">Delivery address</h3>
          <div className="text-sm text-ink-500 dark:text-ink-400 space-y-0.5">
            <p className="text-ink-700 dark:text-ink-200 font-medium">{address.fullName}</p>
            <p>
              {address.addressLine1}
              {address.addressLine2 ? `, ${address.addressLine2}` : ''}
            </p>
            <p>
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p>{address.country}</p>
            {address.phone && <p>{address.phone}</p>}
          </div>
        </div>

        {/* Payment */}
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-2">Payment</h3>
          <div className="text-sm text-ink-500 dark:text-ink-400 space-y-0.5">
            <p>Method: {getPaymentMethodLabel(order.payment_method)}</p>
            <p className="capitalize">Status: {order.payment_status}</p>
            {order.payment_reference && <p className="text-xs">Ref: {order.payment_reference}</p>}
          </div>
        </div>
      </div>

      {/* Timeline */}
      {showTimeline && (
        <div>
          <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-3">Order timeline</h3>
          <OrderTrackingTimeline order={order} />
        </div>
      )}

      {order.status === 'cancelled' && (
        <p className="text-sm text-ink-500 dark:text-ink-400">
          This order was cancelled on {formatDate(order.cancelled_at || order.updated_at)}.
        </p>
      )}
      {(order.status === 'return_requested' || order.status === 'returned') && (
        <div className="text-sm text-ink-500 dark:text-ink-400 space-y-1">
          <p>Return reason: {order.return_reason?.replaceAll('_', ' ') || '—'}</p>
          {order.return_comment && <p>Comment: {order.return_comment}</p>}
          <p>Refund method: {order.refund_method?.replaceAll('_', ' ') || '—'}</p>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Link to={ROUTES.PRODUCTS}>
          <Button variant="ghost" size="sm">
            Continue shopping
          </Button>
        </Link>
      </div>
    </Modal>
  )
}