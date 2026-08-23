import { ShieldCheck, CreditCard, Smartphone, Landmark } from 'lucide-react'

const METHODS = [
  { icon: CreditCard, label: 'Cards', desc: 'Visa, Mastercard & RuPay credit and debit cards.' },
  { icon: Smartphone, label: 'UPI', desc: 'Pay instantly via any UPI app — GPay, PhonePe, Paytm.' },
  { icon: Landmark, label: 'Net Banking', desc: 'All major Indian banks supported.' },
]

export default function PaymentOptionsPage() {
  return (
    <div className="container-page py-14 max-w-3xl">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
        Payment Options
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
        Every payment is processed over an encrypted, PCI-DSS compliant connection. We never store your full card details.
      </p>
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {METHODS.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="rounded-xl border border-ink-200 dark:border-ink-800 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 mb-3">
              <Icon className="h-4.5 w-4.5" />
            </span>
            <p className="text-sm font-semibold text-ink-900 dark:text-white">{label}</p>
            <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-start gap-3 rounded-xl bg-ink-50 dark:bg-ink-900/40 p-5">
        <ShieldCheck className="h-5 w-5 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
        <p className="text-sm text-ink-600 dark:text-ink-300">
          100% secure checkout — every transaction is encrypted end-to-end and verified before your order is confirmed.
        </p>
      </div>
    </div>
  )
}