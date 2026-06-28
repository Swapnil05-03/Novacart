-- ============================================================================
-- NovaCart — Add payment fields to orders
-- Run this in the Supabase SQL Editor. Safe to re-run (uses IF NOT EXISTS).
--
-- These columns support today's dummy/simulated payment flow AND are
-- designed to map directly onto a real gateway (e.g. Razorpay) later
-- without further schema changes:
--   - payment_method:        which method the customer chose (card, upi, etc.)
--   - payment_status:        lifecycle of the PAYMENT itself, separate from
--                             order fulfillment status (orders.status)
--   - payment_reference:     a transaction/reference id — today this is a
--                             locally-generated dummy id; with Razorpay this
--                             becomes the real razorpay_payment_id
--   - payment_provider:      'dummy' today, 'razorpay' once integrated
-- ============================================================================

alter table public.orders
  add column if not exists payment_method text
    check (payment_method in ('card', 'upi', 'netbanking', 'cod', 'wallet')),
  add column if not exists payment_status text not null default 'pending'
    check (payment_status in ('pending', 'processing', 'paid', 'failed', 'refunded')),
  add column if not exists payment_reference text,
  add column if not exists payment_provider text not null default 'dummy';

create index if not exists orders_payment_status_idx on public.orders (payment_status);