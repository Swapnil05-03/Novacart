import { useForm } from 'react-hook-form'
import { ArrowRight } from 'lucide-react'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import {
  INDIAN_STATES,
  validateFullName,
  validateIndianPhone,
  validateAddressLine1,
  validateCity,
  validateStateName,
  validatePincode,
} from '@/utils/checkoutValidation'

const STATE_OPTIONS = [{ value: '', label: 'Select state' }, ...INDIAN_STATES.map((s) => ({ value: s, label: s }))]

export default function AddressForm({ defaultValues, onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      ...defaultValues,
    },
  })

  const submit = (values) => {
    onSubmit({
      ...values,
      fullName: values.fullName.trim(),
      addressLine1: values.addressLine1.trim(),
      addressLine2: values.addressLine2?.trim() || '',
      city: values.city.trim(),
      state: values.state.trim(),
      postalCode: values.postalCode.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-7" noValidate>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-ink-900 dark:text-white">Contact information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Full name"
            required
            placeholder="Swapnil Dwivedi"
            autoComplete="name"
            {...register('fullName', { validate: validateFullName })}
            error={errors.fullName?.message}
          />
          <Input
            label="Phone number"
            required
            type="tel"
            inputMode="tel"
            placeholder="9876543210"
            autoComplete="tel"
            hint={!errors.phone && 'We\u2019ll only use this to coordinate delivery'}
            {...register('phone', { validate: validateIndianPhone })}
            error={errors.phone?.message}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-ink-900 dark:text-white">Delivery address</h3>

        <Input
          label="Address line 1"
          required
          placeholder="House no., Street, Area"
          autoComplete="address-line1"
          {...register('addressLine1', { validate: validateAddressLine1 })}
          error={errors.addressLine1?.message}
        />
        <Input
          label="Address line 2"
          placeholder="Landmark, apartment, suite (optional)"
          autoComplete="address-line2"
          {...register('addressLine2')}
        />

        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="City"
            required
            placeholder="Noida"
            autoComplete="address-level2"
            {...register('city', { validate: validateCity })}
            error={errors.city?.message}
          />
          <Select
            label="State"
            required
            options={STATE_OPTIONS}
            error={errors.state?.message}
            {...register('state', { validate: validateStateName })}
          />
          <Input
            label="PIN code"
            required
            inputMode="numeric"
            placeholder="201301"
            autoComplete="postal-code"
            maxLength={6}
            {...register('postalCode', { validate: validatePincode })}
            error={errors.postalCode?.message}
          />
        </div>

        <Input label="Country" required readOnly {...register('country')} className="cursor-not-allowed opacity-70" />
      </div>

      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
        rightIcon={<ArrowRight className="h-4 w-4" />}
      >
        Continue to payment
      </Button>
    </form>
  )
}