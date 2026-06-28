-- ============================================================================
-- NovaCart Seed Data (optional)
-- Run this AFTER 03_storage_setup.sql to populate categories and demo products.
-- Image URLs point to Unsplash so the storefront looks complete out of the box.
-- Swap them out for your own product photography uploaded via the admin panel.
-- ============================================================================

insert into public.categories (name, slug, description) values
  ('Electronics', 'electronics', 'Headphones, speakers, and everyday tech'),
  ('Apparel', 'apparel', 'Everyday essentials, considered'),
  ('Home & Living', 'home-living', 'Objects for a calmer home'),
  ('Accessories', 'accessories', 'Small details that matter'),
  ('Fitness', 'fitness', 'Gear for showing up consistently'),
  ('Office', 'office', 'Tools for focused work');

-- Electronics
with cat as (select id from public.categories where slug = 'electronics')
insert into public.products (category_id, name, sku, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Aura Wireless Headphones', 'NC-EL-001',
  'Active noise cancellation, 40-hour battery life, and a soft-touch matte finish. Built for long days and longer flights.',
  179.00, 229.00, 42, true, true, true from cat
union all
select id, 'Pulse Bluetooth Speaker', 'NC-EL-002',
  'Pocket-sized speaker with room-filling sound and 12 hours of playtime. Water-resistant for the beach, the shower, anywhere.',
  89.00, null, 65, false, true, false from cat
union all
select id, 'Halo Smart Desk Lamp', 'NC-EL-003',
  'Adjustable color temperature, touch dimming, and a built-in USB-C charging port. Designed to disappear into your desk.',
  64.00, 79.00, 30, true, false, false from cat
union all
select id, 'Drift Portable Charger 10K', 'NC-EL-004',
  'Slim 10,000mAh power bank with fast-charging USB-C output. Charges most phones twice over.',
  39.00, null, 120, false, false, true from cat;

-- Apparel
with cat as (select id from public.categories where slug = 'apparel')
insert into public.products (category_id, name, sku, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Everyday Crewneck', 'NC-AP-001',
  'Heavyweight cotton crewneck with a relaxed fit. Pre-washed for softness from the first wear.',
  58.00, null, 80, true, false, true from cat
union all
select id, 'Mono Tee — Stone', 'NC-AP-002',
  'A perfectly weighted t-shirt in a muted stone colorway. The one you reach for every single week.',
  32.00, 40.00, 150, false, true, true from cat
union all
select id, 'Trail Pullover Hoodie', 'NC-AP-003',
  'Brushed fleece interior, kangaroo pocket, and a fit that works for hiking or hanging out.',
  74.00, null, 55, false, false, false from cat
union all
select id, 'Wool Blend Overcoat', 'NC-AP-004',
  'A tailored overcoat built for transitional weather. Half-lined for breathability.',
  220.00, 280.00, 18, true, false, false from cat;

-- Home & Living
with cat as (select id from public.categories where slug = 'home-living')
insert into public.products (category_id, name, sku, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Ceramic Pour-Over Set', 'NC-HM-001',
  'Hand-finished ceramic dripper and matching mug. Brews a cleaner cup, looks good doing it.',
  48.00, null, 40, true, false, true from cat
union all
select id, 'Linen Throw Blanket', 'NC-HM-002',
  'Stonewashed linen blend that softens with every wash. Generously sized for the couch or the bed.',
  68.00, 85.00, 60, false, true, false from cat
union all
select id, 'Amber Glass Candle — Cedar', 'NC-HM-003',
  'Soy wax candle in a reusable amber glass vessel. 60-hour burn time, no synthetic fragrance.',
  29.00, null, 95, false, false, true from cat;

-- Accessories
with cat as (select id from public.categories where slug = 'accessories')
insert into public.products (category_id, name, sku, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Slim Leather Cardholder', 'NC-AC-001',
  'Full-grain leather cardholder that ages beautifully. Holds up to 8 cards plus folded cash.',
  45.00, null, 70, true, true, false from cat
union all
select id, 'Canvas Weekender Bag', 'NC-AC-002',
  'Waxed canvas duffel with leather trim, built to handle a weekend or a week.',
  98.00, 130.00, 25, false, false, true from cat
union all
select id, 'Stainless Steel Watch', 'NC-AC-003',
  'Minimalist dial, sapphire crystal glass, and a brushed steel bracelet. Water resistant to 50m.',
  165.00, null, 22, true, false, false from cat;

-- Fitness
with cat as (select id from public.categories where slug = 'fitness')
insert into public.products (category_id, name, sku, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Insulated Steel Water Bottle', 'NC-FT-001',
  'Keeps drinks cold for 24 hours or hot for 12. Leak-proof lid, fits most cup holders.',
  34.00, null, 140, false, true, true from cat
union all
select id, 'Foldable Yoga Mat', 'NC-FT-002',
  'Travel-friendly mat that folds flat without losing cushioning. Non-slip on both sides.',
  52.00, 65.00, 50, false, false, false from cat
union all
select id, 'Adjustable Resistance Bands Set', 'NC-FT-003',
  'Five resistance levels in one compact set, with a door anchor for full home workouts.',
  28.00, null, 88, false, false, true from cat;

-- Office
with cat as (select id from public.categories where slug = 'office')
insert into public.products (category_id, name, sku, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Walnut Desk Organizer', 'NC-OF-001',
  'Solid walnut tray with dedicated slots for pens, cards, and a phone stand.',
  56.00, null, 33, true, false, false from cat
union all
select id, 'Mechanical Keyboard — Low Profile', 'NC-OF-002',
  'Hot-swappable switches in a compact 75% layout. Quiet enough for open offices.',
  129.00, 159.00, 27, true, true, true from cat
union all
select id, 'Refillable Notebook, A5', 'NC-OF-003',
  'Dot-grid pages in a refillable leather cover. Built to last years, not months.',
  38.00, null, 75, false, false, false from cat;

-- ============================================================================
-- Sample images for every product (Unsplash placeholders — replace via Admin)
-- ============================================================================
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', name, true, 0
from public.products;

insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', name, false, 1
from public.products;
