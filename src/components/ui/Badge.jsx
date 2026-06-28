import { classNames } from '@/utils/helpers'

const VARIANTS = {
  default: 'bg-ink-100 text-ink-700 dark:bg-ink-800 dark:text-ink-300',
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300',
  success: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500',
  danger: 'bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-500',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
