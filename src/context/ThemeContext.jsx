import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(undefined)
const THEME_MODE_KEY = 'novacart-theme'

function systemPrefersDark() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  // themeMode is the user's stored preference: 'system' | 'dark' | 'light'
  const [themeMode, setThemeModeState] = useState(() => {
    if (typeof window === 'undefined') return 'system'
    return localStorage.getItem(THEME_MODE_KEY) || 'system'
  })

  // theme is the resolved value actually applied to the page.
  const [theme, setTheme] = useState(() =>
    themeMode === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : themeMode
  )

  // Apply to <html> whenever the resolved theme changes.
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  // Persist the preference and re-resolve whenever the mode changes.
  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, themeMode)
    setTheme(themeMode === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : themeMode)
  }, [themeMode])

  // While in "system" mode, live-follow OS theme changes.
  useEffect(() => {
    if (themeMode !== 'system') return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => setTheme(e.matches ? 'dark' : 'light')
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [themeMode])

  const setThemeMode = useCallback((mode) => {
    setThemeModeState(mode)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeModeState((prevMode) => {
      const current = prevMode === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : prevMode
      return current === 'dark' ? 'light' : 'dark'
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}