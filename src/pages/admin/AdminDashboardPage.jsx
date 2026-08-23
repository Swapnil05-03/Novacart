import { useEffect, useMemo, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, Package, ShoppingCart, Users, ChevronDown, Download } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { formatCurrency, formatDate, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import StatCard from '@/components/admin/StatCard'
import RevenueChart from '@/components/admin/RevenueChart'
import OrdersByStatusChart from '@/components/admin/OrdersByStatusChart'
import OrderStatusBadge from '@/components/admin/OrderStatusBadge'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import { TextSkeleton } from '@/components/ui/Skeleton'

const RANGE_PRESETS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 14 days', days: 14 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
]

function startOfDaysAgo(days) {
  const d = new Date()
  d.setDate(d.getDate() - (days - 1))
  d.setHours(0, 0, 0, 0)
  return d
}

function endOfToday() {
  const d = new Date()
  d.setHours(23, 59, 59, 999)
  return d
}

function trendPercent(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 1000) / 10
}

function dailySparkline(orders, days, valueFn) {
  const buckets = Array.from({ length: days }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (days - 1 - i))
    return { key: d.toDateString(), value: 0 }
  })
  orders.forEach((o) => {
    if (o.status === 'cancelled') return
    const key = new Date(o.created_at).toDateString()
    const bucket = buckets.find((b) => b.key === key)
    if (bucket) bucket.value += valueFn(o)
  })
  return buckets
}

