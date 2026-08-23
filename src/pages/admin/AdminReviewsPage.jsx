import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Star, Trash2, MessageSquare } from 'lucide-react'
import { reviewService } from '@/services/reviewService'
import { formatDate, classNames } from '@/utils/helpers'
import { ROUTES } from '@/constants'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import EmptyState from '@/components/ui/EmptyState'
import Pagination from '@/components/ui/Pagination'
import { TextSkeleton } from '@/components/ui/Skeleton'

const PAGE_SIZE = 15

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={classNames('h-3.5 w-3.5', n <= rating ? 'fill-amber-400 text-amber-400' : 'text-ink-200 dark:text-ink-700')}
        />
      ))}
    </div>
  )
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    reviewService
      .getAllReviews({ page, perPage: PAGE_SIZE })
      .then(({ data, count }) => {
        setReviews(data)
        setCount(count)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [page])

  useEffect(() => {
    load()
  }, [load])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await reviewService.deleteReview(deleteTarget.id)
      toast.success('Review removed')
      setDeleteTarget(null)
      load()
    } catch (err) {
      toast.error(err.message || 'Could not remove review')
    } finally {
      setDeleting(false)
    }
  }

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">Reviews</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">{count} product reviews</p>
      </div>

      {loading ? (
        <TextSkeleton lines={6} />
      ) : reviews.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800">
          <EmptyState icon={MessageSquare} title="No reviews yet" description="Customer product reviews will show up here." />
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-ink-200 dark:border-ink-800 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-ink-400">{formatDate(review.created_at)}</span>
                  </div>
                  {review.product ? (
                    <Link
                      to={ROUTES.PRODUCT_DETAIL(review.product.id)}
                      className="text-sm font-semibold text-ink-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400"
                    >
                      {review.product.name}
                    </Link>
                  ) : (
                    <p className="text-sm font-semibold text-ink-400">Product removed</p>
                  )}
                  <p className="text-xs text-ink-400 mt-0.5">
                    by {review.profile?.full_name || review.profile?.email || 'Unknown user'}
                  </p>
                  {review.comment && <p className="text-sm text-ink-600 dark:text-ink-300 mt-2">{review.comment}</p>}
                </div>
                <button
                  onClick={() => setDeleteTarget(review)}
                  className="shrink-0 rounded-lg p-1.5 text-ink-400 hover:bg-danger-50 hover:text-danger-600 dark:hover:bg-danger-500/10"
                  aria-label="Delete review"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {count > PAGE_SIZE && (
        <div className="flex justify-center mt-6">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Remove this review?"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={deleting}>
              Remove
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-600 dark:text-ink-300">This permanently deletes the review. This can&apos;t be undone.</p>
      </Modal>
    </div>
  )
}