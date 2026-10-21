import { useRef, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { orderService } from '@/services/orderService'
import { paymentService } from '@/services/paymentService'
import { ROUTES } from '@/constants'
import { formatCurrency } from '@/utils/helpers'
import Button from '@/components/ui/Button'
import OrderSummary from '@/components/cart/OrderSummary'
import AddressForm from '@/components/checkout/AddressForm'
import CheckoutStepIndicator from '@/components/checkout/CheckoutStepIndicator'
import PaymentMethodSelector from '@/components/checkout/PaymentMethodSelector'
import UpiPaymentForm from '@/components/checkout/UpiPaymentForm'
import CardPaymentForm from '@/components/checkout/CardPaymentForm'
import PaymentProcessingScreen from '@/components/checkout/PaymentProcessingScreen'
import PaymentFailureScreen from '@/components/checkout/PaymentFailureScreen'

const STEPS = {
  ADDRESS: 'address',
  PAYMENT_METHOD: 'payment_method',
  PROCESSING: 'processing',
  FAILED: 'failed',
}

// Maps each internal step to a position on the 3-step visual indicator
// (Delivery / Payment / Confirmation). PROCESSING points at "Confirmation"
// since that's what we're actively working towards; FAILED points back at
// "Payment" since the order hasn't been confirmed yet.
const STEP_INDICATOR_INDEX = {
  [STEPS.ADDRESS]: 0,
  [STEPS.PAYMENT_METHOD]: 1,
  [STEPS.PROCESSING]: 2,
  [STEPS.FAILED]: 1,
}

// Methods with a dedicated, validated details form. Other methods
// (net banking, wallet) fall back to the plain "select and pay" flow that
// existed before, so we don't invent UI for flows out of scope here.
const METHODS_WITH_DETAILS_FORM = ['upi', 'card']

export default function CheckoutPage() {
  const { items, subtotal, discount, shippingFee, tax, total, coupon, itemCount, clearCart } = useCart()
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(STEPS.ADDRESS)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [paymentError, setPaymentError] = useState(null)
  const [order, setOrder] = useState(null)
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false)

  const upiFormRef = useRef(null)
  const cardFormRef = useRef(null)

  const paymentMethods = paymentService.getPaymentMethods()

  if (itemCount === 0 && step !== STEPS.PROCESSING) {
    return <Navigate to={ROUTES.CART} replace />
  }

  const handleAddressSubmit = (values) => {
    setShippingAddress(values)
    setStep(STEPS.PAYMENT_METHOD)
  }

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId)
  }

  const handlePayNow = async () => {
    if (isSubmittingPayment) return // guards double-click / double submission

    if (!selectedMethod) {
      toast.error('Please select a payment method')
      return
    }

    // Validate the method-specific details form (if this method has one)
    // before doing anything else. Errors render inline in that form.
    if (selectedMethod === 'upi') {
      const values = await upiFormRef.current?.validate()
      if (!values) return
    } else if (selectedMethod === 'card') {
      const values = await cardFormRef.current?.validate()
      if (!values) return
    }

    setIsSubmittingPayment(true)
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
        // Cart is only cleared here, on confirmed success — a failed
        // payment leaves the cart and order untouched so the customer can
        // retry without losing anything.
        await clearCart()
        toast.success('Payment successful!')
        navigate(ROUTES.ORDER_CONFIRMATION(activeOrder.id))
      } else {
        setPaymentError(result.errorMessage || 'Your payment could not be completed. Please try again.')
        setStep(STEPS.FAILED)
      }
    } catch (err) {
      console.error(err)
      setPaymentError('Something went wrong while processing your order. Please try again.')
      setStep(STEPS.FAILED)
    } finally {
      setIsSubmittingPayment(false)
    }
  }

  const handleRetryPayment = () => {
    setPaymentError(null)
    setStep(STEPS.PAYMENT_METHOD)
  }

  const handleChangeMethod = () => {
    setPaymentError(null)
    setSelectedMethod(null)
    setStep(STEPS.PAYMENT_METHOD)
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">Checkout</h1>

      <CheckoutStepIndicator currentIndex={STEP_INDICATOR_INDEX[step]} />

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <div className="rounded-2xl border border-ink-200 dark:border-ink-800 p-6">
          {step === STEPS.ADDRESS && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-ink-900 dark:text-white">Shipping address</h2>
              <AddressForm
                defaultValues={{ fullName: profile?.full_name || '', ...(shippingAddress || {}) }}
                onSubmit={handleAddressSubmit}
              />
            </div>
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

              <PaymentMethodSelector methods={paymentMethods} selected={selectedMethod} onSelect={handleSelectMethod} />

              {selectedMethod === 'upi' && <UpiPaymentForm ref={upiFormRef} />}

              {selectedMethod === 'card' && <CardPaymentForm ref={cardFormRef} />}

              {selectedMethod === 'cod' && (
                <div className="flex items-start gap-3 rounded-xl bg-ink-50 dark:bg-ink-900 p-4 text-sm text-ink-600 dark:text-ink-300">
                  <Truck className="h-5 w-5 shrink-0 text-ink-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-ink-900 dark:text-white">Pay with cash on delivery</p>
                    <p className="mt-0.5 text-ink-500 dark:text-ink-400">
                      Keep {formatCurrency(total)} ready. You can pay the delivery agent in cash or via UPI at your
                      doorstep when the order arrives.
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod && !METHODS_WITH_DETAILS_FORM.includes(selectedMethod) && selectedMethod !== 'cod' && (
                <div className="rounded-xl bg-ink-50 dark:bg-ink-900 p-4 text-sm text-ink-500 dark:text-ink-400">
                  This is a demo checkout — no real payment provider is connected yet. Your selected method is
                  simulated so you can see the full purchase flow end to end.
                </div>
              )}

              <Button
                variant="brand"
                size="lg"
                className="w-full"
                onClick={handlePayNow}
                isLoading={isSubmittingPayment}
                disabled={!selectedMethod}
                leftIcon={<ShieldCheck className="h-4 w-4" />}
              >
                Pay {formatCurrency(total)}
              </Button>
            </div>
          )}

          {step === STEPS.PROCESSING && (
            <PaymentProcessingScreen methodLabel={paymentMethods.find((m) => m.id === selectedMethod)?.label} />
          )}

          {step === STEPS.FAILED && (
            <PaymentFailureScreen
              errorMessage={paymentError}
              onRetry={handleRetryPayment}
              onChangeMethod={handleChangeMethod}
            />
          )}
        </div>

        <OrderSummary showCoupon={false} showItems />
      </div>
    </div>
  )
}