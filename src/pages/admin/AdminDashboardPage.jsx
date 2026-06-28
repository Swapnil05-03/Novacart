import { useEffect, useState } from 'react'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { formatCurrency } from '@/utils/helpers'
import StatCard from '@/components/admin/StatCard'
import RevenueChart from '@/components/admin/RevenueChart'
import { TextSkeleton } from '@/components/ui/Skeleton'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    orderService
      .getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <TextSkeleton lines={8} />
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-1">
        Dashboard
      </h1>
      <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">An overview of your store&rsquo;s performance</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total revenue" value={formatCurrency(stats.totalRevenue)} icon={DollarSign} accent="success" />
        <StatCard label="Total orders" value={stats.totalOrders} icon={ShoppingCart} accent="brand" />
        <StatCard label="Total products" value={stats.totalProducts} icon={Package} accent="amber" />
        <StatCard label="Total users" value={stats.totalUsers} icon={Users} accent="brand" />
      </div>

      <RevenueChart orders={stats.ordersByDate} />
    </div>
  )
}
