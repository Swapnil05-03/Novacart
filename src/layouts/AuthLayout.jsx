import { Link, Outlet } from 'react-router-dom'
import { ROUTES, APP_NAME } from '@/constants'

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form column */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 mb-10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 dark:bg-white">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path d="M9 22V10L23 22V10" stroke="currentColor" className="text-white dark:text-ink-900" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-ink-900 dark:text-white">
            {APP_NAME}
          </span>
        </Link>
        <div className="w-full max-w-sm mx-auto lg:mx-0">
          <Outlet />
        </div>
      </div>

      {/* Visual column */}
      <div className="hidden lg:flex relative bg-ink-950 items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(91,95,239,0.35), transparent 40%), radial-gradient(circle at 80% 70%, rgba(245,166,35,0.18), transparent 45%)',
          }}
        />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative z-10 max-w-md px-10 text-center">
          <p className="price-mono text-7xl font-bold text-white tracking-tight">$0.00</p>
          <p className="mt-3 text-ink-400 text-sm">to start. Free returns, every order, every time.</p>
          <blockquote className="mt-12 text-xl font-medium text-white leading-relaxed">
            &ldquo;Checkout took less time than making coffee.&rdquo;
          </blockquote>
          <p className="mt-3 text-sm text-ink-500">— a NovaCart customer</p>
        </div>
      </div>
    </div>
  )
}
