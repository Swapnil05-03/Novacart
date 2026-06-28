import { getInitials, classNames } from '@/utils/helpers'

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-24 w-24 text-2xl',
}

export default function Avatar({ src, name, size = 'md', className }) {
  return (
    <div
      className={classNames(
        'inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-100 dark:bg-brand-900/40 font-semibold text-brand-700 dark:text-brand-300 shrink-0',
        SIZES[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={name || 'Avatar'} className="h-full w-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  )
}
