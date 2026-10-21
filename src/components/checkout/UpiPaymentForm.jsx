import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/components/ui/Input'
import { validateUpiId } from '@/utils/checkoutValidation'

/**
 * Exposes `validate()` via ref: resolves to the validated form values when
 * valid, or `null` when invalid (inline field errors are shown either way).
 * This lets the parent checkout flow trigger validation from its single
 * shared "Pay" button without lifting per-keystroke state up.
 */
const UpiPaymentForm = forwardRef(function UpiPaymentForm(_props, ref) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onBlur', defaultValues: { upiId: '' } })

  useImperativeHandle(ref, () => ({
    async validate() {
      const isValid = await trigger()
      return isValid ? getValues() : null
    },
  }))

  return (
    <form className="space-y-4" noValidate>
      <Input
        label="UPI ID"
        required
        placeholder="name@upi"
        autoComplete="off"
        hint="You'll be asked to approve the payment in your UPI app"
        {...register('upiId', { validate: validateUpiId })}
        error={errors.upiId?.message}
      />
    </form>
  )
})

export default UpiPaymentForm