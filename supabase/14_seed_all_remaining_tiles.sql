-- ============================================================================
-- NovaCart -- Seed a dedicated real product for every remaining subcategory
-- and brand tile that had no matching product, AND give every one of those
-- products the SAME curated image already used on its tile/brand card (from
-- public/tile-images/, copied from the exact files categoryContent.js already
-- imports) -- so the product detail page you land on after clicking a card
-- never shows a different, unrelated photo.
--
-- Run this AFTER 13_add_gendered_products.sql.
--
-- Every INSERT is guarded with `where not exists (... sku ...)`, so this file
-- is safe to re-run and will never create duplicates.
-- ============================================================================

-- ---- Mobiles: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'mobiles')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'iPhone — NovaCart Pick', 'NC-MB-T001', 'iPhone', 'A NovaCart pick for iphone, from our Mobiles range.', 510, 650, 35, 'iPhone', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T001')
union all
select id, 'Infinix — NovaCart Pick', 'NC-MB-T002', 'Infinix', 'A NovaCart pick for infinix, from our Mobiles range.', 550, 700, 35, 'Infinix', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T002')
union all
select id, 'Nothing — NovaCart Pick', 'NC-MB-T003', 'Nothing', 'A NovaCart pick for nothing, from our Mobiles range.', 580, 740, 35, 'Nothing', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T003')
union all
select id, 'OnePlus — NovaCart Pick', 'NC-MB-T004', 'OnePlus', 'A NovaCart pick for oneplus, from our Mobiles range.', 620, 790, 35, 'OnePlus', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T004')
union all
select id, 'Vivo — NovaCart Pick', 'NC-MB-T005', 'Vivo', 'A NovaCart pick for vivo, from our Mobiles range.', 660, 840, 35, 'Vivo', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T005')
union all
select id, 'Realme — NovaCart Pick', 'NC-MB-T006', 'Realme', 'A NovaCart pick for realme, from our Mobiles range.', 700, 900, 35, 'Realme', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T006')
union all
select id, 'Earphones — NovaCart Pick', 'NC-MB-T007', 'Earphones', 'A NovaCart pick for earphones, from our Mobiles range.', 730, 930, 35, 'Earphones', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T007')
union all
select id, 'Screen Guards — NovaCart Pick', 'NC-MB-T008', 'Screen Guards', 'A NovaCart pick for screen guards, from our Mobiles range.', 770, 990, 35, 'Screen Guards', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-T008');

-- ---- Mobiles: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'mobiles')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'iPhone — Signature Pick', 'NC-MB-B001', 'iPhone', 'A iPhone favorite from our Mobiles range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B001')
union all
select id, 'Samsung Galaxy — Signature Pick', 'NC-MB-B002', 'Samsung Galaxy', 'A Samsung Galaxy favorite from our Mobiles range.', 560, 720, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B002')
union all
select id, 'OPPO — Signature Pick', 'NC-MB-B003', 'OPPO', 'A OPPO favorite from our Mobiles range.', 600, 770, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B003')
union all
select id, 'Vivo — Signature Pick', 'NC-MB-B004', 'Vivo', 'A Vivo favorite from our Mobiles range.', 630, 810, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B004')
union all
select id, 'OnePlus — Signature Pick', 'NC-MB-B005', 'OnePlus', 'A OnePlus favorite from our Mobiles range.', 670, 860, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B005')
union all
select id, 'Xiaomi Redmi — Signature Pick', 'NC-MB-B006', 'Xiaomi Redmi', 'A Xiaomi Redmi favorite from our Mobiles range.', 710, 910, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B006')
union all
select id, 'Realme — Signature Pick', 'NC-MB-B007', 'Realme', 'A Realme favorite from our Mobiles range.', 740, 950, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B007')
union all
select id, 'Nothing — Signature Pick', 'NC-MB-B008', 'Nothing', 'A Nothing favorite from our Mobiles range.', 780, 1000, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B008')
union all
select id, 'Google Pixel — Signature Pick', 'NC-MB-B009', 'Google Pixel', 'A Google Pixel favorite from our Mobiles range.', 820, 1050, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B009')
union all
select id, 'Infinix — Signature Pick', 'NC-MB-B010', 'Infinix', 'A Infinix favorite from our Mobiles range.', 850, 1090, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B010')
union all
select id, 'POCO — Signature Pick', 'NC-MB-B011', 'POCO', 'A POCO favorite from our Mobiles range.', 890, 1140, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B011')
union all
select id, 'Motorola — Signature Pick', 'NC-MB-B012', 'Motorola', 'A Motorola favorite from our Mobiles range.', 930, 1190, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B012')
union all
select id, 'Honor — Signature Pick', 'NC-MB-B013', 'Honor', 'A Honor favorite from our Mobiles range.', 960, 1230, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B013')
union all
select id, 'iQOO — Signature Pick', 'NC-MB-B014', 'iQOO', 'A iQOO favorite from our Mobiles range.', 1000, 1280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B014')
union all
select id, 'Tecno — Signature Pick', 'NC-MB-B015', 'Tecno', 'A Tecno favorite from our Mobiles range.', 1040, 1330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-MB-B015');

-- ---- Mobiles: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-MB-T001', '/tile-images/mobiles/tiles/iphone.avif'),
  ('NC-MB-T002', '/tile-images/mobiles/tiles/infinix.jpg'),
  ('NC-MB-T003', '/tile-images/mobiles/tiles/nothing.jpg'),
  ('NC-MB-T004', '/tile-images/mobiles/tiles/oneplus.jpg'),
  ('NC-MB-T005', '/tile-images/mobiles/tiles/vivo.jpg'),
  ('NC-MB-T006', '/tile-images/mobiles/tiles/realme.jpg'),
  ('NC-MB-T007', '/tile-images/mobiles/tiles/earphones.jpg'),
  ('NC-MB-T008', '/tile-images/mobiles/tiles/screen-guards.jpg'),
  ('NC-MB-B001', '/tile-images/mobiles/brands/iphone.jpg'),
  ('NC-MB-B002', '/tile-images/mobiles/brands/samsung-galaxy.webp'),
  ('NC-MB-B003', '/tile-images/mobiles/brands/oppo.jpg'),
  ('NC-MB-B004', '/tile-images/mobiles/brands/vivo.jpg'),
  ('NC-MB-B005', '/tile-images/mobiles/brands/oneplus.jpg'),
  ('NC-MB-B006', '/tile-images/mobiles/brands/xiaomi-redmi.jpg'),
  ('NC-MB-B007', '/tile-images/mobiles/brands/realme.jpg'),
  ('NC-MB-B008', '/tile-images/mobiles/brands/nothing.jpg'),
  ('NC-MB-B009', '/tile-images/mobiles/brands/google-pixel.jpg'),
  ('NC-MB-B010', '/tile-images/mobiles/brands/infinix.jpg'),
  ('NC-MB-B011', '/tile-images/mobiles/brands/poco.jpg'),
  ('NC-MB-B012', '/tile-images/mobiles/brands/motorola.jpg'),
  ('NC-MB-B013', '/tile-images/mobiles/brands/honor.webp'),
  ('NC-MB-B014', '/tile-images/mobiles/brands/iqoo.jpg'),
  ('NC-MB-B015', '/tile-images/mobiles/brands/tecno.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Beauty: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'beauty')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Beard Care — NovaCart Pick', 'NC-BT-T001', 'Nivea', 'A NovaCart pick for beard care, from our Beauty range.', 260, 330, 35, 'Beard Care', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T001')
union all
select id, 'Shaving — NovaCart Pick', 'NC-BT-T002', 'Lakmé', 'A NovaCart pick for shaving, from our Beauty range.', 300, 380, 35, 'Shaving', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T002')
union all
select id, 'Face Wash — NovaCart Pick', 'NC-BT-T003', 'Himalaya', 'A NovaCart pick for face wash, from our Beauty range.', 330, 420, 35, 'Face Wash', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T003')
union all
select id, 'Men''s Deodorant — NovaCart Pick', 'NC-BT-T004', 'Maybelline', 'A NovaCart pick for men''s deodorant, from our Beauty range.', 370, 470, 35, 'Men''s Deodorant', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T004')
union all
select id, 'Hair Styling — NovaCart Pick', 'NC-BT-T005', 'Dove', 'A NovaCart pick for hair styling, from our Beauty range.', 410, 520, 35, 'Hair Styling', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T005')
union all
select id, 'Body Wash — NovaCart Pick', 'NC-BT-T006', 'L''Oréal', 'A NovaCart pick for body wash, from our Beauty range.', 440, 560, 35, 'Body Wash', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T006')
union all
select id, 'Men''s Sunscreen — NovaCart Pick', 'NC-BT-T007', 'Gillette', 'A NovaCart pick for men''s sunscreen, from our Beauty range.', 480, 610, 35, 'Men''s Sunscreen', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T007')
union all
select id, 'Trimmers — NovaCart Pick', 'NC-BT-T008', 'Nykaa', 'A NovaCart pick for trimmers, from our Beauty range.', 520, 670, 35, 'Trimmers', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T008')
union all
select id, 'Men''s Body Lotion — NovaCart Pick', 'NC-BT-T009', 'Old Spice', 'A NovaCart pick for men''s body lotion, from our Beauty range.', 560, 720, 35, 'Men''s Body Lotion', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T009')
union all
select id, 'Perfume — NovaCart Pick', 'NC-BT-T010', 'MAC', 'A NovaCart pick for perfume, from our Beauty range.', 590, 760, 35, 'Perfume', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T010')
union all
select id, 'Men''s Hair Color — NovaCart Pick', 'NC-BT-T011', 'Park Avenue', 'A NovaCart pick for men''s hair color, from our Beauty range.', 630, 810, 35, 'Men''s Hair Color', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T011')
union all
select id, 'Men''s Skincare — NovaCart Pick', 'NC-BT-T012', 'Garnier', 'A NovaCart pick for men''s skincare, from our Beauty range.', 670, 860, 35, 'Men''s Skincare', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T012')
union all
select id, 'Talc & Powder — NovaCart Pick', 'NC-BT-T013', 'Wild Stone', 'A NovaCart pick for talc & powder, from our Beauty range.', 700, 900, 35, 'Talc & Powder', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T013')
union all
select id, 'Face Mask — NovaCart Pick', 'NC-BT-T014', 'The Body Shop', 'A NovaCart pick for face mask, from our Beauty range.', 740, 950, 35, 'Face Mask', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T014')
union all
select id, 'Bath & Body — NovaCart Pick', 'NC-BT-T015', 'Mamaearth', 'A NovaCart pick for bath & body, from our Beauty range.', 780, 1000, 35, 'Bath & Body', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T015')
union all
select id, 'Lip Care — NovaCart Pick', 'NC-BT-T016', 'Nivea', 'A NovaCart pick for lip care, from our Beauty range.', 820, 1050, 35, 'Lip Care', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T016')
union all
select id, 'Nail Care — NovaCart Pick', 'NC-BT-T017', 'Lakmé', 'A NovaCart pick for nail care, from our Beauty range.', 850, 1090, 35, 'Nail Care', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T017')
union all
select id, 'Face Masks — NovaCart Pick', 'NC-BT-T018', 'Himalaya', 'A NovaCart pick for face masks, from our Beauty range.', 890, 1140, 35, 'Face Masks', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T018')
union all
select id, 'Hair Color — NovaCart Pick', 'NC-BT-T019', 'Maybelline', 'A NovaCart pick for hair color, from our Beauty range.', 930, 1190, 35, 'Hair Color', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T019')
union all
select id, 'Body Lotion — NovaCart Pick', 'NC-BT-T020', 'Dove', 'A NovaCart pick for body lotion, from our Beauty range.', 960, 1230, 35, 'Body Lotion', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T020')
union all
select id, 'Deodorants — NovaCart Pick', 'NC-BT-T021', 'L''Oréal', 'A NovaCart pick for deodorants, from our Beauty range.', 1000, 1280, 35, 'Deodorants', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T021')
union all
select id, 'Hair Removal — NovaCart Pick', 'NC-BT-T022', 'Gillette', 'A NovaCart pick for hair removal, from our Beauty range.', 1040, 1330, 35, 'Hair Removal', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T022')
union all
select id, 'Body Scrubs — NovaCart Pick', 'NC-BT-T023', 'Nykaa', 'A NovaCart pick for body scrubs, from our Beauty range.', 1070, 1370, 35, 'Body Scrubs', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-T023');

-- ---- Beauty: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'beauty')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Nivea — Signature Pick', 'NC-BT-B001', 'Nivea', 'A Nivea favorite from our Beauty range.', 270, 350, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B001')
union all
select id, 'Lakmé — Signature Pick', 'NC-BT-B002', 'Lakmé', 'A Lakmé favorite from our Beauty range.', 310, 400, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B002')
union all
select id, 'Himalaya — Signature Pick', 'NC-BT-B003', 'Himalaya', 'A Himalaya favorite from our Beauty range.', 340, 440, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B003')
union all
select id, 'Maybelline — Signature Pick', 'NC-BT-B004', 'Maybelline', 'A Maybelline favorite from our Beauty range.', 380, 490, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B004')
union all
select id, 'Dove — Signature Pick', 'NC-BT-B005', 'Dove', 'A Dove favorite from our Beauty range.', 420, 540, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B005')
union all
select id, 'L''Oréal — Signature Pick', 'NC-BT-B006', 'L''Oréal', 'A L''Oréal favorite from our Beauty range.', 460, 590, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B006')
union all
select id, 'Gillette — Signature Pick', 'NC-BT-B007', 'Gillette', 'A Gillette favorite from our Beauty range.', 490, 630, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B007')
union all
select id, 'Nykaa — Signature Pick', 'NC-BT-B008', 'Nykaa', 'A Nykaa favorite from our Beauty range.', 530, 680, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B008')
union all
select id, 'Old Spice — Signature Pick', 'NC-BT-B009', 'Old Spice', 'A Old Spice favorite from our Beauty range.', 570, 730, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B009')
union all
select id, 'MAC — Signature Pick', 'NC-BT-B010', 'MAC', 'A MAC favorite from our Beauty range.', 600, 770, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B010')
union all
select id, 'Park Avenue — Signature Pick', 'NC-BT-B011', 'Park Avenue', 'A Park Avenue favorite from our Beauty range.', 640, 820, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B011')
union all
select id, 'Garnier — Signature Pick', 'NC-BT-B012', 'Garnier', 'A Garnier favorite from our Beauty range.', 680, 870, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B012')
union all
select id, 'Wild Stone — Signature Pick', 'NC-BT-B013', 'Wild Stone', 'A Wild Stone favorite from our Beauty range.', 720, 920, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B013')
union all
select id, 'The Body Shop — Signature Pick', 'NC-BT-B014', 'The Body Shop', 'A The Body Shop favorite from our Beauty range.', 750, 960, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B014')
union all
select id, 'Mamaearth — Signature Pick', 'NC-BT-B015', 'Mamaearth', 'A Mamaearth favorite from our Beauty range.', 790, 1010, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BT-B015');

