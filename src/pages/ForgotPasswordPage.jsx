import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, MailCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'
import { ROUTES } from '@/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.sendPasswordReset(values.email)
      setSent(true)
    } catch (err) {
      toast.error(err.message || 'Could not send reset email')
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-50 dark:bg-success-500/10 mb-5">
          <MailCheck className="h-6 w-6 text-success-600" />
        </div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm text-ink-500 dark:text-ink-400">
          We&rsquo;ve sent a password reset link to your email address.
        </p>
        <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400 mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to sign in
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
        Reset your password
      </h1>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
        Enter your email and we&rsquo;ll send you a link to reset your password.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <Input
          label="Email"
          type="email"
          required
          leftIcon={<Mail className="h-4 w-4" />}
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Button type="submit" variant="brand" size="lg" className="w-full" isLoading={submitting}>
          Send reset link
        </Button>
      </form>

      <Link to={ROUTES.LOGIN} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800 dark:hover:text-ink-200 mt-6">
        <ArrowLeft className="h-4 w-4" /> Back to sign in
      </Link>
    </div>
  )
}
