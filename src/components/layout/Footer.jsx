import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
} from 'lucide-react'
import { APP_NAME, ROUTES } from '@/constants'
import { productService } from '@/services/productService'
import { newsletterService } from '@/services/newsletterService'
import Button from '@/components/ui/Button'

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://www.twitter.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com' },
]

const TRUST_BADGES = [
  { icon: ShieldCheck, title: 'Secure Payments', desc: '100% secure checkout', to: ROUTES.PAYMENT_OPTIONS },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹499', to: ROUTES.SHIPPING_INFO },
  { icon: RotateCcw, title: 'Easy Returns', desc: '14 days return policy', to: ROUTES.RETURNS_REFUNDS },
  { icon: Headphones, title: '24/7 Support', desc: "We're here to help", to: ROUTES.HELP_CENTER },
]

const PAYMENT_BADGES = ['VISA', 'Mastercard', 'RuPay', 'UPI', 'Paytm', 'GPay']

const SHOP_LINKS = [
  { label: 'All Products', to: ROUTES.PRODUCTS },
  { label: 'New Arrivals', to: ROUTES.PRODUCTS + '?sort=newest' },
  { label: 'Best Sellers', to: ROUTES.PRODUCTS + '?filter=best-sellers' },
  { label: 'Deals & Offers', to: ROUTES.PRODUCTS + '?minDiscount=10' },
  { label: 'Track Order', to: ROUTES.ORDERS },
  { label: 'Wishlist', to: ROUTES.WISHLIST },
]

const ACCOUNT_LINKS = [
  { label: 'My Account', to: ROUTES.PROFILE },
  { label: 'Orders', to: ROUTES.ORDERS },
  { label: 'Addresses', to: ROUTES.PROFILE },
  { label: 'Wishlist', to: ROUTES.WISHLIST },
  { label: 'Settings', to: ROUTES.SETTINGS },
]

const COMPANY_LINKS = [
  { label: 'About Us', to: ROUTES.ABOUT },
  { label: 'Careers', to: ROUTES.CAREERS },
  { label: 'Press', to: ROUTES.PRESS },
  { label: 'Blog', to: ROUTES.BLOG },
  { label: 'Contact Us', to: ROUTES.CONTACT },
  { label: 'Terms & Conditions', to: ROUTES.TERMS },
  { label: 'Privacy Policy', to: ROUTES.PRIVACY },
]

const HELP_LINKS = [
  { label: 'Help Center', to: ROUTES.HELP_CENTER },
  { label: 'Shipping Information', to: ROUTES.SHIPPING_INFO },
  { label: 'Returns & Refunds', to: ROUTES.RETURNS_REFUNDS },
  { label: 'Payment Options', to: ROUTES.PAYMENT_OPTIONS },
  { label: 'Track Your Order', to: ROUTES.ORDERS },
  { label: 'FAQs', to: ROUTES.FAQS },
]

function NewsletterForm() {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ email }) => {
    setSubmitting(true)
    try {
      const { alreadySubscribed } = await newsletterService.subscribe(email)
      toast.success(alreadySubscribed ? "You're already subscribed" : 'Subscribed! Watch your inbox.')
      reset()
    } catch {
      toast.error("Couldn't subscribe right now. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 shrink-0">
          <Mail className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink-900 dark:text-white">Stay in the loop</p>
          <p className="text-xs text-ink-500 dark:text-ink-400">
            Subscribe to get updates on new products, exclusive offers and more.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            className="h-11 w-full rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-4 text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 focus:border-brand-500 transition-colors"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+\.\S+$/,
            })}
          />
          {errors.email && <p className="mt-1 text-xs text-danger-500">Enter a valid email</p>}
        </div>
        <Button type="submit" variant="brand" isLoading={submitting} className="shrink-0">
          Subscribe
        </Button>
      </div>
    </form>
  )
}

function LocaleSelectors() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          aria-label="Language"
          defaultValue="en"
          onChange={() => toast('English is currently the only supported language.')}
          className="h-9 appearance-none rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent pl-3 pr-7 text-xs font-medium text-ink-600 dark:text-ink-300 cursor-pointer focus:border-brand-500"
        >
          <option value="en">English</option>
        </select>
      </div>
      <div className="relative">
        <select
          aria-label="Currency"
          defaultValue="inr"
          onChange={() => toast('INR ₹ is currently the only supported currency.')}
          className="h-9 appearance-none rounded-lg border border-ink-200 dark:border-ink-700 bg-transparent pl-3 pr-7 text-xs font-medium text-ink-600 dark:text-ink-300 cursor-pointer focus:border-brand-500"
        >
          <option value="inr">INR ₹</option>
        </select>
      </div>
    </div>
  )
}

export default function Footer() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let active = true
    productService
      .getCategories()
      .then((data) => {
        if (active) setCategories((data || []).slice(0, 7))
      })
      .catch(() => {
        if (active) setCategories([])
      })
    return () => {
      active = false
    }
  }, [])

  const categoryLinks = categories.map((c) => ({
    label: c.name,
    to: `${ROUTES.PRODUCTS}?category=${c.id}`,
  }))

  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 bg-surface dark:bg-surface-dark mt-24">
      <div className="container-page py-14">
        {/* Top card: brand + newsletter + trust badges */}
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-elevated-dark p-6 lg:p-8 grid lg:grid-cols-[1fr_1fr_auto] gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M9 22V10L23 22V10"
                    stroke="white"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                {APP_NAME}
              </span>
            </div>
            <p className="text-sm text-ink-500 dark:text-ink-400 max-w-xs">
              Everything you need, explore it all in one place. Shop smart, save more, and enjoy a seamless
              experience.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 text-ink-500 hover:text-white hover:bg-brand-500 hover:border-brand-500 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <NewsletterForm />

          <div className="grid grid-cols-2 gap-x-8 gap-y-5 lg:min-w-[280px]">
            {TRUST_BADGES.map(({ icon: Icon, title, desc, to }) => (
              <Link key={title} to={to} className="flex items-start gap-2.5 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-ink-900 dark:text-white">{title}</span>
                  <span className="block text-[11px] text-ink-500 dark:text-ink-400">{desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-12">
          <FooterColumn heading="Shop" links={SHOP_LINKS} />
          <FooterColumn heading="Categories" links={categoryLinks} emptyFallback={{ label: 'All Products', to: ROUTES.PRODUCTS }} />
          <FooterColumn heading="Account" links={ACCOUNT_LINKS} />
          <FooterColumn heading="Company" links={COMPANY_LINKS} />
          <FooterColumn heading="Help & Support" links={HELP_LINKS} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-ink-200 dark:border-ink-800 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {PAYMENT_BADGES.map((label) => (
              <span
                key={label}
                className="flex h-7 items-center justify-center rounded-md border border-ink-200 dark:border-ink-700 px-2.5 text-[10px] font-semibold text-ink-500 dark:text-ink-400"
              >
                {label}
              </span>
            ))}
          </div>

          <LocaleSelectors />
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ heading, links, emptyFallback }) {
  const items = links.length ? links : emptyFallback ? [emptyFallback] : []
  return (
    <div>
      <h4 className="text-sm font-semibold text-ink-900 dark:text-white mb-3">{heading}</h4>
      <ul className="space-y-2.5">
        {items.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-sm text-ink-500 dark:text-ink-400 hover:text-ink-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}