-- ---- Beauty: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-BT-T001', '/tile-images/beauty/tiles/beard-care.jpg'),
  ('NC-BT-T002', '/tile-images/beauty/tiles/shaving.jpg'),
  ('NC-BT-T003', '/tile-images/beauty/tiles/face-wash.avif'),
  ('NC-BT-T004', '/tile-images/beauty/tiles/men-s-deodorant.webp'),
  ('NC-BT-T005', '/tile-images/beauty/tiles/hair-styling.webp'),
  ('NC-BT-T006', '/tile-images/beauty/tiles/body-wash.jpg'),
  ('NC-BT-T007', '/tile-images/beauty/tiles/men-s-sunscreen.webp'),
  ('NC-BT-T008', '/tile-images/beauty/tiles/trimmers.jpg'),
  ('NC-BT-T009', '/tile-images/beauty/tiles/men-s-body-lotion.avif'),
  ('NC-BT-T010', '/tile-images/beauty/tiles/perfume.jpg'),
  ('NC-BT-T011', '/tile-images/beauty/tiles/men-s-hair-color.jpg'),
  ('NC-BT-T012', '/tile-images/beauty/tiles/men-s-skincare.jpg'),
  ('NC-BT-T013', '/tile-images/beauty/tiles/talc-powder.webp'),
  ('NC-BT-T014', '/tile-images/beauty/tiles/face-mask.webp'),
  ('NC-BT-T015', '/tile-images/beauty/tiles/bath-body.jpg'),
  ('NC-BT-T016', '/tile-images/beauty/tiles/lip-care.jpg'),
  ('NC-BT-T017', '/tile-images/beauty/tiles/nail-care.jpg'),
  ('NC-BT-T018', '/tile-images/beauty/tiles/face-masks.jpg'),
  ('NC-BT-T019', '/tile-images/beauty/tiles/hair-color.jpg'),
  ('NC-BT-T020', '/tile-images/beauty/tiles/body-lotion.jpg'),
  ('NC-BT-T021', '/tile-images/beauty/tiles/deodorants.png'),
  ('NC-BT-T022', '/tile-images/beauty/tiles/hair-removal.jpg'),
  ('NC-BT-T023', '/tile-images/beauty/tiles/body-scrubs.jpg'),
  ('NC-BT-B001', '/tile-images/beauty/brands/nivea.avif'),
  ('NC-BT-B002', '/tile-images/beauty/brands/lakm.jpg'),
  ('NC-BT-B003', '/tile-images/beauty/brands/himalaya.jpg'),
  ('NC-BT-B004', '/tile-images/beauty/brands/maybelline.avif'),
  ('NC-BT-B005', '/tile-images/beauty/brands/dove.avif'),
  ('NC-BT-B006', '/tile-images/beauty/brands/l-or-al.jpg'),
  ('NC-BT-B007', '/tile-images/beauty/brands/gillette.jpg'),
  ('NC-BT-B008', '/tile-images/beauty/brands/nykaa.jpg'),
  ('NC-BT-B009', '/tile-images/beauty/brands/old-spice.avif'),
  ('NC-BT-B010', '/tile-images/beauty/brands/mac.jpg'),
  ('NC-BT-B011', '/tile-images/beauty/brands/park-avenue.jpg'),
  ('NC-BT-B012', '/tile-images/beauty/brands/garnier.webp'),
  ('NC-BT-B013', '/tile-images/beauty/brands/wild-stone.jpg'),
  ('NC-BT-B014', '/tile-images/beauty/brands/the-body-shop.jpg'),
  ('NC-BT-B015', '/tile-images/beauty/brands/mamaearth.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Electronics: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'electronics')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Headphones — NovaCart Pick', 'NC-EL-T001', 'Sony', 'A NovaCart pick for headphones, from our Electronics range.', 510, 650, 35, 'Headphones', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T001')
union all
select id, 'Laptops — NovaCart Pick', 'NC-EL-T002', 'JBL', 'A NovaCart pick for laptops, from our Electronics range.', 550, 700, 35, 'Laptops', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T002')
union all
select id, 'Smartwatches — NovaCart Pick', 'NC-EL-T003', 'Bose', 'A NovaCart pick for smartwatches, from our Electronics range.', 580, 740, 35, 'Smartwatches', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T003')
union all
select id, 'Speakers — NovaCart Pick', 'NC-EL-T004', 'boAt', 'A NovaCart pick for speakers, from our Electronics range.', 620, 790, 35, 'Speakers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T004')
union all
select id, 'Cameras — NovaCart Pick', 'NC-EL-T005', 'Dell', 'A NovaCart pick for cameras, from our Electronics range.', 660, 840, 35, 'Cameras', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T005')
union all
select id, 'Power Banks — NovaCart Pick', 'NC-EL-T006', 'HP', 'A NovaCart pick for power banks, from our Electronics range.', 700, 900, 35, 'Power Banks', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T006')
union all
select id, 'Security Cameras — NovaCart Pick', 'NC-EL-T007', 'Lenovo', 'A NovaCart pick for security cameras, from our Electronics range.', 730, 930, 35, 'Security Cameras', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T007')
union all
select id, 'Gaming Gear — NovaCart Pick', 'NC-EL-T008', 'Apple', 'A NovaCart pick for gaming gear, from our Electronics range.', 770, 990, 35, 'Gaming Gear', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T008')
union all
select id, 'Tablets — NovaCart Pick', 'NC-EL-T009', 'Sennheiser', 'A NovaCart pick for tablets, from our Electronics range.', 810, 1040, 35, 'Tablets', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T009')
union all
select id, 'Monitors — NovaCart Pick', 'NC-EL-T010', 'Logitech', 'A NovaCart pick for monitors, from our Electronics range.', 840, 1080, 35, 'Monitors', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T010')
union all
select id, 'Printers — NovaCart Pick', 'NC-EL-T011', 'ASUS', 'A NovaCart pick for printers, from our Electronics range.', 880, 1130, 35, 'Printers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T011')
union all
select id, 'Routers — NovaCart Pick', 'NC-EL-T012', 'Acer', 'A NovaCart pick for routers, from our Electronics range.', 920, 1180, 35, 'Routers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T012')
union all
select id, 'External Drives — NovaCart Pick', 'NC-EL-T013', 'Canon', 'A NovaCart pick for external drives, from our Electronics range.', 950, 1220, 35, 'External Drives', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T013')
union all
select id, 'Webcams — NovaCart Pick', 'NC-EL-T014', 'Nikon', 'A NovaCart pick for webcams, from our Electronics range.', 990, 1270, 35, 'Webcams', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T014')
union all
select id, 'Drones — NovaCart Pick', 'NC-EL-T015', 'GoPro', 'A NovaCart pick for drones, from our Electronics range.', 1030, 1320, 35, 'Drones', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-T015');

-- ---- Electronics: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'electronics')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Sony — Signature Pick', 'NC-EL-B001', 'Sony', 'A Sony favorite from our Electronics range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B001')
union all
select id, 'JBL — Signature Pick', 'NC-EL-B002', 'JBL', 'A JBL favorite from our Electronics range.', 560, 720, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B002')
union all
select id, 'Bose — Signature Pick', 'NC-EL-B003', 'Bose', 'A Bose favorite from our Electronics range.', 600, 770, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B003')
union all
select id, 'boAt — Signature Pick', 'NC-EL-B004', 'boAt', 'A boAt favorite from our Electronics range.', 630, 810, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B004')
union all
select id, 'Dell — Signature Pick', 'NC-EL-B005', 'Dell', 'A Dell favorite from our Electronics range.', 670, 860, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B005')
union all
select id, 'HP — Signature Pick', 'NC-EL-B006', 'HP', 'A HP favorite from our Electronics range.', 710, 910, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B006')
union all
select id, 'Lenovo — Signature Pick', 'NC-EL-B007', 'Lenovo', 'A Lenovo favorite from our Electronics range.', 740, 950, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B007')
union all
select id, 'Apple — Signature Pick', 'NC-EL-B008', 'Apple', 'A Apple favorite from our Electronics range.', 780, 1000, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B008')
union all
select id, 'Sennheiser — Signature Pick', 'NC-EL-B009', 'Sennheiser', 'A Sennheiser favorite from our Electronics range.', 820, 1050, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B009')
union all
select id, 'Logitech — Signature Pick', 'NC-EL-B010', 'Logitech', 'A Logitech favorite from our Electronics range.', 850, 1090, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B010')
union all
select id, 'ASUS — Signature Pick', 'NC-EL-B011', 'ASUS', 'A ASUS favorite from our Electronics range.', 890, 1140, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B011')
union all
select id, 'Acer — Signature Pick', 'NC-EL-B012', 'Acer', 'A Acer favorite from our Electronics range.', 930, 1190, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B012')
union all
select id, 'Canon — Signature Pick', 'NC-EL-B013', 'Canon', 'A Canon favorite from our Electronics range.', 960, 1230, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B013')
union all
select id, 'Nikon — Signature Pick', 'NC-EL-B014', 'Nikon', 'A Nikon favorite from our Electronics range.', 1000, 1280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B014')
union all
select id, 'GoPro — Signature Pick', 'NC-EL-B015', 'GoPro', 'A GoPro favorite from our Electronics range.', 1040, 1330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-EL-B015');

-- ---- Electronics: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-EL-T001', '/tile-images/electronics/tiles/headphones.jpg'),
  ('NC-EL-T002', '/tile-images/electronics/tiles/laptops.jpg'),
  ('NC-EL-T003', '/tile-images/electronics/tiles/smartwatches.jpg'),
  ('NC-EL-T004', '/tile-images/electronics/tiles/speakers.jpg'),
  ('NC-EL-T005', '/tile-images/electronics/tiles/cameras.jpg'),
  ('NC-EL-T006', '/tile-images/electronics/tiles/power-banks.jpg'),
  ('NC-EL-T007', '/tile-images/electronics/tiles/security-cameras.jpg'),
  ('NC-EL-T008', '/tile-images/electronics/tiles/gaming-gear.jpg'),
  ('NC-EL-T009', '/tile-images/electronics/tiles/tablets.jpg'),
  ('NC-EL-T010', '/tile-images/electronics/tiles/monitors.jpg'),
  ('NC-EL-T011', '/tile-images/electronics/tiles/printers.jpg'),
  ('NC-EL-T012', '/tile-images/electronics/tiles/routers.jpg'),
  ('NC-EL-T013', '/tile-images/electronics/tiles/external-drives.jpg'),
  ('NC-EL-T014', '/tile-images/electronics/tiles/webcams.jpg'),
  ('NC-EL-T015', '/tile-images/electronics/tiles/drones.jpg'),
  ('NC-EL-B001', '/tile-images/electronics/brands/sony.jpg'),
  ('NC-EL-B002', '/tile-images/electronics/brands/jbl.jpg'),
  ('NC-EL-B003', '/tile-images/electronics/brands/bose.jpg'),
  ('NC-EL-B004', '/tile-images/electronics/brands/boat.jpg'),
  ('NC-EL-B005', '/tile-images/electronics/brands/dell.jpg'),
  ('NC-EL-B006', '/tile-images/electronics/brands/hp.jpg'),
  ('NC-EL-B007', '/tile-images/electronics/brands/lenovo.jpg'),
  ('NC-EL-B008', '/tile-images/electronics/brands/apple.jpg'),
  ('NC-EL-B009', '/tile-images/electronics/brands/sennheiser.jpg'),
  ('NC-EL-B010', '/tile-images/electronics/brands/logitech.jpg'),
  ('NC-EL-B011', '/tile-images/electronics/brands/asus.jpg'),
  ('NC-EL-B012', '/tile-images/electronics/brands/acer.png'),
  ('NC-EL-B013', '/tile-images/electronics/brands/canon.jpg'),
  ('NC-EL-B014', '/tile-images/electronics/brands/nikon.jpg'),
  ('NC-EL-B015', '/tile-images/electronics/brands/gopro.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Home & Living: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'home-living')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Cushion Covers — NovaCart Pick', 'NC-HM-T001', 'IKEA', 'A NovaCart pick for cushion covers, from our Home & Living range.', 310, 400, 35, 'Cushion Covers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T001')
union all
select id, 'Figurines & Vases — NovaCart Pick', 'NC-HM-T002', 'Urban Ladder', 'A NovaCart pick for figurines & vases, from our Home & Living range.', 350, 450, 35, 'Figurines & Vases', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T002')
union all
select id, 'Storage — NovaCart Pick', 'NC-HM-T003', 'Pepperfry', 'A NovaCart pick for storage, from our Home & Living range.', 380, 490, 35, 'Storage', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T003')
union all
select id, 'Lighting — NovaCart Pick', 'NC-HM-T004', 'Home Centre', 'A NovaCart pick for lighting, from our Home & Living range.', 420, 540, 35, 'Lighting', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T004')
union all
select id, 'Wall Decor — NovaCart Pick', 'NC-HM-T005', 'Fabindia', 'A NovaCart pick for wall decor, from our Home & Living range.', 460, 590, 35, 'Wall Decor', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T005')
union all
select id, 'Rugs — NovaCart Pick', 'NC-HM-T006', 'Bombay Dyeing', 'A NovaCart pick for rugs, from our Home & Living range.', 500, 640, 35, 'Rugs', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T006')
union all
select id, 'Curtains — NovaCart Pick', 'NC-HM-T007', 'Spaces', 'A NovaCart pick for curtains, from our Home & Living range.', 530, 680, 35, 'Curtains', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T007')
union all
select id, 'Kitchen Linen — NovaCart Pick', 'NC-HM-T008', 'D''décor', 'A NovaCart pick for kitchen linen, from our Home & Living range.', 570, 730, 35, 'Kitchen Linen', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T008')
union all
select id, 'Bedsheets — NovaCart Pick', 'NC-HM-T009', 'Portico', 'A NovaCart pick for bedsheets, from our Home & Living range.', 610, 780, 35, 'Bedsheets', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T009')
union all
select id, 'Mirrors — NovaCart Pick', 'NC-HM-T010', 'Wakefit', 'A NovaCart pick for mirrors, from our Home & Living range.', 640, 820, 35, 'Mirrors', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T010')
union all
select id, 'Clocks — NovaCart Pick', 'NC-HM-T011', 'Chumbak', 'A NovaCart pick for clocks, from our Home & Living range.', 680, 870, 35, 'Clocks', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T011')
union all
select id, 'Planters — NovaCart Pick', 'NC-HM-T012', 'Philips', 'A NovaCart pick for planters, from our Home & Living range.', 720, 920, 35, 'Planters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T012')
union all
select id, 'Photo Frames — NovaCart Pick', 'NC-HM-T013', 'Venus Mirror', 'A NovaCart pick for photo frames, from our Home & Living range.', 750, 960, 35, 'Photo Frames', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T013')
union all
select id, 'Door Mats — NovaCart Pick', 'NC-HM-T014', 'Saral Home', 'A NovaCart pick for door mats, from our Home & Living range.', 790, 1010, 35, 'Door Mats', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T014')
union all
select id, 'Shower Curtains — NovaCart Pick', 'NC-HM-T015', 'CraftMaestros', 'A NovaCart pick for shower curtains, from our Home & Living range.', 830, 1060, 35, 'Shower Curtains', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-T015');

-- ---- Home & Living: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'home-living')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'IKEA — Signature Pick', 'NC-HM-B001', 'IKEA', 'A IKEA favorite from our Home & Living range.', 320, 410, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B001')
union all
select id, 'Urban Ladder — Signature Pick', 'NC-HM-B002', 'Urban Ladder', 'A Urban Ladder favorite from our Home & Living range.', 360, 460, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B002')
union all
select id, 'Pepperfry — Signature Pick', 'NC-HM-B003', 'Pepperfry', 'A Pepperfry favorite from our Home & Living range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B003')
union all
select id, 'Home Centre — Signature Pick', 'NC-HM-B004', 'Home Centre', 'A Home Centre favorite from our Home & Living range.', 430, 550, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B004')
union all
select id, 'Fabindia — Signature Pick', 'NC-HM-B005', 'Fabindia', 'A Fabindia favorite from our Home & Living range.', 470, 600, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B005')
union all
select id, 'Bombay Dyeing — Signature Pick', 'NC-HM-B006', 'Bombay Dyeing', 'A Bombay Dyeing favorite from our Home & Living range.', 510, 650, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B006')
union all
select id, 'Spaces — Signature Pick', 'NC-HM-B007', 'Spaces', 'A Spaces favorite from our Home & Living range.', 540, 690, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B007')
union all
select id, 'D''décor — Signature Pick', 'NC-HM-B008', 'D''décor', 'A D''décor favorite from our Home & Living range.', 580, 740, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B008')
union all
select id, 'Portico — Signature Pick', 'NC-HM-B009', 'Portico', 'A Portico favorite from our Home & Living range.', 620, 790, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B009')
union all
select id, 'Wakefit — Signature Pick', 'NC-HM-B010', 'Wakefit', 'A Wakefit favorite from our Home & Living range.', 650, 830, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B010')
union all
select id, 'Chumbak — Signature Pick', 'NC-HM-B011', 'Chumbak', 'A Chumbak favorite from our Home & Living range.', 690, 880, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B011')
union all
select id, 'Philips — Signature Pick', 'NC-HM-B012', 'Philips', 'A Philips favorite from our Home & Living range.', 730, 930, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B012')
union all
select id, 'Venus Mirror — Signature Pick', 'NC-HM-B013', 'Venus Mirror', 'A Venus Mirror favorite from our Home & Living range.', 760, 970, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B013')
union all
select id, 'Saral Home — Signature Pick', 'NC-HM-B014', 'Saral Home', 'A Saral Home favorite from our Home & Living range.', 800, 1020, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B014')
union all
select id, 'CraftMaestros — Signature Pick', 'NC-HM-B015', 'CraftMaestros', 'A CraftMaestros favorite from our Home & Living range.', 840, 1080, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-HM-B015');

