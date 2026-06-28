-- ============================================================================
-- NovaCart — Seed products for previously-empty categories
-- Run this AFTER 08_add_brand_field.sql in the Supabase SQL Editor.
--
-- Your original 6 categories (Electronics, Apparel, Home & Living,
-- Accessories, Fitness, Office) already have products from 04_seed_data.sql
-- and are untouched here. This file adds 6-8 real products to each of the
-- 10 categories added in 06_add_categories.sql, which previously had zero
-- products — that's why "Beauty", "Mobiles", etc. were showing "No products
-- found" on the storefront.
--
-- Product names are chosen to match the sub-category tiles shown on the
-- /products page (e.g. "Skincare", "Makeup") so clicking those tiles
-- actually surfaces relevant results. Prices are realistic INR amounts.
-- Images use Picsum (picsum.photos) — guaranteed to load, since this file
-- adds ~70 products and hand-picking that many unverifiable Unsplash IDs
-- isn't reliable (see prior fixes in this project for that exact problem).
-- ============================================================================

-- ============================================================================
-- MOBILES
-- ============================================================================
with cat as (select id from public.categories where name = 'Mobiles')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Nova X12 5G Smartphone', 'NC-MB-001', 'Lumio',
  '6.5-inch AMOLED display, triple camera setup, and a 5000mAh battery. Built for all-day performance.',
  17999, 21999, 45, true, true, true from cat
union all
select id, 'Galaxy-Style Flagship Phone', 'NC-MB-002', 'Northwind',
  '120Hz display, 108MP camera, and 12GB RAM. Flagship performance without the flagship price.',
  34999, 39999, 22, true, false, true from cat
union all
select id, 'OPPO-Style Slim 5G Phone', 'NC-MB-003', 'Aurelle',
  'Ultra-slim design with 65W fast charging. Full charge in under 35 minutes.',
  15499, 18999, 60, false, true, false from cat
union all
select id, 'POCO-Style Gaming Phone', 'NC-MB-004', 'Cascade Co.',
  'Liquid cooling system and a 144Hz display, built for mobile gaming.',
  13999, 16499, 38, false, false, true from cat
union all
select id, 'Redmi-Style Budget 5G Phone', 'NC-MB-005', 'Verde & Co',
  'Reliable everyday performance with a massive 6000mAh battery.',
  9999, 11999, 80, false, false, false from cat
union all
select id, 'Pixel-Style Camera Phone', 'NC-MB-006', 'Halcyon',
  'Computational photography that makes every shot look professional.',
  42999, 49999, 15, true, false, false from cat
union all
select id, 'Phone Case — Clear Armor', 'NC-MB-007', 'Driftwood',
  'Military-grade drop protection with a crystal-clear back panel.',
  499, 799, 200, false, false, false from cat
union all
select id, '65W Fast Charger + Cable', 'NC-MB-008', 'Solace',
  'GaN technology fast charger with a braided USB-C cable included.',
  1299, 1799, 150, false, true, false from cat;

-- ============================================================================
-- BEAUTY
-- ============================================================================
with cat as (select id from public.categories where name = 'Beauty')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Vitamin C Brightening Serum', 'NC-BT-001', 'Meridian',
  '10% Vitamin C serum that brightens skin tone and fades dark spots over time.',
  599, 799, 90, true, true, true from cat
union all
select id, 'Hydrating Gel Moisturizer', 'NC-BT-002', 'Birchline',
  'Lightweight, oil-free gel moisturizer for all-day hydration without the heaviness.',
  449, 599, 110, false, true, false from cat
union all
select id, 'Matte Liquid Lipstick Set', 'NC-BT-003', 'Amberlight',
  'Long-wearing matte finish in 3 everyday shades. Transfer-proof for up to 12 hours.',
  399, 549, 75, false, false, true from cat
union all
select id, 'Keratin Repair Shampoo', 'NC-BT-004', 'Stonewell',
  'Sulfate-free shampoo that repairs damaged hair and reduces frizz.',
  349, 449, 130, false, false, false from cat
union all
select id, 'Eau de Parfum — Signature Bloom', 'NC-BT-005', 'Fernway',
  'A floral-woody fragrance that lasts from morning meetings to evening plans.',
  1299, 1799, 40, true, false, false from cat
union all
select id, 'Men''s Grooming Trimmer Kit', 'NC-BT-006', 'Cobalt & Co',
  'Cordless trimmer with 4 attachments for beard, hair, and body grooming.',
  899, 1199, 65, false, true, false from cat
union all
select id, 'Daily Mineral Sunscreen SPF 50', 'NC-BT-007', 'Wildgrove',
  'Broad-spectrum protection with a lightweight, non-greasy finish.',
  549, 699, 100, true, false, true from cat