function exportOrdersCsv(orders, rangeLabel) {
  const header = ['Order #', 'Date', 'Customer', 'Items', 'Total', 'Status', 'Payment Method']
  const rows = orders.map((o) => [
    o.order_number,
    formatDate(o.created_at),
    o.profiles?.full_name || o.profiles?.email || '—',
    (o.order_items || []).reduce((sum, i) => sum + i.quantity, 0),
    o.total,
    o.status,
    o.payment_method || '—',
  ])
  const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `novacart-orders-${rangeLabel.replace(/\s+/g, '-').toLowerCase()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function AdminDashboardPage() {
  const [rangeDays, setRangeDays] = useState(14)
  const [rangeMenuOpen, setRangeMenuOpen] = useState(false)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const from = useMemo(() => startOfDaysAgo(rangeDays).toISOString(), [rangeDays])
  const to = useMemo(() => endOfToday().toISOString(), [])

  const load = useCallback(() => {
    setLoading(true)
    orderService
      .getDashboardAnalytics({ from, to })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [from, to])

  useEffect(() => {
    load()
  }, [load])

  const rangeLabel = `${startOfDaysAgo(rangeDays).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`

  const metrics = useMemo(() => {
    if (!data) return null
    const { currentOrders, previousOrders, totalProducts, productsBeforeRange, totalUsers, usersBeforeRange } = data

    const currentRevenue = currentOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total), 0)
    const previousRevenue = previousOrders.filter((o) => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total), 0)

    return {
      revenue: currentRevenue,
      revenueTrend: trendPercent(currentRevenue, previousRevenue),
      revenueSparkline: dailySparkline(currentOrders, rangeDays, (o) => Number(o.total)),
      orders: currentOrders.length,
      ordersTrend: trendPercent(currentOrders.length, previousOrders.length),
      ordersSparkline: dailySparkline(currentOrders, rangeDays, () => 1),
      totalProducts,
      productsTrend: trendPercent(totalProducts, productsBeforeRange),
      totalUsers,
      usersTrend: trendPercent(totalUsers, usersBeforeRange),
    }
  }, [data, rangeDays])

  const topProducts = useMemo(() => {
    if (!data) return []
    const tally = {}
    data.currentOrders.forEach((order) => {
      if (order.status === 'cancelled') return
      ;(order.order_items || []).forEach((item) => {
        if (!item.product) return
        const key = item.product.id
        if (!tally[key]) tally[key] = { product: item.product, sold: 0 }
        tally[key].sold += item.quantity
      })
    })
    return Object.values(tally)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 4)
  }, [data])

  const recentOrders = data?.currentOrders.slice(0, 5) || []

  if (loading && !data) {
    return <TextSkeleton lines={10} />
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Overview of your store&rsquo;s performance and key metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setRangeMenuOpen((o) => !o)}
              className="flex items-center gap-2 h-10 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3.5 text-sm font-medium text-ink-700 dark:text-ink-200"
            >
              {rangeLabel}
              <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
            </button>
            {rangeMenuOpen && (
              <div className="absolute right-0 z-20 mt-2 w-40 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-1.5">
                {RANGE_PRESETS.map((preset) => (
                  <button
                    key={preset.days}
                    onClick={() => {
                      setRangeDays(preset.days)
                      setRangeMenuOpen(false)
                    }}
                    className={classNames(
                      'flex w-full items-center rounded-lg px-3 py-2 text-sm',
                      rangeDays === preset.days
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 font-medium'
                        : 'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800'
                    )}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="outline"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={() => exportOrdersCsv(data.currentOrders, rangeLabel)}
            disabled={!data?.currentOrders.length}
          >
            Export Report
          </Button>
        </div>
      </div>

      {metrics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Revenue"
            value={formatCurrency(metrics.revenue)}
            icon={DollarSign}
            accent="success"
            trend={metrics.revenueTrend}
            sparkline={metrics.revenueSparkline}
          />
          <StatCard
            label="Total Orders"
            value={metrics.orders}
            icon={ShoppingCart}
            accent="brand"
            trend={metrics.ordersTrend}
            sparkline={metrics.ordersSparkline}
          />
          <StatCard label="Total Products" value={metrics.totalProducts} icon={Package} accent="amber" trend={metrics.productsTrend} />
          <StatCard label="Total Users" value={metrics.totalUsers} icon={Users} accent="brand" trend={metrics.usersTrend} />
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-4 mb-6">
        <RevenueChart orders={data?.currentOrders || []} days={rangeDays} title="Revenue Overview" subtitle={`Daily revenue • ${rangeLabel}`} />

        {/* Recent orders */}
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-ink-900 dark:text-white">Recent Orders</h3>
            <Link to={ROUTES.ADMIN_ORDERS} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
              View all orders →
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-ink-400 py-6 text-center">No orders in this period</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800">
                    <Package className="h-4 w-4 text-ink-500 dark:text-ink-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-900 dark:text-white truncate">#{order.order_number}</p>
                    <p className="text-xs text-ink-400">
                      {formatDate(order.created_at)} • {(order.order_items || []).reduce((s, i) => s + i.quantity, 0)} items
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="price-mono text-sm font-semibold text-ink-900 dark:text-white">{formatCurrency(order.total)}</p>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <OrdersByStatusChart orders={data?.currentOrders || []} />

        {/* Top selling products */}
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-ink-900 dark:text-white">Top Selling Products</h3>
            <Link to={ROUTES.ADMIN_PRODUCTS} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
              View all products →
            </Link>
          </div>
          {topProducts.length === 0 ? (
            <p className="text-sm text-ink-400 py-6 text-center">No sales in this period</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map(({ product, sold }, idx) => (
                <div key={product.id} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-ink-400 w-4 shrink-0">{idx + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-900 dark:text-white truncate">{product.name}</p>
                    <p className="text-xs text-ink-400">{sold} sold</p>
                  </div>
                  <p className="price-mono text-sm font-semibold text-ink-900 dark:text-white shrink-0">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New users */}
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-ink-900 dark:text-white">New Users</h3>
            <Link to={ROUTES.ADMIN_USERS} className="text-xs font-medium text-brand-600 dark:text-brand-400 hover:underline">
              View all users →
            </Link>
          </div>
          {(data?.recentUsers || []).length === 0 ? (
            <p className="text-sm text-ink-400 py-6 text-center">No users yet</p>
          ) : (
            <div className="space-y-3">
              {data.recentUsers.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <Avatar src={u.avatar_url} name={u.full_name || u.email} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-900 dark:text-white truncate">{u.full_name || 'Unnamed user'}</p>
                    <p className="text-xs text-ink-400 truncate">{u.email}</p>
                  </div>
                  <p className="text-xs text-ink-400 shrink-0">{formatDate(u.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}