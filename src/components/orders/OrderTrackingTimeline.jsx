import { Check } from 'lucide-react'
import { getOrderTimeline } from '@/utils/orderTracking'
import { formatDateTime } from '@/utils/helpers'
import { classNames } from '@/utils/helpers'

export default function OrderTrackingTimeline({ order }) {
  const steps = getOrderTimeline(order)

  return (
    <ol className="space-y-0">
      {steps.map((step, idx) => (
        <li key={step.key} className="relative flex gap-4 pb-6 last:pb-0">
          {idx < steps.length - 1 && (
            <span
              className={classNames(
                'absolute left-[15px] top-8 h-full w-0.5',
                step.done ? 'bg-brand-500' : 'bg-ink-200 dark:bg-ink-800'
              )}
            />
          )}
          <span
            className={classNames(
              'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
              step.done
                ? 'bg-brand-500 border-brand-500 text-white'
                : 'bg-white dark:bg-ink-900 border-ink-200 dark:border-ink-700 text-ink-400',
              step.current && 'ring-4 ring-brand-500/20'
            )}
          >
            {step.done ? <Check className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
          </span>
          <div className="pt-1">
            <p
              className={classNames(
                'text-sm font-semibold',
                step.done ? 'text-ink-900 dark:text-white' : 'text-ink-400'
              )}
            >
              {step.label}
              {step.current && (
                <span className="ml-2 text-xs font-medium text-brand-600 dark:text-brand-400">Current</span>
              )}
            </p>
            {step.timestamp && <p className="text-xs text-ink-400 mt-0.5">{formatDateTime(step.timestamp)}</p>}
          </div>
        </li>
      ))}
    </ol>
  )
}