import { Printer } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { getPaymentMethodLabel } from '@/utils/orderTracking'
import { APP_NAME } from '@/constants'

export default function InvoiceModal({ isOpen, onClose, order }) {
  if (!order) return null

  const address = order.shipping_address || {}

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invoice"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button variant="brand" leftIcon={<Printer className="h-4 w-4" />} onClick={() => window.print()}>
            Print / Save as PDF
          </Button>
        </>
      }
    >
      <div id="invoice-print-area" className="bg-white text-ink-900 p-2 rounded-xl print:p-8">
        <div className="flex items-start justify-between border-b border-ink-200 pb-4 mb-4">
          <div>
            <p className="font-display text-lg font-bold">{APP_NAME}</p>
            <p className="text-xs text-ink-500 mt-1">Tax Invoice</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-semibold">Order #{order.order_number}</p>
            <p className="text-ink-500 text-xs">{formatDate(order.created_at)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-1">Bill to</p>
            <p className="font-medium">{address.fullName}</p>
            <p className="text-ink-500">
              {address.addressLine1}
              {address.addressLine2 ? `, ${address.addressLine2}` : ''}
            </p>
            <p className="text-ink-500">
              {address.city}, {address.state} {address.postalCode}
            </p>
            <p className="text-ink-500">{address.country}</p>
            {address.phone && <p className="text-ink-500">{address.phone}</p>}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-1">Payment</p>
            <p className="text-ink-700">Method: {getPaymentMethodLabel(order.payment_method)}</p>
            <p className="text-ink-700 capitalize">Status: {order.payment_status}</p>
            {order.payment_reference && <p className="text-ink-500 text-xs mt-1">Ref: {order.payment_reference}</p>}
          </div>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b border-ink-200 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="py-2 font-semibold">Item</th>
              <th className="py-2 font-semibold text-center">Qty</th>
              <th className="py-2 font-semibold text-right">Price</th>
              <th className="py-2 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items?.map((item) => (
              <tr key={item.id} className="border-b border-ink-100">
                <td className="py-2.5">{item.product?.name || 'Product no longer available'}</td>
                <td className="py-2.5 text-center">{item.quantity}</td>
                <td className="py-2.5 text-right price-mono">{formatCurrency(item.price_at_purchase)}</td>
                <td className="py-2.5 text-right price-mono">{formatCurrency(item.price_at_purchase * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-full max-w-xs space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-500">Subtotal</span>
              <span className="price-mono">{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-success-600">
                <span>Discount{order.coupon_code ? ` (${order.coupon_code})` : ''}</span>
                <span className="price-mono">−{formatCurrency(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-ink-500">Shipping</span>
              <span className="price-mono">{order.shipping_fee > 0 ? formatCurrency(order.shipping_fee) : 'Free'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-500">Tax</span>
              <span className="price-mono">{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-ink-200 font-bold text-base">
              <span>Total</span>
              <span className="price-mono">{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink-400">Thank you for shopping with {APP_NAME}.</p>
      </div>
    </Modal>
  )
}