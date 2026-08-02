-- ============================================================================
-- NovaCart — Add real Men's / Women's products to Apparel & Accessories
-- Run AFTER 11_add_subcategory_gender.sql and 12_backfill_subcategory.sql.
--
-- Why: the existing Apparel/Accessories seed products are all unisex
-- basics with no gender tag, so the Men/Women tabs in SubcategoryRow had
-- nothing real to show. This adds a small, real catalog on each side so
-- the split actually works end-to-end (getAvailableGenders will now
-- return ['men','women'] for both categories, and the tabs will appear).
--
-- Subcategory labels below are taken directly from the Men/Women
-- tileGroups already curated in categoryContent.js, so the pills you see
-- when a tab is active will match what was already designed for the UI.
-- Brands are taken from the same file's per-category brand lists, so
-- they're consistent with what's shown elsewhere (e.g. the brand filter).
-- ============================================================================

with cat_apparel as (
  select id from public.categories where slug = 'apparel'
),
cat_accessories as (
  select id from public.categories where slug = 'accessories'
)

-- Apparel — Men
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Classic Fit Oxford Formal Shirt', 'NC-APM-001', 'Van Heusen',
  'Crisp cotton oxford shirt, tailored for a clean everyday formal look.',
  1299, 1799, 40, 'Formal Shirts', 'men', true, false, false from cat_apparel
union all
select id, 'Slim Fit Stretch Denim Jeans', 'NC-APM-002', 'Levi''s',
  'Mid-rise slim jeans with a touch of stretch for all-day comfort.',
  2499, 3199, 35, 'Jeans', 'men', false, true, false from cat_apparel
union all
select id, 'Single-Breasted Wool Blend Blazer', 'NC-APM-003', 'Allen Solly',
  'Structured blazer for office and evening wear, half-lined for breathability.',
  4499, 5999, 15, 'Men''s Blazers', 'men', true, false, true from cat_apparel
union all
select id, 'Pullover Fleece Hoodie', 'NC-APM-004', 'Adidas',
  'Brushed fleece hoodie with kangaroo pocket and ribbed cuffs.',
  1899, 2399, 50, 'Hoodies', 'men', false, false, false from cat_apparel
union all
select id, 'Quilted Bomber Jacket', 'NC-APM-005', 'US Polo Assn',
  'Lightweight quilted bomber with ribbed collar, built for transitional weather.',
  3299, 4199, 22, 'Men''s Jackets', 'men', false, true, false from cat_apparel
union all
select id, 'Crew Neck Graphic T-Shirt', 'NC-APM-006', 'Roadster',
  'Soft cotton tee with a minimal chest print, everyday essential.',
  699, 999, 60, 'T-Shirts', 'men', false, false, false from cat_apparel

-- Apparel — Women
union all
select id, 'Wrap Front Midi Dress', 'NC-APW-001', 'Zara',
  'Flowy wrap-style midi dress with a flattering tie waist.',
  2199, 2899, 30, 'Dresses', 'women', true, true, false from cat_apparel
union all
select id, 'Ribbed Knit Sweater', 'NC-APW-002', 'H&M',
  'Soft ribbed pullover sweater, layers easily for cooler days.',
  1599, 1999, 45, 'Sweaters', 'women', false, false, false from cat_apparel
union all
select id, 'Embroidered Anarkali Kurti', 'NC-APW-003', 'Roadster',
  'Floor-length anarkali with thread embroidery, festive-ready.',
  2799, 3599, 20, 'Ethnic Wear', 'women', true, false, true from cat_apparel
union all
select id, 'High-Waist Ankle Leggings', 'NC-APW-004', 'Uniqlo',
  'Four-way stretch leggings with a supportive high waistband.',
  899, 1199, 55, 'Leggings', 'women', false, false, false from cat_apparel
union all
select id, 'Satin Cami Top', 'NC-APW-005', 'Gap',
  'Lightweight satin cami, easy to dress up or down.',
  999, 1399, 38, 'Tops', 'women', false, true, false from cat_apparel
union all
select id, 'Faux Leather Biker Jacket', 'NC-APW-006', 'Superdry',
  'Cropped faux-leather jacket with asymmetric zip and belt detail.',
  3499, 4499, 18, 'Jackets', 'women', false, false, false from cat_apparel

-- Accessories — Men
union all
select id, 'Chronograph Steel Watch', 'NC-ACM-001', 'Fossil',
  'Stainless steel chronograph with date display and leather strap option.',
  6999, 8999, 20, 'Men''s Watches', 'men', true, true, false from cat_accessories
union all
select id, 'Bifold Leather Wallet', 'NC-ACM-002', 'Woodland',
  'Genuine leather bifold wallet with RFID-blocking card slots.',
  899, 1199, 50, 'Men''s Wallets', 'men', false, false, true from cat_accessories
union all
select id, 'Reversible Formal Leather Belt', 'NC-ACM-003', 'Louis Philippe',
  'Reversible belt, black on one side and tan on the other.',
  799, 1099, 40, 'Men''s Belts', 'men', false, false, false from cat_accessories
