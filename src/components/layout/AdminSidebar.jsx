import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users, ArrowLeft } from 'lucide-react'
import { ROUTES, APP_NAME } from '@/constants'
import { classNames } from '@/utils/helpers'

const LINKS = [
  { label: 'Dashboard', to: ROUTES.ADMIN, icon: LayoutDashboard, end: true },
  { label: 'Products', to: ROUTES.ADMIN_PRODUCTS, icon: Package },
  { label: 'Orders', to: ROUTES.ADMIN_ORDERS, icon: ShoppingCart },
  { label: 'Users', to: ROUTES.ADMIN_USERS, icon: Users },
]

export default function AdminSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-ink-200 dark:border-ink-800 h-[calc(100vh-4rem)] sticky top-16 py-6 px-4">
      <div className="px-2 mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">{APP_NAME} Admin</p>
      </div>
      <nav className="flex flex-col gap-1 flex-1">
        {LINKS.map((link) => (
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
            <link.icon className="h-4.5 w-4.5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
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