union all
select id, 'Makeup Brush Set — 12 Piece', 'NC-BT-008', 'Tidemark',
  'Soft synthetic bristles for flawless application, foundation to highlighter.',
  699, 999, 55, false, false, false from cat;

-- ============================================================================
-- APPLIANCES
-- ============================================================================
with cat as (select id from public.categories where name = 'Appliances')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, '1.5 Ton Inverter Split AC', 'NC-APL-101', 'Lumio',
  '5-star energy rating with copper condenser coils for faster, efficient cooling.',
  32999, 38999, 18, true, true, true from cat
union all
select id, '260L Frost-Free Refrigerator', 'NC-APL-102', 'Northwind',
  'Convertible freezer technology gives you extra fridge space when you need it.',
  24999, 28999, 12, true, false, true from cat
union all
select id, '700W Solo Microwave Oven', 'NC-APL-103', 'Aurelle',
  'Quick reheat and defrost functions with 5 power levels.',
  6499, 7999, 40, false, true, false from cat
union all
select id, '7kg Front Load Washing Machine', 'NC-APL-104', 'Cascade Co.',
  'Quiet inverter motor with 14 wash programs for every fabric type.',
  21999, 25999, 16, false, false, true from cat
union all
select id, 'RO+UV Water Purifier', 'NC-APL-105', 'Verde & Co',
  '8-stage purification removes impurities while retaining essential minerals.',
  8999, 10999, 30, false, false, false from cat
union all
select id, '750W Mixer Grinder, 3 Jars', 'NC-APL-106', 'Halcyon',
  'Powerful motor handles everything from chutneys to thick batters.',
  2799, 3499, 60, false, true, false from cat
union all
select id, 'Robotic Vacuum Cleaner', 'NC-APL-107', 'Driftwood',
  'Smart mapping navigation with app control and auto-recharge.',
  13999, 16999, 22, true, false, false from cat;

-- ============================================================================
-- TOYS & GAMES
-- ============================================================================
with cat as (select id from public.categories where name = 'Toys & Games')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Building Blocks Set — 500 Pieces', 'NC-TG-001', 'Solace',
  'Compatible with major building block brands. Sparks creativity for ages 6+.',
  999, 1399, 70, true, true, true from cat
union all
select id, 'Remote Control Off-Road Truck', 'NC-TG-002', 'Meridian',
  'All-terrain RC truck with a rechargeable battery and 2.4GHz remote.',
  1799, 2399, 45, false, true, true from cat
union all
select id, 'Classic Strategy Board Game', 'NC-TG-003', 'Birchline',
  'Family game night favorite for 2-6 players, ages 10 and up.',
  799, 999, 85, false, false, false from cat
union all
select id, 'Plush Soft Toy — Bear, 18 inch', 'NC-TG-004', 'Amberlight',
  'Ultra-soft and huggable, machine washable, safe for all ages.',
  599, 799, 100, false, false, true from cat
union all
select id, '1000-Piece Jigsaw Puzzle', 'NC-TG-005', 'Stonewell',
  'Stunning landscape artwork puzzle for a relaxing weekend activity.',
  449, 599, 60, false, false, false from cat
union all
select id, 'Beginner Science Experiment Kit', 'NC-TG-006', 'Fernway',
  '20+ hands-on experiments that make STEM learning genuinely fun.',
  1099, 1499, 50, true, false, false from cat
union all
select id, 'Battery-Powered Ride-On Car', 'NC-TG-007', 'Cobalt & Co',
  'Safe, sturdy ride-on car for toddlers with parental remote override.',
  4999, 6499, 25, false, true, false from cat;

-- ============================================================================
-- FOOD & HOUSEHOLD
-- ============================================================================
with cat as (select id from public.categories where name = 'Food & Household')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Assorted Snacks Box, 12 Pack', 'NC-FH-001', 'Wildgrove',
  'A curated mix of healthy and indulgent snacks for the whole week.',
  499, 649, 120, false, true, true from cat
union all
select id, 'Cold-Pressed Juice, 6 Pack', 'NC-FH-002', 'Tidemark',
  'No added sugar, no preservatives — just real fruit, cold-pressed.',
  599, 749, 90, false, false, false from cat
union all
select id, 'Multi-Surface Cleaning Spray, 3 Pack', 'NC-FH-003', 'Lumio',
  'Cuts through grease and grime on kitchen, bathroom, and glass surfaces.',
  349, 449, 150, true, false, true from cat
