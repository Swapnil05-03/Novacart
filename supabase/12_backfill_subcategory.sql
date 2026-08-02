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
-- categoryContent.js for this category are bike TYPES (Sports Bikes,
-- Cruiser Bikes, Adventure Bikes...), but the actual seeded products are
-- riding GEAR (jackets, gloves, covers, locks) — a mismatch in the app's
-- own design, not something a backfill script can safely paper over.
-- Left unmapped below; flagged for your decision (see message).
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

-- Auto Accessories
update public.products set subcategory = 'Cleaning Accessories'   where sku = 'NC-AA-001';
update public.products set subcategory = 'Tyre & Rim Care'        where sku = 'NC-AA-002';
update public.products set subcategory = 'Helmets'                where sku = 'NC-AA-003';
update public.products set subcategory = 'Car Vacuum Cleaners'    where sku = 'NC-AA-004';
update public.products set subcategory = 'Seat Covers'            where sku = 'NC-AA-005';
update public.products set subcategory = 'Dashboard Accessories'  where sku = 'NC-AA-006';

-- Sports & Outdoors
update public.products set subcategory = 'Skating Gear'      where sku = 'NC-SP-001'; -- yoga mat: no exact tile, closest fit is generic gear; consider adding a 'Yoga & Wellness' tile
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

-- Apparel (original 6 categories, 04_seed_data.sql) — unisex, no gender set
update public.products set subcategory = 'T-Shirts'  where sku = 'NC-AP-001'; -- Everyday Crewneck
update public.products set subcategory = 'T-Shirts'  where sku = 'NC-AP-002'; -- Mono Tee
update public.products set subcategory = 'Hoodies'   where sku = 'NC-AP-003'; -- Trail Pullover Hoodie
update public.products set subcategory = 'Jackets'   where sku = 'NC-AP-004'; -- Wool Blend Overcoat

-- Accessories (original 6 categories, 04_seed_data.sql) — unisex, no gender set
update public.products set subcategory = 'Wallets'   where sku = 'NC-AC-001'; -- Cardholder
update public.products set subcategory = 'Bags'      where sku = 'NC-AC-002'; -- Weekender Bag
update public.products set subcategory = 'Watches'   where sku = 'NC-AC-003'; -- Stainless Steel Watch

-- Fitness, Office, Electronics, Home & Living: current tile lists for these
-- categories don't cleanly match the small seeded product sets either —
-- reviewed and intentionally left unmapped rather than guessing. Same
-- pattern as the Two Wheelers/Mobiles/Sports gaps noted above.