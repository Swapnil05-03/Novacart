import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Navigation, ChevronDown, Loader2 } from 'lucide-react'
import { useLocation } from '@/hooks/useLocation'
import { useClickOutside } from '@/hooks/useClickOutside'
import Button from '@/components/ui/Button'

export default function LocationPicker() {
  const { location, isDetecting, error, detectLocation, setManualLocation } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const panelRef = useRef(null)

  useClickOutside(panelRef, () => setIsOpen(false), isOpen)

  const handleManualSubmit = (e) => {
    e.preventDefault()
    if (!manualInput.trim()) return
    setManualLocation(manualInput)
    setManualInput('')
    setIsOpen(false)
  }

  const handleDetectClick = () => {
    detectLocation()
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="hidden sm:flex items-center gap-2 rounded-xl border border-ink-200 dark:border-ink-700 px-3 py-1.5 text-left hover:border-ink-300 dark:hover:border-ink-600 transition-colors"
      >
        <MapPin className="h-4 w-4 text-ink-400 shrink-0" />
        <span className="min-w-0">
          <span className="block text-[10px] text-ink-400 leading-tight">Deliver to</span>
          <span className="block text-xs font-semibold text-ink-900 dark:text-white leading-tight truncate max-w-[140px]">
            {location ? location.label : 'Set location'}
          </span>
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-ink-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-80 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-4 z-50"
          >
            <p className="text-sm font-semibold text-ink-900 dark:text-white mb-3">Choose your location</p>

            <Button
              variant="outline"
              size="sm"
              className="w-full mb-3"
              onClick={handleDetectClick}
              isLoading={isDetecting}
              leftIcon={<Navigation className="h-3.5 w-3.5" />}
            >
              Use my current location
            </Button>

            {error && (
              <p className="text-xs text-danger-500 mb-3">{error}</p>
            )}

            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
              <span className="text-xs text-ink-400">or enter manually</span>
              <div className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-2.5">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="Enter city or pincode"
                className="h-10 w-full rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 text-sm focus:border-brand-500"
              />
              <Button type="submit" variant="brand" size="sm" className="w-full">
                Set location
              </Button>
            </form>

            {isDetecting && (
              <p className="flex items-center gap-1.5 text-xs text-ink-400 mt-3">
                <Loader2 className="h-3 w-3 animate-spin" />
                Detecting your location...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}