import { CreditCard, Smartphone, Building2, Wallet, Truck } from 'lucide-react'
import { classNames } from '@/utils/helpers'

const METHOD_ICONS = {
  card: CreditCard,
  upi: Smartphone,
  netbanking: Building2,
  wallet: Wallet,
  cod: Truck,
}

export default function PaymentMethodSelector({ methods, selected, onSelect }) {
  return (
    <div className="space-y-2.5">
      {methods.map((method) => {
        const Icon = METHOD_ICONS[method.id] || CreditCard
        const isSelected = selected === method.id
        return (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={classNames(
              'flex w-full items-center gap-3.5 rounded-xl border p-4 text-left transition-colors',
              isSelected
                ? 'border-brand-400 bg-brand-50 dark:bg-brand-900/20'
                : 'border-ink-200 dark:border-ink-800 hover:border-ink-300 dark:hover:border-ink-700'
            )}
          >
            <div
              className={classNames(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg',
                isSelected
                  ? 'bg-brand-500 text-white'
                  : 'bg-ink-100 dark:bg-ink-800 text-ink-500 dark:text-ink-400'
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-ink-900 dark:text-white">{method.label}</p>
              <p className="text-xs text-ink-500 dark:text-ink-400">{method.description}</p>
            </div>
            <div
              className={classNames(
                'h-5 w-5 shrink-0 rounded-full border-2 transition-colors',
                isSelected ? 'border-brand-500' : 'border-ink-300 dark:border-ink-600'
              )}
            >
              {isSelected && <div className="h-full w-full scale-50 rounded-full bg-brand-500" />}
            </div>
          </button>
        )
      })}
    </div>
  )
}