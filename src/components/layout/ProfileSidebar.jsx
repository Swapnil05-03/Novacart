import { NavLink } from 'react-router-dom'
import { User, Package, Settings } from 'lucide-react'
import { ROUTES } from '@/constants'
import { classNames } from '@/utils/helpers'

const LINKS = [
  { label: 'Profile', to: ROUTES.PROFILE, icon: User, end: true },
  { label: 'Orders', to: ROUTES.ORDERS, icon: Package },
  { label: 'Settings', to: ROUTES.SETTINGS, icon: Settings },
]

export default function ProfileSidebar() {
  return (
    <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto">
      {LINKS.map((link) => (
        <NavLink
          key={link.label}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            classNames(
              'flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900'
                : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800'
            )
          }
        >
          <link.icon className="h-4 w-4" />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
