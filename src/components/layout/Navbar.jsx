import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  LayoutGrid,
  X,
  Sun,
  Moon,
  LogOut,
  Package,
  Settings,
  LayoutDashboard,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useTheme } from '@/context/ThemeContext'
import { useClickOutside } from '@/hooks/useClickOutside'
import { ROUTES, APP_NAME } from '@/constants'
import Avatar from '@/components/ui/Avatar'
import LocationPicker from '@/components/layout/LocationPicker'

const NAV_LINKS = [
  { label: 'Categories', to: ROUTES.PRODUCTS + '?view=categories' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { user, profile, isAuthenticated, isAdmin, signOut } = useAuth()
  const { itemCount } = useCart()
  const { items: wishlistItems } = useWishlist()
  const { theme, toggleTheme } = useTheme()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  useClickOutside(userMenuRef, () => setUserMenuOpen(false), userMenuOpen)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(searchValue.trim())}`)
      setSearchOpen(false)
      setSearchValue('')
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    navigate(ROUTES.HOME)
  }

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 dark:bg-white">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path d="M9 22V10L23 22V10" stroke="currentColor" className="text-white dark:text-ink-900" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-ink-600 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white transition-colors rounded-lg hover:bg-ink-100/60 dark:hover:bg-white/5"
            >
              {link.label === 'Categories' && (
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800">
                  <LayoutGrid className="h-4 w-4" />
                </span>
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop search */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="h-10 w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white/70 dark:bg-ink-900/70 pl-10 pr-4 text-sm focus:border-brand-500 transition-colors"
            />
          </div>
        </form>

        <LocationPicker />

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={toggleTheme}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Link
            to={ROUTES.WISHLIST}
            className="relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to={ROUTES.CART}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white ring-2 ring-surface dark:ring-surface-dark">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((o) => !o)}
                className="ml-1 inline-flex items-center rounded-full"
                aria-label="Account menu"
              >
                <Avatar src={profile?.avatar_url} name={profile?.full_name || user.email} size="sm" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-1.5"
                  >
                    <div className="px-3 py-2 border-b border-ink-100 dark:border-ink-800 mb-1">
                      <p className="text-sm font-medium text-ink-900 dark:text-white truncate">
                        {profile?.full_name || 'Account'}
                      </p>
                      <p className="text-xs text-ink-400 truncate">{user.email}</p>
                    </div>
                    <MenuLink to={ROUTES.PROFILE} icon={User} onClick={() => setUserMenuOpen(false)}>
                      Profile
                    </MenuLink>
                    <MenuLink to={ROUTES.ORDERS} icon={Package} onClick={() => setUserMenuOpen(false)}>
                      Orders
                    </MenuLink>
                    <MenuLink to={ROUTES.SETTINGS} icon={Settings} onClick={() => setUserMenuOpen(false)}>
                      Settings
                    </MenuLink>
                    {isAdmin && (
                      <MenuLink to={ROUTES.ADMIN} icon={LayoutDashboard} onClick={() => setUserMenuOpen(false)}>
                        Admin Dashboard
                      </MenuLink>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              className="ml-1 inline-flex h-10 items-center rounded-xl bg-ink-900 dark:bg-white px-4 text-sm font-medium text-white dark:text-ink-900 hover:bg-ink-800 dark:hover:bg-ink-100 transition-colors"
            >
              Sign in
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-ink-200 dark:border-ink-800"
          >
            <form onSubmit={handleSearchSubmit} className="container-page py-3 flex gap-2">
              <input
                autoFocus
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="h-10 flex-1 rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 text-sm focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="h-10 px-3 text-sm text-ink-500"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-ink-200 dark:border-ink-800"
          >
            <nav className="container-page py-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  toggleTheme()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function MenuLink({ to, icon: Icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
    >
      <Icon className="h-4 w-4 text-ink-400" />
      {children}
    </Link>
  )
}