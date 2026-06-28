import { forwardRef } from 'react'
import { classNames } from '@/utils/helpers'

const Textarea = forwardRef(({ label, error, className, id, rows = 4, ...props }, ref) => {
  const textareaId = id || props.name
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        aria-invalid={!!error}
        className={classNames(
          'w-full rounded-xl border bg-white dark:bg-ink-900 px-4 py-3 text-sm text-ink-900 dark:text-ink-50',
          'placeholder:text-ink-400 transition-colors duration-150 resize-none',
          'border-ink-200 dark:border-ink-700 focus:border-brand-500',
          error && 'border-danger-500 focus:border-danger-500',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-sm text-danger-500">{error}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
