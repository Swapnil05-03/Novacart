import { Truck, MapPin, Calendar, Hash } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import OrderTrackingTimeline from '@/components/orders/OrderTrackingTimeline'
import { getExpectedDeliveryDate, getDeliveryInfoText } from '@/utils/orderTracking'
import { formatDate } from '@/utils/helpers'

export default function TrackOrderModal({ isOpen, onClose, order }) {
  if (!order) return null

  const isDelivered = order.status === 'delivered'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Track Order #${order.order_number}`} size="md">
      <div className="mb-6 rounded-xl border border-ink-200 dark:border-ink-800 bg-ink-50 dark:bg-ink-900/40 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white">
          <Truck className="h-4 w-4 text-brand-500" />
          {getDeliveryInfoText(order)}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-ink-500 dark:text-ink-400">
          {!isDelivered && (
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Expected {formatDate(getExpectedDeliveryDate(order))}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Hash className="h-3.5 w-3.5" />
            {order.tracking_id || `NCT${order.order_number?.replace(/\D/g, '').slice(-8) || '00000000'}`}
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <MapPin className="h-3.5 w-3.5" />
            Carrier: {order.delivery_partner || 'NovaCart Logistics'}
          </div>
        </div>
      </div>

      <OrderTrackingTimeline order={order} />
    </Modal>
  )
}