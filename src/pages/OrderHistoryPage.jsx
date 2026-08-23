import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, SlidersHorizontal, Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { orderService } from '@/services/orderService'
import { ROUTES, ORDER_STATUS } from '@/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '@/components/ui/Pagination'
import { TextSkeleton } from '@/components/ui/Skeleton'
import OrderCard from '@/components/orders/OrderCard'
import OrderDetailsModal from '@/components/orders/OrderDetailsModal'
import TrackOrderModal from '@/components/orders/TrackOrderModal'
import CancelOrderDialog from '@/components/orders/CancelOrderDialog'
import ReturnRefundModal from '@/components/orders/ReturnRefundModal'
import InvoiceModal from '@/components/orders/InvoiceModal'
import FilterModal, { EMPTY_FILTERS } from '@/components/orders/FilterModal'

const PAGE_SIZE = 4

const TABS = [
  { key: 'all', label: 'All Orders', statuses: null },
  { key: 'processing', label: 'Processing', statuses: [ORDER_STATUS.PENDING, ORDER_STATUS.PROCESSING] },
  { key: 'shipped', label: 'Shipped', statuses: [ORDER_STATUS.SHIPPED] },
  { key: 'delivered', label: 'Delivered', statuses: [ORDER_STATUS.DELIVERED] },
  { key: 'cancelled', label: 'Cancelled', statuses: [ORDER_STATUS.CANCELLED] },
  { key: 'returned', label: 'Returned', statuses: [ORDER_STATUS.RETURN_REQUESTED, ORDER_STATUS.RETURNED] },
]

const EMPTY_STATE_COPY = {
  all: { title: 'No orders yet', description: "You haven't placed any orders yet." },
  processing: { title: 'No processing orders', description: 'Orders being prepared will show up here.' },
  shipped: { title: 'No shipped orders', description: 'Orders on their way to you will show up here.' },
  delivered: { title: 'No delivered orders yet', description: 'Your delivered purchases will appear here.' },
  cancelled: { title: 'No cancelled orders', description: "Orders you've cancelled will show up here." },
  returned: { title: 'No returned orders', description: 'Return and refund requests will show up here.' },
}

