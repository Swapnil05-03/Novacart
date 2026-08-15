-- ============================================================================
-- NovaCart — Backfill subcategory (+ gender where applicable) for existing
-- seeded products. Run AFTER 11_add_subcategory_gender.sql.
--
-- Matched by SKU (unique, safe) against the product names from
-- 04_seed_data.sql and 09_seed_remaining_categories.sql.
--
-- NOTE on gender: today's seed data has almost no genuinely gendered
-- products. Only Beauty's "Men's Grooming Trimmer Kit" is clearly
-- gendered. Apparel/Accessories products are all unisex basics
-- (Crewneck, Hoodie, Cardholder, Weekender Bag, Watch, etc.) — there is
-- no real Men's vs Women's inventory to split yet, so this script does
-- NOT fabricate a gender for them. The Men/Women tabs in the UI will
-- only appear once you add real gendered SKUs (see note at the bottom).
--
-- NOTE on Two Wheelers: the sub-category tiles defined in
-- categoryContent.js for this category were originally all bike TYPES
-- (Sports Bikes, Cruiser Bikes, Adventure Bikes...), while the actual
-- seeded products are riding GEAR (jackets, gloves, covers, locks) — a
-- mismatch in the app's own design. categoryContent.js now also defines
-- 6 riding-gear tiles (Riding Jackets, Bike Covers, Riding Gloves,
-- Headlights & Lighting, Saddle Bags, Locks & Alarms) that match these
-- products, each reusing that product's own correct image — see the
-- mapping below.
-- ============================================================================

-- Mobiles
update public.products set subcategory = 'Galaxy'  where sku = 'NC-MB-002';
update public.products set subcategory = 'OPPO'    where sku = 'NC-MB-003';
update public.products set subcategory = 'POCO'    where sku = 'NC-MB-004';
update public.products set subcategory = 'Redmi'   where sku = 'NC-MB-005';
update public.products set subcategory = 'Pixel'   where sku = 'NC-MB-006';
update public.products set subcategory = 'Phone Cases' where sku = 'NC-MB-007';
update public.products set subcategory = 'Chargers'    where sku = 'NC-MB-008';
-- NC-MB-001 (Nova X12 5G) has no matching tile — leave null or add an
-- 'Other' tile if you want it discoverable via subcategory pills.

-- Beauty
update public.products set subcategory = 'Skincare',    gender = null  where sku = 'NC-BT-001';
update public.products set subcategory = 'Skincare',    gender = null  where sku = 'NC-BT-002';
update public.products set subcategory = 'Makeup',      gender = null  where sku = 'NC-BT-003';
update public.products set subcategory = 'Haircare',    gender = null  where sku = 'NC-BT-004';
update public.products set subcategory = 'Fragrance',   gender = null  where sku = 'NC-BT-005';
update public.products set subcategory = 'Men''s Grooming', gender = 'men' where sku = 'NC-BT-006';
update public.products set subcategory = 'Sunscreen',   gender = null  where sku = 'NC-BT-007';
update public.products set subcategory = 'Tools & Brushes', gender = null where sku = 'NC-BT-008';

-- Appliances
update public.products set subcategory = 'Air Conditioners'   where sku = 'NC-APL-101';
update public.products set subcategory = 'Refrigerators'      where sku = 'NC-APL-102';
update public.products set subcategory = 'Microwaves'         where sku = 'NC-APL-103';
update public.products set subcategory = 'Washing Machines'   where sku = 'NC-APL-104';
update public.products set subcategory = 'Water Purifiers'    where sku = 'NC-APL-105';
update public.products set subcategory = 'Mixers & Grinders'  where sku = 'NC-APL-106';
update public.products set subcategory = 'Vacuum Cleaners'    where sku = 'NC-APL-107';

-- Toys & Games
update public.products set subcategory = 'Building Blocks'    where sku = 'NC-TG-001';
update public.products set subcategory = 'RC Cars'            where sku = 'NC-TG-002';
update public.products set subcategory = 'Board Games'        where sku = 'NC-TG-003';
update public.products set subcategory = 'Soft Toys'          where sku = 'NC-TG-004';
update public.products set subcategory = 'Puzzles'            where sku = 'NC-TG-005';
update public.products set subcategory = 'Science Kits'       where sku = 'NC-TG-006';
update public.products set subcategory = 'Ride-Ons'           where sku = 'NC-TG-007';

-- Food & Household
update public.products set subcategory = 'Snacks'              where sku = 'NC-FH-001';
update public.products set subcategory = 'Beverages'           where sku = 'NC-FH-002';
update public.products set subcategory = 'Cleaning Supplies'   where sku = 'NC-FH-003';
update public.products set subcategory = 'Baby Care'           where sku = 'NC-FH-004';
update public.products set subcategory = 'Spices & Masalas'    where sku = 'NC-FH-005';
update public.products set subcategory = 'Kitchen Essentials'  where sku = 'NC-FH-006';

