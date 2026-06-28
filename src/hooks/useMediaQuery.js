import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event) => setMatches(event.matches)
    mediaQuery.addEventListener('change', handler)
    setMatches(mediaQuery.matches)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
