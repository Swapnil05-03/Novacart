import { useEffect, useRef } from 'react'

export function useIntersectionObserver(onIntersect, { enabled = true, rootMargin = '200px' } = {}) {
  const targetRef = useRef(null)

  useEffect(() => {
    if (!enabled || !targetRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect()
        }
      },
      { rootMargin }
    )

    observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [onIntersect, enabled, rootMargin])

  return targetRef
}
