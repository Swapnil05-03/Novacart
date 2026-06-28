import { motion } from 'framer-motion'
import { ShieldCheck, Loader2 } from 'lucide-react'

export default function PaymentProcessingScreen({ methodLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        className="mb-6"
      >
        <Loader2 className="h-12 w-12 text-brand-500" />
      </motion.div>

      <h2 className="text-lg font-semibold text-ink-900 dark:text-white">
        Processing your payment
      </h2>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400 max-w-xs">
        {methodLabel ? `Confirming your ${methodLabel} payment...` : 'Please wait a moment...'}
      </p>

      <div className="mt-8 flex items-center gap-2 text-xs text-ink-400">
        <ShieldCheck className="h-4 w-4" />
        Your payment is encrypted and secure
      </div>
    </div>
  )
}