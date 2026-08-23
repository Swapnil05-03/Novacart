import { useForm } from 'react-hook-form'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

const RETURN_REASONS = [
  { value: '', label: 'Select a reason' },
  { value: 'defective', label: 'Item arrived damaged or defective' },
  { value: 'wrong_item', label: 'Received the wrong item' },
  { value: 'not_as_described', label: 'Item not as described' },
  { value: 'no_longer_needed', label: 'No longer needed' },
  { value: 'better_price', label: 'Found a better price elsewhere' },
  { value: 'other', label: 'Other' },
]

const REFUND_METHODS = [
  { value: '', label: 'Select refund method' },
  { value: 'original_payment', label: 'Original payment method' },
  { value: 'store_credit', label: 'NovaCart store credit' },
  { value: 'bank_transfer', label: 'Bank transfer' },
]

export default function ReturnRefundModal({ isOpen, onClose, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { reason: '', comment: '', refundMethod: '' } })

  const submit = async (values) => {
    await onSubmit(values)
    reset()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Return / Refund"
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="brand" type="submit" form="return-refund-form" isLoading={loading}>
            Submit return request
          </Button>
        </>
      }
    >
      <form id="return-refund-form" onSubmit={handleSubmit(submit)} className="space-y-4">
        <Select
          label="Reason for return"
          options={RETURN_REASONS}
          {...register('reason', { required: 'Please select a reason' })}
        />
        {errors.reason && <p className="text-sm text-danger-500 -mt-3">{errors.reason.message}</p>}

        <Textarea label="Additional comments (optional)" placeholder="Tell us more…" {...register('comment')} />

        <Select
          label="Refund method"
          options={REFUND_METHODS}
          {...register('refundMethod', { required: 'Please select a refund method' })}
        />
        {errors.refundMethod && <p className="text-sm text-danger-500 -mt-3">{errors.refundMethod.message}</p>}
      </form>
    </Modal>
  )
}