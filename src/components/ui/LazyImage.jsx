import { useState } from 'react'
import { ImageOff } from 'lucide-react'
import { classNames } from '@/utils/helpers'

export default function LazyImage({ src, alt, className, containerClassName }) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className={classNames('relative overflow-hidden bg-ink-100 dark:bg-ink-800', containerClassName)}>
      {!loaded && !errored && <div className="skeleton absolute inset-0" />}
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center text-ink-400">
          <ImageOff className="h-6 w-6" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={classNames(
            'transition-opacity duration-300',
            loaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  )
}
