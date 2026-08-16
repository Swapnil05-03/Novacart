-- ============================================================================
-- NovaCart — Add missing deal-tile products
--
-- The curated "Today's Best Deals" rows (categoryContent.js dealsItems)
-- advertise several products that were never actually seeded into the
-- database. That's a missing-data problem, not a matching-logic bug:
-- findLinkedProduct correctly finds no real match for these labels and
-- falls back to the category search page instead of a product detail
-- page, since there is genuinely nothing to link to.
--
-- This adds the missing products so every deal tile opens a real detail
-- page with a matching image, same as the rest of the row.
-- ============================================================================

-- Food & Household: "Herbal Shampoo Combo" and "Premium Basmati Rice 5kg"
-- — 09_seed_remaining_categories.sql only seeded 6 Food & Household
-- products, none of them shampoo or rice.
with cat as (select id from public.categories where name = 'Food & Household')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, is_featured, is_trending, is_best_seller)
select id, 'Herbal Shampoo Combo, 3x200ml', 'NC-FH-007', 'Patanjali',
  'A trio of herbal, sulphate-free shampoos for everyday hair care.',
  449, 599, 80, 'Toiletries', false, false, false from cat
union all
select id, 'Premium Basmati Rice, 5kg', 'NC-FH-008', 'Fortune',
  'Long-grain, aged basmati rice with a rich aroma — perfect for everyday meals.',
  699, 849, 110, 'Kitchen Essentials', true, false, true from cat;

-- Mobiles: "Wireless Earbuds" deal — only "Earphones — NovaCart Pick"
-- (NC-MB-T007) existed, which doesn't share the word "earbud".
with cat as (select id from public.categories where name = 'Mobiles')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, is_featured, is_trending, is_best_seller)
select id, 'Wireless Earbuds with ANC', 'NC-MB-009', 'Solace',
  'True wireless earbuds with active noise cancellation and 30-hour battery life.',
  2499, 3499, 90, 'Earphones', false, true, false from cat;

-- Home & Living: "Pendant Ceiling Light" deal — only the generic
-- "Lighting — NovaCart Pick" (NC-HM-T004) existed, which doesn't share
-- the word "light" (it stems to "lighting", not "light").
with cat as (select id from public.categories where name = 'Home & Living')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, is_featured, is_trending, is_best_seller)
select id, 'Pendant Ceiling Light Fixture', 'NC-HM-004', 'Home Centre',
  'Modern hanging pendant light with a warm-white LED bulb included.',
  1299, 1699, 60, 'Lighting', false, false, false from cat;

-- Auto Accessories: "Alloy Wheel Cleaner Spray" deal — no alloy-wheel or
-- wheel-cleaner product existed (closest was "Tyre Inflator & Pressure
-- Gauge", which shares no words with this label).
with cat as (select id from public.categories where name = 'Auto Accessories')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, is_featured, is_trending, is_best_seller)
select id, 'Alloy Wheel Cleaner Spray, 500ml', 'NC-AA-007', 'Meguiars',
  'Acid-free formula that lifts brake dust and grime without damaging the wheel finish.',
  399, 549, 100, 'Tyre & Rim Care', false, false, false from cat;

-- Apparel: "Men's Slim-Fit Chinos" deal — no chinos product existed
-- anywhere in the catalog.
with cat as (select id from public.categories where name = 'Apparel')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, is_featured, is_trending, is_best_seller)
select id, 'Men''s Slim-Fit Chino Trousers', 'NC-APM-007', 'Levi''s',
  'Tailored slim-fit chinos in stretch twill, built for all-day comfort.',
  1599, 2199, 70, 'Trousers', false, false, false from cat;

insert into public.product_images (product_id, url, is_primary, sort_order)
select p.id, v.image_url, true, 0
from public.products p
join (values
  ('NC-FH-007', '/tile-images/food-household/tiles/toiletries.jpg'),
  ('NC-FH-008', '/tile-images/food-household/tiles/breakfast-cereals.jpg'),
  ('NC-MB-009', '/tile-images/mobiles/tiles/earphones.jpg'),
  ('NC-HM-004', '/tile-images/home-living/tiles/lighting.jpg'),
  ('NC-AA-007', '/tile-images/auto-accessories/tiles/tyre-rim-care.jpg'),
  ('NC-APM-007', '/tile-images/apparel/tiles/track-pants.webp')
) as v(sku, image_url) on v.sku = p.sku
where not exists (
  select 1 from public.product_images pi where pi.product_id = p.id
);