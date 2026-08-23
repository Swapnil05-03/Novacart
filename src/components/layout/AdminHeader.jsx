import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  ExternalLink,
  LogOut,
  User as UserIcon,
  Settings as SettingsIcon,
  Package,
  ShoppingCart,
  Users as UsersIcon,
  AlertTriangle,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { useDebounce } from '@/hooks/useDebounce'
import { useClickOutside } from '@/hooks/useClickOutside'
import { adminSearchService } from '@/services/adminSearchService'
import { productService } from '@/services/productService'
import { orderService } from '@/services/orderService'
import { formatCurrency } from '@/utils/helpers'
import { ROUTES, APP_NAME } from '@/constants'
import Avatar from '@/components/ui/Avatar'

export default function AdminHeader() {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef(null)
  useClickOutside(searchRef, () => setSearchOpen(false), searchOpen)

  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState({ pendingOrders: 0, lowStock: [] })
  const notifRef = useRef(null)
  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen)

  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults(null)
      return
    }
    adminSearchService.search(debouncedQuery).then(setResults).catch(console.error)
  }, [debouncedQuery])

  useEffect(() => {
    Promise.all([
      orderService.getAllOrders({ status: 'pending', perPage: 1 }),
      productService.getProducts({ perPage: 100, sortBy: 'newest' }),
    ])
      .then(([pending, products]) => {
        const lowStock = products.data.filter((p) => p.is_active && p.stock > 0 && p.stock <= 5)
        setNotifications({ pendingOrders: pending.count || 0, lowStock })
      })
      .catch(console.error)
  }, [])

  const notifCount = notifications.pendingOrders + notifications.lowStock.length
  const hasResults = results && (results.products.length || results.orders.length || results.users.length)

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200 dark:border-ink-800 bg-elevated/95 dark:bg-elevated-dark/95 backdrop-blur-sm">
      <div className="flex h-16 items-center gap-4 px-4 lg:px-6">
        <Link to={ROUTES.ADMIN} className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 dark:bg-white">
            <span className="text-sm font-bold text-white dark:text-ink-900">N</span>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white hidden sm:inline">
            {APP_NAME}
          </span>
        </Link>

        <a
          href={ROUTES.HOME}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1 text-sm text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white shrink-0"
        >
          View Store
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        {/* Global search */}
        <div className="relative flex-1 max-w-md mx-auto" ref={searchRef}>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400 pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search products, orders, users…"
            className="h-10 w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 pl-10 pr-4 text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus:border-brand-500 transition-colors"
          />
          <AnimatePresence>
            {searchOpen && query.trim() && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 z-20 mt-2 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass max-h-96 overflow-y-auto"
              >
                {!results ? (
                  <p className="px-4 py-6 text-center text-sm text-ink-400">Searching…</p>
                ) : !hasResults ? (
                  <p className="px-4 py-6 text-center text-sm text-ink-400">No matches for &ldquo;{query}&rdquo;</p>
                ) : (
                  <div className="p-2">
                    {results.products.length > 0 && (
                      <SearchGroup label="Products" icon={Package}>
                        {results.products.map((p) => (
                          <SearchResultRow
                            key={p.id}
                            onClick={() => {
                              navigate(ROUTES.ADMIN_PRODUCTS)
                              setSearchOpen(false)
                            }}
                            title={p.name}
                            subtitle={formatCurrency(p.price)}
                          />
                        ))}
                      </SearchGroup>
                    )}
                    {results.orders.length > 0 && (
                      <SearchGroup label="Orders" icon={ShoppingCart}>
                        {results.orders.map((o) => (
                          <SearchResultRow
                            key={o.id}
                            onClick={() => {
                              navigate(ROUTES.ADMIN_ORDERS)
                              setSearchOpen(false)
                            }}
                            title={`#${o.order_number}`}
                            subtitle={formatCurrency(o.total)}
                          />
                        ))}
                      </SearchGroup>
                    )}
                    {results.users.length > 0 && (
                      <SearchGroup label="Users" icon={UsersIcon}>
                        {results.users.map((u) => (
                          <SearchResultRow
                            key={u.id}
                            onClick={() => {
                              navigate(ROUTES.ADMIN_USERS)
                              setSearchOpen(false)
                            }}
                            title={u.full_name || 'Unnamed user'}
                            subtitle={u.email}
                          />
                        ))}
                      </SearchGroup>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            >
              <Bell className="h-4.5 w-4.5" />
              {notifCount > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-semibold text-white">
                  {notifCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-2"
                >
                  {notifCount === 0 ? (
                    <p className="px-3 py-6 text-center text-sm text-ink-400">You&apos;re all caught up</p>
                  ) : (
                    <div className="space-y-1">
                      {notifications.pendingOrders > 0 && (
                        <Link
                          to={ROUTES.ADMIN_ORDERS}
                          onClick={() => setNotifOpen(false)}
                          className="flex items-start gap-2.5 rounded-lg p-2.5 hover:bg-ink-100 dark:hover:bg-ink-800"
                        >
                          <ShoppingCart className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-ink-700 dark:text-ink-200">
                            {notifications.pendingOrders} order{notifications.pendingOrders === 1 ? '' : 's'} awaiting confirmation
                          </p>
                        </Link>
                      )}
                      {notifications.lowStock.length > 0 && (
                        <Link
                          to={ROUTES.ADMIN_PRODUCTS}
                          onClick={() => setNotifOpen(false)}
                          className="flex items-start gap-2.5 rounded-lg p-2.5 hover:bg-ink-100 dark:hover:bg-ink-800"
                        >
                          <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-sm text-ink-700 dark:text-ink-200">
                            {notifications.lowStock.length} product{notifications.lowStock.length === 1 ? '' : 's'} running low on
                            stock
                          </p>
                        </Link>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin account menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            >
              <Avatar src={profile?.avatar_url} name={profile?.full_name || user?.email} size="sm" />
              <span className="hidden sm:inline text-sm font-medium text-ink-700 dark:text-ink-200">Admin</span>
              <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 z-20 mt-2 w-52 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-1.5"
                >
                  <Link
                    to={ROUTES.PROFILE}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
                  >
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to={ROUTES.SETTINGS}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
                  >
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setMenuOpen(false)
                      signOut()
                      navigate(ROUTES.HOME)
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

function SearchGroup({ label, icon: Icon, children }) {
  return (
    <div className="mb-1 last:mb-0">
      <p className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink-400">
        <Icon className="h-3 w-3" />
        {label}
      </p>
      {children}
    </div>
  )
}

function SearchResultRow({ title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left hover:bg-ink-100 dark:hover:bg-ink-800"
    >
      <span className="text-sm text-ink-900 dark:text-white truncate">{title}</span>
      <span className="text-xs text-ink-400 shrink-0">{subtitle}</span>
    </button>
  )
}