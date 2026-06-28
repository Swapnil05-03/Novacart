/**
 * Payment service abstraction.
 *
 * The checkout flow calls ONLY the functions exported here — it never talks
 * to a payment provider's SDK directly. Today there is one provider,
 * 'dummy', which simulates a payment with a short delay and a configurable
 * outcome. When a real gateway (e.g. Razorpay) is ready to be wired in:
 *
 *   1. Add a `razorpay` case to PROVIDERS below, implementing the same
 *      three functions (initiatePayment, confirmPayment, getPaymentMethods).
 *   2. Set ACTIVE_PROVIDER to 'razorpay'.
 *   3. Nothing in CheckoutPage.jsx, PaymentMethodSelector.jsx, or any other
 *      UI component needs to change — they only depend on this file's
 *      exported function signatures, not on how any provider implements them.
 *
 * This mirrors how real checkout codebases stay swappable: the UI layer
 * depends on an interface, not a vendor SDK.
 */

import { supabase } from '@/lib/supabaseClient'

// Switch this to 'razorpay' (after implementing that provider below) to go live.
const ACTIVE_PROVIDER = 'dummy'

export const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', description: 'Visa, Mastercard, Rupay & more' },
  { id: 'upi', label: 'UPI', description: 'Pay using any UPI app' },
  { id: 'netbanking', label: 'Net Banking', description: 'All major banks supported' },
  { id: 'wallet', label: 'Wallet', description: 'Paytm, PhonePe, Amazon Pay & more' },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when your order arrives' },
]

function generatePaymentReference() {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `PAY-${timestamp}-${random}`
}

// ============================================================================
// DUMMY PROVIDER — simulates a real payment gateway's request/response shape
// without moving any real money. Always "succeeds" for Cash on Delivery
// (nothing to charge), and has a small randomized failure chance for other
// methods so the failure-screen UI path is exercisable during development.
// ============================================================================
const dummyProvider = {
  async initiatePayment({ amount: _amount, method }) {
    // Simulate provider network latency
    await new Promise((resolve) => setTimeout(resolve, 1800))

    if (method === 'cod') {
      return { status: 'paid', reference: generatePaymentReference() }
    }

    // ~12% simulated failure rate for non-COD methods, so the failure path
    // is reachable without forcing it — remove/adjust if you want every
    // dummy payment to succeed during a demo.
    const didFail = Math.random() < 0.12

    if (didFail) {
      return { status: 'failed', reference: null, errorMessage: 'Payment was declined. Please try again or use a different method.' }
    }

    return { status: 'paid', reference: generatePaymentReference() }
  },

  async confirmPayment() {
    // The dummy provider resolves synchronously in initiatePayment — nothing
    // further to confirm. A real provider would verify a webhook/signature here.
    return { status: 'paid' }
  },

  getPaymentMethods() {
    return PAYMENT_METHODS
  },
}

// ============================================================================
// RAZORPAY PROVIDER (placeholder) — implement this when ready to go live.
// Keep the exact same function shapes as dummyProvider above so swapping
// ACTIVE_PROVIDER is the only change needed anywhere in the app.
// ============================================================================
const razorpayProvider = {
  async initiatePayment() {
    throw new Error(
      'Razorpay provider is not implemented yet. Set ACTIVE_PROVIDER back to "dummy" in paymentService.js, or implement this function using the Razorpay Checkout SDK / Orders API.'
    )
  },
  async confirmPayment() {
    throw new Error('Razorpay provider is not implemented yet.')
  },
  getPaymentMethods() {
    return PAYMENT_METHODS
  },
}

const PROVIDERS = {
  dummy: dummyProvider,
  razorpay: razorpayProvider,
}

function getProvider() {
  return PROVIDERS[ACTIVE_PROVIDER]
}

export const paymentService = {
  /**
   * Returns the list of payment methods to display at checkout. Provider-
   * specific in principle (a future provider might support fewer/different
   * methods), so the UI should always read this rather than hardcoding
   * PAYMENT_METHODS directly.
   */
  getPaymentMethods() {
    return getProvider().getPaymentMethods()
  },

  /**
   * Kicks off a payment attempt. Returns { status, reference, errorMessage }.
   * status is one of: 'paid' | 'failed'.
   * On success, `reference` is the id to store as orders.payment_reference.
   */
  async initiatePayment({ amount, method }) {
    return getProvider().initiatePayment({ amount, method })
  },

  /**
   * Persists the payment outcome onto an existing order row. Called after
   * initiatePayment resolves, regardless of success or failure, so the
   * order's payment_status always reflects the real outcome.
   */
  async recordPaymentResult({ orderId, method, status, reference }) {
    const { data, error } = await supabase
      .from('orders')
      .update({
        payment_method: method,
        payment_status: status,
        payment_reference: reference,
        payment_provider: ACTIVE_PROVIDER,
      })
      .eq('id', orderId)
      .select()
      .single()
    if (error) throw error
    return data
  },
}