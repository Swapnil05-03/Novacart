import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import Input from '@/components/ui/Input'
import {
  validateCardNumber,
  validateCardName,
  validateExpiry,
  validateCVV,
  formatCardNumberInput,
  formatExpiryInput,
  detectCardBrand,
} from '@/utils/checkoutValidation'

/**
 * Exposes `validate()` via ref, same contract as UpiPaymentForm. Card
 * number/CVV never leave this component's local form state — the parent
 * checkout flow only ever learns whether the details are valid, never the
 * raw values, since nothing here is persisted to Supabase or sent
 * anywhere (this is a demo payment flow, see paymentService.js).
 */
const CardPaymentForm = forwardRef(function CardPaymentForm(_props, ref) {
  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { cardNumber: '', cardName: '', expiry: '', cvv: '' },
  })

  const cardNumber = watch('cardNumber')
  const brand = detectCardBrand(cardNumber)
  const cvvLength = brand === 'amex' ? 4 : 3

  useImperativeHandle(ref, () => ({
    async validate() {
      const isValid = await trigger()
      return isValid ? getValues() : null
    },
  }))

  const cardNumberField = register('cardNumber', { validate: validateCardNumber })
  const expiryField = register('expiry', { validate: validateExpiry })

  return (
    <form className="space-y-4" noValidate>
      <Input
        label="Card number"
        required
        inputMode="numeric"
        placeholder="4242 4242 4242 4242"
        autoComplete="cc-number"
        maxLength={23}
        {...cardNumberField}
        onChange={(e) => {
          e.target.value = formatCardNumberInput(e.target.value)
          cardNumberField.onChange(e)
        }}
        error={errors.cardNumber?.message}
      />
      <Input
        label="Name on card"
        required
        placeholder="Swapnil Dwivedi"
        autoComplete="cc-name"
        {...register('cardName', { validate: validateCardName })}
        error={errors.cardName?.message}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry date"
          required
          placeholder="MM/YY"
          inputMode="numeric"
          autoComplete="cc-exp"
          maxLength={5}
          {...expiryField}
          onChange={(e) => {
            e.target.value = formatExpiryInput(e.target.value)
            expiryField.onChange(e)
          }}
          error={errors.expiry?.message}
        />
        <Input
          label="CVV"
          required
          type="password"
          inputMode="numeric"
          placeholder={cvvLength === 4 ? '1234' : '123'}
          autoComplete="cc-csc"
          maxLength={cvvLength}
          {...register('cvv', { validate: (v) => validateCVV(v, cardNumber) })}
          error={errors.cvv?.message}
        />
      </div>
      <p className="text-xs text-ink-400">
        This is a demo payment form — card details are validated locally and are never stored or sent anywhere.
      </p>
    </form>
  )
})

export default CardPaymentForm