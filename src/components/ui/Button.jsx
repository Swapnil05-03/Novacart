import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { classNames } from '@/utils/helpers'

const VARIANTS = {
  primary:
    'bg-ink-900 text-white hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100 shadow-soft',
  brand: 'bg-brand-500 text-white hover:bg-brand-600 shadow-soft',
  secondary:
    'bg-ink-100 text-ink-900 hover:bg-ink-200 dark:bg-ink-800 dark:text-ink-50 dark:hover:bg-ink-700',
  outline:
    'border border-ink-300 dark:border-ink-700 text-ink-900 dark:text-ink-50 hover:bg-ink-100 dark:hover:bg-ink-800 bg-transparent',
  ghost: 'text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 bg-transparent',
  danger: 'bg-danger-500 text-white hover:bg-danger-600',
  link: 'text-brand-600 dark:text-brand-400 hover:underline bg-transparent p-0 h-auto',
}

const SIZES = {
  sm: 'h-9 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-5 text-sm rounded-xl gap-2',
  lg: 'h-13 px-7 text-base rounded-xl gap-2.5',
  icon: 'h-10 w-10 rounded-xl',
}

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={classNames(
          'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98]',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          VARIANTS[variant],
          variant !== 'link' && SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
