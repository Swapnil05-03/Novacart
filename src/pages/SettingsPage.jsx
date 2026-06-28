import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Lock, Trash2 } from 'lucide-react'
import { authService } from '@/services/authService'
import { useTheme } from '@/context/ThemeContext'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Modal from '@/components/ui/Modal'

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const [submitting, setSubmitting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const newPassword = watch('newPassword')

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.updatePassword(values.newPassword)
      toast.success('Password updated')
      reset()
    } catch (err) {
      toast.error(err.message || 'Could not update password')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Appearance</h2>
        <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Choose how NovaCart looks on your device</p>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} label="Dark mode" id="dark-mode-toggle" />
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Change password</h2>
        <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Update your password to keep your account secure</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <Input
            label="New password"
            type="password"
            leftIcon={<Lock className="h-4 w-4" />}
            required
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 8, message: 'Must be at least 8 characters' },
            })}
            error={errors.newPassword?.message}
          />
          <Input
            label="Confirm new password"
            type="password"
            leftIcon={<Lock className="h-4 w-4" />}
            required
            {...register('confirmPassword', {
              required: 'Please confirm your new password',
              validate: (value) => value === newPassword || 'Passwords do not match',
            })}
            error={errors.confirmPassword?.message}
          />
          <Button type="submit" variant="brand" isLoading={submitting}>
            Update password
          </Button>
        </form>
      </Card>

      <Card className="border-danger-200 dark:border-danger-500/30">
        <h2 className="text-base font-semibold text-danger-600 mb-1">Danger zone</h2>
        <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => setDeleteModalOpen(true)}>
          Delete account
        </Button>
      </Card>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete account"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                toast.error('Account deletion requires a support request in this demo')
                setDeleteModalOpen(false)
              }}
            >
              Delete my account
            </Button>
          </>
        }
      >
        <p className="text-sm text-ink-600 dark:text-ink-300">
          This will permanently remove your profile, orders, and saved items. This action cannot be undone.
        </p>
      </Modal>
    </div>
  )
}