union all
select id, 'Polarized Aviator Sunglasses', 'NC-ACM-004', 'Ray-Ban',
  'Classic aviator silhouette with polarized UV-protective lenses.',
  4999, 6499, 25, 'Men''s Sunglasses', 'men', true, false, false from cat_accessories
union all
select id, 'Canvas Messenger Bag', 'NC-ACM-005', 'Puma',
  'Durable canvas messenger bag with padded laptop sleeve.',
  1799, 2299, 30, 'Bags', 'men', false, true, false from cat_accessories
union all
select id, 'Slim RFID Card Holder', 'NC-ACM-006', 'Baggit',
  'Compact leather card holder that fits comfortably in a front pocket.',
  499, 699, 60, 'Card Holders', 'men', false, false, false from cat_accessories

-- Accessories — Women
union all
select id, 'Structured Tote Handbag', 'NC-ACW-001', 'Baggit',
  'Roomy structured tote with a detachable strap, everyday go-to.',
  2499, 3299, 28, 'Handbags', 'women', true, false, true from cat_accessories
union all
select id, 'Rose Gold Dial Watch', 'NC-ACW-002', 'Titan',
  'Slim rose gold-tone watch with a mesh strap and mineral glass.',
  3499, 4499, 22, 'Watches', 'women', false, true, false from cat_accessories
union all
select id, 'Cat-Eye Sunglasses', 'NC-ACW-003', 'Michael Kors',
  'Retro cat-eye frames with UV400 protective lenses.',
  5499, 6999, 18, 'Sunglasses', 'women', true, false, false from cat_accessories
union all
select id, 'Layered Chain Necklace Set', 'NC-ACW-004', 'Giva',
  'Set of three layered chain necklaces, mix-and-match minimal jewelry.',
  1299, 1699, 35, 'Necklaces', 'women', false, false, false from cat_accessories
union all
select id, 'Gold-Plated Drop Earrings', 'NC-ACW-005', 'Palmonas',
  'Lightweight gold-plated drop earrings for everyday or occasion wear.',
  899, 1199, 40, 'Earrings', 'women', false, true, false from cat_accessories
union all
select id, 'Printed Silk Scarf', 'NC-ACW-006', 'Guess',
  'Lightweight printed silk-blend scarf, doubles as a hair or bag accent.',
  1099, 1499, 30, 'Scarves', 'women', false, false, false from cat_accessories;

-- Images — same pattern as the rest of the seed data.
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://picsum.photos/seed/prod-' || sku || '/800/800', name, true, 0
from public.products
where sku like 'NC-APM-%' or sku like 'NC-APW-%' or sku like 'NC-ACM-%' or sku like 'NC-ACW-%';

insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://picsum.photos/seed/prod-alt-' || sku || '/800/800', name, false, 1
from public.products
where sku like 'NC-APM-%' or sku like 'NC-APW-%' or sku like 'NC-ACM-%' or sku like 'NC-ACW-%';


-- Subcategory labels match the existing Beauty tiles/product-naming
-- convention already used in this category (Skincare, Makeup, Haircare,
-- Fragrance). Brands are from the Beauty brand list in categoryContent.js.
-- ============================================================================

with cat_beauty as (
  select id from public.categories where slug = 'beauty'
)
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Matte Liquid Lipstick', 'NC-BTW-001', 'MAC',
  'Long-wearing matte liquid lipstick with a lightweight, non-drying finish.',
  1299, 1699, 45, 'Makeup', 'women', true, true, false from cat_beauty
union all
select id, 'Hyaluronic Acid Serum', 'NC-BTW-002', 'L''Oréal',
  'Hydrating serum that plumps skin and reduces the look of fine lines.',
  899, 1199, 50, 'Skincare', 'women', true, false, true from cat_beauty
union all
select id, 'Keratin Smoothing Hair Mask', 'NC-BTW-003', 'Nykaa',
  'Deep-conditioning mask that smooths frizz and restores shine.',
  799, 999, 40, 'Haircare', 'women', false, false, false from cat_beauty
union all
select id, 'Eau de Parfum — Floral Musk', 'NC-BTW-004', 'The Body Shop',
  'Long-lasting floral musk fragrance with notes of jasmine and amber.',
  2499, 3199, 25, 'Fragrance', 'women', false, true, false from cat_beauty
union all
select id, '12-Shade Eyeshadow Palette', 'NC-BTW-005', 'Maybelline',
  'Blendable matte and shimmer shades for everyday to evening looks.',
  1099, 1499, 35, 'Makeup', 'women', false, false, false from cat_beauty
union all
select id, 'Vitamin C Brightening Sunscreen', 'NC-BTW-006', 'Mamaearth',
  'SPF 50 sunscreen with vitamin C for daily sun protection and glow.',
  549, 699, 60, 'Sunscreen', 'women', true, false, false from cat_beauty;

insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://picsum.photos/seed/prod-' || sku || '/800/800', name, true, 0
from public.products where sku like 'NC-BTW-%';

insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://picsum.photos/seed/prod-alt-' || sku || '/800/800', name, false, 1
from public.products where sku like 'NC-BTW-%';