-- Two Wheelers (riding gear — see NOTE above)
update public.products set subcategory = 'Riding Jackets'         where sku = 'NC-TW-001'; -- Riding Jacket with Armor
update public.products set subcategory = 'Bike Covers'            where sku = 'NC-TW-002'; -- Bike Cover — All Weather
update public.products set subcategory = 'Riding Gloves'          where sku = 'NC-TW-003'; -- Riding Gloves with Knuckle Guard
update public.products set subcategory = 'Headlights & Lighting'  where sku = 'NC-TW-004'; -- LED Headlight Upgrade Kit
update public.products set subcategory = 'Saddle Bags'            where sku = 'NC-TW-005'; -- Saddle Bag — Waterproof
update public.products set subcategory = 'Locks & Alarms'         where sku = 'NC-TW-006'; -- Bike Disc Lock with Alarm

-- Auto Accessories
update public.products set subcategory = 'Cleaning Accessories'   where sku = 'NC-AA-001';
update public.products set subcategory = 'Tyre & Rim Care'        where sku = 'NC-AA-002';
update public.products set subcategory = 'Helmets'                where sku = 'NC-AA-003';
update public.products set subcategory = 'Car Vacuum Cleaners'    where sku = 'NC-AA-004';
update public.products set subcategory = 'Seat Covers'            where sku = 'NC-AA-005';
update public.products set subcategory = 'Dashboard Accessories'  where sku = 'NC-AA-006';

-- Sports & Outdoors
-- NC-SP-001 (Non-Slip Yoga Mat) was previously mapped to 'Skating Gear'
-- here as a "closest fit" placeholder. That was a mistake: 'Skating Gear'
-- is a real, valid tile in this category's shopByCategoryImages map, so
-- the product card/detail page confidently rendered the Skating Gear tile
-- photo instead of the product's own (correct) yoga mat photo — a
-- product-image mismatch, not a harmless fallback. There is no matching
-- Sports & Outdoors tile for yoga mats, so leave it unmapped (same
-- pattern as NC-MB-001 above) — this makes ProductCard/ProductDetailPage
-- fall through to the product's own curated per-SKU image instead.
update public.products set subcategory = 'Camping Equipment' where sku = 'NC-SP-004';
update public.products set subcategory = 'Cycling Gear'      where sku = 'NC-SP-005';
update public.products set subcategory = 'Cricket Gear'      where sku = 'NC-SP-006';
update public.products set subcategory = 'Trekking Gear'     where sku = 'NC-SP-007';
-- NC-SP-002 (water bottle), NC-SP-003 (resistance bands): no matching tile in the
-- current 15-tile list for this category — left null, same reasoning as Mobiles above.

-- Books & Stationery
update public.products set subcategory = 'Fiction'          where sku = 'NC-BS-001';
update public.products set subcategory = 'Notebooks'        where sku = 'NC-BS-002';
update public.products set subcategory = 'Pens & Pencils'   where sku = 'NC-BS-003';
update public.products set subcategory = 'Kid''s Books'      where sku = 'NC-BS-004';
update public.products set subcategory = 'Non-Fiction'      where sku = 'NC-BS-005';
update public.products set subcategory = 'Planners'         where sku = 'NC-BS-006';

-- Furniture
update public.products set subcategory = 'Sofas'            where sku = 'NC-FN-001';
update public.products set subcategory = 'Beds'             where sku = 'NC-FN-002';
update public.products set subcategory = 'Desks & Chairs'   where sku = 'NC-FN-003';
update public.products set subcategory = 'Bookshelves'      where sku = 'NC-FN-004';
update public.products set subcategory = 'TV Units'         where sku = 'NC-FN-005';
update public.products set subcategory = 'Outdoor Furniture' where sku = 'NC-FN-006';

-- Apparel (original 6 categories, 04_seed_data.sql) — unisex, no gender set.
-- IMPORTANT: left unmapped on purpose (do not tag these with a tile).
-- Apparel/Accessories only define GENDERED tiles (e.g. 'Jackets' resolves
-- to a WOMEN's jacket photo, 'T-Shirts'/'Hoodies'/'Bags' resolve to MEN's
-- photos of a different specific item). These 4 products already have
-- their own correct, product-specific image from Supabase
-- (07_fix_product_images.sql) — tagging them with a gendered subcategory
-- made the storefront override that correct photo with an unrelated
-- gendered stock photo (e.g. the unisex 'Wool Blend Overcoat' showed a
-- WOMEN's jacket photo). See 14_fix_product_image_mismatches.sql.
-- NC-AP-001 (Everyday Crewneck), NC-AP-002 (Mono Tee), NC-AP-003 (Trail
-- Pullover Hoodie), NC-AP-004 (Wool Blend Overcoat).

-- Accessories (original 6 categories, 04_seed_data.sql) — unisex, no gender
-- set. Same reasoning as Apparel above: 'Bags' and 'Watches' are real,
-- gendered tile keys here (Bags -> a MEN's bag photo, Watches -> a
-- WOMEN's watch photo) that don't match these unisex products, so they're
-- left unmapped rather than overriding their correct own images.
-- ('Wallets' was already a no-op — there's no plain 'Wallets' tile, only
-- "Men's Wallets" — but it's removed here too for clarity.)
-- NC-AC-001 (Cardholder), NC-AC-002 (Canvas Weekender Bag), NC-AC-003
-- (Stainless Steel Watch).

-- Fitness, Office, Electronics, Home & Living: current tile lists for these
-- categories don't cleanly match the small seeded product sets either —
-- reviewed and intentionally left unmapped rather than guessing. Same
-- pattern as the Mobiles/Sports gaps noted above (Two Wheelers now has
-- matching gear tiles — see the Two Wheelers section above).