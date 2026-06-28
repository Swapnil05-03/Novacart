import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react'
import { ROUTES } from '@/constants'
import { classNames } from '@/utils/helpers'

const LINKS = [
  { label: 'Dashboard', to: ROUTES.ADMIN, icon: LayoutDashboard, end: true },
  { label: 'Products', to: ROUTES.ADMIN_PRODUCTS, icon: Package },
  { label: 'Orders', to: ROUTES.ADMIN_ORDERS, icon: ShoppingCart },
  { label: 'Users', to: ROUTES.ADMIN_USERS, icon: Users },
]

export default function AdminMobileNav() {
  return (
    <nav className="lg:hidden sticky top-16 z-30 flex items-center gap-1 overflow-x-auto border-b border-ink-200 dark:border-ink-800 bg-surface dark:bg-surface-dark px-4 py-2.5">
      {LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            classNames(
              'flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              isActive
                ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900'
                : 'text-ink-600 dark:text-ink-300 bg-ink-100 dark:bg-ink-800'
            )
          }
        >
          <link.icon className="h-3.5 w-3.5" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
