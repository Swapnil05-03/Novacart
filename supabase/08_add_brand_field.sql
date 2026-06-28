-- ============================================================================
-- NovaCart — Add brand field to products
-- Run this in the Supabase SQL Editor. Safe to re-run (uses IF NOT EXISTS /
-- ON CONFLICT-style guards where applicable).
-- ============================================================================

-- Add the column if it doesn't already exist
alter table public.products
  add column if not exists brand text;

create index if not exists products_brand_idx on public.products (brand);

-- ============================================================================
-- Backfill brand names for the 20 originally-seeded products, keyed by SKU.
-- These are fictional placeholder brand names (consistent with the rest of
-- this project's placeholder content), not references to real companies.
-- ============================================================================
update public.products as p
set brand = v.brand
from (values
  ('NC-EL-001', 'Lumio'),
  ('NC-EL-002', 'Northwind'),
  ('NC-EL-003', 'Aurelle'),
  ('NC-EL-004', 'Cascade Co.'),
  ('NC-AP-001', 'Verde & Co'),
  ('NC-AP-002', 'Halcyon'),
  ('NC-AP-003', 'Driftwood'),
  ('NC-AP-004', 'Solace'),
  ('NC-HM-001', 'Meridian'),
  ('NC-HM-002', 'Birchline'),
  ('NC-HM-003', 'Amberlight'),
  ('NC-AC-001', 'Stonewell'),
  ('NC-AC-002', 'Fernway'),
  ('NC-AC-003', 'Cobalt & Co'),
  ('NC-FT-001', 'Wildgrove'),
  ('NC-FT-002', 'Tidemark'),
  ('NC-FT-003', 'Lumio'),
  ('NC-OF-001', 'Northwind'),
  ('NC-OF-002', 'Aurelle'),
  ('NC-OF-003', 'Cascade Co.')
) as v(sku, brand)
where p.sku = v.sku;

-- Any product without a matched SKU above (e.g. ones you've added yourself
-- via the admin panel) falls back to a generic brand label so the filter
-- never shows a blank entry.
update public.products
set brand = 'NovaCart Essentials'
where brand is null;