-- ============================================================================
-- NovaCart — Fix product card/detail page image mismatches
-- Run this any time after 12_backfill_subcategory.sql.
--
-- Covers 3 categories where a product card / detail page was showing the
-- wrong photo because of an incorrect subcategory-to-tile mapping:
-- Sports & Outdoors (yoga mat), Two Wheelers (riding gear), and
-- Apparel & Accessories (unisex products wrongly gendered).
--
-- BUG 1 — Yoga Mat (Sports & Outdoors):
-- 12_backfill_subcategory.sql previously set subcategory = 'Skating Gear'
-- for NC-SP-001 ('Non-Slip Yoga Mat, 6mm') as a "closest fit" placeholder,
-- since Sports & Outdoors had no dedicated Yoga Mats tile. 'Skating Gear'
-- IS a real tile with its own curated photo (src/data/categoryContent.js),
-- and the storefront prioritizes that curated subcategory image over the
-- product's own image (see ProductCard.jsx / ProductDetailPage.jsx). The
-- result: the yoga mat's product card and detail page showed a
-- skating-gear photo instead of a yoga mat photo.
-- FIX: clear the incorrect subcategory so this product falls through to
-- its own correct, curated per-SKU image (already defined in
-- src/data/productImages.js under NC-SP-001).
--
-- BUG 2 — Two Wheelers riding gear:
-- The 6 real Two Wheelers products (NC-TW-001..006) are riding GEAR
-- (jacket, cover, gloves, headlight kit, saddle bag, lock), but every
-- sub-category tile defined for "Two Wheelers" was a bike TYPE (Sports
-- Bikes, Cruiser Bikes, ...). None of the gear products matched any tile,
-- so they had subcategory = null, AND the "Shop by Category" tiles under
-- Two Wheelers never linked to a real product (every tile was a dead-end
-- filter with zero matches).
-- FIX: categoryContent.js now defines 6 matching riding-gear tiles
-- (Riding Jackets, Bike Covers, Riding Gloves, Headlights & Lighting,
-- Saddle Bags, Locks & Alarms), each reusing that exact product's own
-- already-correct image — so whichever image-priority path ProductCard /
-- ProductDetailPage takes, the product's own correct photo shows. This
-- backfills the matching subcategory onto each product so the tiles
-- become real, clickable product cards.
--
-- BUG 3 — Apparel & Accessories (original 6 categories, 04_seed_data.sql):
-- 4 unisex Apparel products and 3 unisex Accessories products were tagged
-- with a subcategory that happens to be a real, GENDERED tile key:
--   NC-AP-001 'Everyday Crewneck'    -> 'T-Shirts' (a MEN'S t-shirt photo)
--   NC-AP-002 'Mono Tee — Stone'      -> 'T-Shirts' (a MEN'S t-shirt photo)
--   NC-AP-003 'Trail Pullover Hoodie' -> 'Hoodies'  (a MEN'S hoodie photo)
--   NC-AP-004 'Wool Blend Overcoat'   -> 'Jackets'  (a WOMEN'S jacket photo)
--   NC-AC-001 'Cardholder'            -> 'Wallets'  (no-op — no plain
--                                                     'Wallets' tile exists)
--   NC-AC-002 'Canvas Weekender Bag'  -> 'Bags'     (a MEN'S bag photo,
--                                                     a different bag)
--   NC-AC-003 'Stainless Steel Watch' -> 'Watches'  (a WOMEN'S watch photo)
-- These 7 products already had their own correct, product-specific image
-- in Supabase (from 07_fix_product_images.sql). Tagging them with a
-- gendered subcategory made the storefront override that correct photo
-- with an unrelated gendered stock photo.
-- FIX: clear these subcategories so each product falls through to its own
-- correct, curated Supabase image.
--
-- Safe to re-run.
-- ============================================================================

-- Yoga Mat
update public.products set subcategory = null where sku = 'NC-SP-001';

-- Two Wheelers riding gear
update public.products set subcategory = 'Riding Jackets'        where sku = 'NC-TW-001';
update public.products set subcategory = 'Bike Covers'           where sku = 'NC-TW-002';
update public.products set subcategory = 'Riding Gloves'         where sku = 'NC-TW-003';
update public.products set subcategory = 'Headlights & Lighting' where sku = 'NC-TW-004';
update public.products set subcategory = 'Saddle Bags'           where sku = 'NC-TW-005';
update public.products set subcategory = 'Locks & Alarms'        where sku = 'NC-TW-006';

-- Apparel & Accessories (unisex products, wrongly gendered tile images)
update public.products
set subcategory = null
where sku in ('NC-AP-001', 'NC-AP-002', 'NC-AP-003', 'NC-AP-004', 'NC-AC-001', 'NC-AC-002', 'NC-AC-003');