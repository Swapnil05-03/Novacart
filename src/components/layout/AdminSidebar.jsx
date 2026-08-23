import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, Tags, Star, ArrowLeft, ExternalLink } from 'lucide-react'
import { orderService } from '@/services/orderService'
import { ROUTES, APP_NAME } from '@/constants'
import { classNames } from '@/utils/helpers'

const LINKS = [
  { label: 'Dashboard', to: ROUTES.ADMIN, icon: LayoutDashboard, end: true },
  { label: 'Products', to: ROUTES.ADMIN_PRODUCTS, icon: Package },
  { label: 'Orders', to: ROUTES.ADMIN_ORDERS, icon: ShoppingCart, badgeKey: 'pendingOrders' },
  { label: 'Users', to: ROUTES.ADMIN_USERS, icon: Users },
  { label: 'Categories', to: ROUTES.ADMIN_CATEGORIES, icon: Tags },
  { label: 'Reviews', to: ROUTES.ADMIN_REVIEWS, icon: Star },
]

export default function AdminSidebar() {
  const [pendingOrders, setPendingOrders] = useState(0)

  useEffect(() => {
    orderService
      .getAllOrders({ status: 'pending', perPage: 1 })
      .then((res) => setPendingOrders(res.count || 0))
      .catch(() => {})
  }, [])

  const badges = { pendingOrders }

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-ink-200 dark:border-ink-800 h-[calc(100vh-4rem)] sticky top-16 py-6 px-4">
      <div className="px-2 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">{APP_NAME} Admin</p>
      </div>

      <nav className="flex flex-col gap-1">
        {LINKS.map((link) => {
          const badgeCount = link.badgeKey ? badges[link.badgeKey] : 0
          return (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                classNames(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900'
                    : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon className="h-4.5 w-4.5" />
                  <span className="flex-1">{link.label}</span>
                  {badgeCount > 0 && (
                    <span
                      className={classNames(
                        'inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold',
                        isActive
                          ? 'bg-white/20'
                          : 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300'
                      )}
                    >
                      {badgeCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="mt-6">
        <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">Sales Channels</p>
        <a
          href={ROUTES.HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
        >
          <ExternalLink className="h-4.5 w-4.5" />
          Online Store
        </a>
      </div>

      <div className="flex-1" />

      <NavLink
        to={ROUTES.HOME}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to store
      </NavLink>
    </aside>
  )
}