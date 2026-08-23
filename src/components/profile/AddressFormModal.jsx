import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function AddressFormModal({ isOpen, onClose, onSave, initialValue }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValue })

  useEffect(() => {
    if (isOpen) reset(initialValue)
  }, [isOpen, initialValue, reset])

  const submit = (values) => {
    onSave(values)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialValue?.id ? 'Edit address' : 'Add new address'}
      size="lg"
      footer={
        <>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="address-form" variant="brand">
            Save address
          </Button>
        </>
      }
    >
      <form id="address-form" onSubmit={handleSubmit(submit)} className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Label"
          placeholder="Home, Work..."
          required
          className="sm:col-span-2"
          {...register('label', { required: 'Label is required' })}
          error={errors.label?.message}
        />
        <Input
          label="Address line"
          required
          className="sm:col-span-2"
          {...register('line1', { required: 'Address is required' })}
          error={errors.line1?.message}
        />
        <Input label="City" required {...register('city', { required: 'City is required' })} error={errors.city?.message} />
        <Input label="State" required {...register('state', { required: 'State is required' })} error={errors.state?.message} />
        <Input
          label="Postal code"
          required
          {...register('postalCode', { required: 'Postal code is required' })}
          error={errors.postalCode?.message}
        />
        <Input label="Country" required {...register('country', { required: 'Country is required' })} error={errors.country?.message} />
        <Input
          label="Phone number"
          className="sm:col-span-2"
          {...register('phone')}
          placeholder="+91 98765 43210"
        />
      </form>
    </Modal>
  )
}