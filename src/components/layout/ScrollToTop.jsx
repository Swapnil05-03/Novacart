import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls the window to the top whenever the route's pathname changes.
// React Router (unlike a full page navigation) does NOT reset scroll
// position by default — navigating from a page you'd scrolled down on
// carries that same scroll offset into the next page, making it look like
// the new page "opened from the middle". This fixes that for real page
// changes (pathname) while leaving in-page filter/search param changes
// (same pathname, e.g. /products?category=x -> /products?category=y)
// alone, since those shouldn't jerk the user's scroll position while
// they're actively filtering.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}