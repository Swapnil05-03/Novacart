-- ============================================================================
-- NovaCart — Add real subcategory + gender columns to products
-- Run this in the Supabase SQL Editor AFTER 10_add_payment_fields.sql
--
-- Why: the /products page subcategory pills (SubcategoryRow) and the
-- brand filter both need to be driven by real columns on `products`,
-- the same way category_id already works. Previously subcategory
-- clicks fell back to an `ilike('name', ...)` text search, which is
-- fragile and doesn't scale. This migration adds the real column so
-- subcategory filtering works exactly like category/brand filtering.
--
-- `gender` is nullable — null/omitted means "unisex / not applicable"
-- (used for most categories). Only set to 'men' / 'women' for products
-- that are genuinely gendered (see backfill script for current state —
-- most Apparel/Accessories products today are unisex and will stay null
-- until real gendered SKUs are added).
-- ============================================================================

alter table public.products
  add column if not exists subcategory text,
  add column if not exists gender text check (gender is null or gender in ('men', 'women'));

create index if not exists products_subcategory_idx on public.products (subcategory);
create index if not exists products_gender_idx on public.products (gender);