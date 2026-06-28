import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/constants'

const FOOTER_LINKS = {
  Shop: [
    { label: 'All Products', to: ROUTES.PRODUCTS },
    { label: 'Best Sellers', to: ROUTES.PRODUCTS + '?filter=best-sellers' },
    { label: 'New Arrivals', to: ROUTES.PRODUCTS + '?sort=newest' },
  ],
  Account: [
    { label: 'My Profile', to: ROUTES.PROFILE },
    { label: 'Order History', to: ROUTES.ORDERS },
    { label: 'Wishlist', to: ROUTES.WISHLIST },
  ],
  Company: [
    { label: 'About', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Contact', to: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 bg-surface dark:bg-surface-dark mt-24">
      <div className="container-page py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 dark:bg-white">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <path d="M9 22V10L23 22V10" stroke="currentColor" className="text-white dark:text-ink-900" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
                {APP_NAME}
              </span>
            </div>
            <p className="text-sm text-ink-500 dark:text-ink-400 max-w-xs">
              Premium products, designed for people who care about the details. Built for speed, made for trust.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 dark:border-ink-700 text-ink-500 hover:text-ink-900 dark:hover:text-white hover:border-ink-400 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-semibold text-ink-900 dark:text-white mb-3">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
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
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">Built with React, Tailwind & Supabase</p>
        </div>
      </div>
    </footer>
  )
}
