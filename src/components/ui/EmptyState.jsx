import { classNames } from '@/utils/helpers'

export default function EmptyState({ icon: Icon, title, description, action, className }) {
  return (
    <div className={classNames('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
      {Icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 dark:bg-ink-800">
          <Icon className="h-7 w-7 text-ink-400" strokeWidth={1.5} />
        </div>
      )}
      <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-ink-500 dark:text-ink-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
