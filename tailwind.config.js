/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Surfaces
        surface: {
          DEFAULT: '#FAFAF8',
          dark: '#0B0B0F',
        },
        elevated: {
          DEFAULT: '#FFFFFF',
          dark: '#13131A',
        },
        // Brand
        brand: {
          50: '#EEF0FF',
          100: '#E0E3FF',
          200: '#C2C8FF',
          300: '#9FA6FF',
          400: '#7B81F9',
          500: '#5B5FEF',
          600: '#4A4DD6',
          700: '#3A3CAD',
          800: '#2C2E85',
          900: '#1F2061',
        },
        // Accent for deals/sale
        amber: {
          50: '#FFF8EB',
          100: '#FFEFC7',
          400: '#F8B84E',
          500: '#F5A623',
          600: '#D6890F',
        },
        // Neutrals (zinc-based)
        ink: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#0B0B0F',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
        },
        danger: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        display: ['"Geist"', '"Inter"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgba(0,0,0,0.04), 0 1px 3px 0 rgba(0,0,0,0.06)',
        card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px -8px rgba(0,0,0,0.08)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.06), 0 16px 32px -12px rgba(0,0,0,0.14)',
        glass: '0 8px 32px rgba(0,0,0,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pop-heart': {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.35)' },
          '60%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        shimmer: 'shimmer 1.6s infinite linear',
        'scale-in': 'scale-in 0.18s ease-out',
        'pop-heart': 'pop-heart 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
