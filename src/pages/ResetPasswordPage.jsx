import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'
import { ROUTES } from '@/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.updatePassword(values.password)
      toast.success('Password updated — please sign in again')
      navigate(ROUTES.LOGIN)
    } catch (err) {
      toast.error(err.message || 'Could not update password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
        Set a new password
      </h1>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
        Choose a strong password you haven&rsquo;t used before.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <Input
          label="New password"
          type="password"
          required
          leftIcon={<Lock className="h-4 w-4" />}
          hint="At least 8 characters"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' },
          })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm new password"
          type="password"
          required
          leftIcon={<Lock className="h-4 w-4" />}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="brand" size="lg" className="w-full" isLoading={submitting}>
          Update password
        </Button>
      </form>
    </div>
  )
}