export default function OrderHistoryPage() {
  const { user } = useAuth()
  const { addToCart } = useCart()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [filterModalOpen, setFilterModalOpen] = useState(false)
  const [page, setPage] = useState(1)

  const [detailsOrder, setDetailsOrder] = useState(null)
  const [trackOrder, setTrackOrder] = useState(null)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [cancelling, setCancelling] = useState(false)
  const [returnTarget, setReturnTarget] = useState(null)
  const [returning, setReturning] = useState(false)
  const [invoiceOrder, setInvoiceOrder] = useState(null)

  const loadOrders = useCallback(() => {
    if (!user?.id) return
    setLoading(true)
    orderService
      .getUserOrders(user.id)
      .then(setOrders)
      .catch((err) => {
        console.error(err)
        toast.error('Could not load your orders')
      })
      .finally(() => setLoading(false))
  }, [user?.id])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  useEffect(() => {
    setPage(1)
  }, [activeTab, search, filters])

  const tabCounts = useMemo(() => {
    const counts = {}
    TABS.forEach((tab) => {
      counts[tab.key] = tab.statuses ? orders.filter((o) => tab.statuses.includes(o.status)).length : orders.length
    })
    return counts
  }, [orders])

  const filteredOrders = useMemo(() => {
    const activeStatuses = TABS.find((t) => t.key === activeTab)?.statuses
    const searchLower = search.trim().toLowerCase()

    return orders.filter((order) => {
      if (activeStatuses && !activeStatuses.includes(order.status)) return false

      if (searchLower) {
        const matchesId = order.order_number?.toLowerCase().includes(searchLower)
        const matchesProduct = order.order_items?.some((item) => item.product?.name?.toLowerCase().includes(searchLower))
        if (!matchesId && !matchesProduct) return false
      }

      if (filters.status && order.status !== filters.status) return false
      if (filters.paymentMethod && order.payment_method !== filters.paymentMethod) return false
      if (filters.dateFrom && new Date(order.created_at) < new Date(filters.dateFrom)) return false
      if (filters.dateTo && new Date(order.created_at) > new Date(`${filters.dateTo}T23:59:59`)) return false
      if (filters.minPrice && Number(order.total) < Number(filters.minPrice)) return false
      if (filters.maxPrice && Number(order.total) > Number(filters.maxPrice)) return false

      return true
    })
  }, [orders, activeTab, search, filters])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE))
  const pageOrders = filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const filtersActive = Object.values(filters).some(Boolean)

  // --- Actions -----------------------------------------------------------

  const handleCancel = async () => {
    if (!cancelTarget) return
    setCancelling(true)
    try {
      const updated = await orderService.cancelOrder(cancelTarget.id, {
        previousPaymentStatus: cancelTarget.payment_status,
      })
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
      toast.success('Order cancelled')
      setCancelTarget(null)
    } catch (err) {
      console.error(err)
      toast.error('Could not cancel order')
    } finally {
      setCancelling(false)
    }
  }

  const handleReturnSubmit = async (values) => {
    if (!returnTarget) return
    setReturning(true)
    try {
      const updated = await orderService.requestReturn(returnTarget.id, {
        reason: values.reason,
        comment: values.comment,
        refundMethod: values.refundMethod,
      })
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
      toast.success('Return request submitted')
      setReturnTarget(null)
    } catch (err) {
      console.error(err)
      toast.error('Could not submit return request')
    } finally {
      setReturning(false)
    }
  }

  const handleRemove = async (order) => {
    if (!window.confirm('Remove this order from your order history? This only hides it from your view.')) return
    try {
      await orderService.hideFromHistory(order.id)
      setOrders((prev) => prev.filter((o) => o.id !== order.id))
      toast.success('Order removed from history')
    } catch (err) {
      console.error(err)
      toast.error('Could not remove order')
    }
  }

  const handleReorder = async (order) => {
    const items = order.order_items || []
    let added = 0
    let skipped = 0

    for (const item of items) {
      const product = item.product
      if (!product || product.is_active === false || (product.stock ?? 0) <= 0) {
        skipped += 1
        continue
      }
      // addToCart already shows its own per-item toast and handles both the
      // static-catalog and Supabase-backed cart paths, so we don't re-toast
      // success here — only surface a summary if something was skipped.
      await addToCart(product, item.quantity)
      added += 1
    }

    if (added > 0 && skipped > 0) {
      toast(`${skipped} unavailable item${skipped === 1 ? '' : 's'} could not be added`, { icon: '⚠️' })
    } else if (added === 0) {
      toast.error('None of these items are available right now')
    }
  }

  // --- Render --------------------------------------------------------------

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">My Orders</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Track, manage and reorder your purchases</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-full sm:w-64">
            <Input
              leftIcon={<Search className="h-4 w-4" />}
              placeholder="Search by order ID, product…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
            onClick={() => setFilterModalOpen(true)}
            className={filtersActive ? 'border-brand-500 text-brand-600 dark:text-brand-400' : ''}
          >
            Filters
          </Button>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-6 -mx-1 px-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-brand-500 text-white'
                : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
            }`}
          >
            {tab.label}
            {tabCounts[tab.key] > 0 && (
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-semibold ${
                  activeTab === tab.key ? 'bg-white/20' : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400'
                }`}
              >
                {tabCounts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-2xl border border-ink-200 dark:border-ink-800 p-5">
              <TextSkeleton lines={3} />
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800">
          {search.trim() ? (
            <EmptyState
              icon={Search}
              title="No results found"
              description={`We couldn't find any orders matching "${search.trim()}".`}
              action={
                <Button variant="outline" onClick={() => setSearch('')}>
                  Clear search
                </Button>
              }
            />
          ) : (
            <EmptyState
              icon={Package}
              title={EMPTY_STATE_COPY[activeTab].title}
              description={EMPTY_STATE_COPY[activeTab].description}
              action={
                <Link to={ROUTES.PRODUCTS}>
                  <Button variant="brand">Start Shopping</Button>
                </Link>
              }
            />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {pageOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={setDetailsOrder}
              onCancel={setCancelTarget}
              onTrack={setTrackOrder}
              onReorder={handleReorder}
              onReturn={setReturnTarget}
              onInvoice={setInvoiceOrder}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}

      {filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <p className="text-sm text-ink-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredOrders.length)} of {filteredOrders.length} orders
          </p>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      {/* Modals */}
      <OrderDetailsModal isOpen={!!detailsOrder} onClose={() => setDetailsOrder(null)} order={detailsOrder} />
      <TrackOrderModal isOpen={!!trackOrder} onClose={() => setTrackOrder(null)} order={trackOrder} />
      <InvoiceModal isOpen={!!invoiceOrder} onClose={() => setInvoiceOrder(null)} order={invoiceOrder} />
      <CancelOrderDialog
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        loading={cancelling}
      />
      <ReturnRefundModal
        isOpen={!!returnTarget}
        onClose={() => setReturnTarget(null)}
        onSubmit={handleReturnSubmit}
        loading={returning}
      />
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  )
}