-- ============================================================================
-- NovaCart — Fix duplicate product images bug
-- Run this AFTER 04_seed_data.sql (and after 06_add_categories.sql, if you've
-- run it) in the Supabase SQL Editor.
--
-- BUG: 04_seed_data.sql originally assigned the exact same two stock photos
-- (a pair of headphones) as the images for EVERY product, regardless of
-- category. This meant a leather cardholder, a yoga mat, and a candle all
-- displayed identical headphone photos on the storefront.
--
-- FIX: this script deletes the old blanket images and re-inserts a primary
-- image matched to each product's actual SKU. Safe to re-run — it always
-- deletes by SKU first, so running it twice won't create duplicates.
-- ============================================================================

-- Remove the old incorrect images for the 20 originally-seeded products
delete from public.product_images
where product_id in (
  select id from public.products
  where sku in (
    'NC-EL-001','NC-EL-002','NC-EL-003','NC-EL-004',
    'NC-AP-001','NC-AP-002','NC-AP-003','NC-AP-004',
    'NC-HM-001','NC-HM-002','NC-HM-003',
    'NC-AC-001','NC-AC-002','NC-AC-003',
    'NC-FT-001','NC-FT-002','NC-FT-003',
    'NC-OF-001','NC-OF-002','NC-OF-003'
  )
);

-- Re-insert one matched primary image per product, keyed by SKU
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from public.products p
join (values
  ('NC-EL-001', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'), -- Aura Wireless Headphones
  ('NC-EL-002', 'https://images.unsplash.com/photo-1608043152269-423dbba4e240?w=800&q=80'), -- Pulse Bluetooth Speaker
  ('NC-EL-003', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80'), -- Halo Smart Desk Lamp
  ('NC-EL-004', 'https://images.unsplash.com/photo-1609592807900-8a2f4f3e6e3a?w=800&q=80'), -- Drift Portable Charger 10K
  ('NC-AP-001', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'), -- Everyday Crewneck
  ('NC-AP-002', 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80'), -- Mono Tee — Stone
  ('NC-AP-003', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'), -- Trail Pullover Hoodie
  ('NC-AP-004', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'), -- Wool Blend Overcoat
  ('NC-HM-001', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80'), -- Ceramic Pour-Over Set
  ('NC-HM-002', 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?w=800&q=80'), -- Linen Throw Blanket
  ('NC-HM-003', 'https://images.unsplash.com/photo-1602874801006-e26c4c5b5b53?w=800&q=80'), -- Amber Glass Candle
  ('NC-AC-001', 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'), -- Slim Leather Cardholder
  ('NC-AC-002', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'), -- Canvas Weekender Bag
  ('NC-AC-003', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'), -- Stainless Steel Watch
  ('NC-FT-001', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80'), -- Insulated Steel Water Bottle
  ('NC-FT-002', 'https://images.unsplash.com/photo-1592432678016-e16a256ce11e?w=800&q=80'), -- Foldable Yoga Mat
  ('NC-FT-003', 'https://images.unsplash.com/photo-1598971639058-a852e6e2b16d?w=800&q=80'), -- Resistance Bands Set
  ('NC-OF-001', 'https://images.unsplash.com/photo-1518655048521-f130df041f66?w=800&q=80'), -- Walnut Desk Organizer
  ('NC-OF-002', 'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=800&q=80'), -- Mechanical Keyboard
  ('NC-OF-003', 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80')  -- Refillable Notebook
) as v(sku, url) on v.sku = p.sku;

-- Add a distinct secondary image per product too, so the product detail
-- page's gallery has more than one (identical) photo to show.
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, false, 1
from public.products p
join (values
  ('NC-EL-001', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'),
  ('NC-EL-002', 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'),
  ('NC-EL-003', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'),
  ('NC-EL-004', 'https://images.unsplash.com/photo-1583863788434-e62bd5c809d6?w=800&q=80'),
  ('NC-AP-001', 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80'),
  ('NC-AP-002', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'),
  ('NC-AP-003', 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80'),
  ('NC-AP-004', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'),
  ('NC-HM-001', 'https://images.unsplash.com/photo-1495539406929-9bdc1cd09a09?w=800&q=80'),
  ('NC-HM-002', 'https://images.unsplash.com/photo-1580301762395-83c40f48ddc2?w=800&q=80'),
  ('NC-HM-003', 'https://images.unsplash.com/photo-1602874801006-2b9e3a5e3e92?w=800&q=80'),
  ('NC-AC-001', 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80'),
  ('NC-AC-002', 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&q=80'),
  ('NC-AC-003', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80'),
  ('NC-FT-001', 'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?w=800&q=80'),
  ('NC-FT-002', 'https://images.unsplash.com/photo-1599447292180-45fd84092ef4?w=800&q=80'),
  ('NC-FT-003', 'https://images.unsplash.com/photo-1591741535018-d042766c62eb?w=800&q=80'),
  ('NC-OF-001', 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&q=80'),
  ('NC-OF-002', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'),
  ('NC-OF-003', 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80')
) as v(sku, url) on v.sku = p.sku;