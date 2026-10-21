import { Check } from 'lucide-react'
import { classNames } from '@/utils/helpers'

const STEPS = ['Delivery', 'Payment', 'Confirmation']

/**
 * `currentIndex` is 0-based into STEPS. Steps before it render as
 * completed (checkmark), the step at it renders as active/highlighted,
 * and steps after it render muted.
 */
export default function CheckoutStepIndicator({ currentIndex }) {
  return (
    <ol className="flex items-center gap-3 mb-8 max-w-lg" aria-label="Checkout progress">
      {STEPS.map((label, i) => {
        const isCompleted = i < currentIndex
        const isActive = i === currentIndex
        return (
          <li key={label} className="flex items-center gap-3 flex-1">
            <div className="flex items-center gap-2 shrink-0">
              <div
                aria-current={isActive ? 'step' : undefined}
                className={classNames(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  isCompleted && 'bg-brand-500 text-white',
                  isActive && 'bg-brand-500 text-white ring-4 ring-brand-100 dark:ring-brand-900/40',
                  !isCompleted && !isActive && 'bg-ink-100 dark:bg-ink-800 text-ink-400'
                )}
              >
                {isCompleted ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={classNames(
                  'text-sm font-medium hidden sm:inline',
                  isActive || isCompleted ? 'text-ink-900 dark:text-white' : 'text-ink-400'
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={classNames(
                  'h-px flex-1 transition-colors',
                  isCompleted ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-800'
                )}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}