import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Navigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { orderService } from '@/services/orderService'
import { ROUTES } from '@/constants'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import OrderSummary from '@/components/cart/OrderSummary'

export default function CheckoutPage() {
  const { items, subtotal, discount, shippingFee, tax, total, coupon, itemCount } = useCart()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

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
      country: 'United States',
    },
  })

  if (itemCount === 0) {
    return <Navigate to={ROUTES.CART} replace />
  }

  const onSubmit = async (values) => {
    setSubmitting(true)
    try {
      const order = await orderService.createOrder({
        userId: user.id,
        items,
        shippingAddress: values,
        subtotal,
        discount,
        shipping: shippingFee,
        tax,
        total,
        couponCode: coupon?.code,
      })
      toast.success('Order placed successfully!')
      navigate(ROUTES.ORDER_CONFIRMATION(order.id))
    } catch (err) {
      toast.error('Could not place order. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container-page py-8">
      <h1 className="font-display text-2xl font-bold tracking-tight text-ink-900 dark:text-white mb-6">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-ink-200 dark:border-ink-800 p-6 space-y-5">
          <h2 className="text-base font-semibold text-ink-900 dark:text-white">Shipping address</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Full name"
              required
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
              label="State / Province"
              required
              {...register('state', { required: 'State is required' })}
              error={errors.state?.message}
            />
            <Input
              label="Postal code"
              required
              {...register('postalCode', { required: 'Postal code is required' })}
              error={errors.postalCode?.message}
            />
          </div>

          <Input
            label="Country"
            required
            {...register('country', { required: 'Country is required' })}
            error={errors.country?.message}
          />

          <div className="rounded-xl bg-ink-50 dark:bg-ink-900 p-4 text-sm text-ink-500 dark:text-ink-400">
            This is a demo checkout — no payment gateway is connected. Placing this order will create a real
            order record with status &ldquo;Pending.&rdquo;
          </div>

          <Button type="submit" variant="brand" size="lg" className="w-full" isLoading={submitting}>
            Place order — {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Button>
        </form>

        <OrderSummary showCoupon={false} />
      </div>
    </div>
  )
}
