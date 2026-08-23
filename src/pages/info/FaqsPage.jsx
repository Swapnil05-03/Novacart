import { ChevronDown } from 'lucide-react'
import { APP_NAME } from '@/constants'

const FAQS = [
  {
    q: 'How do I track my order?',
    a: 'Go to Profile → Order History. Every order shows its live status — placed, processing, shipped, or delivered.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Credit/debit cards (Visa, Mastercard, RuPay), UPI, and net banking from all major Indian banks.',
  },
  {
    q: 'Can I cancel an order after placing it?',
    a: 'Yes — orders can be cancelled from Order History any time before they\u2019re shipped.',
  },
  {
    q: 'What is your return policy?',
    a: 'Most items can be returned within 14 days of delivery. See our Returns & Refunds page for full details.',
  },
  {
    q: `Is shipping free on ${APP_NAME}?`,
    a: 'Shipping is free on all orders above \u20b9499. Orders below that carry a flat \u20b949 fee.',
  },
  {
    q: 'How do I contact support?',
    a: 'Use the Contact page to send us a message — we typically reply within 24 hours.',
  },
]

export default function FaqsPage() {
  return (
    <div className="container-page py-14 max-w-2xl">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        Frequently Asked Questions
      </h1>
      <p className="mt-3 text-sm text-ink-500 dark:text-ink-400">
        Quick answers to the most common questions.
      </p>

      <div className="mt-8 divide-y divide-ink-200 dark:divide-ink-800 rounded-xl border border-ink-200 dark:border-ink-800">
        {FAQS.map(({ q, a }) => (
          <details key={q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-ink-900 dark:text-white">
              {q}
              <ChevronDown className="h-4 w-4 shrink-0 text-ink-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">{a}</p>
          </details>
        ))}
      </div>
    </div>
  )
}