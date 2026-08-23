import { PAYMENT_METHODS } from '@/services/paymentService'
import { formatDate } from '@/utils/helpers'

const PAYMENT_METHOD_LABELS = PAYMENT_METHODS.reduce((acc, m) => {
  acc[m.id] = m.label
  return acc
}, {})

export function getPaymentMethodLabel(method) {
  if (!method) return 'Not selected'
  return PAYMENT_METHOD_LABELS[method] || method
}

function addDays(dateString, days) {
  const date = new Date(dateString)
  date.setDate(date.getDate() + days)
  return date.toISOString()
}

/**
 * Real tracking timestamps (confirmed_at, shipped_at, etc.) are nullable —
 * today's checkout flow doesn't populate them. Where a column is null but
 * the order's current status implies that step has already happened, we
 * derive a sensible demo timestamp relative to created_at instead of
 * inventing unrelated data. Once real fulfillment writes those columns,
 * this falls back to the stored value automatically.
 */
export function getExpectedDeliveryDate(order) {
  return order.expected_delivery_date || addDays(order.created_at, 5)
}

const TIMELINE_STEPS = [
  { key: 'ordered', label: 'Ordered' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'packed', label: 'Packed' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
]

const STEP_REACHED_INDEX = {
  pending: 0,
  processing: 1,
  shipped: 3,
  delivered: 5,
}

/**
 * Returns the ordered timeline for a shippable order (not cancelled/returned),
 * each step flagged with whether it's complete and a derived/actual timestamp.
 */
export function getOrderTimeline(order) {
  const reachedIndex = STEP_REACHED_INDEX[order.status] ?? 0

  const timestampFor = (key, index) => {
    const columnMap = {
      ordered: order.created_at,
      confirmed: order.confirmed_at,
      packed: order.packed_at,
      shipped: order.shipped_at,
      out_for_delivery: order.out_for_delivery_at,
      delivered: order.delivered_at,
    }
    if (columnMap[key]) return columnMap[key]
    if (index > reachedIndex) return null
    // Spread completed steps evenly across ~4 days between order and delivery.
    return addDays(order.created_at, index)
  }

  return TIMELINE_STEPS.map((step, index) => ({
    ...step,
    done: index <= reachedIndex,
    current: index === reachedIndex,
    timestamp: index <= reachedIndex ? timestampFor(step.key, index) : null,
  }))
}

/**
 * One-line delivery/status summary shown on the order card, matching the
 * copy per status from the design spec.
 */
export function getDeliveryInfoText(order) {
  switch (order.status) {
    case 'pending':
      return 'Order received — awaiting confirmation'
    case 'processing':
      return 'Your order is being processed'
    case 'shipped':
      return `Expected delivery: ${formatDate(getExpectedDeliveryDate(order))}`
    case 'delivered': {
      const deliveredOn = order.delivered_at || addDays(order.created_at, 4)
      return `Delivered on ${formatDate(deliveredOn)}`
    }
    case 'cancelled':
      return `Cancelled on ${formatDate(order.cancelled_at || order.updated_at)}`
    case 'return_requested':
      return `Return requested on ${formatDate(order.return_requested_at)}`
    case 'returned':
      return 'Refund completed'
    default:
      return ''
  }
}

export function getOrderThumbnails(order, max = 3) {
  const items = order.order_items || []
  const thumbs = items.slice(0, max).map((item) => {
    const images = item.product?.images || []
    const primary = images.find((img) => img.is_primary) || images[0]
    return { url: primary?.url, name: item.product?.name || 'Product removed', itemId: item.id }
  })
  const extra = Math.max(0, items.length - max)
  return { thumbs, extra }
}

export function getItemCount(order) {
  return (order.order_items || []).reduce((sum, item) => sum + item.quantity, 0)
}