import { useEffect, useState, useCallback } from 'react'
import { ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { orderService } from '@/services/orderService'
import { formatCurrency, formatDate } from '@/utils/helpers'
import { ORDER_STATUS, ORDER_STATUS_LABELS } from '@/constants'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import Select from '@/components/ui/Select'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import { TableRowSkeleton } from '@/components/ui/Skeleton'

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  ...Object.values(ORDER_STATUS).map((s) => ({ value: s, label: ORDER_STATUS_LABELS[s] })),
]

const STATUS_UPDATE_OPTIONS = Object.values(ORDER_STATUS).map((s) => ({
  value: s,
  label: ORDER_STATUS_LABELS[s],
}))

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const loadOrders = useCallback(() => {
    setLoading(true)
    orderService
      .getAllOrders({ status: statusFilter || null, perPage: 100 })
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [statusFilter])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const handleStatusChange = async (orderId, status) => {
    try {
      await orderService.updateOrderStatus(orderId, status)
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)))
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, status }))
      }
      toast.success('Order status updated')
    } catch (err) {
      toast.error('Could not update order status')
      console.error(err)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
            Orders
          </h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{orders.length} orders</p>
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={STATUS_FILTER_OPTIONS}
          className="min-w-[180px]"
        />
      </div>

      <div className="rounded-2xl border border-ink-200 dark:border-ink-800 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-200 dark:border-ink-800 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState icon={ShoppingCart} title="No orders found" description="Orders will appear here once customers start purchasing." />
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-ink-50 dark:hover:bg-ink-900/40 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">{order.order_number}</td>
                  <td className="px-4 py-3 text-ink-600 dark:text-ink-300">
                    {order.profiles?.full_name || order.profiles?.email || '—'}
                  </td>
                  <td className="px-4 py-3 text-ink-500 dark:text-ink-400">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-3 price-mono text-ink-900 dark:text-white">{formatCurrency(order.total)}</td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      options={STATUS_UPDATE_OPTIONS}
                      className="h-9 text-xs min-w-[140px]"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order ${selectedOrder.order_number}` : ''}
        size="lg"
      >
        {selectedOrder && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-sm text-ink-500">{formatDate(selectedOrder.created_at)}</p>
                <p className="text-sm font-medium text-ink-900 dark:text-white mt-0.5">
                  {selectedOrder.profiles?.full_name || selectedOrder.profiles?.email}
                </p>
              </div>
              <OrderStatusBadge status={selectedOrder.status} />
            </div>

            <div className="rounded-xl bg-ink-50 dark:bg-ink-900 p-4 mb-5 text-sm">
              <p className="font-medium text-ink-900 dark:text-white mb-1">Shipping address</p>
              <p className="text-ink-500 dark:text-ink-400">
                {selectedOrder.shipping_address?.fullName}, {selectedOrder.shipping_address?.addressLine1}
                {selectedOrder.shipping_address?.addressLine2 ? `, ${selectedOrder.shipping_address.addressLine2}` : ''},{' '}
                {selectedOrder.shipping_address?.city}, {selectedOrder.shipping_address?.state}{' '}
                {selectedOrder.shipping_address?.postalCode}, {selectedOrder.shipping_address?.country}
              </p>
              <p className="text-ink-500 dark:text-ink-400 mt-1">{selectedOrder.shipping_address?.phone}</p>
            </div>

            <div className="space-y-2 mb-5">
              {selectedOrder.order_items?.map((item) => (
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

            <div className="flex justify-between pt-4 border-t border-ink-200 dark:border-ink-800 mb-5">
              <span className="font-semibold text-ink-900 dark:text-white">Total</span>
              <span className="price-mono font-bold text-ink-900 dark:text-white">{formatCurrency(selectedOrder.total)}</span>
            </div>

            <Select
              label="Update order status"
              value={selectedOrder.status}
              onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
              options={STATUS_UPDATE_OPTIONS}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}