-- ---- Home & Living: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-HM-T001', '/tile-images/home-living/tiles/cushion-covers.jpg'),
  ('NC-HM-T002', '/tile-images/home-living/tiles/figurines-vases.jpg'),
  ('NC-HM-T003', '/tile-images/home-living/tiles/storage.jpg'),
  ('NC-HM-T004', '/tile-images/home-living/tiles/lighting.jpg'),
  ('NC-HM-T005', '/tile-images/home-living/tiles/wall-decor.jpg'),
  ('NC-HM-T006', '/tile-images/home-living/tiles/rugs.jpg'),
  ('NC-HM-T007', '/tile-images/home-living/tiles/curtains.jpg'),
  ('NC-HM-T008', '/tile-images/home-living/tiles/kitchen-linen.jpg'),
  ('NC-HM-T009', '/tile-images/home-living/tiles/bedsheets.jpg'),
  ('NC-HM-T010', '/tile-images/home-living/tiles/mirrors.jpg'),
  ('NC-HM-T011', '/tile-images/home-living/tiles/clocks.jpg'),
  ('NC-HM-T012', '/tile-images/home-living/tiles/planters.jpg'),
  ('NC-HM-T013', '/tile-images/home-living/tiles/photo-frames.jpg'),
  ('NC-HM-T014', '/tile-images/home-living/tiles/door-mats.jpg'),
  ('NC-HM-T015', '/tile-images/home-living/tiles/shower-curtains.jpg'),
  ('NC-HM-B001', '/tile-images/home-living/brands/ikea.jpg'),
  ('NC-HM-B002', '/tile-images/home-living/brands/urban-ladder.jpg'),
  ('NC-HM-B003', '/tile-images/home-living/brands/pepperfry.webp'),
  ('NC-HM-B004', '/tile-images/home-living/brands/home-centre.jpg'),
  ('NC-HM-B005', '/tile-images/home-living/brands/fabindia.webp'),
  ('NC-HM-B006', '/tile-images/home-living/brands/bombay-dyeing.jpg'),
  ('NC-HM-B007', '/tile-images/home-living/brands/spaces.jpg'),
  ('NC-HM-B008', '/tile-images/home-living/brands/d-d-cor.jpg'),
  ('NC-HM-B009', '/tile-images/home-living/brands/portico.jpg'),
  ('NC-HM-B010', '/tile-images/home-living/brands/wakefit.avif'),
  ('NC-HM-B011', '/tile-images/home-living/brands/chumbak.jpg'),
  ('NC-HM-B012', '/tile-images/home-living/brands/philips.avif'),
  ('NC-HM-B013', '/tile-images/home-living/brands/venus-mirror.jpg'),
  ('NC-HM-B014', '/tile-images/home-living/brands/saral-home.jpg'),
  ('NC-HM-B015', '/tile-images/home-living/brands/craftmaestros.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Appliances: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'appliances')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Geysers — NovaCart Pick', 'NC-APL-T001', 'Samsung', 'A NovaCart pick for geysers, from our Appliances range.', 1510, 1930, 35, 'Geysers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T001')
union all
select id, 'Dishwashers — NovaCart Pick', 'NC-APL-T002', 'LG', 'A NovaCart pick for dishwashers, from our Appliances range.', 1550, 1980, 35, 'Dishwashers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T002')
union all
select id, 'Air Purifiers — NovaCart Pick', 'NC-APL-T003', 'Whirlpool', 'A NovaCart pick for air purifiers, from our Appliances range.', 1580, 2020, 35, 'Air Purifiers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T003')
union all
select id, 'Toasters — NovaCart Pick', 'NC-APL-T004', 'Bosch', 'A NovaCart pick for toasters, from our Appliances range.', 1620, 2070, 35, 'Toasters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T004')
union all
select id, 'Electric Kettles — NovaCart Pick', 'NC-APL-T005', 'IFB', 'A NovaCart pick for electric kettles, from our Appliances range.', 1660, 2120, 35, 'Electric Kettles', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T005')
union all
select id, 'Induction Cooktops — NovaCart Pick', 'NC-APL-T006', 'Voltas', 'A NovaCart pick for induction cooktops, from our Appliances range.', 1700, 2180, 35, 'Induction Cooktops', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T006')
union all
select id, 'Coffee Makers — NovaCart Pick', 'NC-APL-T007', 'Haier', 'A NovaCart pick for coffee makers, from our Appliances range.', 1730, 2210, 35, 'Coffee Makers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T007')
union all
select id, 'Chimneys — NovaCart Pick', 'NC-APL-T008', 'Panasonic', 'A NovaCart pick for chimneys, from our Appliances range.', 1770, 2270, 35, 'Chimneys', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-T008');

-- ---- Appliances: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'appliances')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Samsung — Signature Pick', 'NC-APL-B001', 'Samsung', 'A Samsung favorite from our Appliances range.', 1520, 1950, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B001')
union all
select id, 'LG — Signature Pick', 'NC-APL-B002', 'LG', 'A LG favorite from our Appliances range.', 1560, 2000, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B002')
union all
select id, 'Whirlpool — Signature Pick', 'NC-APL-B003', 'Whirlpool', 'A Whirlpool favorite from our Appliances range.', 1600, 2050, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B003')
union all
select id, 'Bosch — Signature Pick', 'NC-APL-B004', 'Bosch', 'A Bosch favorite from our Appliances range.', 1630, 2090, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B004')
union all
select id, 'IFB — Signature Pick', 'NC-APL-B005', 'IFB', 'A IFB favorite from our Appliances range.', 1670, 2140, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B005')
union all
select id, 'Voltas — Signature Pick', 'NC-APL-B006', 'Voltas', 'A Voltas favorite from our Appliances range.', 1710, 2190, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B006')
union all
select id, 'Haier — Signature Pick', 'NC-APL-B007', 'Haier', 'A Haier favorite from our Appliances range.', 1740, 2230, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B007')
union all
select id, 'Panasonic — Signature Pick', 'NC-APL-B008', 'Panasonic', 'A Panasonic favorite from our Appliances range.', 1780, 2280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B008')
union all
select id, 'Godrej — Signature Pick', 'NC-APL-B009', 'Godrej', 'A Godrej favorite from our Appliances range.', 1820, 2330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B009')
union all
select id, 'Philips — Signature Pick', 'NC-APL-B010', 'Philips', 'A Philips favorite from our Appliances range.', 1850, 2370, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B010')
union all
select id, 'Hitachi — Signature Pick', 'NC-APL-B011', 'Hitachi', 'A Hitachi favorite from our Appliances range.', 1890, 2420, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B011')
union all
select id, 'Daikin — Signature Pick', 'NC-APL-B012', 'Daikin', 'A Daikin favorite from our Appliances range.', 1930, 2470, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B012')
union all
select id, 'Havells — Signature Pick', 'NC-APL-B013', 'Havells', 'A Havells favorite from our Appliances range.', 1960, 2510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B013')
union all
select id, 'Bajaj — Signature Pick', 'NC-APL-B014', 'Bajaj', 'A Bajaj favorite from our Appliances range.', 2000, 2560, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B014')
union all
select id, 'Prestige — Signature Pick', 'NC-APL-B015', 'Prestige', 'A Prestige favorite from our Appliances range.', 2040, 2610, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-APL-B015');

-- ---- Appliances: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-APL-T001', '/tile-images/appliances/tiles/geysers.jpg'),
  ('NC-APL-T002', '/tile-images/appliances/tiles/dishwashers.jpg'),
  ('NC-APL-T003', '/tile-images/appliances/tiles/air-purifiers.jpg'),
  ('NC-APL-T004', '/tile-images/appliances/tiles/toasters.jpg'),
  ('NC-APL-T005', '/tile-images/appliances/tiles/electric-kettles.jpg'),
  ('NC-APL-T006', '/tile-images/appliances/tiles/induction-cooktops.jpg'),
  ('NC-APL-T007', '/tile-images/appliances/tiles/coffee-makers.jpg'),
  ('NC-APL-T008', '/tile-images/appliances/tiles/chimneys.jpg'),
  ('NC-APL-B001', '/tile-images/appliances/brands/samsung.jpg'),
  ('NC-APL-B002', '/tile-images/appliances/brands/lg.avif'),
  ('NC-APL-B003', '/tile-images/appliances/brands/whirlpool.webp'),
  ('NC-APL-B004', '/tile-images/appliances/brands/bosch.jpg'),
  ('NC-APL-B005', '/tile-images/appliances/brands/ifb.jpg'),
  ('NC-APL-B006', '/tile-images/appliances/brands/voltas.webp'),
  ('NC-APL-B007', '/tile-images/appliances/brands/haier.webp'),
  ('NC-APL-B008', '/tile-images/appliances/brands/panasonic.jpg'),
  ('NC-APL-B009', '/tile-images/appliances/brands/godrej.png'),
  ('NC-APL-B010', '/tile-images/appliances/brands/philips.jpg'),
  ('NC-APL-B011', '/tile-images/appliances/brands/hitachi.jpg'),
  ('NC-APL-B012', '/tile-images/appliances/brands/daikin.webp'),
  ('NC-APL-B013', '/tile-images/appliances/brands/havells.webp'),
  ('NC-APL-B014', '/tile-images/appliances/brands/bajaj.jpg'),
  ('NC-APL-B015', '/tile-images/appliances/brands/prestige.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Toys & Games: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'toys-games')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Action Figures — NovaCart Pick', 'NC-TG-T001', 'LEGO', 'A NovaCart pick for action figures, from our Toys & Games range.', 210, 270, 35, 'Action Figures', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T001')
union all
select id, 'Outdoor Play — NovaCart Pick', 'NC-TG-T002', 'Hasbro', 'A NovaCart pick for outdoor play, from our Toys & Games range.', 250, 320, 35, 'Outdoor Play', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T002')
union all
select id, 'Educational Toys — NovaCart Pick', 'NC-TG-T003', 'Mattel', 'A NovaCart pick for educational toys, from our Toys & Games range.', 280, 360, 35, 'Educational Toys', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T003')
union all
select id, 'Dolls — NovaCart Pick', 'NC-TG-T004', 'Fisher-Price', 'A NovaCart pick for dolls, from our Toys & Games range.', 320, 410, 35, 'Dolls', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T004')
union all
select id, 'Art & Craft Kits — NovaCart Pick', 'NC-TG-T005', 'Hot Wheels', 'A NovaCart pick for art & craft kits, from our Toys & Games range.', 360, 460, 35, 'Art & Craft Kits', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T005')
union all
select id, 'Musical Toys — NovaCart Pick', 'NC-TG-T006', 'Barbie', 'A NovaCart pick for musical toys, from our Toys & Games range.', 400, 510, 35, 'Musical Toys', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T006')
union all
select id, 'Card Games — NovaCart Pick', 'NC-TG-T007', 'Funskool', 'A NovaCart pick for card games, from our Toys & Games range.', 430, 550, 35, 'Card Games', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T007')
union all
select id, 'Play Dough — NovaCart Pick', 'NC-TG-T008', 'NERF', 'A NovaCart pick for play dough, from our Toys & Games range.', 470, 600, 35, 'Play Dough', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-T008');

-- ---- Toys & Games: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'toys-games')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'LEGO — Signature Pick', 'NC-TG-B001', 'LEGO', 'A LEGO favorite from our Toys & Games range.', 220, 280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B001')
union all
select id, 'Hasbro — Signature Pick', 'NC-TG-B002', 'Hasbro', 'A Hasbro favorite from our Toys & Games range.', 260, 330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B002')
union all
select id, 'Mattel — Signature Pick', 'NC-TG-B003', 'Mattel', 'A Mattel favorite from our Toys & Games range.', 300, 380, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B003')
union all
select id, 'Fisher-Price — Signature Pick', 'NC-TG-B004', 'Fisher-Price', 'A Fisher-Price favorite from our Toys & Games range.', 330, 420, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B004')
union all
select id, 'Hot Wheels — Signature Pick', 'NC-TG-B005', 'Hot Wheels', 'A Hot Wheels favorite from our Toys & Games range.', 370, 470, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B005')
union all
select id, 'Barbie — Signature Pick', 'NC-TG-B006', 'Barbie', 'A Barbie favorite from our Toys & Games range.', 410, 520, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B006')
union all
select id, 'Funskool — Signature Pick', 'NC-TG-B007', 'Funskool', 'A Funskool favorite from our Toys & Games range.', 440, 560, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B007')
union all
select id, 'NERF — Signature Pick', 'NC-TG-B008', 'NERF', 'A NERF favorite from our Toys & Games range.', 480, 610, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B008')
union all
select id, 'Hamleys — Signature Pick', 'NC-TG-B009', 'Hamleys', 'A Hamleys favorite from our Toys & Games range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B009')
union all
select id, 'Chicco — Signature Pick', 'NC-TG-B010', 'Chicco', 'A Chicco favorite from our Toys & Games range.', 550, 700, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B010')
union all
select id, 'VTech — Signature Pick', 'NC-TG-B011', 'VTech', 'A VTech favorite from our Toys & Games range.', 590, 760, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B011')
union all
select id, 'Play-Doh — Signature Pick', 'NC-TG-B012', 'Play-Doh', 'A Play-Doh favorite from our Toys & Games range.', 630, 810, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B012')
union all
select id, 'Monopoly — Signature Pick', 'NC-TG-B013', 'Monopoly', 'A Monopoly favorite from our Toys & Games range.', 660, 840, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B013')
union all
select id, 'Crayola — Signature Pick', 'NC-TG-B014', 'Crayola', 'A Crayola favorite from our Toys & Games range.', 700, 900, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B014')
union all
select id, 'Disney — Signature Pick', 'NC-TG-B015', 'Disney', 'A Disney favorite from our Toys & Games range.', 740, 950, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TG-B015');

-- ---- Toys & Games: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-TG-T001', '/tile-images/toys-games/tiles/action-figures.webp'),
  ('NC-TG-T002', '/tile-images/toys-games/tiles/outdoor-play.webp'),
  ('NC-TG-T003', '/tile-images/toys-games/tiles/educational-toys.avif'),
  ('NC-TG-T004', '/tile-images/toys-games/tiles/dolls.webp'),
  ('NC-TG-T005', '/tile-images/toys-games/tiles/art-craft-kits.jpg'),
  ('NC-TG-T006', '/tile-images/toys-games/tiles/musical-toys.jpg'),
  ('NC-TG-T007', '/tile-images/toys-games/tiles/card-games.jpg'),
  ('NC-TG-T008', '/tile-images/toys-games/tiles/play-dough.jpg'),
  ('NC-TG-B001', '/tile-images/toys-games/brands/lego.jpg'),
  ('NC-TG-B002', '/tile-images/toys-games/brands/hasbro.jpg'),
  ('NC-TG-B003', '/tile-images/toys-games/brands/mattel.jpg'),
  ('NC-TG-B004', '/tile-images/toys-games/brands/fisher-price.jpg'),
  ('NC-TG-B005', '/tile-images/toys-games/brands/hot-wheels.jpg'),
  ('NC-TG-B006', '/tile-images/toys-games/brands/barbie.jpg'),
  ('NC-TG-B007', '/tile-images/toys-games/brands/funskool.png'),
  ('NC-TG-B008', '/tile-images/toys-games/brands/nerf.jpg'),
  ('NC-TG-B009', '/tile-images/toys-games/brands/hamleys.avif'),
  ('NC-TG-B010', '/tile-images/toys-games/brands/chicco.jpg'),
  ('NC-TG-B011', '/tile-images/toys-games/brands/vtech.jpg'),
  ('NC-TG-B012', '/tile-images/toys-games/brands/play-doh.jpg'),
  ('NC-TG-B013', '/tile-images/toys-games/brands/monopoly.jpg'),
  ('NC-TG-B014', '/tile-images/toys-games/brands/crayola.jpg'),
  ('NC-TG-B015', '/tile-images/toys-games/brands/disney.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Food & Household: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'food-household')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Toiletries — NovaCart Pick', 'NC-FH-T001', 'Nestlé', 'A NovaCart pick for toiletries, from our Food & Household range.', 60, 80, 35, 'Toiletries', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T001')
union all
select id, 'Pet Supplies — NovaCart Pick', 'NC-FH-T002', 'Tata', 'A NovaCart pick for pet supplies, from our Food & Household range.', 97, 120, 35, 'Pet Supplies', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T002')
union all
select id, 'Storage Containers — NovaCart Pick', 'NC-FH-T003', 'ITC', 'A NovaCart pick for storage containers, from our Food & Household range.', 134, 170, 35, 'Storage Containers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T003')
union all
select id, 'Breakfast Cereals — NovaCart Pick', 'NC-FH-T004', 'Amul', 'A NovaCart pick for breakfast cereals, from our Food & Household range.', 171, 220, 35, 'Breakfast Cereals', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T004')
union all
select id, 'Dairy & Bakery — NovaCart Pick', 'NC-FH-T005', 'Britannia', 'A NovaCart pick for dairy & bakery, from our Food & Household range.', 210, 270, 35, 'Dairy & Bakery', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T005')
union all
select id, 'Laundry Care — NovaCart Pick', 'NC-FH-T006', 'Colgate', 'A NovaCart pick for laundry care, from our Food & Household range.', 240, 310, 35, 'Laundry Care', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T006')
union all
select id, 'Paper Products — NovaCart Pick', 'NC-FH-T007', 'Dettol', 'A NovaCart pick for paper products, from our Food & Household range.', 280, 360, 35, 'Paper Products', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T007')
union all
select id, 'Air Fresheners — NovaCart Pick', 'NC-FH-T008', 'Surf Excel', 'A NovaCart pick for air fresheners, from our Food & Household range.', 320, 410, 35, 'Air Fresheners', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T008')
union all
select id, 'Disposables — NovaCart Pick', 'NC-FH-T009', 'Vim', 'A NovaCart pick for disposables, from our Food & Household range.', 360, 460, 35, 'Disposables', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-T009');

