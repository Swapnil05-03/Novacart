import { classNames } from '@/utils/helpers'

export default function StatCard({ label, value, icon: Icon, trend, accent = 'brand' }) {
  const accentClasses = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
    danger: 'bg-danger-50 text-danger-600 dark:bg-danger-500/10 dark:text-danger-500',
  }

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={classNames('flex h-10 w-10 items-center justify-center rounded-xl', accentClasses[accent])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend !== undefined && (
          <span
            className={classNames(
              'text-xs font-semibold rounded-full px-2 py-0.5',
              trend >= 0 ? 'text-success-600 bg-success-50 dark:bg-success-500/10' : 'text-danger-600 bg-danger-50 dark:bg-danger-500/10'
            )}
          >
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-sm text-ink-500 dark:text-ink-400">{label}</p>
      <p className="price-mono text-2xl font-bold text-ink-900 dark:text-white mt-1">{value}</p>
    </div>
  )
}
