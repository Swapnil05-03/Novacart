import { Toaster } from 'react-hot-toast'
import { useTheme } from '@/context/ThemeContext'

export default function ToastProvider() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3200,
        style: {
          background: isDark ? '#13131A' : '#FFFFFF',
          color: isDark ? '#FAFAFA' : '#18181B',
          border: `1px solid ${isDark ? '#27272A' : '#E4E4E7'}`,
          borderRadius: '0.875rem',
          padding: '12px 16px',
          fontSize: '0.875rem',
          fontWeight: 500,
          boxShadow: '0 8px 24px -8px rgba(0,0,0,0.18)',
        },
        success: { iconTheme: { primary: '#5B5FEF', secondary: '#FFFFFF' } },
        error: { iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' } },
      }}
    />
  )
}
