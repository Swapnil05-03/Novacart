import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'novacart-sidebar-visible'
const EVENT_NAME = 'novacart:sidebar-toggle'

function readStoredValue() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    // Visible by default — only hidden if explicitly set to 'false'
    return stored === null ? true : stored === 'true'
  } catch {
    return true
  }
}

/**
 * Shared on/off state for the homepage category sidebar.
 * Navbar owns the toggle button; HomePage reads the resulting visibility.
 * Backed by localStorage + a custom window event so both components stay in
 * sync without introducing a new Context provider.
 */
export function useSidebarToggle() {
  const [isVisible, setIsVisible] = useState(readStoredValue)

  useEffect(() => {
    function handleExternalToggle(e) {
      setIsVisible(e.detail.visible)
    }
    window.addEventListener(EVENT_NAME, handleExternalToggle)
    return () => window.removeEventListener(EVENT_NAME, handleExternalToggle)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsVisible((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // localStorage unavailable — toggle still works for this session
      }
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { visible: next } }))
      return next
    })
  }, [])

  return { isSidebarVisible: isVisible, toggleSidebar }
}