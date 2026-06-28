import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '@/services/authService'
import { ROUTES } from '@/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function SignupPage() {
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
      await authService.signUp({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      })
      toast.success('Account created! Check your email to confirm, then sign in.')
      navigate(ROUTES.LOGIN)
    } catch (err) {
      toast.error(err.message || 'Could not create account')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">
        Create your account
      </h1>
      <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">Join NovaCart in seconds</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
        <Input
          label="Full name"
          required
          leftIcon={<User className="h-4 w-4" />}
          {...register('fullName', { required: 'Full name is required' })}
          error={errors.fullName?.message}
        />
        <Input
          label="Email"
          type="email"
          required
          leftIcon={<Mail className="h-4 w-4" />}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' },
          })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
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
          label="Confirm password"
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
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-brand-600 dark:text-brand-400 link-underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
