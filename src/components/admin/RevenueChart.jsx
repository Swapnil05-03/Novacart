import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/utils/helpers'

export default function RevenueChart({ orders = [] }) {
  const chartData = useMemo(() => {
    const days = 14
    const today = new Date()
    const buckets = Array.from({ length: days }, (_, i) => {
      const d = new Date(today)
      d.setDate(d.getDate() - (days - 1 - i))
      return {
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        key: d.toDateString(),
        revenue: 0,
      }
    })

    orders.forEach((order) => {
      if (order.status === 'cancelled') return
      const orderDate = new Date(order.created_at).toDateString()
      const bucket = buckets.find((b) => b.key === orderDate)
      if (bucket) bucket.revenue += Number(order.total)
    })

    return buckets
  }, [orders])

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5">
      <h3 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Revenue, last 14 days</h3>
      <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Daily revenue across all completed orders</p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B5FEF" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#5B5FEF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-ink-200 dark:text-ink-800" />
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#A1A1AA' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: '#A1A1AA' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
          <Tooltip
            formatter={(value) => [formatCurrency(value), 'Revenue']}
            contentStyle={{ borderRadius: 12, border: '1px solid #E4E4E7', fontSize: 13 }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#5B5FEF" strokeWidth={2} fill="url(#revenueGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
