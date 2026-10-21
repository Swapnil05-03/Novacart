import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { classNames } from '@/utils/helpers'

const Select = forwardRef(({ label, options, className, id, required, error, ...props }, ref) => {
  const selectId = id || props.name
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-ink-700 dark:text-ink-300">
          {label}
          {required && <span className="text-danger-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={classNames(
            'h-11 w-full appearance-none rounded-xl border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900',
            'px-4 pr-10 text-sm text-ink-900 dark:text-ink-50 focus:border-brand-500 transition-colors cursor-pointer',
            error && 'border-danger-500 focus:border-danger-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400 pointer-events-none" />
      </div>
      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-sm text-danger-500">
          {error}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select