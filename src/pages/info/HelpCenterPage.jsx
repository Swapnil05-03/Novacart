import { Link } from 'react-router-dom'
import { Package, RotateCcw, CreditCard, MessageCircle } from 'lucide-react'
import { ROUTES } from '@/constants'

const TOPICS = [
  { icon: Package, label: 'Track an order', desc: 'Check the status of your order in real time.', to: ROUTES.ORDERS },
  { icon: RotateCcw, label: 'Returns & Refunds', desc: 'Start a return or check refund timelines.', to: ROUTES.RETURNS_REFUNDS },
  { icon: CreditCard, label: 'Payment options', desc: 'See accepted payment methods & security.', to: ROUTES.PAYMENT_OPTIONS },
  { icon: MessageCircle, label: 'Contact support', desc: 'Can\u2019t find an answer? Reach our team directly.', to: ROUTES.CONTACT },
]

export default function HelpCenterPage() {
  return (
    <div className="container-page py-14 max-w-4xl">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        Help Center
      </h1>
      <p className="mt-3 text-sm text-ink-500 dark:text-ink-400 max-w-lg">
        Find quick answers below, or jump straight to the topic you need help with.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {TOPICS.map(({ icon: Icon, label, desc, to }) => (
          <Link
            key={label}
            to={to}
            className="flex items-start gap-4 rounded-xl border border-ink-200 dark:border-ink-800 p-5 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-ink-50 dark:hover:bg-ink-900/40 transition-colors"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink-900 dark:text-white">{label}</span>
              <span className="block mt-1 text-sm text-ink-500 dark:text-ink-400">{desc}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-ink-200 dark:border-ink-800 p-6 text-center">
        <p className="text-sm text-ink-600 dark:text-ink-300">
          Still stuck? Check our{' '}
          <Link to={ROUTES.FAQS} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            FAQs
          </Link>{' '}
          or{' '}
          <Link to={ROUTES.CONTACT} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            contact our support team
          </Link>
          .
        </p>
      </div>
    </div>
  )
}