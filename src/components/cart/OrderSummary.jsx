import { useState } from 'react'
import { Tag, X } from 'lucide-react'
import { formatCurrency } from '@/utils/helpers'
import { useCart } from '@/context/CartContext'
import Button from '@/components/ui/Button'

export default function OrderSummary({ ctaLabel, onCtaClick, ctaLoading, showCoupon = true }) {
  const { subtotal, discount, shippingFee, tax, total, coupon, applyCoupon, removeCoupon, itemCount } = useCart()
  const [couponInput, setCouponInput] = useState('')

  const handleApply = (e) => {
    e.preventDefault()
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim())
      setCouponInput('')
    }
  }

  return (
    <div className="rounded-2xl border border-ink-200 dark:border-ink-800 p-6 bg-elevated dark:bg-elevated-dark sticky top-24">
      <h3 className="text-base font-semibold text-ink-900 dark:text-white mb-5">Order Summary</h3>

      {showCoupon && (
        <div className="mb-5">
          {coupon ? (
            <div className="flex items-center justify-between rounded-xl bg-brand-50 dark:bg-brand-900/20 px-3.5 py-2.5">
              <div className="flex items-center gap-2 text-sm font-medium text-brand-700 dark:text-brand-300">
                <Tag className="h-4 w-4" />
                {coupon.code} applied ({coupon.percent}% off)
              </div>
              <button onClick={removeCoupon} aria-label="Remove coupon">
                <X className="h-4 w-4 text-brand-700 dark:text-brand-300" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon code"
                className="h-10 flex-1 rounded-lg border border-ink-200 dark:border-ink-700 bg-white dark:bg-ink-900 px-3 text-sm focus:border-brand-500"
              />
              <Button type="submit" variant="outline" size="sm">
                Apply
              </Button>
            </form>
          )}
          <p className="mt-2 text-xs text-ink-400">Try NOVA10 or WELCOME20</p>
        </div>
      )}

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-500 dark:text-ink-400">Subtotal ({itemCount} items)</dt>
          <dd className="price-mono font-medium text-ink-900 dark:text-white">{formatCurrency(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <dt className="text-ink-500 dark:text-ink-400">Discount</dt>
            <dd className="price-mono font-medium text-success-600">-{formatCurrency(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-ink-500 dark:text-ink-400">Shipping</dt>
          <dd className="price-mono font-medium text-ink-900 dark:text-white">
            {shippingFee === 0 ? 'Free' : formatCurrency(shippingFee)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-500 dark:text-ink-400">Tax</dt>
          <dd className="price-mono font-medium text-ink-900 dark:text-white">{formatCurrency(tax)}</dd>
        </div>
      </dl>

      <div className="my-5 border-t border-ink-200 dark:border-ink-800" />

      <div className="flex justify-between mb-6">
        <span className="text-base font-semibold text-ink-900 dark:text-white">Total</span>
        <span className="price-mono text-lg font-bold text-ink-900 dark:text-white">{formatCurrency(total)}</span>
      </div>

      {ctaLabel && (
        <Button variant="brand" size="lg" className="w-full" onClick={onCtaClick} isLoading={ctaLoading} disabled={itemCount === 0}>
          {ctaLabel}
        </Button>
      )}

      {subtotal > 0 && subtotal < 100 && (
        <p className="mt-3 text-xs text-center text-ink-400">
          Add {formatCurrency(100 - subtotal)} more for free shipping
        </p>
      )}
    </div>
  )
}
