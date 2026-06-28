import { ORDER_STATUS_LABELS } from '@/constants'
import Badge from '@/components/ui/Badge'

const STATUS_VARIANTS = {
  pending: 'amber',
  processing: 'brand',
  shipped: 'brand',
  delivered: 'success',
  cancelled: 'danger',
}

export default function OrderStatusBadge({ status }) {
  return <Badge variant={STATUS_VARIANTS[status] || 'default'}>{ORDER_STATUS_LABELS[status] || status}</Badge>
}
