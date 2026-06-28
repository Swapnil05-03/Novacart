import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Camera } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext'
import { profileService } from '@/services/profileService'
import Avatar from '@/components/ui/Avatar'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: profile?.full_name || '',
      phone: profile?.phone || '',
    },
  })

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await profileService.uploadAvatar(user.id, file)
      await refreshProfile()
      toast.success('Profile photo updated')
    } catch (err) {
      toast.error('Could not upload photo')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const onSubmit = async (values) => {
    setSaving(true)
    try {
      await profileService.updateProfile(user.id, {
        full_name: values.fullName,
        phone: values.phone,
      })
      await refreshProfile()
      toast.success('Profile updated')
    } catch (err) {
      toast.error('Could not update profile')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-6">Personal information</h2>

      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <Avatar src={profile?.avatar_url} name={profile?.full_name || user.email} size="xl" />
          <label className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 dark:bg-white text-white dark:text-ink-900 cursor-pointer shadow-soft">
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} disabled={uploading} />
            <Camera className="h-3.5 w-3.5" />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-ink-900 dark:text-white">{profile?.full_name || 'Add your name'}</p>
          <p className="text-sm text-ink-400">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <Input
          label="Full name"
          required
          {...register('fullName', { required: 'Full name is required' })}
          error={errors.fullName?.message}
        />
        <Input label="Phone number" {...register('phone')} placeholder="+1 (555) 000-0000" />
        <Input label="Email" value={user.email} disabled hint="Contact support to change your email" />
        <Button type="submit" variant="brand" isLoading={saving}>
          Save changes
        </Button>
      </form>
    </Card>
  )
}