-- ---- Food & Household: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'food-household')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Nestlé — Signature Pick', 'NC-FH-B001', 'Nestlé', 'A Nestlé favorite from our Food & Household range.', 71, 90, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B001')
union all
select id, 'Tata — Signature Pick', 'NC-FH-B002', 'Tata', 'A Tata favorite from our Food & Household range.', 108, 140, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B002')
union all
select id, 'ITC — Signature Pick', 'NC-FH-B003', 'ITC', 'A ITC favorite from our Food & Household range.', 145, 190, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B003')
union all
select id, 'Amul — Signature Pick', 'NC-FH-B004', 'Amul', 'A Amul favorite from our Food & Household range.', 182, 230, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B004')
union all
select id, 'Britannia — Signature Pick', 'NC-FH-B005', 'Britannia', 'A Britannia favorite from our Food & Household range.', 220, 280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B005')
union all
select id, 'Colgate — Signature Pick', 'NC-FH-B006', 'Colgate', 'A Colgate favorite from our Food & Household range.', 260, 330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B006')
union all
select id, 'Dettol — Signature Pick', 'NC-FH-B007', 'Dettol', 'A Dettol favorite from our Food & Household range.', 290, 370, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B007')
union all
select id, 'Surf Excel — Signature Pick', 'NC-FH-B008', 'Surf Excel', 'A Surf Excel favorite from our Food & Household range.', 330, 420, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B008')
union all
select id, 'Vim — Signature Pick', 'NC-FH-B009', 'Vim', 'A Vim favorite from our Food & Household range.', 370, 470, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B009')
union all
select id, 'Harpic — Signature Pick', 'NC-FH-B010', 'Harpic', 'A Harpic favorite from our Food & Household range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B010')
union all
select id, 'Lizol — Signature Pick', 'NC-FH-B011', 'Lizol', 'A Lizol favorite from our Food & Household range.', 440, 560, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B011')
union all
select id, 'Parle — Signature Pick', 'NC-FH-B012', 'Parle', 'A Parle favorite from our Food & Household range.', 480, 610, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B012')
union all
select id, 'Haldiram''s — Signature Pick', 'NC-FH-B013', 'Haldiram''s', 'A Haldiram''s favorite from our Food & Household range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B013')
union all
select id, 'Patanjali — Signature Pick', 'NC-FH-B014', 'Patanjali', 'A Patanjali favorite from our Food & Household range.', 550, 700, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B014')
union all
select id, 'Fortune — Signature Pick', 'NC-FH-B015', 'Fortune', 'A Fortune favorite from our Food & Household range.', 590, 760, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FH-B015');

-- ---- Food & Household: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-FH-T001', '/tile-images/food-household/tiles/toiletries.jpg'),
  ('NC-FH-T002', '/tile-images/food-household/tiles/pet-supplies.webp'),
  ('NC-FH-T003', '/tile-images/food-household/tiles/storage-containers.jpg'),
  ('NC-FH-T004', '/tile-images/food-household/tiles/breakfast-cereals.jpg'),
  ('NC-FH-T005', '/tile-images/food-household/tiles/dairy-bakery.jpg'),
  ('NC-FH-T006', '/tile-images/food-household/tiles/laundry-care.jpg'),
  ('NC-FH-T007', '/tile-images/food-household/tiles/paper-products.jpg'),
  ('NC-FH-T008', '/tile-images/food-household/tiles/air-fresheners.jpg'),
  ('NC-FH-T009', '/tile-images/food-household/tiles/disposables.jpg'),
  ('NC-FH-B001', '/tile-images/food-household/brands/nestl.png'),
  ('NC-FH-B002', '/tile-images/food-household/brands/tata.webp'),
  ('NC-FH-B003', '/tile-images/food-household/brands/itc.jpg'),
  ('NC-FH-B004', '/tile-images/food-household/brands/amul.jpg'),
  ('NC-FH-B005', '/tile-images/food-household/brands/britannia.jpg'),
  ('NC-FH-B006', '/tile-images/food-household/brands/colgate.jpg'),
  ('NC-FH-B007', '/tile-images/food-household/brands/dettol.avif'),
  ('NC-FH-B008', '/tile-images/food-household/brands/surf-excel.jpg'),
  ('NC-FH-B009', '/tile-images/food-household/brands/vim.webp'),
  ('NC-FH-B010', '/tile-images/food-household/brands/harpic.jpg'),
  ('NC-FH-B011', '/tile-images/food-household/brands/lizol.jpg'),
  ('NC-FH-B012', '/tile-images/food-household/brands/parle.jpg'),
  ('NC-FH-B013', '/tile-images/food-household/brands/haldiram-s.jpg'),
  ('NC-FH-B014', '/tile-images/food-household/brands/patanjali.jpg'),
  ('NC-FH-B015', '/tile-images/food-household/brands/fortune.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Auto Accessories: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'auto-accessories')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Car Covers — NovaCart Pick', 'NC-AA-T001', '3M', 'A NovaCart pick for car covers, from our Auto Accessories range.', 210, 270, 35, 'Car Covers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T001')
union all
select id, 'Car Perfumes — NovaCart Pick', 'NC-AA-T002', 'Turtle Wax', 'A NovaCart pick for car perfumes, from our Auto Accessories range.', 250, 320, 35, 'Car Perfumes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T002')
union all
select id, 'Car Chargers — NovaCart Pick', 'NC-AA-T003', 'Michelin', 'A NovaCart pick for car chargers, from our Auto Accessories range.', 280, 360, 35, 'Car Chargers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T003')
union all
select id, 'Floor Mats — NovaCart Pick', 'NC-AA-T004', 'Meguiars', 'A NovaCart pick for floor mats, from our Auto Accessories range.', 320, 410, 35, 'Floor Mats', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T004')
union all
select id, 'Sun Shades — NovaCart Pick', 'NC-AA-T005', 'Armor All', 'A NovaCart pick for sun shades, from our Auto Accessories range.', 360, 460, 35, 'Sun Shades', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T005')
union all
select id, 'Steering Covers — NovaCart Pick', 'NC-AA-T006', 'Bridgestone', 'A NovaCart pick for steering covers, from our Auto Accessories range.', 400, 510, 35, 'Steering Covers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T006')
union all
select id, 'Tool Kits — NovaCart Pick', 'NC-AA-T007', 'CEAT', 'A NovaCart pick for tool kits, from our Auto Accessories range.', 430, 550, 35, 'Tool Kits', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T007')
union all
select id, 'Jump Starters — NovaCart Pick', 'NC-AA-T008', 'Auravya', 'A NovaCart pick for jump starters, from our Auto Accessories range.', 470, 600, 35, 'Jump Starters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T008')
union all
select id, 'Dash Cams — NovaCart Pick', 'NC-AA-T009', 'Apollo Tyres', 'A NovaCart pick for dash cams, from our Auto Accessories range.', 510, 650, 35, 'Dash Cams', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-T009');

-- ---- Auto Accessories: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'auto-accessories')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, '3M — Signature Pick', 'NC-AA-B001', '3M', 'A 3M favorite from our Auto Accessories range.', 220, 280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B001')
union all
select id, 'Turtle Wax — Signature Pick', 'NC-AA-B002', 'Turtle Wax', 'A Turtle Wax favorite from our Auto Accessories range.', 260, 330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B002')
union all
select id, 'Michelin — Signature Pick', 'NC-AA-B003', 'Michelin', 'A Michelin favorite from our Auto Accessories range.', 300, 380, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B003')
union all
select id, 'Meguiars — Signature Pick', 'NC-AA-B004', 'Meguiars', 'A Meguiars favorite from our Auto Accessories range.', 330, 420, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B004')
union all
select id, 'Armor All — Signature Pick', 'NC-AA-B005', 'Armor All', 'A Armor All favorite from our Auto Accessories range.', 370, 470, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B005')
union all
select id, 'Bridgestone — Signature Pick', 'NC-AA-B006', 'Bridgestone', 'A Bridgestone favorite from our Auto Accessories range.', 410, 520, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B006')
union all
select id, 'CEAT — Signature Pick', 'NC-AA-B007', 'CEAT', 'A CEAT favorite from our Auto Accessories range.', 440, 560, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B007')
union all
select id, 'Auravya — Signature Pick', 'NC-AA-B008', 'Auravya', 'A Auravya favorite from our Auto Accessories range.', 480, 610, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B008')
union all
select id, 'Apollo Tyres — Signature Pick', 'NC-AA-B009', 'Apollo Tyres', 'A Apollo Tyres favorite from our Auto Accessories range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B009')
union all
select id, 'Steelbird — Signature Pick', 'NC-AA-B010', 'Steelbird', 'A Steelbird favorite from our Auto Accessories range.', 550, 700, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B010')
union all
select id, 'Vega — Signature Pick', 'NC-AA-B011', 'Vega', 'A Vega favorite from our Auto Accessories range.', 590, 760, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B011')
union all
select id, 'Studds — Signature Pick', 'NC-AA-B012', 'Studds', 'A Studds favorite from our Auto Accessories range.', 630, 810, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B012')
union all
select id, 'Motul — Signature Pick', 'NC-AA-B013', 'Motul', 'A Motul favorite from our Auto Accessories range.', 660, 840, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B013')
union all
select id, 'Carbinic — Signature Pick', 'NC-AA-B014', 'Carbinic', 'A Carbinic favorite from our Auto Accessories range.', 700, 900, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B014')
union all
select id, 'Credicus — Signature Pick', 'NC-AA-B015', 'Credicus', 'A Credicus favorite from our Auto Accessories range.', 740, 950, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AA-B015');

-- ---- Auto Accessories: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-AA-T001', '/tile-images/auto-accessories/tiles/car-covers.webp'),
  ('NC-AA-T002', '/tile-images/auto-accessories/tiles/car-perfumes.jpg'),
  ('NC-AA-T003', '/tile-images/auto-accessories/tiles/car-chargers.jpg'),
  ('NC-AA-T004', '/tile-images/auto-accessories/tiles/floor-mats.jpg'),
  ('NC-AA-T005', '/tile-images/auto-accessories/tiles/sun-shades.jpg'),
  ('NC-AA-T006', '/tile-images/auto-accessories/tiles/steering-covers.jpg'),
  ('NC-AA-T007', '/tile-images/auto-accessories/tiles/tool-kits.jpg'),
  ('NC-AA-T008', '/tile-images/auto-accessories/tiles/jump-starters.jpg'),
  ('NC-AA-T009', '/tile-images/auto-accessories/tiles/dash-cams.jpg'),
  ('NC-AA-B001', '/tile-images/auto-accessories/brands/3m.jpg'),
  ('NC-AA-B002', '/tile-images/auto-accessories/brands/turtle-wax.webp'),
  ('NC-AA-B003', '/tile-images/auto-accessories/brands/michelin.jpg'),
  ('NC-AA-B004', '/tile-images/auto-accessories/brands/meguiars.jpg'),
  ('NC-AA-B005', '/tile-images/auto-accessories/brands/armor-all.jpg'),
  ('NC-AA-B006', '/tile-images/auto-accessories/brands/bridgestone.jpg'),
  ('NC-AA-B007', '/tile-images/auto-accessories/brands/ceat.jpg'),
  ('NC-AA-B008', '/tile-images/auto-accessories/brands/auravya.jpg'),
  ('NC-AA-B009', '/tile-images/auto-accessories/brands/apollo-tyres.jpg'),
  ('NC-AA-B010', '/tile-images/auto-accessories/brands/steelbird.jpg'),
  ('NC-AA-B011', '/tile-images/auto-accessories/brands/vega.jpg'),
  ('NC-AA-B012', '/tile-images/auto-accessories/brands/studds.jpg'),
  ('NC-AA-B013', '/tile-images/auto-accessories/brands/motul.jpg'),
  ('NC-AA-B014', '/tile-images/auto-accessories/brands/carbinic.jpg'),
  ('NC-AA-B015', '/tile-images/auto-accessories/brands/credicus.webp')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Two Wheelers: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'two-wheelers')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Sports Bikes — NovaCart Pick', 'NC-TW-T001', 'Hero Splendor', 'A NovaCart pick for sports bikes, from our Two Wheelers range.', 510, 650, 35, 'Sports Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T001')
union all
select id, 'Cruiser Bikes — NovaCart Pick', 'NC-TW-T002', 'Royal Enfield Hunter', 'A NovaCart pick for cruiser bikes, from our Two Wheelers range.', 550, 700, 35, 'Cruiser Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T002')
union all
select id, 'Adventure Bikes — NovaCart Pick', 'NC-TW-T003', 'Bajaj Pulsar', 'A NovaCart pick for adventure bikes, from our Two Wheelers range.', 580, 740, 35, 'Adventure Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T003')
union all
select id, 'Commuter Bikes — NovaCart Pick', 'NC-TW-T004', 'TVS Apache', 'A NovaCart pick for commuter bikes, from our Two Wheelers range.', 620, 790, 35, 'Commuter Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T004')
union all
select id, 'Electric Scooters — NovaCart Pick', 'NC-TW-T005', 'Honda Activa', 'A NovaCart pick for electric scooters, from our Two Wheelers range.', 660, 840, 35, 'Electric Scooters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T005')
union all
select id, 'Scooters — NovaCart Pick', 'NC-TW-T006', 'Yamaha FZ', 'A NovaCart pick for scooters, from our Two Wheelers range.', 700, 900, 35, 'Scooters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T006')
union all
select id, 'Mopeds — NovaCart Pick', 'NC-TW-T007', 'KTM Duke', 'A NovaCart pick for mopeds, from our Two Wheelers range.', 730, 930, 35, 'Mopeds', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T007')
union all
select id, 'Off-Road Bikes — NovaCart Pick', 'NC-TW-T008', 'Suzuki Access', 'A NovaCart pick for off-road bikes, from our Two Wheelers range.', 770, 990, 35, 'Off-Road Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T008')
union all
select id, 'Café Racers — NovaCart Pick', 'NC-TW-T009', 'Hero Glamour', 'A NovaCart pick for café racers, from our Two Wheelers range.', 810, 1040, 35, 'Café Racers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T009')
union all
select id, 'Electric Bikes — NovaCart Pick', 'NC-TW-T010', 'Bajaj Avenger', 'A NovaCart pick for electric bikes, from our Two Wheelers range.', 840, 1080, 35, 'Electric Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T010')
union all
select id, 'Touring Bikes — NovaCart Pick', 'NC-TW-T011', 'Royal Enfield Classic', 'A NovaCart pick for touring bikes, from our Two Wheelers range.', 880, 1130, 35, 'Touring Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T011')
union all
select id, 'Naked Bikes — NovaCart Pick', 'NC-TW-T012', 'TVS Ntorq', 'A NovaCart pick for naked bikes, from our Two Wheelers range.', 920, 1180, 35, 'Naked Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T012')
union all
select id, 'Retro & Classic Bikes — NovaCart Pick', 'NC-TW-T013', 'Honda Shine', 'A NovaCart pick for retro & classic bikes, from our Two Wheelers range.', 950, 1220, 35, 'Retro & Classic Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T013')
union all
select id, 'Sports Scooters — NovaCart Pick', 'NC-TW-T014', 'Yamaha R15', 'A NovaCart pick for sports scooters, from our Two Wheelers range.', 990, 1270, 35, 'Sports Scooters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T014')
union all
select id, 'Kids Bikes — NovaCart Pick', 'NC-TW-T015', 'Suzuki Gixxer', 'A NovaCart pick for kids bikes, from our Two Wheelers range.', 1030, 1320, 35, 'Kids Bikes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-T015');

