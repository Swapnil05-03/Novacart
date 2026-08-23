import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  Lock,
  Trash2,
  Monitor,
  Moon,
  Sun,
  Check,
  Mail,
  Tag,
  Bell,
  ShieldCheck,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { authService } from '@/services/authService'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { getEmailPrefs, saveEmailPrefs } from '@/utils/localProfileData'
import { formatDateTime, classNames } from '@/utils/helpers'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Switch from '@/components/ui/Switch'
import Modal from '@/components/ui/Modal'
import TwoFactorAuthModal from '@/components/settings/TwoFactorAuthModal'

const APPEARANCE_OPTIONS = [
  { value: 'system', label: 'System', hint: 'Use system setting', icon: Monitor },
  { value: 'dark', label: 'Dark', hint: 'Always dark', icon: Moon },
  { value: 'light', label: 'Light', hint: 'Always light', icon: Sun },
]

function parseUserAgent(ua) {
  if (!ua) return 'Unknown device'
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /Chrome\//.test(ua)
      ? 'Chrome'
      : /Firefox\//.test(ua)
        ? 'Firefox'
        : /Safari\//.test(ua)
          ? 'Safari'
          : 'Browser'
  const os = /Windows/.test(ua)
    ? 'Windows'
    : /Mac OS X/.test(ua)
      ? 'macOS'
      : /Android/.test(ua)
        ? 'Android'
        : /iPhone|iPad/.test(ua)
          ? 'iOS'
          : /Linux/.test(ua)
            ? 'Linux'
            : 'Unknown OS'
  return `${browser} on ${os}`
}

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, themeMode, setThemeMode } = useTheme()

  const [submitting, setSubmitting] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [emailPrefs, setEmailPrefs] = useState(() => getEmailPrefs(user?.id))
  const [sessionExpanded, setSessionExpanded] = useState(false)
  const [loggingOutOthers, setLoggingOutOthers] = useState(false)
  const [mfaFactors, setMfaFactors] = useState([])
  const [mfaModalOpen, setMfaModalOpen] = useState(false)
  const [disablingMfa, setDisablingMfa] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const newPassword = watch('newPassword')

  useEffect(() => {
    setEmailPrefs(getEmailPrefs(user?.id))
  }, [user?.id])

  useEffect(() => {
    authService
      .listMfaFactors()
      .then((factors) => setMfaFactors(factors.filter((f) => f.status === 'verified')))
      .catch(() => {
        // MFA may not be enabled on this Supabase project — fail silently
      })
  }, [])

  const isMfaEnabled = mfaFactors.length > 0

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      await authService.verifyCurrentPassword(user.email, values.currentPassword)
      await authService.updatePassword(values.newPassword)
      toast.success('Password updated')
      reset()
    } catch (err) {
      toast.error(err.message || 'Could not update password')
    } finally {
      setSubmitting(false)
    }
  }

  const updateEmailPref = (key, value) => {
    const next = { ...emailPrefs, [key]: value }
    setEmailPrefs(next)
    saveEmailPrefs(user.id, next)
  }

  const handleLogOutOthers = async () => {
    setLoggingOutOthers(true)
    try {
      await authService.signOutOtherDevices()
      toast.success('Signed out of all other devices')
    } catch (err) {
      toast.error(err.message || 'Could not sign out other devices')
    } finally {
      setLoggingOutOthers(false)
    }
  }

  const handleDisableMfa = async () => {
    if (!mfaFactors[0]) return
    setDisablingMfa(true)
    try {
      await authService.unenrollMfa(mfaFactors[0].id)
      setMfaFactors([])
      toast.success('Two-factor authentication disabled')
    } catch (err) {
      toast.error(err.message || 'Could not disable two-factor authentication')
    } finally {
      setDisablingMfa(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white">Account Settings</h1>
        <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">Manage your account preferences and security</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card>
          <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Appearance</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Choose how NovaCart looks on your device</p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {APPEARANCE_OPTIONS.map((option) => {
              const Icon = option.icon
              const selected = themeMode === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setThemeMode(option.value)}
                  className={classNames(
                    'relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors',
                    selected
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-ink-200 dark:border-ink-700 hover:bg-ink-50 dark:hover:bg-ink-800/60'
                  )}
                >
                  {selected && (
                    <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                  )}
                  <Icon className="h-5 w-5 text-ink-700 dark:text-ink-200" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm font-semibold text-ink-900 dark:text-white">{option.label}</p>
                    <p className="text-xs text-ink-400">{option.hint}</p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-ink-200 dark:border-ink-800 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink-900 dark:text-white">Dark mode</p>
              <p className="text-xs text-ink-400">Enable dark mode across the app</p>
            </div>
            <Switch
              checked={theme === 'dark'}
              onChange={(checked) => setThemeMode(checked ? 'dark' : 'light')}
              id="dark-mode-toggle"
            />
          </div>
        </Card>

        {/* Change password */}
        <Card>
          <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Change Password</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Update your password to keep your account secure</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Current password"
              type="password"
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="Enter current password"
              required
              {...register('currentPassword', { required: 'Current password is required' })}
              error={errors.currentPassword?.message}
            />
            <Input
              label="New password"
              type="password"
              leftIcon={<Lock className="h-4 w-4" />}
              placeholder="Enter new password"
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
              placeholder="Confirm new password"
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

        {/* Email preferences */}
        <Card>
          <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Email Preferences</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Choose what emails you want to receive</p>

          <div className="space-y-3">
            <EmailPrefRow
              icon={Bell}
              title="Order updates"
              subtitle="Receive emails about your orders"
              checked={emailPrefs.orderUpdates}
              onChange={(v) => updateEmailPref('orderUpdates', v)}
            />
            <EmailPrefRow
              icon={Tag}
              title="Promotions & offers"
              subtitle="Receive emails about offers and discounts"
              checked={emailPrefs.promotions}
              onChange={(v) => updateEmailPref('promotions', v)}
            />
            <EmailPrefRow
              icon={Mail}
              title="Newsletter"
              subtitle="Receive our newsletter and updates"
              checked={emailPrefs.newsletter}
              onChange={(v) => updateEmailPref('newsletter', v)}
            />
          </div>
        </Card>

        {/* Security & sessions */}
        <Card>
          <h2 className="text-base font-semibold text-ink-900 dark:text-white mb-1">Security & Sessions</h2>
          <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Manage your account security and active sessions</p>

          <div className="space-y-1">
            <button
              onClick={() => setSessionExpanded((s) => !s)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 -mx-3 hover:bg-ink-50 dark:hover:bg-ink-800/60 transition-colors"
            >
              <div className="text-left">
                <p className="text-sm font-medium text-ink-900 dark:text-white">Active sessions</p>
                <p className="text-xs text-ink-400">1 active session</p>
              </div>
              <ChevronRight
                className={classNames('h-4 w-4 text-ink-400 transition-transform', sessionExpanded && 'rotate-90')}
              />
            </button>
            {sessionExpanded && (
              <div className="mx-1 mb-2 rounded-xl bg-ink-50 dark:bg-ink-900/40 p-3 text-xs text-ink-500 dark:text-ink-400 space-y-1">
                <p className="font-medium text-ink-700 dark:text-ink-200">{parseUserAgent(navigator.userAgent)} — this device</p>
                {user?.last_sign_in_at && <p>Signed in {formatDateTime(user.last_sign_in_at)}</p>}
              </div>
            )}

            <div className="flex items-center justify-between rounded-xl px-3 py-2.5 -mx-3">
              <div>
                <p className="text-sm font-medium text-ink-900 dark:text-white">Log out from other devices</p>
                <p className="text-xs text-ink-400">Sign out from all other devices</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<LogOut className="h-3.5 w-3.5" />}
                onClick={handleLogOutOthers}
                isLoading={loggingOutOthers}
              >
                Log out all
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-xl px-3 py-2.5 -mx-3">
              <div>
                <p className="text-sm font-medium text-ink-900 dark:text-white">Two-factor authentication</p>
                <p className="text-xs text-ink-400">Add an extra layer of security</p>
              </div>
              {isMfaEnabled ? (
                <Button variant="outline" size="sm" onClick={handleDisableMfa} isLoading={disablingMfa}>
                  Disable
                </Button>
              ) : (
                <Button variant="outline" size="sm" leftIcon={<ShieldCheck className="h-3.5 w-3.5" />} onClick={() => setMfaModalOpen(true)}>
                  Enable
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Danger zone */}
      <Card className="border-danger-200 dark:border-danger-500/30">
        <h2 className="text-base font-semibold text-danger-600 mb-1">Danger Zone</h2>
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

      <TwoFactorAuthModal
        isOpen={mfaModalOpen}
        onClose={() => setMfaModalOpen(false)}
        onEnrolled={() => authService.listMfaFactors().then((f) => setMfaFactors(f.filter((x) => x.status === 'verified')))}
      />
    </div>
  )
}

function EmailPrefRow({ icon: Icon, title, subtitle, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-ink-200 dark:border-ink-800 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-100 dark:bg-ink-800">
          <Icon className="h-4 w-4 text-ink-500 dark:text-ink-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink-900 dark:text-white">{title}</p>
          <p className="text-xs text-ink-400">{subtitle}</p>
        </div>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  )
}