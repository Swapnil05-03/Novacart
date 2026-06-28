import { XCircle, RotateCcw, CreditCard } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function PaymentFailureScreen({ errorMessage, onRetry, onChangeMethod }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-danger-50 dark:bg-danger-500/10 mb-5">
        <XCircle className="h-8 w-8 text-danger-500" />
      </div>

      <h2 className="text-lg font-semibold text-ink-900 dark:text-white">Payment failed</h2>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400 max-w-sm">
        {errorMessage || 'Something went wrong while processing your payment. No amount has been deducted.'}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mt-7 w-full max-w-xs">
        <Button variant="brand" className="flex-1" leftIcon={<RotateCcw className="h-4 w-4" />} onClick={onRetry}>
          Try again
        </Button>
        <Button variant="outline" className="flex-1" leftIcon={<CreditCard className="h-4 w-4" />} onClick={onChangeMethod}>
          Change method
        </Button>
      </div>
    </div>
  )
}