union all
select id, 'Baby Diapers, Pack of 60', 'NC-FH-004', 'Northwind',
  'Ultra-absorbent and breathable for up to 12 hours of comfort.',
  799, 999, 100, false, false, false from cat
union all
select id, 'Assorted Spice Box Set', 'NC-FH-005', 'Aurelle',
  'Essential everyday spices in a reusable, airtight storage box.',
  649, 849, 75, false, true, false from cat
union all
select id, 'Premium Dishwashing Liquid, 1L', 'NC-FH-006', 'Cascade Co.',
  'Tough on grease, gentle on hands, with a fresh lemon scent.',
  199, 279, 200, false, false, false from cat;

-- ============================================================================
-- AUTO ACCESSORIES
-- ============================================================================
with cat as (select id from public.categories where name = 'Auto Accessories')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Microfiber Car Cleaning Kit', 'NC-AA-001', 'Verde & Co',
  'Complete kit with microfiber cloths, wash mitt, and interior cleaner.',
  899, 1199, 65, true, false, true from cat
union all
select id, 'Tyre Inflator & Pressure Gauge', 'NC-AA-002', 'Halcyon',
  'Portable 12V air compressor with digital pressure display.',
  1499, 1899, 40, false, true, false from cat
union all
select id, 'Full-Face Riding Helmet', 'NC-AA-003', 'Driftwood',
  'ISI-certified helmet with anti-fog visor and ventilated shell.',
  2299, 2899, 35, true, true, true from cat
union all
select id, 'Handheld Car Vacuum Cleaner', 'NC-AA-004', 'Solace',
  'Cordless, rechargeable vacuum with strong suction for car interiors.',
  1799, 2299, 50, false, false, false from cat
union all
select id, 'All-Weather Car Seat Covers, Set of 5', 'NC-AA-005', 'Meridian',
  'Waterproof, easy-to-clean seat covers that fit most sedan models.',
  2999, 3699, 28, false, false, true from cat
union all
select id, 'Universal Car Dashboard Mount', 'NC-AA-006', 'Birchline',
  '360-degree rotating phone mount with one-hand operation.',
  399, 599, 110, false, true, false from cat;

-- ============================================================================
-- TWO WHEELERS
-- ============================================================================
with cat as (select id from public.categories where name = 'Two Wheelers')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Riding Jacket with Armor', 'NC-TW-001', 'Amberlight',
  'All-season riding jacket with removable armor and thermal lining.',
  3499, 4499, 22, true, true, true from cat
union all
select id, 'Bike Cover — All Weather', 'NC-TW-002', 'Stonewell',
  'UV-resistant, waterproof cover that fits most scooters and bikes.',
  799, 999, 60, false, false, false from cat
union all
select id, 'Riding Gloves with Knuckle Guard', 'NC-TW-003', 'Fernway',
  'Breathable mesh gloves with reinforced knuckle protection.',
  899, 1199, 45, false, true, false from cat
union all
select id, 'LED Headlight Upgrade Kit', 'NC-TW-004', 'Cobalt & Co',
  'Brighter, energy-efficient LED headlight kit, plug-and-play install.',
  1299, 1699, 35, false, false, true from cat
union all
select id, 'Saddle Bag — Waterproof', 'NC-TW-005', 'Wildgrove',
  'Expandable saddle bag with reflective strips for night visibility.',
  1599, 1999, 30, true, false, false from cat
union all
select id, 'Bike Disc Lock with Alarm', 'NC-TW-006', 'Tidemark',
  '110dB alarm triggers on movement, with a reminder cable to prevent ride-offs.',
  699, 899, 55, false, true, false from cat;

-- ============================================================================
-- SPORTS & OUTDOORS
-- ============================================================================
with cat as (select id from public.categories where name = 'Sports & Outdoors')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Non-Slip Yoga Mat, 6mm', 'NC-SP-001', 'Lumio',
  'Extra-thick cushioning with a non-slip surface on both sides.',
  799, 999, 95, true, true, true from cat
union all
select id, 'Insulated Sports Water Bottle, 1L', 'NC-SP-002', 'Northwind',
  'Keeps drinks cold for 24 hours. Leak-proof and dishwasher safe.',
  599, 799, 110, false, false, true from cat
union all
select id, 'Adjustable Resistance Bands Set', 'NC-SP-003', 'Aurelle',
  '5 resistance levels with a door anchor for full home workouts.',
  499, 699, 130, false, true, false from cat
union all
select id, '2-Person Camping Tent', 'NC-SP-004', 'Cascade Co.',
  'Waterproof, easy 5-minute setup tent for weekend getaways.',
  3499, 4499, 20, true, false, false from cat
