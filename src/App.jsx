import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProfileLayout from '@/layouts/ProfileLayout'

import ProtectedRoute from '@/components/layout/ProtectedRoute'
import AdminRoute from '@/components/layout/AdminRoute'

import HomePage from '@/pages/HomePage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import CartPage from '@/pages/CartPage'
import WishlistPage from '@/pages/WishlistPage'
import CheckoutPage from '@/pages/CheckoutPage'
import OrderConfirmationPage from '@/pages/OrderConfirmationPage'

import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/ResetPasswordPage'

import ProfilePage from '@/pages/ProfilePage'
import OrderHistoryPage from '@/pages/OrderHistoryPage'
import SettingsPage from '@/pages/SettingsPage'

import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import AdminProductsPage from '@/pages/admin/AdminProductsPage'
import AdminOrdersPage from '@/pages/admin/AdminOrdersPage'
import AdminUsersPage from '@/pages/admin/AdminUsersPage'

import NotFoundPage from '@/pages/NotFoundPage'
import { ROUTES } from '@/constants'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public storefront */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<PageTransition><HomePage /></PageTransition>} />
          <Route path={ROUTES.PRODUCTS} element={<PageTransition><ProductsPage /></PageTransition>} />
          <Route path="/products/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
          <Route path={ROUTES.WISHLIST} element={<PageTransition><WishlistPage /></PageTransition>} />
          <Route path={ROUTES.CART} element={<PageTransition><CartPage /></PageTransition>} />

          {/* Authenticated storefront routes */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.CHECKOUT} element={<PageTransition><CheckoutPage /></PageTransition>} />
            <Route path="/order-confirmation/:id" element={<PageTransition><OrderConfirmationPage /></PageTransition>} />

            <Route element={<ProfileLayout />}>
              <Route path={ROUTES.PROFILE} element={<PageTransition><ProfilePage /></PageTransition>} />
              <Route path={ROUTES.ORDERS} element={<PageTransition><OrderHistoryPage /></PageTransition>} />
              <Route path={ROUTES.SETTINGS} element={<PageTransition><SettingsPage /></PageTransition>} />
            </Route>
          </Route>
        </Route>

        {/* Auth pages */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path={ROUTES.SIGNUP} element={<PageTransition><SignupPage /></PageTransition>} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
          <Route path={ROUTES.RESET_PASSWORD} element={<PageTransition><ResetPasswordPage /></PageTransition>} />
        </Route>

        {/* Admin panel */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN} element={<PageTransition><AdminDashboardPage /></PageTransition>} />
            <Route path={ROUTES.ADMIN_PRODUCTS} element={<PageTransition><AdminProductsPage /></PageTransition>} />
            <Route path={ROUTES.ADMIN_ORDERS} element={<PageTransition><AdminOrdersPage /></PageTransition>} />
            <Route path={ROUTES.ADMIN_USERS} element={<PageTransition><AdminUsersPage /></PageTransition>} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<MainLayout />}>
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
