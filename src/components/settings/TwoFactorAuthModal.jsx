import { useState } from 'react'
import toast from 'react-hot-toast'
import { ShieldCheck } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { authService } from '@/services/authService'

export default function TwoFactorAuthModal({ isOpen, onClose, onEnrolled }) {
  const [factor, setFactor] = useState(null) // { id, totp: { qr_code, secret } }
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [starting, setStarting] = useState(false)

  const start = async () => {
    setStarting(true)
    try {
      const data = await authService.enrollMfa()
      setFactor(data)
    } catch (err) {
      toast.error(err.message || 'Could not start two-factor setup')
    } finally {
      setStarting(false)
    }
  }

  const verify = async () => {
    if (!factor || code.trim().length !== 6) {
      toast.error('Enter the 6-digit code from your authenticator app')
      return
    }
    setLoading(true)
    try {
      await authService.verifyMfaEnrollment(factor.id, code.trim())
      toast.success('Two-factor authentication enabled')
      onEnrolled?.()
      handleClose()
    } catch (err) {
      toast.error(err.message || 'Invalid code — please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setFactor(null)
    setCode('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Two-factor authentication"
      size="sm"
      footer={
        factor ? (
          <>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="brand" onClick={verify} isLoading={loading}>
              Verify & enable
            </Button>
          </>
        ) : (
          <Button variant="brand" onClick={start} isLoading={starting}>
            Start setup
          </Button>
        )
      }
    >
      {!factor ? (
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success-50 dark:bg-success-500/10">
            <ShieldCheck className="h-5 w-5 text-success-600 dark:text-success-500" />
          </div>
          <p className="text-sm text-ink-600 dark:text-ink-300 pt-1.5">
            Add an extra layer of security to your account with an authenticator app like Google Authenticator or Authy.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-ink-600 dark:text-ink-300">
            Scan this QR code with your authenticator app, then enter the 6-digit code it generates.
          </p>
          <div className="flex justify-center rounded-xl border border-ink-200 dark:border-ink-800 bg-white p-4">
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(factor.totp.qr_code)}`}
              alt="Two-factor authentication QR code"
              className="h-40 w-40"
            />
          </div>
          <p className="text-xs text-ink-400 text-center break-all">
            Can&apos;t scan? Enter this key manually: <span className="font-mono">{factor.totp.secret}</span>
          </p>
          <Input
            label="6-digit code"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          />
        </div>
      )}
    </Modal>
  )
}