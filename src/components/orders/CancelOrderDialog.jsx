import { AlertTriangle } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

export default function CancelOrderDialog({ isOpen, onClose, onConfirm, loading }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel this order?"
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Keep Order
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={loading}>
            Cancel Order
          </Button>
        </>
      }
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-danger-50 dark:bg-danger-500/10">
          <AlertTriangle className="h-5 w-5 text-danger-500" />
        </div>
        <p className="text-sm text-ink-600 dark:text-ink-300 pt-1.5">
          Are you sure you want to cancel this order? This action cannot be undone.
        </p>
      </div>
    </Modal>
  )
}