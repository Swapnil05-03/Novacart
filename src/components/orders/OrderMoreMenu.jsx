import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { classNames } from '@/utils/helpers'

export default function OrderMoreMenu({ items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  if (!items?.length) return null

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200 dark:border-ink-700 text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-800 transition-colors"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-ink-200 dark:border-ink-800 bg-elevated dark:bg-elevated-dark shadow-glass p-1.5"
          >
            {items.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                onClick={() => {
                  setOpen(false)
                  item.onClick()
                }}
                className={classNames(
                  'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors',
                  item.danger
                    ? 'text-danger-500 hover:bg-danger-50 dark:hover:bg-danger-500/10'
                    : 'text-ink-700 dark:text-ink-200 hover:bg-ink-100 dark:hover:bg-ink-800'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}