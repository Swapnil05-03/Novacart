import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { MessageSquareText } from 'lucide-react'
import { formatDate } from '@/utils/helpers'
import { useAuth } from '@/context/AuthContext'
import { productService } from '@/services/productService'
import Avatar from '@/components/ui/Avatar'
import Rating from '@/components/ui/Rating'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import EmptyState from '@/components/ui/EmptyState'

export function ReviewForm({ productId, onSubmitted }) {
  const { isAuthenticated, user } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { rating: 0, comment: '' } })

  if (!isAuthenticated) {
    return (
      <p className="text-sm text-ink-500 bg-ink-50 dark:bg-ink-900 rounded-xl p-4">
        Sign in to leave a review for this product.
      </p>
    )
  }

  const onSubmit = async (values) => {
    if (!values.rating) {
      toast.error('Please select a star rating')
      return
    }
    setSubmitting(true)
    try {
      await productService.addReview({
        productId,
        userId: user.id,
        rating: values.rating,
        comment: values.comment,
      })
      toast.success('Review submitted — thank you!')
      reset({ rating: 0, comment: '' })
      onSubmitted?.()
    } catch (err) {
      toast.error('Could not submit review')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-ink-200 dark:border-ink-800 p-5">
      <div>
        <p className="text-sm font-medium text-ink-700 dark:text-ink-300 mb-2">Your rating</p>
        <Controller
          control={control}
          name="rating"
          render={({ field }) => (
            <Rating value={field.value} interactive size="lg" onChange={field.onChange} />
          )}
        />
      </div>
      <Textarea
        label="Your review"
        placeholder="Share your experience with this product..."
        rows={3}
        {...register('comment', { required: 'Please write a short review' })}
        error={errors.comment?.message}
      />
      <Button type="submit" isLoading={submitting} variant="brand">
        Submit review
      </Button>
    </form>
  )
}

export function ReviewList({ reviews = [] }) {
  if (!reviews.length) {
    return (
      <EmptyState
        icon={MessageSquareText}
        title="No reviews yet"
        description="Be the first to share your thoughts on this product."
      />
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4 pb-6 border-b border-ink-100 dark:border-ink-800 last:border-0">
          <Avatar src={review.profiles?.avatar_url} name={review.profiles?.full_name || 'User'} size="md" />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink-900 dark:text-white">
                {review.profiles?.full_name || 'Verified Buyer'}
              </p>
              <span className="text-xs text-ink-400">{formatDate(review.created_at)}</span>
            </div>
            <Rating value={review.rating} size="sm" />
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300 leading-relaxed">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