-- ---- Two Wheelers: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'two-wheelers')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Hero Splendor — Signature Pick', 'NC-TW-B001', 'Hero Splendor', 'A Hero Splendor favorite from our Two Wheelers range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B001')
union all
select id, 'Royal Enfield Hunter — Signature Pick', 'NC-TW-B002', 'Royal Enfield Hunter', 'A Royal Enfield Hunter favorite from our Two Wheelers range.', 560, 720, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B002')
union all
select id, 'Bajaj Pulsar — Signature Pick', 'NC-TW-B003', 'Bajaj Pulsar', 'A Bajaj Pulsar favorite from our Two Wheelers range.', 600, 770, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B003')
union all
select id, 'TVS Apache — Signature Pick', 'NC-TW-B004', 'TVS Apache', 'A TVS Apache favorite from our Two Wheelers range.', 630, 810, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B004')
union all
select id, 'Honda Activa — Signature Pick', 'NC-TW-B005', 'Honda Activa', 'A Honda Activa favorite from our Two Wheelers range.', 670, 860, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B005')
union all
select id, 'Yamaha FZ — Signature Pick', 'NC-TW-B006', 'Yamaha FZ', 'A Yamaha FZ favorite from our Two Wheelers range.', 710, 910, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B006')
union all
select id, 'KTM Duke — Signature Pick', 'NC-TW-B007', 'KTM Duke', 'A KTM Duke favorite from our Two Wheelers range.', 740, 950, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B007')
union all
select id, 'Suzuki Access — Signature Pick', 'NC-TW-B008', 'Suzuki Access', 'A Suzuki Access favorite from our Two Wheelers range.', 780, 1000, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B008')
union all
select id, 'Hero Glamour — Signature Pick', 'NC-TW-B009', 'Hero Glamour', 'A Hero Glamour favorite from our Two Wheelers range.', 820, 1050, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B009')
union all
select id, 'Bajaj Avenger — Signature Pick', 'NC-TW-B010', 'Bajaj Avenger', 'A Bajaj Avenger favorite from our Two Wheelers range.', 850, 1090, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B010')
union all
select id, 'Royal Enfield Classic — Signature Pick', 'NC-TW-B011', 'Royal Enfield Classic', 'A Royal Enfield Classic favorite from our Two Wheelers range.', 890, 1140, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B011')
union all
select id, 'TVS Ntorq — Signature Pick', 'NC-TW-B012', 'TVS Ntorq', 'A TVS Ntorq favorite from our Two Wheelers range.', 930, 1190, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B012')
union all
select id, 'Honda Shine — Signature Pick', 'NC-TW-B013', 'Honda Shine', 'A Honda Shine favorite from our Two Wheelers range.', 960, 1230, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B013')
union all
select id, 'Yamaha R15 — Signature Pick', 'NC-TW-B014', 'Yamaha R15', 'A Yamaha R15 favorite from our Two Wheelers range.', 1000, 1280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B014')
union all
select id, 'Suzuki Gixxer — Signature Pick', 'NC-TW-B015', 'Suzuki Gixxer', 'A Suzuki Gixxer favorite from our Two Wheelers range.', 1040, 1330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-TW-B015');

-- ---- Two Wheelers: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-TW-T001', '/tile-images/two-wheelers/tiles/sports-bikes.jpg'),
  ('NC-TW-T002', '/tile-images/two-wheelers/tiles/cruiser-bikes.jpg'),
  ('NC-TW-T003', '/tile-images/two-wheelers/tiles/adventure-bikes.jpg'),
  ('NC-TW-T004', '/tile-images/two-wheelers/tiles/commuter-bikes.webp'),
  ('NC-TW-T005', '/tile-images/two-wheelers/tiles/electric-scooters.jpg'),
  ('NC-TW-T006', '/tile-images/two-wheelers/tiles/scooters.png'),
  ('NC-TW-T007', '/tile-images/two-wheelers/tiles/mopeds.avif'),
  ('NC-TW-T008', '/tile-images/two-wheelers/tiles/off-road-bikes.jpg'),
  ('NC-TW-T009', '/tile-images/two-wheelers/tiles/caf-racers.jpg'),
  ('NC-TW-T010', '/tile-images/two-wheelers/tiles/electric-bikes.avif'),
  ('NC-TW-T011', '/tile-images/two-wheelers/tiles/touring-bikes.jpg'),
  ('NC-TW-T012', '/tile-images/two-wheelers/tiles/naked-bikes.jpg'),
  ('NC-TW-T013', '/tile-images/two-wheelers/tiles/retro-classic-bikes.jpg'),
  ('NC-TW-T014', '/tile-images/two-wheelers/tiles/sports-scooters.jpg'),
  ('NC-TW-T015', '/tile-images/two-wheelers/tiles/kids-bikes.jpg'),
  ('NC-TW-B001', '/tile-images/two-wheelers/brands/hero-splendor.avif'),
  ('NC-TW-B002', '/tile-images/two-wheelers/brands/royal-enfield-hunter.avif'),
  ('NC-TW-B003', '/tile-images/two-wheelers/brands/bajaj-pulsar.avif'),
  ('NC-TW-B004', '/tile-images/two-wheelers/brands/tvs-apache.avif'),
  ('NC-TW-B005', '/tile-images/two-wheelers/brands/honda-activa.jpg'),
  ('NC-TW-B006', '/tile-images/two-wheelers/brands/yamaha-fz.jpg'),
  ('NC-TW-B007', '/tile-images/two-wheelers/brands/ktm-duke.jpg'),
  ('NC-TW-B008', '/tile-images/two-wheelers/brands/suzuki-access.jpg'),
  ('NC-TW-B009', '/tile-images/two-wheelers/brands/hero-glamour.jpg'),
  ('NC-TW-B010', '/tile-images/two-wheelers/brands/bajaj-avenger.jpg'),
  ('NC-TW-B011', '/tile-images/two-wheelers/brands/royal-enfield-classic.jpg'),
  ('NC-TW-B012', '/tile-images/two-wheelers/brands/tvs-ntorq.webp'),
  ('NC-TW-B013', '/tile-images/two-wheelers/brands/honda-shine.jpg'),
  ('NC-TW-B014', '/tile-images/two-wheelers/brands/yamaha-r15.jpg'),
  ('NC-TW-B015', '/tile-images/two-wheelers/brands/suzuki-gixxer.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Sports & Outdoors: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'sports-outdoors')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Badminton — NovaCart Pick', 'NC-SP-T001', 'SG', 'A NovaCart pick for badminton, from our Sports & Outdoors range.', 310, 400, 35, 'Badminton', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T001')
union all
select id, 'Football — NovaCart Pick', 'NC-SP-T002', 'Kookaburra', 'A NovaCart pick for football, from our Sports & Outdoors range.', 350, 450, 35, 'Football', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T002')
union all
select id, 'Tennis — NovaCart Pick', 'NC-SP-T003', 'MRF', 'A NovaCart pick for tennis, from our Sports & Outdoors range.', 380, 490, 35, 'Tennis', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T003')
union all
select id, 'Table Tennis — NovaCart Pick', 'NC-SP-T004', 'Li-Ning', 'A NovaCart pick for table tennis, from our Sports & Outdoors range.', 420, 540, 35, 'Table Tennis', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T004')
union all
select id, 'Basketball — NovaCart Pick', 'NC-SP-T005', 'Yonex', 'A NovaCart pick for basketball, from our Sports & Outdoors range.', 460, 590, 35, 'Basketball', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T005')
union all
select id, 'Volleyball — NovaCart Pick', 'NC-SP-T006', 'Nivia', 'A NovaCart pick for volleyball, from our Sports & Outdoors range.', 500, 640, 35, 'Volleyball', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T006')
union all
select id, 'Swimming Gear — NovaCart Pick', 'NC-SP-T007', 'Molten', 'A NovaCart pick for swimming gear, from our Sports & Outdoors range.', 530, 680, 35, 'Swimming Gear', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T007')
union all
select id, 'Fishing Gear — NovaCart Pick', 'NC-SP-T008', 'Spalding', 'A NovaCart pick for fishing gear, from our Sports & Outdoors range.', 570, 730, 35, 'Fishing Gear', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T008')
union all
select id, 'Hockey — NovaCart Pick', 'NC-SP-T009', 'Head', 'A NovaCart pick for hockey, from our Sports & Outdoors range.', 610, 780, 35, 'Hockey', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T009')
union all
select id, 'Skiing — NovaCart Pick', 'NC-SP-T010', 'Rival', 'A NovaCart pick for skiing, from our Sports & Outdoors range.', 640, 820, 35, 'Skiing', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-T010');

-- ---- Sports & Outdoors: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'sports-outdoors')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'SG — Signature Pick', 'NC-SP-B001', 'SG', 'A SG favorite from our Sports & Outdoors range.', 320, 410, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B001')
union all
select id, 'Kookaburra — Signature Pick', 'NC-SP-B002', 'Kookaburra', 'A Kookaburra favorite from our Sports & Outdoors range.', 360, 460, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B002')
union all
select id, 'MRF — Signature Pick', 'NC-SP-B003', 'MRF', 'A MRF favorite from our Sports & Outdoors range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B003')
union all
select id, 'Li-Ning — Signature Pick', 'NC-SP-B004', 'Li-Ning', 'A Li-Ning favorite from our Sports & Outdoors range.', 430, 550, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B004')
union all
select id, 'Yonex — Signature Pick', 'NC-SP-B005', 'Yonex', 'A Yonex favorite from our Sports & Outdoors range.', 470, 600, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B005')
union all
select id, 'Nivia — Signature Pick', 'NC-SP-B006', 'Nivia', 'A Nivia favorite from our Sports & Outdoors range.', 510, 650, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B006')
union all
select id, 'Molten — Signature Pick', 'NC-SP-B007', 'Molten', 'A Molten favorite from our Sports & Outdoors range.', 540, 690, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B007')
union all
select id, 'Spalding — Signature Pick', 'NC-SP-B008', 'Spalding', 'A Spalding favorite from our Sports & Outdoors range.', 580, 740, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B008')
union all
select id, 'Head — Signature Pick', 'NC-SP-B009', 'Head', 'A Head favorite from our Sports & Outdoors range.', 620, 790, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B009')
union all
select id, 'Rival — Signature Pick', 'NC-SP-B010', 'Rival', 'A Rival favorite from our Sports & Outdoors range.', 650, 830, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B010')
union all
select id, 'Quechua — Signature Pick', 'NC-SP-B011', 'Quechua', 'A Quechua favorite from our Sports & Outdoors range.', 690, 880, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B011')
union all
select id, 'The North Face — Signature Pick', 'NC-SP-B012', 'The North Face', 'A The North Face favorite from our Sports & Outdoors range.', 730, 930, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B012')
union all
select id, 'Wildcraft — Signature Pick', 'NC-SP-B013', 'Wildcraft', 'A Wildcraft favorite from our Sports & Outdoors range.', 760, 970, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B013')
union all
select id, 'Dunlop — Signature Pick', 'NC-SP-B014', 'Dunlop', 'A Dunlop favorite from our Sports & Outdoors range.', 800, 1020, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B014')
union all
select id, 'Forclaz — Signature Pick', 'NC-SP-B015', 'Forclaz', 'A Forclaz favorite from our Sports & Outdoors range.', 840, 1080, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-SP-B015');

-- ---- Sports & Outdoors: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-SP-T001', '/tile-images/sports-outdoors/tiles/badminton.jpg'),
  ('NC-SP-T002', '/tile-images/sports-outdoors/tiles/football.jpg'),
  ('NC-SP-T003', '/tile-images/sports-outdoors/tiles/tennis.jpg'),
  ('NC-SP-T004', '/tile-images/sports-outdoors/tiles/table-tennis.jpg'),
  ('NC-SP-T005', '/tile-images/sports-outdoors/tiles/basketball.jpg'),
  ('NC-SP-T006', '/tile-images/sports-outdoors/tiles/volleyball.jpg'),
  ('NC-SP-T007', '/tile-images/sports-outdoors/tiles/swimming-gear.jpg'),
  ('NC-SP-T008', '/tile-images/sports-outdoors/tiles/fishing-gear.jpg'),
  ('NC-SP-T009', '/tile-images/sports-outdoors/tiles/hockey.jpg'),
  ('NC-SP-T010', '/tile-images/sports-outdoors/tiles/skiing.jpg'),
  ('NC-SP-B001', '/tile-images/sports-outdoors/brands/sg.webp'),
  ('NC-SP-B002', '/tile-images/sports-outdoors/brands/kookaburra.jpg'),
  ('NC-SP-B003', '/tile-images/sports-outdoors/brands/mrf.jpg'),
  ('NC-SP-B004', '/tile-images/sports-outdoors/brands/li-ning.jpg'),
  ('NC-SP-B005', '/tile-images/sports-outdoors/brands/yonex.jpg'),
  ('NC-SP-B006', '/tile-images/sports-outdoors/brands/nivia.jpg'),
  ('NC-SP-B007', '/tile-images/sports-outdoors/brands/molten.jpg'),
  ('NC-SP-B008', '/tile-images/sports-outdoors/brands/spalding.webp'),
  ('NC-SP-B009', '/tile-images/sports-outdoors/brands/head.jpg'),
  ('NC-SP-B010', '/tile-images/sports-outdoors/brands/rival.jpg'),
  ('NC-SP-B011', '/tile-images/sports-outdoors/brands/quechua.jpg'),
  ('NC-SP-B012', '/tile-images/sports-outdoors/brands/the-north-face.jpg'),
  ('NC-SP-B013', '/tile-images/sports-outdoors/brands/wildcraft.jpg'),
  ('NC-SP-B014', '/tile-images/sports-outdoors/brands/dunlop.jpg'),
  ('NC-SP-B015', '/tile-images/sports-outdoors/brands/forclaz.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Books & Stationery: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'books-stationery')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Art Supplies — NovaCart Pick', 'NC-BS-T001', 'Penguin', 'A NovaCart pick for art supplies, from our Books & Stationery range.', 60, 80, 35, 'Art Supplies', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T001')
union all
select id, 'Comics & Manga — NovaCart Pick', 'NC-BS-T002', 'HarperCollins', 'A NovaCart pick for comics & manga, from our Books & Stationery range.', 97, 120, 35, 'Comics & Manga', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T002')
union all
select id, 'Bookmarks — NovaCart Pick', 'NC-BS-T003', 'Classmate', 'A NovaCart pick for bookmarks, from our Books & Stationery range.', 134, 170, 35, 'Bookmarks', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T003')
union all
select id, 'Diaries — NovaCart Pick', 'NC-BS-T004', 'Camlin', 'A NovaCart pick for diaries, from our Books & Stationery range.', 171, 220, 35, 'Diaries', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T004')
union all
select id, 'Sticky Notes — NovaCart Pick', 'NC-BS-T005', 'Parker', 'A NovaCart pick for sticky notes, from our Books & Stationery range.', 210, 270, 35, 'Sticky Notes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T005')
union all
select id, 'Highlighters — NovaCart Pick', 'NC-BS-T006', 'Faber-Castell', 'A NovaCart pick for highlighters, from our Books & Stationery range.', 240, 310, 35, 'Highlighters', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T006')
union all
select id, 'File Organizers — NovaCart Pick', 'NC-BS-T007', 'Staedtler', 'A NovaCart pick for file organizers, from our Books & Stationery range.', 280, 360, 35, 'File Organizers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T007')
union all
select id, 'Greeting Cards — NovaCart Pick', 'NC-BS-T008', 'Amar Chitra Katha', 'A NovaCart pick for greeting cards, from our Books & Stationery range.', 320, 410, 35, 'Greeting Cards', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T008')
union all
select id, 'Calculators — NovaCart Pick', 'NC-BS-T009', 'Scholastic', 'A NovaCart pick for calculators, from our Books & Stationery range.', 360, 460, 35, 'Calculators', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-T009');