union all
select id, 'Cycling Helmet with Visor', 'NC-SP-005', 'Verde & Co',
  'Lightweight, well-ventilated helmet for road and trail riding.',
  1499, 1899, 38, false, false, false from cat
union all
select id, 'Cricket Kit — Bat & Ball Set', 'NC-SP-006', 'Halcyon',
  'English willow bat with a complete set of tennis balls.',
  1999, 2599, 25, false, true, true from cat
union all
select id, 'Trekking Backpack, 50L', 'NC-SP-007', 'Driftwood',
  'Multiple compartments with a rain cover for multi-day treks.',
  2299, 2899, 30, true, false, false from cat;

-- ============================================================================
-- BOOKS & STATIONERY
-- ============================================================================
with cat as (select id from public.categories where name = 'Books & Stationery')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, 'Bestselling Fiction Novel', 'NC-BS-001', 'Solace',
  'The critically acclaimed novel everyone is talking about this year.',
  349, 499, 80, true, true, true from cat
union all
select id, 'Dot-Grid Notebook, A5', 'NC-BS-002', 'Meridian',
  'Premium 160gsm paper, perfect for bullet journaling or sketching.',
  299, 399, 150, false, false, true from cat
union all
select id, 'Gel Pen Set, 12 Colors', 'NC-BS-003', 'Birchline',
  'Smooth-writing gel pens in vibrant, fade-resistant ink colors.',
  199, 299, 200, false, true, false from cat
union all
select id, 'Children''s Picture Book Collection', 'NC-BS-004', 'Amberlight',
  'A set of 5 illustrated picture books for early readers.',
  599, 799, 60, false, false, false from cat
union all
select id, 'Self-Help Bestseller — Build Better Habits', 'NC-BS-005', 'Stonewell',
  'A practical guide to building habits that actually stick.',
  399, 549, 70, true, false, false from cat
union all
select id, 'Daily Planner & Organizer', 'NC-BS-006', 'Fernway',
  'Undated planner with monthly, weekly, and daily layouts.',
  449, 599, 90, false, true, false from cat;

-- ============================================================================
-- FURNITURE
-- ============================================================================
with cat as (select id from public.categories where name = 'Furniture')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, is_featured, is_trending, is_best_seller)
select id, '3-Seater Fabric Sofa', 'NC-FN-001', 'Cobalt & Co',
  'Comfortable, durable fabric sofa with solid wood legs.',
  24999, 32999, 10, true, true, true from cat
union all
select id, 'Queen Size Bed with Storage', 'NC-FN-002', 'Wildgrove',
  'Hydraulic storage bed frame in a rich walnut finish.',
  18999, 23999, 8, true, false, true from cat
union all
select id, 'Study Desk & Chair Combo', 'NC-FN-003', 'Tidemark',
  'Ergonomic desk and chair set, perfect for home offices.',
  6999, 8999, 25, false, true, false from cat
union all
select id, '4-Tier Bookshelf', 'NC-FN-004', 'Lumio',
  'Sturdy engineered wood bookshelf with a modern open design.',
  3499, 4499, 35, false, false, false from cat
union all
select id, 'TV Entertainment Unit', 'NC-FN-005', 'Northwind',
  'Wall-mounted unit with cable management and ample storage.',
  7999, 9999, 18, false, false, true from cat
union all
select id, 'Outdoor Patio Chair Set of 2', 'NC-FN-006', 'Aurelle',
  'Weather-resistant wicker chairs, perfect for balconies and patios.',
  5499, 6999, 20, true, false, false from cat;

-- ============================================================================
-- Images — one distinct Picsum image per newly-added product, guaranteed to
-- load (no Unsplash photo-ID guessing for this batch, given the scale).
-- ============================================================================
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://picsum.photos/seed/prod-' || sku || '/800/800', name, true, 0
from public.products
where sku like 'NC-MB-%' or sku like 'NC-BT-%' or sku like 'NC-APL-%' or sku like 'NC-TG-%'
   or sku like 'NC-FH-%' or sku like 'NC-AA-%' or sku like 'NC-TW-%' or sku like 'NC-SP-%'
   or sku like 'NC-BS-%' or sku like 'NC-FN-%';

insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select id, 'https://picsum.photos/seed/prod-alt-' || sku || '/800/800', name, false, 1
from public.products
where sku like 'NC-MB-%' or sku like 'NC-BT-%' or sku like 'NC-APL-%' or sku like 'NC-TG-%'
   or sku like 'NC-FH-%' or sku like 'NC-AA-%' or sku like 'NC-TW-%' or sku like 'NC-SP-%'
   or sku like 'NC-BS-%' or sku like 'NC-FN-%';