-- ============================================================================
-- NovaCart — Fix "wrong product opens" on Wardrobe/Accessory Deals cards
-- Run this after 14_fix_product_image_mismatches.sql.
--
-- REGRESSION CAUSED BY 14_fix_product_image_mismatches.sql:
-- That migration set subcategory = null for 7 Apparel/Accessories products
-- to stop a wrong-gendered stock photo from showing. But CategoryShowcase's
-- click-linking (findLinkedProduct / bySubcategory) also depends on that
-- same subcategory field to find which real product a curated deal card
-- (e.g. "Men's Slim-Fit Chinos") should open. With subcategory = null, that
-- lookup fails and the click handler falls back to an arbitrary product
-- from the category (cycled by card position) — so e.g. the 3rd deal card
-- opened whatever product happened to be 3rd in the category's product
-- list, not the one actually pictured.
--
-- FIX: restore each product's original subcategory. This re-enables
-- correct click-linking. It does NOT reintroduce the original wrong-image
-- bug: ProductDetailPage checks a curated "deals item" image FIRST (higher
-- priority than the subcategory tile image) — see
-- findDealsItemImageForSubcategory in src/data/categoryContent.js — so for
-- every one of these products that has a matching curated deal card
-- (Hoodie, Jacket, Wallet, Watch), the detail page now shows that same
-- correct curated photo instead of a mismatched gendered tile photo.
--
-- Safe to re-run.
-- ============================================================================

update public.products set subcategory = 'T-Shirts' where sku = 'NC-AP-001'; -- Everyday Crewneck
update public.products set subcategory = 'T-Shirts' where sku = 'NC-AP-002'; -- Mono Tee — Stone
update public.products set subcategory = 'Hoodies'  where sku = 'NC-AP-003'; -- Trail Pullover Hoodie
update public.products set subcategory = 'Jackets'  where sku = 'NC-AP-004'; -- Wool Blend Overcoat

update public.products set subcategory = 'Wallets'  where sku = 'NC-AC-001'; -- Cardholder
update public.products set subcategory = 'Bags'     where sku = 'NC-AC-002'; -- Canvas Weekender Bag
update public.products set subcategory = 'Watches'  where sku = 'NC-AC-003'; -- Stainless Steel Watch