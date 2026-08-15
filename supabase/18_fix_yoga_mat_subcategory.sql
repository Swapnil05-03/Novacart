-- ============================================================================
-- NovaCart — Fix product card/detail image mismatch for the Yoga Mat
-- Run this any time after 12_backfill_subcategory.sql.
--
-- BUG: 12_backfill_subcategory.sql previously set subcategory =
-- 'Skating Gear' for NC-SP-001 ('Non-Slip Yoga Mat, 6mm') as a "closest
-- fit" placeholder, since Sports & Outdoors has no dedicated Yoga Mats
-- tile. 'Skating Gear' IS a real tile with its own curated photo
-- (src/data/categoryContent.js), and the storefront prioritizes that
-- curated subcategory image over the product's own image (see
-- ProductCard.jsx / ProductDetailPage.jsx). The result: the yoga mat's
-- product card and detail page showed a skating-gear photo instead of a
-- yoga mat photo — a real product/image mismatch, not a harmless
-- fallback.
--
-- FIX: clear the incorrect subcategory so this product falls through to
-- its own correct, curated per-SKU image (already defined in
-- src/data/productImages.js under NC-SP-001). Safe to re-run.
-- ============================================================================

update public.products
set subcategory = null
where sku = 'NC-SP-001';