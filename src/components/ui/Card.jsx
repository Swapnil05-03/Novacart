import { classNames } from '@/utils/helpers'

export default function Card({ children, className, hover = false, padding = true, ...props }) {
  return (
    <div
      className={classNames(
        'rounded-2xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-card',
        hover && 'transition-shadow duration-200 hover:shadow-card-hover',
        padding && 'p-6',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
