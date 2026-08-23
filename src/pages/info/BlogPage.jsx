import { Link } from 'react-router-dom'
import { Newspaper } from 'lucide-react'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'

export default function BlogPage() {
  return (
    <div className="container-page py-20 flex flex-col items-center text-center min-h-[50vh] justify-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 mb-5">
        <Newspaper className="h-6 w-6" />
      </div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
        The blog is coming soon
      </h1>
      <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 max-w-sm">
        We&rsquo;re working on guides, product deep-dives, and behind-the-scenes stories. Check back soon.
      </p>
      <Link to={ROUTES.PRODUCTS} className="mt-6">
        <Button variant="brand">Browse products instead</Button>
      </Link>
    </div>
  )
}