-- ---- Books & Stationery: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'books-stationery')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Penguin — Signature Pick', 'NC-BS-B001', 'Penguin', 'A Penguin favorite from our Books & Stationery range.', 71, 90, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B001')
union all
select id, 'HarperCollins — Signature Pick', 'NC-BS-B002', 'HarperCollins', 'A HarperCollins favorite from our Books & Stationery range.', 108, 140, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B002')
union all
select id, 'Classmate — Signature Pick', 'NC-BS-B003', 'Classmate', 'A Classmate favorite from our Books & Stationery range.', 145, 190, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B003')
union all
select id, 'Camlin — Signature Pick', 'NC-BS-B004', 'Camlin', 'A Camlin favorite from our Books & Stationery range.', 182, 230, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B004')
union all
select id, 'Parker — Signature Pick', 'NC-BS-B005', 'Parker', 'A Parker favorite from our Books & Stationery range.', 220, 280, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B005')
union all
select id, 'Faber-Castell — Signature Pick', 'NC-BS-B006', 'Faber-Castell', 'A Faber-Castell favorite from our Books & Stationery range.', 260, 330, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B006')
union all
select id, 'Staedtler — Signature Pick', 'NC-BS-B007', 'Staedtler', 'A Staedtler favorite from our Books & Stationery range.', 290, 370, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B007')
union all
select id, 'Amar Chitra Katha — Signature Pick', 'NC-BS-B008', 'Amar Chitra Katha', 'A Amar Chitra Katha favorite from our Books & Stationery range.', 330, 420, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B008')
union all
select id, 'Scholastic — Signature Pick', 'NC-BS-B009', 'Scholastic', 'A Scholastic favorite from our Books & Stationery range.', 370, 470, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B009')
union all
select id, 'Oxford — Signature Pick', 'NC-BS-B010', 'Oxford', 'A Oxford favorite from our Books & Stationery range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B010')
union all
select id, 'Natraj — Signature Pick', 'NC-BS-B011', 'Natraj', 'A Natraj favorite from our Books & Stationery range.', 440, 560, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B011')
union all
select id, 'Doms — Signature Pick', 'NC-BS-B012', 'Doms', 'A Doms favorite from our Books & Stationery range.', 480, 610, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B012')
union all
select id, 'Reynolds — Signature Pick', 'NC-BS-B013', 'Reynolds', 'A Reynolds favorite from our Books & Stationery range.', 520, 670, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B013')
union all
select id, 'Cello — Signature Pick', 'NC-BS-B014', 'Cello', 'A Cello favorite from our Books & Stationery range.', 550, 700, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B014')
union all
select id, 'Navneet — Signature Pick', 'NC-BS-B015', 'Navneet', 'A Navneet favorite from our Books & Stationery range.', 590, 760, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-BS-B015');

-- ---- Books & Stationery: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-BS-T001', '/tile-images/books-stationery/tiles/art-supplies.jpg'),
  ('NC-BS-T002', '/tile-images/books-stationery/tiles/comics-manga.webp'),
  ('NC-BS-T003', '/tile-images/books-stationery/tiles/bookmarks.jpg'),
  ('NC-BS-T004', '/tile-images/books-stationery/tiles/diaries.jpg'),
  ('NC-BS-T005', '/tile-images/books-stationery/tiles/sticky-notes.jpg'),
  ('NC-BS-T006', '/tile-images/books-stationery/tiles/highlighters.jpg'),
  ('NC-BS-T007', '/tile-images/books-stationery/tiles/file-organizers.jpg'),
  ('NC-BS-T008', '/tile-images/books-stationery/tiles/greeting-cards.jpg'),
  ('NC-BS-T009', '/tile-images/books-stationery/tiles/calculators.jpg'),
  ('NC-BS-B001', '/tile-images/books-stationery/brands/penguin.jpg'),
  ('NC-BS-B002', '/tile-images/books-stationery/brands/harpercollins.avif'),
  ('NC-BS-B003', '/tile-images/books-stationery/brands/classmate.jpg'),
  ('NC-BS-B004', '/tile-images/books-stationery/brands/camlin.jpg'),
  ('NC-BS-B005', '/tile-images/books-stationery/brands/parker.jpg'),
  ('NC-BS-B006', '/tile-images/books-stationery/brands/faber-castell.jpg'),
  ('NC-BS-B007', '/tile-images/books-stationery/brands/staedtler.jpg'),
  ('NC-BS-B008', '/tile-images/books-stationery/brands/amar-chitra-katha.jpg'),
  ('NC-BS-B009', '/tile-images/books-stationery/brands/scholastic.png'),
  ('NC-BS-B010', '/tile-images/books-stationery/brands/oxford.jpg'),
  ('NC-BS-B011', '/tile-images/books-stationery/brands/natraj.jpg'),
  ('NC-BS-B012', '/tile-images/books-stationery/brands/doms.jpg'),
  ('NC-BS-B013', '/tile-images/books-stationery/brands/reynolds.jpg'),
  ('NC-BS-B014', '/tile-images/books-stationery/brands/cello.jpg'),
  ('NC-BS-B015', '/tile-images/books-stationery/brands/navneet.webp')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Furniture: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'furniture')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Storage Units — NovaCart Pick', 'NC-FN-T001', 'Durian', 'A NovaCart pick for storage units, from our Furniture range.', 1010, 1290, 35, 'Storage Units', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T001')
union all
select id, 'Dining Sets — NovaCart Pick', 'NC-FN-T002', 'Fabindia', 'A NovaCart pick for dining sets, from our Furniture range.', 1050, 1340, 35, 'Dining Sets', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T002')
union all
select id, 'Wardrobes — NovaCart Pick', 'NC-FN-T003', 'Fendi Casa', 'A NovaCart pick for wardrobes, from our Furniture range.', 1080, 1380, 35, 'Wardrobes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T003')
union all
select id, 'Recliners — NovaCart Pick', 'NC-FN-T004', 'Godrej Interio', 'A NovaCart pick for recliners, from our Furniture range.', 1120, 1430, 35, 'Recliners', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T004')
union all
select id, 'Coffee Tables — NovaCart Pick', 'NC-FN-T005', 'Haus Luxuriant', 'A NovaCart pick for coffee tables, from our Furniture range.', 1160, 1480, 35, 'Coffee Tables', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T005')
union all
select id, 'Bean Bags — NovaCart Pick', 'NC-FN-T006', 'Herman Miller', 'A NovaCart pick for bean bags, from our Furniture range.', 1200, 1540, 35, 'Bean Bags', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T006')
union all
select id, 'Shoe Racks — NovaCart Pick', 'NC-FN-T007', 'IKEA', 'A NovaCart pick for shoe racks, from our Furniture range.', 1230, 1570, 35, 'Shoe Racks', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T007')
union all
select id, 'Bar Stools — NovaCart Pick', 'NC-FN-T008', 'Kartell', 'A NovaCart pick for bar stools, from our Furniture range.', 1270, 1630, 35, 'Bar Stools', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T008')
union all
select id, 'Kids Furniture — NovaCart Pick', 'NC-FN-T009', 'Nilkamal', 'A NovaCart pick for kids furniture, from our Furniture range.', 1310, 1680, 35, 'Kids Furniture', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-T009');

-- ---- Furniture: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'furniture')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Durian — Signature Pick', 'NC-FN-B001', 'Durian', 'A Durian favorite from our Furniture range.', 1020, 1310, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B001')
union all
select id, 'Fabindia — Signature Pick', 'NC-FN-B002', 'Fabindia', 'A Fabindia favorite from our Furniture range.', 1060, 1360, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B002')
union all
select id, 'Fendi Casa — Signature Pick', 'NC-FN-B003', 'Fendi Casa', 'A Fendi Casa favorite from our Furniture range.', 1100, 1410, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B003')
union all
select id, 'Godrej Interio — Signature Pick', 'NC-FN-B004', 'Godrej Interio', 'A Godrej Interio favorite from our Furniture range.', 1130, 1450, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B004')
union all
select id, 'Haus Luxuriant — Signature Pick', 'NC-FN-B005', 'Haus Luxuriant', 'A Haus Luxuriant favorite from our Furniture range.', 1170, 1500, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B005')
union all
select id, 'Herman Miller — Signature Pick', 'NC-FN-B006', 'Herman Miller', 'A Herman Miller favorite from our Furniture range.', 1210, 1550, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B006')
union all
select id, 'IKEA — Signature Pick', 'NC-FN-B007', 'IKEA', 'A IKEA favorite from our Furniture range.', 1240, 1590, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B007')
union all
select id, 'Kartell — Signature Pick', 'NC-FN-B008', 'Kartell', 'A Kartell favorite from our Furniture range.', 1280, 1640, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B008')
union all
select id, 'Nilkamal — Signature Pick', 'NC-FN-B009', 'Nilkamal', 'A Nilkamal favorite from our Furniture range.', 1320, 1690, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B009')
union all
select id, 'Pepperfry — Signature Pick', 'NC-FN-B010', 'Pepperfry', 'A Pepperfry favorite from our Furniture range.', 1350, 1730, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B010')
union all
select id, 'Roche Bobois — Signature Pick', 'NC-FN-B011', 'Roche Bobois', 'A Roche Bobois favorite from our Furniture range.', 1390, 1780, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B011')
union all
select id, 'Steelcase — Signature Pick', 'NC-FN-B012', 'Steelcase', 'A Steelcase favorite from our Furniture range.', 1430, 1830, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B012')
union all
select id, 'Urban Ladder — Signature Pick', 'NC-FN-B013', 'Urban Ladder', 'A Urban Ladder favorite from our Furniture range.', 1460, 1870, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B013')
union all
select id, 'Wakefit — Signature Pick', 'NC-FN-B014', 'Wakefit', 'A Wakefit favorite from our Furniture range.', 1500, 1920, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B014')
union all
select id, 'Wooden Street — Signature Pick', 'NC-FN-B015', 'Wooden Street', 'A Wooden Street favorite from our Furniture range.', 1540, 1970, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FN-B015');

-- ---- Furniture: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-FN-T001', '/tile-images/furniture/tiles/storage-units.webp'),
  ('NC-FN-T002', '/tile-images/furniture/tiles/dining-sets.jpg'),
  ('NC-FN-T003', '/tile-images/furniture/tiles/wardrobes.jpg'),
  ('NC-FN-T004', '/tile-images/furniture/tiles/recliners.jpg'),
  ('NC-FN-T005', '/tile-images/furniture/tiles/coffee-tables.jpg'),
  ('NC-FN-T006', '/tile-images/furniture/tiles/bean-bags.jpg'),
  ('NC-FN-T007', '/tile-images/furniture/tiles/shoe-racks.jpg'),
  ('NC-FN-T008', '/tile-images/furniture/tiles/bar-stools.jpg'),
  ('NC-FN-T009', '/tile-images/furniture/tiles/kids-furniture.jpg'),
  ('NC-FN-B001', '/tile-images/furniture/brands/durian.avif'),
  ('NC-FN-B002', '/tile-images/furniture/brands/fabindia.avif'),
  ('NC-FN-B003', '/tile-images/furniture/brands/fendi-casa.jpg'),
  ('NC-FN-B004', '/tile-images/furniture/brands/godrej-interio.webp'),
  ('NC-FN-B005', '/tile-images/furniture/brands/haus-luxuriant.jpg'),
  ('NC-FN-B006', '/tile-images/furniture/brands/herman-miller.jpg'),
  ('NC-FN-B007', '/tile-images/furniture/brands/ikea.webp'),
  ('NC-FN-B008', '/tile-images/furniture/brands/kartell.jpg'),
  ('NC-FN-B009', '/tile-images/furniture/brands/nilkamal.webp'),
  ('NC-FN-B010', '/tile-images/furniture/brands/pepperfry.jpg'),
  ('NC-FN-B011', '/tile-images/furniture/brands/roche-bobois.jpg'),
  ('NC-FN-B012', '/tile-images/furniture/brands/steelcase.jpg'),
  ('NC-FN-B013', '/tile-images/furniture/brands/urban-ladder.webp'),
  ('NC-FN-B014', '/tile-images/furniture/brands/wakefit.jpg'),
  ('NC-FN-B015', '/tile-images/furniture/brands/wooden-street.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Accessories: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'accessories')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Ties & Cufflinks — NovaCart Pick', 'NC-AC-T001', 'Fossil', 'A NovaCart pick for ties & cufflinks, from our Accessories range.', 310, 400, 35, 'Ties & Cufflinks', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T001')
union all
select id, 'Pocket Squares — NovaCart Pick', 'NC-AC-T002', 'Titan', 'A NovaCart pick for pocket squares, from our Accessories range.', 350, 450, 35, 'Pocket Squares', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T002')
union all
select id, 'Caps — NovaCart Pick', 'NC-AC-T003', 'Ray-Ban', 'A NovaCart pick for caps, from our Accessories range.', 380, 490, 35, 'Caps', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T003')
union all
select id, 'Keychains — NovaCart Pick', 'NC-AC-T004', 'Louis Philippe', 'A NovaCart pick for keychains, from our Accessories range.', 420, 540, 35, 'Keychains', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T004')
union all
select id, 'Phone Accessories — NovaCart Pick', 'NC-AC-T005', 'Nike', 'A NovaCart pick for phone accessories, from our Accessories range.', 460, 590, 35, 'Phone Accessories', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T005')
union all
select id, 'Men''s Bracelets — NovaCart Pick', 'NC-AC-T006', 'Michael Kors', 'A NovaCart pick for men''s bracelets, from our Accessories range.', 500, 640, 35, 'Men''s Bracelets', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T006')
union all
select id, 'Men''s Rings — NovaCart Pick', 'NC-AC-T007', 'Tommy Hilfiger', 'A NovaCart pick for men''s rings, from our Accessories range.', 530, 680, 35, 'Men''s Rings', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T007')
union all
select id, 'Gloves — NovaCart Pick', 'NC-AC-T008', 'Puma', 'A NovaCart pick for gloves, from our Accessories range.', 570, 730, 35, 'Gloves', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T008')
union all
select id, 'Men''s Umbrellas — NovaCart Pick', 'NC-AC-T009', 'Palmonas', 'A NovaCart pick for men''s umbrellas, from our Accessories range.', 610, 780, 35, 'Men''s Umbrellas', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T009')
union all
select id, 'Card Holders — NovaCart Pick', 'NC-AC-T010', 'Fastrack', 'A NovaCart pick for card holders, from our Accessories range.', 640, 820, 35, 'Card Holders', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T010')
union all
select id, 'Rings — NovaCart Pick', 'NC-AC-T011', 'Giva', 'A NovaCart pick for rings, from our Accessories range.', 680, 870, 35, 'Rings', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T011')
union all
select id, 'Hair Accessories — NovaCart Pick', 'NC-AC-T012', 'Baggit', 'A NovaCart pick for hair accessories, from our Accessories range.', 720, 920, 35, 'Hair Accessories', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T012')
union all
select id, 'Belts — NovaCart Pick', 'NC-AC-T013', 'Woodland', 'A NovaCart pick for belts, from our Accessories range.', 750, 960, 35, 'Belts', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T013')
union all
select id, 'Clutches — NovaCart Pick', 'NC-AC-T014', 'Timex', 'A NovaCart pick for clutches, from our Accessories range.', 790, 1010, 35, 'Clutches', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T014')
union all
select id, 'Scrunchies — NovaCart Pick', 'NC-AC-T015', 'Guess', 'A NovaCart pick for scrunchies, from our Accessories range.', 830, 1060, 35, 'Scrunchies', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T015')
union all
select id, 'Stoles — NovaCart Pick', 'NC-AC-T016', 'Fossil', 'A NovaCart pick for stoles, from our Accessories range.', 860, 1100, 35, 'Stoles', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T016')
union all
select id, 'Bracelets — NovaCart Pick', 'NC-AC-T017', 'Titan', 'A NovaCart pick for bracelets, from our Accessories range.', 900, 1150, 35, 'Bracelets', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T017')
union all
select id, 'Anklets — NovaCart Pick', 'NC-AC-T018', 'Ray-Ban', 'A NovaCart pick for anklets, from our Accessories range.', 940, 1200, 35, 'Anklets', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T018')
union all
select id, 'Umbrellas — NovaCart Pick', 'NC-AC-T019', 'Louis Philippe', 'A NovaCart pick for umbrellas, from our Accessories range.', 980, 1250, 35, 'Umbrellas', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-T019');

-- ---- Accessories: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'accessories')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Fossil — Signature Pick', 'NC-AC-B001', 'Fossil', 'A Fossil favorite from our Accessories range.', 320, 410, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B001')
union all
select id, 'Titan — Signature Pick', 'NC-AC-B002', 'Titan', 'A Titan favorite from our Accessories range.', 360, 460, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B002')
union all
select id, 'Ray-Ban — Signature Pick', 'NC-AC-B003', 'Ray-Ban', 'A Ray-Ban favorite from our Accessories range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B003')
union all
select id, 'Louis Philippe — Signature Pick', 'NC-AC-B004', 'Louis Philippe', 'A Louis Philippe favorite from our Accessories range.', 430, 550, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B004')
union all
select id, 'Nike — Signature Pick', 'NC-AC-B005', 'Nike', 'A Nike favorite from our Accessories range.', 470, 600, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B005')
union all
select id, 'Michael Kors — Signature Pick', 'NC-AC-B006', 'Michael Kors', 'A Michael Kors favorite from our Accessories range.', 510, 650, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B006')
union all
select id, 'Tommy Hilfiger — Signature Pick', 'NC-AC-B007', 'Tommy Hilfiger', 'A Tommy Hilfiger favorite from our Accessories range.', 540, 690, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B007')
union all
select id, 'Puma — Signature Pick', 'NC-AC-B008', 'Puma', 'A Puma favorite from our Accessories range.', 580, 740, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B008')
union all
select id, 'Palmonas — Signature Pick', 'NC-AC-B009', 'Palmonas', 'A Palmonas favorite from our Accessories range.', 620, 790, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B009')
union all
select id, 'Fastrack — Signature Pick', 'NC-AC-B010', 'Fastrack', 'A Fastrack favorite from our Accessories range.', 650, 830, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B010')
union all
select id, 'Giva — Signature Pick', 'NC-AC-B011', 'Giva', 'A Giva favorite from our Accessories range.', 690, 880, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B011')
union all
select id, 'Baggit — Signature Pick', 'NC-AC-B012', 'Baggit', 'A Baggit favorite from our Accessories range.', 730, 930, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B012')
union all
select id, 'Woodland — Signature Pick', 'NC-AC-B013', 'Woodland', 'A Woodland favorite from our Accessories range.', 760, 970, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B013')
union all
select id, 'Timex — Signature Pick', 'NC-AC-B014', 'Timex', 'A Timex favorite from our Accessories range.', 800, 1020, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B014')
union all
select id, 'Guess — Signature Pick', 'NC-AC-B015', 'Guess', 'A Guess favorite from our Accessories range.', 840, 1080, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AC-B015');

