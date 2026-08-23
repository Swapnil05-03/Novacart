import { Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'
import LoginVisualPanel from '@/components/auth/LoginVisualPanel'
import AdminLayout from '@/layouts/AdminLayout'
import ProfileLayout from '@/layouts/ProfileLayout'

import ProtectedRoute from '@/components/layout/ProtectedRoute'
import AdminRoute from '@/components/layout/AdminRoute'
import ScrollToTop from '@/components/layout/ScrollToTop'

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
import AdminCategoriesPage from '@/pages/admin/AdminCategoriesPage'
import AdminReviewsPage from '@/pages/admin/AdminReviewsPage'
import NotFoundPage from '@/pages/NotFoundPage'

import AboutPage from '@/pages/info/AboutPage'
import CareersPage from '@/pages/info/CareersPage'
import PressPage from '@/pages/info/PressPage'
import BlogPage from '@/pages/info/BlogPage'
import ContactPage from '@/pages/info/ContactPage'
import TermsPage from '@/pages/info/TermsPage'
import PrivacyPage from '@/pages/info/PrivacyPage'
import HelpCenterPage from '@/pages/info/HelpCenterPage'
import ShippingInfoPage from '@/pages/info/ShippingInfoPage'
import ReturnsRefundsPage from '@/pages/info/ReturnsRefundsPage'
import PaymentOptionsPage from '@/pages/info/PaymentOptionsPage'
import FaqsPage from '@/pages/info/FaqsPage'

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
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public storefront */}
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<PageTransition><HomePage /></PageTransition>} />
            <Route path={ROUTES.PRODUCTS} element={<PageTransition><ProductsPage /></PageTransition>} />
            <Route path="/products/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
            <Route path={ROUTES.WISHLIST} element={<PageTransition><WishlistPage /></PageTransition>} />
            <Route path={ROUTES.CART} element={<PageTransition><CartPage /></PageTransition>} />

            {/* Informational / footer pages */}
            <Route path={ROUTES.ABOUT} element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path={ROUTES.CAREERS} element={<PageTransition><CareersPage /></PageTransition>} />
            <Route path={ROUTES.PRESS} element={<PageTransition><PressPage /></PageTransition>} />
            <Route path={ROUTES.BLOG} element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path={ROUTES.CONTACT} element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path={ROUTES.TERMS} element={<PageTransition><TermsPage /></PageTransition>} />
            <Route path={ROUTES.PRIVACY} element={<PageTransition><PrivacyPage /></PageTransition>} />
            <Route path={ROUTES.HELP_CENTER} element={<PageTransition><HelpCenterPage /></PageTransition>} />
            <Route path={ROUTES.SHIPPING_INFO} element={<PageTransition><ShippingInfoPage /></PageTransition>} />
            <Route path={ROUTES.RETURNS_REFUNDS} element={<PageTransition><ReturnsRefundsPage /></PageTransition>} />
            <Route path={ROUTES.PAYMENT_OPTIONS} element={<PageTransition><PaymentOptionsPage /></PageTransition>} />
            <Route path={ROUTES.FAQS} element={<PageTransition><FaqsPage /></PageTransition>} />

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
          <Route element={<AuthLayout rightPanel={<LoginVisualPanel />} />}>
            <Route path={ROUTES.LOGIN} element={<PageTransition><LoginPage /></PageTransition>} />
            <Route path={ROUTES.SIGNUP} element={<PageTransition><SignupPage /></PageTransition>} />
          </Route>
          <Route element={<AuthLayout />}>
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
              <Route path={ROUTES.ADMIN_CATEGORIES} element={<PageTransition><AdminCategoriesPage /></PageTransition>} />
              <Route path={ROUTES.ADMIN_REVIEWS} element={<PageTransition><AdminReviewsPage /></PageTransition>} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<MainLayout />}>
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  )
}