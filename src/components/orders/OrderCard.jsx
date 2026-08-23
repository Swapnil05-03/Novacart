import { useNavigate } from 'react-router-dom'
import { Download, Truck, RotateCcw, Star, XCircle, FileText, Trash2 } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import Button from '@/components/ui/Button'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import OrderMoreMenu from '@/components/orders/OrderMoreMenu'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { getDeliveryInfoText, getOrderThumbnails, getItemCount, getPaymentMethodLabel } from '@/utils/orderTracking'
import { CANCELLABLE_STATUSES, RETURNABLE_STATUSES, ROUTES } from '@/constants'

export default function OrderCard({
  order,
  onViewDetails,
  onCancel,
  onTrack,
  onReorder,
  onReturn,
  onInvoice,
  onRemove,
}) {
  const navigate = useNavigate()
  const { thumbs, extra } = getOrderThumbnails(order)
  const itemCount = getItemCount(order)
  const canCancel = CANCELLABLE_STATUSES.includes(order.status)
  const canReturn = RETURNABLE_STATUSES.includes(order.status)

  const writeReview = () => {
    const firstProductId = order.order_items?.[0]?.product?.id
    if (firstProductId) {
      navigate(ROUTES.PRODUCT_DETAIL(firstProductId))
    }
  }

  let primaryActions = null
  let moreItems = []

  switch (order.status) {
    case 'pending':
    case 'processing':
      primaryActions = (
        <>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            Order Details
          </Button>
          {canCancel && (
            <Button
              variant="outline"
              size="sm"
              className="border-danger-300 dark:border-danger-500/40 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10"
              onClick={() => onCancel(order)}
            >
              Cancel Order
            </Button>
          )}
        </>
      )
      moreItems = [{ icon: Download, label: 'Download Invoice', onClick: () => onInvoice(order) }]
      break

    case 'shipped':
      primaryActions = (
        <>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            Order Details
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Truck className="h-3.5 w-3.5" />} onClick={() => onTrack(order)}>
            Track Order
          </Button>
        </>
      )
      moreItems = [{ icon: Download, label: 'Download Invoice', onClick: () => onInvoice(order) }]
      break

    case 'delivered':
      primaryActions = (
        <>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            Order Details
          </Button>
          <Button variant="brand" size="sm" leftIcon={<RotateCcw className="h-3.5 w-3.5" />} onClick={() => onReorder(order)}>
            Reorder
          </Button>
        </>
      )
      moreItems = [
        { icon: Truck, label: 'Track delivery', onClick: () => onTrack(order) },
        { icon: Download, label: 'Download Invoice', onClick: () => onInvoice(order) },
        ...(canReturn ? [{ icon: RotateCcw, label: 'Return / Refund', onClick: () => onReturn(order) }] : []),
        { icon: Star, label: 'Write Review', onClick: writeReview },
      ]
      break

    case 'cancelled':
      primaryActions = (
        <>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            Order Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="h-3.5 w-3.5" />}
            className="border-danger-300 dark:border-danger-500/40 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-500/10"
            onClick={() => onRemove(order)}
          >
            Remove
          </Button>
        </>
      )
      moreItems = [
        { icon: Download, label: 'Download Invoice', onClick: () => onInvoice(order) },
        { icon: FileText, label: 'View cancellation details', onClick: () => onViewDetails(order) },
      ]
      break

    case 'return_requested':
      primaryActions = (
        <>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            Order Details
          </Button>
          <Button variant="outline" size="sm" leftIcon={<XCircle className="h-3.5 w-3.5" />} onClick={() => onViewDetails(order)}>
            View Refund Status
          </Button>
        </>
      )
      moreItems = [{ icon: Download, label: 'Download Invoice', onClick: () => onInvoice(order) }]
      break

    case 'returned':
      primaryActions = (
        <>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            Order Details
          </Button>
          <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
            View Refund Status
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />} onClick={() => onInvoice(order)}>
            Download Invoice
          </Button>
        </>
      )
      moreItems = []
      break

    default:
      primaryActions = (
        <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
          Order Details
        </Button>
      )
  }

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-card p-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        {/* Order info + thumbnails */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <p className="text-sm font-semibold text-ink-900 dark:text-white">Order #{order.order_number}</p>
            <OrderStatusBadge status={order.status} dot />
          </div>
          <p className="text-xs text-ink-400 mb-3">
            {formatDate(order.created_at)} • {itemCount} item{itemCount === 1 ? '' : 's'}
          </p>

          <div className="flex items-center gap-2 mb-3">
            {thumbs.map((thumb) => (
              <LazyImage
                key={thumb.itemId}
                src={thumb.url}
                alt={thumb.name}
                containerClassName="h-12 w-12 rounded-lg shrink-0"
                className="h-full w-full object-cover"
              />
            ))}
            {extra > 0 && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800 text-xs font-semibold text-ink-500 dark:text-ink-400">
                +{extra}
              </div>
            )}
          </div>

          <p className="text-sm text-ink-600 dark:text-ink-300">{getDeliveryInfoText(order)}</p>
          {(order.status === 'shipped' || order.status === 'delivered') && (
            <button onClick={() => onTrack(order)} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline mt-0.5">
              View tracking details →
            </button>
          )}
        </div>

        {/* Payment info */}
        <div className="lg:text-right shrink-0">
          <p className="price-mono text-lg font-bold text-ink-900 dark:text-white">{formatCurrency(order.total)}</p>
          <p className="text-xs text-ink-400">Paid via {getPaymentMethodLabel(order.payment_method)}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {primaryActions}
          <OrderMoreMenu items={moreItems} />
        </div>
      </div>
    </div>
  )
}