-- ---- Accessories: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-AC-T001', '/tile-images/accessories/tiles/ties-cufflinks.webp'),
  ('NC-AC-T002', '/tile-images/accessories/tiles/pocket-squares.jpg'),
  ('NC-AC-T003', '/tile-images/accessories/tiles/caps.jpg'),
  ('NC-AC-T004', '/tile-images/accessories/tiles/keychains.webp'),
  ('NC-AC-T005', '/tile-images/accessories/tiles/phone-accessories.webp'),
  ('NC-AC-T006', '/tile-images/accessories/tiles/men-s-bracelets.jpg'),
  ('NC-AC-T007', '/tile-images/accessories/tiles/men-s-rings.jpg'),
  ('NC-AC-T008', '/tile-images/accessories/tiles/gloves.jpg'),
  ('NC-AC-T009', '/tile-images/accessories/tiles/men-s-umbrellas.webp'),
  ('NC-AC-T010', '/tile-images/accessories/tiles/card-holders.jpg'),
  ('NC-AC-T011', '/tile-images/accessories/tiles/rings.jpg'),
  ('NC-AC-T012', '/tile-images/accessories/tiles/hair-accessories.webp'),
  ('NC-AC-T013', '/tile-images/accessories/tiles/belts.webp'),
  ('NC-AC-T014', '/tile-images/accessories/tiles/clutches.jpg'),
  ('NC-AC-T015', '/tile-images/accessories/tiles/scrunchies.webp'),
  ('NC-AC-T016', '/tile-images/accessories/tiles/stoles.webp'),
  ('NC-AC-T017', '/tile-images/accessories/tiles/bracelets.webp'),
  ('NC-AC-T018', '/tile-images/accessories/tiles/anklets.jpg'),
  ('NC-AC-T019', '/tile-images/accessories/tiles/umbrellas.jpg'),
  ('NC-AC-B001', '/tile-images/accessories/brands/fossil.avif'),
  ('NC-AC-B002', '/tile-images/accessories/brands/titan.webp'),
  ('NC-AC-B003', '/tile-images/accessories/brands/ray-ban.jpg'),
  ('NC-AC-B004', '/tile-images/accessories/brands/louis-philippe.jpg'),
  ('NC-AC-B005', '/tile-images/accessories/brands/nike.webp'),
  ('NC-AC-B006', '/tile-images/accessories/brands/michael-kors.jpg'),
  ('NC-AC-B007', '/tile-images/accessories/brands/tommy-hilfiger.jpg'),
  ('NC-AC-B008', '/tile-images/accessories/brands/puma.jpg'),
  ('NC-AC-B009', '/tile-images/accessories/brands/palmonas.jpg'),
  ('NC-AC-B010', '/tile-images/accessories/brands/fastrack.jpg'),
  ('NC-AC-B011', '/tile-images/accessories/brands/giva.avif'),
  ('NC-AC-B012', '/tile-images/accessories/brands/baggit.webp'),
  ('NC-AC-B013', '/tile-images/accessories/brands/woodland.jpg'),
  ('NC-AC-B014', '/tile-images/accessories/brands/timex.webp'),
  ('NC-AC-B015', '/tile-images/accessories/brands/guess.avif')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Apparel: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'apparel')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Track Pants — NovaCart Pick', 'NC-AP-T001', 'Levi''s', 'A NovaCart pick for track pants, from our Apparel range.', 410, 520, 35, 'Track Pants', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T001')
union all
select id, 'Men''s Ethnic Wear — NovaCart Pick', 'NC-AP-T002', 'Allen Solly', 'A NovaCart pick for men''s ethnic wear, from our Apparel range.', 450, 580, 35, 'Men''s Ethnic Wear', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T002')
union all
select id, 'Shorts — NovaCart Pick', 'NC-AP-T003', 'Adidas', 'A NovaCart pick for shorts, from our Apparel range.', 480, 610, 35, 'Shorts', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T003')
union all
select id, 'Men''s Activewear — NovaCart Pick', 'NC-AP-T004', 'Van Heusen', 'A NovaCart pick for men''s activewear, from our Apparel range.', 520, 670, 35, 'Men''s Activewear', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T004')
union all
select id, 'Men''s Innerwear — NovaCart Pick', 'NC-AP-T005', 'H&M', 'A NovaCart pick for men''s innerwear, from our Apparel range.', 560, 720, 35, 'Men''s Innerwear', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T005')
union all
select id, 'Thermal Wear — NovaCart Pick', 'NC-AP-T006', 'Zara', 'A NovaCart pick for thermal wear, from our Apparel range.', 600, 770, 35, 'Thermal Wear', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T006')
union all
select id, 'Loungewear — NovaCart Pick', 'NC-AP-T007', 'Uniqlo', 'A NovaCart pick for loungewear, from our Apparel range.', 630, 810, 35, 'Loungewear', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T007')
union all
select id, 'Polo Shirts — NovaCart Pick', 'NC-AP-T008', 'Gap', 'A NovaCart pick for polo shirts, from our Apparel range.', 670, 860, 35, 'Polo Shirts', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T008')
union all
select id, 'Men''s Jackets — NovaCart Pick', 'NC-AP-T009', 'US Polo Assn', 'A NovaCart pick for men''s jackets, from our Apparel range.', 710, 910, 35, 'Men''s Jackets', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T009')
union all
select id, 'Vests — NovaCart Pick', 'NC-AP-T010', 'Jack & Jones', 'A NovaCart pick for vests, from our Apparel range.', 740, 950, 35, 'Vests', 'men', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T010')
union all
select id, 'Skirts — NovaCart Pick', 'NC-AP-T011', 'Pepe Jeans', 'A NovaCart pick for skirts, from our Apparel range.', 780, 1000, 35, 'Skirts', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T011')
union all
select id, 'Jumpsuits — NovaCart Pick', 'NC-AP-T012', 'Wrangler', 'A NovaCart pick for jumpsuits, from our Apparel range.', 820, 1050, 35, 'Jumpsuits', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T012')
union all
select id, 'Co-ord Sets — NovaCart Pick', 'NC-AP-T013', 'Lee', 'A NovaCart pick for co-ord sets, from our Apparel range.', 850, 1090, 35, 'Co-ord Sets', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T013')
union all
select id, 'Sarees — NovaCart Pick', 'NC-AP-T014', 'Superdry', 'A NovaCart pick for sarees, from our Apparel range.', 890, 1140, 35, 'Sarees', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T014')
union all
select id, 'Kurtis — NovaCart Pick', 'NC-AP-T015', 'Roadster', 'A NovaCart pick for kurtis, from our Apparel range.', 930, 1190, 35, 'Kurtis', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T015')
union all
select id, 'Nightwear — NovaCart Pick', 'NC-AP-T016', 'Levi''s', 'A NovaCart pick for nightwear, from our Apparel range.', 960, 1230, 35, 'Nightwear', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T016')
union all
select id, 'Blazers — NovaCart Pick', 'NC-AP-T017', 'Allen Solly', 'A NovaCart pick for blazers, from our Apparel range.', 1000, 1280, 35, 'Blazers', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T017')
union all
select id, 'Activewear — NovaCart Pick', 'NC-AP-T018', 'Adidas', 'A NovaCart pick for activewear, from our Apparel range.', 1040, 1330, 35, 'Activewear', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T018')
union all
select id, 'Innerwear — NovaCart Pick', 'NC-AP-T019', 'Van Heusen', 'A NovaCart pick for innerwear, from our Apparel range.', 1080, 1380, 35, 'Innerwear', 'women', false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-T019');

-- ---- Apparel: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'apparel')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Levi''s — Signature Pick', 'NC-AP-B001', 'Levi''s', 'A Levi''s favorite from our Apparel range.', 420, 540, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B001')
union all
select id, 'Allen Solly — Signature Pick', 'NC-AP-B002', 'Allen Solly', 'A Allen Solly favorite from our Apparel range.', 460, 590, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B002')
union all
select id, 'Adidas — Signature Pick', 'NC-AP-B003', 'Adidas', 'A Adidas favorite from our Apparel range.', 500, 640, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B003')
union all
select id, 'Van Heusen — Signature Pick', 'NC-AP-B004', 'Van Heusen', 'A Van Heusen favorite from our Apparel range.', 530, 680, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B004')
union all
select id, 'H&M — Signature Pick', 'NC-AP-B005', 'H&M', 'A H&M favorite from our Apparel range.', 570, 730, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B005')
union all
select id, 'Zara — Signature Pick', 'NC-AP-B006', 'Zara', 'A Zara favorite from our Apparel range.', 610, 780, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B006')
union all
select id, 'Uniqlo — Signature Pick', 'NC-AP-B007', 'Uniqlo', 'A Uniqlo favorite from our Apparel range.', 640, 820, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B007')
union all
select id, 'Gap — Signature Pick', 'NC-AP-B008', 'Gap', 'A Gap favorite from our Apparel range.', 680, 870, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B008')
union all
select id, 'US Polo Assn — Signature Pick', 'NC-AP-B009', 'US Polo Assn', 'A US Polo Assn favorite from our Apparel range.', 720, 920, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B009')
union all
select id, 'Jack & Jones — Signature Pick', 'NC-AP-B010', 'Jack & Jones', 'A Jack & Jones favorite from our Apparel range.', 750, 960, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B010')
union all
select id, 'Pepe Jeans — Signature Pick', 'NC-AP-B011', 'Pepe Jeans', 'A Pepe Jeans favorite from our Apparel range.', 790, 1010, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B011')
union all
select id, 'Wrangler — Signature Pick', 'NC-AP-B012', 'Wrangler', 'A Wrangler favorite from our Apparel range.', 830, 1060, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B012')
union all
select id, 'Lee — Signature Pick', 'NC-AP-B013', 'Lee', 'A Lee favorite from our Apparel range.', 860, 1100, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B013')
union all
select id, 'Superdry — Signature Pick', 'NC-AP-B014', 'Superdry', 'A Superdry favorite from our Apparel range.', 900, 1150, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B014')
union all
select id, 'Roadster — Signature Pick', 'NC-AP-B015', 'Roadster', 'A Roadster favorite from our Apparel range.', 940, 1200, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-AP-B015');

-- ---- Apparel: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-AP-T001', '/tile-images/apparel/tiles/track-pants.webp'),
  ('NC-AP-T002', '/tile-images/apparel/tiles/men-s-ethnic-wear.jpeg'),
  ('NC-AP-T003', '/tile-images/apparel/tiles/shorts.jpg'),
  ('NC-AP-T004', '/tile-images/apparel/tiles/men-s-activewear.jpg'),
  ('NC-AP-T005', '/tile-images/apparel/tiles/men-s-innerwear.jpg'),
  ('NC-AP-T006', '/tile-images/apparel/tiles/thermal-wear.jpg'),
  ('NC-AP-T007', '/tile-images/apparel/tiles/loungewear.webp'),
  ('NC-AP-T008', '/tile-images/apparel/tiles/polo-shirts.jpg'),
  ('NC-AP-T009', '/tile-images/apparel/tiles/men-s-jackets.jpg'),
  ('NC-AP-T010', '/tile-images/apparel/tiles/vests.jpg'),
  ('NC-AP-T011', '/tile-images/apparel/tiles/skirts.jpg'),
  ('NC-AP-T012', '/tile-images/apparel/tiles/jumpsuits.jpg'),
  ('NC-AP-T013', '/tile-images/apparel/tiles/co-ord-sets.jpg'),
  ('NC-AP-T014', '/tile-images/apparel/tiles/sarees.jpg'),
  ('NC-AP-T015', '/tile-images/apparel/tiles/kurtis.webp'),
  ('NC-AP-T016', '/tile-images/apparel/tiles/nightwear.png'),
  ('NC-AP-T017', '/tile-images/apparel/tiles/blazers.jpg'),
  ('NC-AP-T018', '/tile-images/apparel/tiles/activewear.jpg'),
  ('NC-AP-T019', '/tile-images/apparel/tiles/innerwear.jpg'),
  ('NC-AP-B001', '/tile-images/apparel/brands/levi-s.jpg'),
  ('NC-AP-B002', '/tile-images/apparel/brands/allen-solly.jpg'),
  ('NC-AP-B003', '/tile-images/apparel/brands/adidas.avif'),
  ('NC-AP-B004', '/tile-images/apparel/brands/van-heusen.avif'),
  ('NC-AP-B005', '/tile-images/apparel/brands/h-m.jpg'),
  ('NC-AP-B006', '/tile-images/apparel/brands/zara.jpg'),
  ('NC-AP-B007', '/tile-images/apparel/brands/uniqlo.jpg'),
  ('NC-AP-B008', '/tile-images/apparel/brands/gap.jpg'),
  ('NC-AP-B009', '/tile-images/apparel/brands/us-polo-assn.jpg'),
  ('NC-AP-B010', '/tile-images/apparel/brands/jack-jones.jpg'),
  ('NC-AP-B011', '/tile-images/apparel/brands/pepe-jeans.jpg'),
  ('NC-AP-B012', '/tile-images/apparel/brands/wrangler.jpg'),
  ('NC-AP-B013', '/tile-images/apparel/brands/lee.webp'),
  ('NC-AP-B014', '/tile-images/apparel/brands/superdry.jpg'),
  ('NC-AP-B015', '/tile-images/apparel/brands/roadster.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Fitness: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'fitness')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Water Bottles — NovaCart Pick', 'NC-FT-T001', 'HRX', 'A NovaCart pick for water bottles, from our Fitness range.', 310, 400, 35, 'Water Bottles', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T001')
union all
select id, 'Yoga Mats — NovaCart Pick', 'NC-FT-T002', 'Cultsport', 'A NovaCart pick for yoga mats, from our Fitness range.', 350, 450, 35, 'Yoga Mats', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T002')
union all
select id, 'Resistance Bands — NovaCart Pick', 'NC-FT-T003', 'Boldfit', 'A NovaCart pick for resistance bands, from our Fitness range.', 380, 490, 35, 'Resistance Bands', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T003')
union all
select id, 'Dumbbells — NovaCart Pick', 'NC-FT-T004', 'Domyos', 'A NovaCart pick for dumbbells, from our Fitness range.', 420, 540, 35, 'Dumbbells', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T004')
union all
select id, 'Foam Rollers — NovaCart Pick', 'NC-FT-T005', 'Kore', 'A NovaCart pick for foam rollers, from our Fitness range.', 460, 590, 35, 'Foam Rollers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T005')
union all
select id, 'Gym Bags — NovaCart Pick', 'NC-FT-T006', 'Everlast', 'A NovaCart pick for gym bags, from our Fitness range.', 500, 640, 35, 'Gym Bags', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T006')
union all
select id, 'Jump Ropes — NovaCart Pick', 'NC-FT-T007', 'Aurion', 'A NovaCart pick for jump ropes, from our Fitness range.', 530, 680, 35, 'Jump Ropes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T007')
union all
select id, 'Fitness Trackers — NovaCart Pick', 'NC-FT-T008', 'Strauss', 'A NovaCart pick for fitness trackers, from our Fitness range.', 570, 730, 35, 'Fitness Trackers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T008')
union all
select id, 'Treadmills — NovaCart Pick', 'NC-FT-T009', 'Fitkit', 'A NovaCart pick for treadmills, from our Fitness range.', 610, 780, 35, 'Treadmills', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T009')
union all
select id, 'Kettlebells — NovaCart Pick', 'NC-FT-T010', 'GoFit', 'A NovaCart pick for kettlebells, from our Fitness range.', 640, 820, 35, 'Kettlebells', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T010')
union all
select id, 'Pull-Up Bars — NovaCart Pick', 'NC-FT-T011', 'Decathlon', 'A NovaCart pick for pull-up bars, from our Fitness range.', 680, 870, 35, 'Pull-Up Bars', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T011')
union all
select id, 'Massage Guns — NovaCart Pick', 'NC-FT-T012', 'Cosco', 'A NovaCart pick for massage guns, from our Fitness range.', 720, 920, 35, 'Massage Guns', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T012')
union all
select id, 'Protein Shakers — NovaCart Pick', 'NC-FT-T013', 'Reebok', 'A NovaCart pick for protein shakers, from our Fitness range.', 750, 960, 35, 'Protein Shakers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T013')
union all
select id, 'Ab Rollers — NovaCart Pick', 'NC-FT-T014', 'Under Armour', 'A NovaCart pick for ab rollers, from our Fitness range.', 790, 1010, 35, 'Ab Rollers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T014')
union all
select id, 'Gym Gloves — NovaCart Pick', 'NC-FT-T015', 'Nivia', 'A NovaCart pick for gym gloves, from our Fitness range.', 830, 1060, 35, 'Gym Gloves', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-T015');

