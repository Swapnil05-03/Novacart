-- ============================================================================
-- NovaCart — Order management: cancellation, returns, tracking, hide-from-history
-- Run this in the Supabase SQL Editor. Safe to re-run (uses IF NOT EXISTS).
--
-- Adds the fields the "My Orders" page needs for cancel / return / track /
-- remove-from-history, and grants customers permission to update their own
-- orders (previously only admins could — needed for cancellation, return
-- requests, hiding orders from history, and the checkout payment-status
-- write that already happens in paymentService.recordPaymentResult).
-- ============================================================================

-- Extend the allowed status values to cover the return flow.
alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'return_requested', 'returned'));

alter table public.orders
  add column if not exists hidden_from_history boolean not null default false,
  add column if not exists cancelled_at timestamptz,
  add column if not exists return_requested_at timestamptz,
  add column if not exists return_reason text,
  add column if not exists return_comment text,
  add column if not exists refund_method text,
  add column if not exists confirmed_at timestamptz,
  add column if not exists packed_at timestamptz,
  add column if not exists shipped_at timestamptz,
  add column if not exists out_for_delivery_at timestamptz,
  add column if not exists delivered_at timestamptz,
  add column if not exists expected_delivery_date date,
  add column if not exists tracking_id text,
  add column if not exists delivery_partner text;

create index if not exists orders_hidden_from_history_idx on public.orders (hidden_from_history);

-- Customers can update their own orders (cancel, request a return, hide a
-- cancelled/returned order from their history, or record a payment result
-- during checkout). Admins keep their existing separate update policy for
-- fulfillment status changes made from the admin dashboard.
drop policy if exists "Users can update their own orders" on public.orders;
create policy "Users can update their own orders"
  on public.orders for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);