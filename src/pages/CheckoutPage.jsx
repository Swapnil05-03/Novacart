import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { orderService } from '@/services/orderService'
import { paymentService } from '@/services/paymentService'
import { ROUTES } from '@/constants'
import { formatCurrency } from '@/utils/helpers'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import OrderSummary from '@/components/cart/OrderSummary'
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector'
import PaymentProcessingScreen from '@/components/checkout/PaymentProcessingScreen'
import PaymentFailureScreen from '@/components/checkout/PaymentFailureScreen'

const STEPS = {
  ADDRESS: 'address',
  PAYMENT_METHOD: 'payment_method',
  PROCESSING: 'processing',
  FAILED: 'failed',
}

const STEP_ORDER = [STEPS.ADDRESS, STEPS.PAYMENT_METHOD]

export default function CheckoutPage() {
  const { items, subtotal, discount, shippingFee, tax, total, coupon, itemCount, clearCart } = useCart()
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(STEPS.ADDRESS)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [paymentError, setPaymentError] = useState(null)
  const [order, setOrder] = useState(null)

  const paymentMethods = paymentService.getPaymentMethods()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: profile?.full_name || '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
    },
  })

  if (itemCount === 0 && step !== STEPS.PROCESSING) {
    return <Navigate to={ROUTES.CART} replace />
  }

  const handleAddressSubmit = (values) => {
    setShippingAddress(values)
    setStep(STEPS.PAYMENT_METHOD)
  }

  const handlePayNow = async () => {
    if (!selectedMethod) {
      toast.error('Please select a payment method')
      return
    }

    setPaymentError(null)
    setStep(STEPS.PROCESSING)

    try {
      // Order is created up front with payment_status defaulting to
      // 'pending' — this gives us a real order id to attach the payment
      // result to, win or lose, and matches how real gateways work (you
      // create an order/intent, THEN attempt the charge against it).
      let activeOrder = order
      if (!activeOrder) {
        activeOrder = await orderService.createOrder({
          userId: user.id,
          items,
          shippingAddress,
          subtotal,
          discount,
          shipping: shippingFee,
          tax,
          total,
          couponCode: coupon?.code,
        })
        setOrder(activeOrder)
      }

      const result = await paymentService.initiatePayment({ amount: total, method: selectedMethod })
      await paymentService.recordPaymentResult({
        orderId: activeOrder.id,
        method: selectedMethod,
        status: result.status,
        reference: result.reference,
      })

      if (result.status === 'paid') {
        await clearCart()
        toast.success('Payment successful!')
        navigate(ROUTES.ORDER_CONFIRMATION(activeOrder.id))
      } else {
        setPaymentError(result.errorMessage || 'Payment could not be completed.')
        setStep(STEPS.FAILED)
      }
    } catch (err) {
      console.error(err)
      setPaymentError('Something went wrong while processing your order. Please try again.')
      setStep(STEPS.FAILED)
    }
  }

  const handleRetryPayment = () => {
    setPaymentError(null)
    setStep(STEPS.PAYMENT_METHOD)
    handlePayNow()
  }

  const handleChangeMethod = () => {
    setPaymentError(null)
    setSelectedMethod(null)
    setStep(STEPS.PAYMENT_METHOD)
  }

  const currentStepIndex = STEP_ORDER.indexOf(step)

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
        Checkout
      </h1>

      {/* Step indicator — only shown for the two interactive steps */}
      {(step === STEPS.ADDRESS || step === STEPS.PAYMENT_METHOD) && (
        <div className="flex items-center gap-3 mb-8 max-w-md">
          {['Address', 'Payment'].map((label, i) => (
            <div key={label} className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    i <= currentStepIndex
                      ? 'bg-brand-500 text-white'
                      : 'bg-ink-100 dark:bg-ink-800 text-ink-400'
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i <= currentStepIndex ? 'text-ink-900 dark:text-white' : 'text-ink-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i === 0 && <div className="h-px flex-1 bg-ink-200 dark:bg-ink-800" />}
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 p-6">
          {step === STEPS.ADDRESS && (
            <form onSubmit={handleSubmit(handleAddressSubmit)} className="space-y-5">
              <h2 className="text-base font-semibold text-ink-900 dark:text-white">Shipping address</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Full name"
                  required
                  defaultValue={shippingAddress?.fullName}
                  {...register('fullName', { required: 'Full name is required' })}
                  error={errors.fullName?.message}
                />
                <Input
                  label="Phone number"
                  required
                  {...register('phone', { required: 'Phone number is required' })}
                  error={errors.phone?.message}
                />
              </div>

              <Input
                label="Address line 1"
                required
                {...register('addressLine1', { required: 'Address is required' })}
                error={errors.addressLine1?.message}
              />
              <Input label="Address line 2" {...register('addressLine2')} hint="Apartment, suite, etc. (optional)" />

              <div className="grid sm:grid-cols-3 gap-4">
                <Input
                  label="City"
                  required
                  {...register('city', { required: 'City is required' })}
                  error={errors.city?.message}
                />
                <Input
                  label="State"
                  required
                  {...register('state', { required: 'State is required' })}
                  error={errors.state?.message}
                />
                <Input
                  label="PIN code"
                  required
                  {...register('postalCode', { required: 'PIN code is required' })}
                  error={errors.postalCode?.message}
                />
              </div>

              <Input
                label="Country"
                required
                {...register('country', { required: 'Country is required' })}
                error={errors.country?.message}
              />

              <Button type="submit" variant="brand" size="lg" className="w-full" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue to payment
              </Button>
            </form>
          )}

          {step === STEPS.PAYMENT_METHOD && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-ink-900 dark:text-white">Payment method</h2>
                <button
                  onClick={() => setStep(STEPS.ADDRESS)}
                  className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-800 dark:hover:text-ink-200"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Edit address
                </button>
              </div>

              <PaymentMethodSelector methods={paymentMethods} selected={selectedMethod} onSelect={setSelectedMethod} />

              <div className="rounded-xl bg-ink-50 dark:bg-ink-900 p-4 text-sm text-ink-500 dark:text-ink-400">
                This is a demo checkout — no real payment provider is connected yet. Your selected method is
                simulated so you can see the full purchase flow end to end.
              </div>

              <Button
                variant="brand"
                size="lg"
                className="w-full"
                onClick={handlePayNow}
                leftIcon={<ShieldCheck className="h-4 w-4" />}
              >
                Pay {formatCurrency(total)}
              </Button>
            </div>
          )}

          {step === STEPS.PROCESSING && (
            <PaymentProcessingScreen
              methodLabel={paymentMethods.find((m) => m.id === selectedMethod)?.label}
            />
          )}

          {step === STEPS.FAILED && (
            <PaymentFailureScreen
              errorMessage={paymentError}
              onRetry={handleRetryPayment}
              onChangeMethod={handleChangeMethod}
            />
          )}
        </div>

        <OrderSummary showCoupon={false} />
      </div>
    </div>
  )
}