-- ---- Fitness: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'fitness')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'HRX — Signature Pick', 'NC-FT-B001', 'HRX', 'A HRX favorite from our Fitness range.', 320, 410, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B001')
union all
select id, 'Cultsport — Signature Pick', 'NC-FT-B002', 'Cultsport', 'A Cultsport favorite from our Fitness range.', 360, 460, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B002')
union all
select id, 'Boldfit — Signature Pick', 'NC-FT-B003', 'Boldfit', 'A Boldfit favorite from our Fitness range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B003')
union all
select id, 'Domyos — Signature Pick', 'NC-FT-B004', 'Domyos', 'A Domyos favorite from our Fitness range.', 430, 550, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B004')
union all
select id, 'Kore — Signature Pick', 'NC-FT-B005', 'Kore', 'A Kore favorite from our Fitness range.', 470, 600, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B005')
union all
select id, 'Everlast — Signature Pick', 'NC-FT-B006', 'Everlast', 'A Everlast favorite from our Fitness range.', 510, 650, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B006')
union all
select id, 'Aurion — Signature Pick', 'NC-FT-B007', 'Aurion', 'A Aurion favorite from our Fitness range.', 540, 690, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B007')
union all
select id, 'Strauss — Signature Pick', 'NC-FT-B008', 'Strauss', 'A Strauss favorite from our Fitness range.', 580, 740, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B008')
union all
select id, 'Fitkit — Signature Pick', 'NC-FT-B009', 'Fitkit', 'A Fitkit favorite from our Fitness range.', 620, 790, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B009')
union all
select id, 'GoFit — Signature Pick', 'NC-FT-B010', 'GoFit', 'A GoFit favorite from our Fitness range.', 650, 830, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B010')
union all
select id, 'Decathlon — Signature Pick', 'NC-FT-B011', 'Decathlon', 'A Decathlon favorite from our Fitness range.', 690, 880, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B011')
union all
select id, 'Cosco — Signature Pick', 'NC-FT-B012', 'Cosco', 'A Cosco favorite from our Fitness range.', 730, 930, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B012')
union all
select id, 'Reebok — Signature Pick', 'NC-FT-B013', 'Reebok', 'A Reebok favorite from our Fitness range.', 760, 970, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B013')
union all
select id, 'Under Armour — Signature Pick', 'NC-FT-B014', 'Under Armour', 'A Under Armour favorite from our Fitness range.', 800, 1020, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B014')
union all
select id, 'Nivia — Signature Pick', 'NC-FT-B015', 'Nivia', 'A Nivia favorite from our Fitness range.', 840, 1080, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-FT-B015');

-- ---- Fitness: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-FT-T001', '/tile-images/fitness/tiles/water-bottles.jpg'),
  ('NC-FT-T002', '/tile-images/fitness/tiles/yoga-mats.jpg'),
  ('NC-FT-T003', '/tile-images/fitness/tiles/resistance-bands.jpg'),
  ('NC-FT-T004', '/tile-images/fitness/tiles/dumbbells.jpg'),
  ('NC-FT-T005', '/tile-images/fitness/tiles/foam-rollers.jpg'),
  ('NC-FT-T006', '/tile-images/fitness/tiles/gym-bags.webp'),
  ('NC-FT-T007', '/tile-images/fitness/tiles/jump-ropes.webp'),
  ('NC-FT-T008', '/tile-images/fitness/tiles/fitness-trackers.jpg'),
  ('NC-FT-T009', '/tile-images/fitness/tiles/treadmills.jpg'),
  ('NC-FT-T010', '/tile-images/fitness/tiles/kettlebells.jpg'),
  ('NC-FT-T011', '/tile-images/fitness/tiles/pull-up-bars.webp'),
  ('NC-FT-T012', '/tile-images/fitness/tiles/massage-guns.jpg'),
  ('NC-FT-T013', '/tile-images/fitness/tiles/protein-shakers.jpg'),
  ('NC-FT-T014', '/tile-images/fitness/tiles/ab-rollers.jpg'),
  ('NC-FT-T015', '/tile-images/fitness/tiles/gym-gloves.jpg'),
  ('NC-FT-B001', '/tile-images/fitness/brands/hrx.png'),
  ('NC-FT-B002', '/tile-images/fitness/brands/cultsport.png'),
  ('NC-FT-B003', '/tile-images/fitness/brands/boldfit.webp'),
  ('NC-FT-B004', '/tile-images/fitness/brands/domyos.jpg'),
  ('NC-FT-B005', '/tile-images/fitness/brands/kore.jpg'),
  ('NC-FT-B006', '/tile-images/fitness/brands/everlast.jpg'),
  ('NC-FT-B007', '/tile-images/fitness/brands/aurion.jpg'),
  ('NC-FT-B008', '/tile-images/fitness/brands/strauss.jpg'),
  ('NC-FT-B009', '/tile-images/fitness/brands/fitkit.webp'),
  ('NC-FT-B010', '/tile-images/fitness/brands/gofit.jpg'),
  ('NC-FT-B011', '/tile-images/fitness/brands/decathlon.jpg'),
  ('NC-FT-B012', '/tile-images/fitness/brands/cosco.jpg'),
  ('NC-FT-B013', '/tile-images/fitness/brands/reebok.jpg'),
  ('NC-FT-B014', '/tile-images/fitness/brands/under-armour.jpg'),
  ('NC-FT-B015', '/tile-images/fitness/brands/nivia.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);

-- ---- Office: missing subcategory tiles ----
with cat as (select id from public.categories where slug = 'office')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Ergonomic Chairs — NovaCart Pick', 'NC-OF-T001', 'Godrej Interio', 'A NovaCart pick for ergonomic chairs, from our Office range.', 310, 400, 35, 'Ergonomic Chairs', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T001')
union all
select id, 'Executive Chairs — NovaCart Pick', 'NC-OF-T002', 'Featherlite', 'A NovaCart pick for executive chairs, from our Office range.', 350, 450, 35, 'Executive Chairs', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T002')
union all
select id, 'Office Desks — NovaCart Pick', 'NC-OF-T003', 'Nilkamal', 'A NovaCart pick for office desks, from our Office range.', 380, 490, 35, 'Office Desks', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T003')
union all
select id, 'Standing Desks — NovaCart Pick', 'NC-OF-T004', 'Steelcase', 'A NovaCart pick for standing desks, from our Office range.', 420, 540, 35, 'Standing Desks', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T004')
union all
select id, 'Filing Cabinets — NovaCart Pick', 'NC-OF-T005', 'Durian', 'A NovaCart pick for filing cabinets, from our Office range.', 460, 590, 35, 'Filing Cabinets', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T005')
union all
select id, 'Bookshelves — NovaCart Pick', 'NC-OF-T006', 'Spacewood', 'A NovaCart pick for bookshelves, from our Office range.', 500, 640, 35, 'Bookshelves', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T006')
union all
select id, 'Whiteboards — NovaCart Pick', 'NC-OF-T007', 'VJ Interior', 'A NovaCart pick for whiteboards, from our Office range.', 530, 680, 35, 'Whiteboards', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T007')
union all
select id, 'Desk Organizers — NovaCart Pick', 'NC-OF-T008', 'Bluebell', 'A NovaCart pick for desk organizers, from our Office range.', 570, 730, 35, 'Desk Organizers', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T008')
union all
select id, 'Monitor Stands — NovaCart Pick', 'NC-OF-T009', 'Adarsh', 'A NovaCart pick for monitor stands, from our Office range.', 610, 780, 35, 'Monitor Stands', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T009')
union all
select id, 'Laptop Stands — NovaCart Pick', 'NC-OF-T010', 'Solo', 'A NovaCart pick for laptop stands, from our Office range.', 640, 820, 35, 'Laptop Stands', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T010')
union all
select id, 'Footrests — NovaCart Pick', 'NC-OF-T011', 'Bantex', 'A NovaCart pick for footrests, from our Office range.', 680, 870, 35, 'Footrests', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T011')
union all
select id, 'Desk Lamps — NovaCart Pick', 'NC-OF-T012', 'Sundaram', 'A NovaCart pick for desk lamps, from our Office range.', 720, 920, 35, 'Desk Lamps', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T012')
union all
select id, 'Cable Management Boxes — NovaCart Pick', 'NC-OF-T013', 'Nilkamal Storage', 'A NovaCart pick for cable management boxes, from our Office range.', 750, 960, 35, 'Cable Management Boxes', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T013')
union all
select id, 'Pen Holders — NovaCart Pick', 'NC-OF-T014', 'Fellowes', 'A NovaCart pick for pen holders, from our Office range.', 790, 1010, 35, 'Pen Holders', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T014')
union all
select id, 'Document Trays — NovaCart Pick', 'NC-OF-T015', 'Deli', 'A NovaCart pick for document trays, from our Office range.', 830, 1060, 35, 'Document Trays', null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-T015');

-- ---- Office: brand tiles (none had a real linked product) ----
with cat as (select id from public.categories where slug = 'office')
insert into public.products (category_id, name, sku, brand, description, price, compare_at_price, stock, subcategory, gender, is_featured, is_trending, is_best_seller)
select id, 'Godrej Interio — Signature Pick', 'NC-OF-B001', 'Godrej Interio', 'A Godrej Interio favorite from our Office range.', 320, 410, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B001')
union all
select id, 'Featherlite — Signature Pick', 'NC-OF-B002', 'Featherlite', 'A Featherlite favorite from our Office range.', 360, 460, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B002')
union all
select id, 'Nilkamal — Signature Pick', 'NC-OF-B003', 'Nilkamal', 'A Nilkamal favorite from our Office range.', 400, 510, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B003')
union all
select id, 'Steelcase — Signature Pick', 'NC-OF-B004', 'Steelcase', 'A Steelcase favorite from our Office range.', 430, 550, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B004')
union all
select id, 'Durian — Signature Pick', 'NC-OF-B005', 'Durian', 'A Durian favorite from our Office range.', 470, 600, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B005')
union all
select id, 'Spacewood — Signature Pick', 'NC-OF-B006', 'Spacewood', 'A Spacewood favorite from our Office range.', 510, 650, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B006')
union all
select id, 'VJ Interior — Signature Pick', 'NC-OF-B007', 'VJ Interior', 'A VJ Interior favorite from our Office range.', 540, 690, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B007')
union all
select id, 'Bluebell — Signature Pick', 'NC-OF-B008', 'Bluebell', 'A Bluebell favorite from our Office range.', 580, 740, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B008')
union all
select id, 'Adarsh — Signature Pick', 'NC-OF-B009', 'Adarsh', 'A Adarsh favorite from our Office range.', 620, 790, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B009')
union all
select id, 'Solo — Signature Pick', 'NC-OF-B010', 'Solo', 'A Solo favorite from our Office range.', 650, 830, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B010')
union all
select id, 'Bantex — Signature Pick', 'NC-OF-B011', 'Bantex', 'A Bantex favorite from our Office range.', 690, 880, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B011')
union all
select id, 'Sundaram — Signature Pick', 'NC-OF-B012', 'Sundaram', 'A Sundaram favorite from our Office range.', 730, 930, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B012')
union all
select id, 'Nilkamal Storage — Signature Pick', 'NC-OF-B013', 'Nilkamal Storage', 'A Nilkamal Storage favorite from our Office range.', 760, 970, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B013')
union all
select id, 'Fellowes — Signature Pick', 'NC-OF-B014', 'Fellowes', 'A Fellowes favorite from our Office range.', 800, 1020, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B014')
union all
select id, 'Deli — Signature Pick', 'NC-OF-B015', 'Deli', 'A Deli favorite from our Office range.', 840, 1080, 35, null, null, false, false, false from cat where not exists (select 1 from public.products where sku = 'NC-OF-B015');

-- ---- Office: images for the products just inserted above ----
insert into public.product_images (product_id, url, alt_text, is_primary, sort_order)
select p.id, v.url, p.name, true, 0
from (values
  ('NC-OF-T001', '/tile-images/office/tiles/ergonomic-chairs.webp'),
  ('NC-OF-T002', '/tile-images/office/tiles/executive-chairs.jpg'),
  ('NC-OF-T003', '/tile-images/office/tiles/office-desks.jpg'),
  ('NC-OF-T004', '/tile-images/office/tiles/standing-desks.jpg'),
  ('NC-OF-T005', '/tile-images/office/tiles/filing-cabinets.jpg'),
  ('NC-OF-T006', '/tile-images/office/tiles/bookshelves.jpg'),
  ('NC-OF-T007', '/tile-images/office/tiles/whiteboards.jpg'),
  ('NC-OF-T008', '/tile-images/office/tiles/desk-organizers.jpg'),
  ('NC-OF-T009', '/tile-images/office/tiles/monitor-stands.jpg'),
  ('NC-OF-T010', '/tile-images/office/tiles/laptop-stands.jpg'),
  ('NC-OF-T011', '/tile-images/office/tiles/footrests.jpg'),
  ('NC-OF-T012', '/tile-images/office/tiles/desk-lamps.jpg'),
  ('NC-OF-T013', '/tile-images/office/tiles/cable-management-boxes.jpg'),
  ('NC-OF-T014', '/tile-images/office/tiles/pen-holders.jpg'),
  ('NC-OF-T015', '/tile-images/office/tiles/document-trays.jpg'),
  ('NC-OF-B001', '/tile-images/office/brands/godrej-interio.jpg'),
  ('NC-OF-B002', '/tile-images/office/brands/featherlite.jpg'),
  ('NC-OF-B003', '/tile-images/office/brands/nilkamal.jpg'),
  ('NC-OF-B004', '/tile-images/office/brands/steelcase.webp'),
  ('NC-OF-B005', '/tile-images/office/brands/durian.jpg'),
  ('NC-OF-B006', '/tile-images/office/brands/spacewood.jpg'),
  ('NC-OF-B007', '/tile-images/office/brands/vj-interior.jpg'),
  ('NC-OF-B008', '/tile-images/office/brands/bluebell.jpg'),
  ('NC-OF-B009', '/tile-images/office/brands/adarsh.jpg'),
  ('NC-OF-B010', '/tile-images/office/brands/solo.jpg'),
  ('NC-OF-B011', '/tile-images/office/brands/bantex.jpg'),
  ('NC-OF-B012', '/tile-images/office/brands/sundaram.jpg'),
  ('NC-OF-B013', '/tile-images/office/brands/nilkamal-storage.jpg'),
  ('NC-OF-B014', '/tile-images/office/brands/fellowes.jpg'),
  ('NC-OF-B015', '/tile-images/office/brands/deli.jpg')
) as v(sku, url)
join public.products p on p.sku = v.sku
where not exists (select 1 from public.product_images pi where pi.product_id = p.id and pi.is_primary);