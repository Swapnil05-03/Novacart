import { useState } from 'react'
import { Star } from 'lucide-react'
import { classNames } from '@/utils/helpers'

export default function Rating({
  value = 0,
  count,
  size = 'md',
  interactive = false,
  onChange,
  showValue = false,
}) {
  const [hovered, setHovered] = useState(null)
  const sizeClass = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' }[size]
  const displayValue = hovered ?? value

  return (
    <div className="inline-flex items-center gap-1">
      <div
        className="flex items-center gap-0.5"
        onMouseLeave={() => interactive && setHovered(null)}
        role={interactive ? 'radiogroup' : 'img'}
        aria-label={`Rated ${value} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            className={classNames(interactive && 'cursor-pointer', !interactive && 'cursor-default')}
            aria-label={interactive ? `Rate ${star} stars` : undefined}
          >
            <Star
              className={classNames(
                sizeClass,
                star <= displayValue ? 'fill-amber-500 text-amber-500' : 'fill-transparent text-ink-300 dark:text-ink-600'
              )}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {showValue && value > 0 && (
        <span className="text-sm font-medium text-ink-700 dark:text-ink-300">{value.toFixed(1)}</span>
      )}
      {count !== undefined && (
        <span className="text-sm text-ink-400">({count})</span>
      )}
    </div>
  )
}
