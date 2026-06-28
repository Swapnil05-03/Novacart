import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center py-16">
      <p className="price-mono text-7xl sm:text-8xl font-bold text-ink-200 dark:text-ink-800">404</p>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mt-4">
        This page wandered off
      </h1>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 max-w-sm">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
      </p>
      <Link to={ROUTES.HOME} className="mt-6">
        <Button variant="brand" leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to home
        </Button>
      </Link>
    </div>
  )
}
