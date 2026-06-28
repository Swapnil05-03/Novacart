import { Loader2 } from 'lucide-react'
import { classNames } from '@/utils/helpers'

const SIZES = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-10 w-10',
}

export default function Loader({ size = 'md', className, label = 'Loading' }) {
  return (
    <div role="status" className="inline-flex items-center justify-center">
      <Loader2 className={classNames('animate-spin text-brand-500', SIZES[size], className)} />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <Loader size="lg" />
    </div>
  )
}
