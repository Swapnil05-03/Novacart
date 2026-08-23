import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { ORDER_STATUS_LABELS } from '@/constants'

const STATUS_COLORS = {
  delivered: '#16A34A',
  shipped: '#5B5FEF',
  processing: '#D97706',
  pending: '#D97706',
  cancelled: '#DC2626',
  return_requested: '#F59E0B',
  returned: '#71717A',
}

export default function OrdersByStatusChart({ orders = [] }) {
  const counts = {}
  orders.forEach((o) => {
    counts[o.status] = (counts[o.status] || 0) + 1
  })

  const data = Object.entries(counts)
    .map(([status, count]) => ({ status, count, label: ORDER_STATUS_LABELS[status] || status }))
    .sort((a, b) => b.count - a.count)

  const total = orders.length

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5">
      <h3 className="text-base font-semibold text-ink-900 dark:text-white mb-4">Orders by Status</h3>

      {total === 0 ? (
        <p className="text-sm text-ink-400 py-10 text-center">No orders in this period</p>
      ) : (
        <div className="flex items-center gap-4">
          <div className="relative h-36 w-36 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="count" nameKey="label" innerRadius={44} outerRadius={64} paddingAngle={2}>
                  {data.map((entry) => (
                    <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || '#A1A1AA'} stroke="none" />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} orders`, name]} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl font-bold text-ink-900 dark:text-white">{total}</p>
              <p className="text-[11px] text-ink-400">Total</p>
            </div>
          </div>

          <div className="flex-1 space-y-1.5 min-w-0">
            {data.map((entry) => (
              <div key={entry.status} className="flex items-center justify-between gap-2 text-xs">
                <span className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[entry.status] || '#A1A1AA' }}
                  />
                  <span className="text-ink-600 dark:text-ink-300 truncate">{entry.label}</span>
                </span>
                <span className="text-ink-400 shrink-0">
                  {entry.count} ({Math.round((entry.count / total) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}