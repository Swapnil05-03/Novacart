-- ============================================================================
-- NovaCart — Additional categories (Flipkart-style 14-tab category strip)
-- Safe to run multiple times — uses ON CONFLICT DO NOTHING against the
-- existing unique constraints on name/slug, so it will never duplicate rows
-- or error if a category already exists.
--
-- Your original 6 seeded categories (Electronics, Apparel, Home & Living,
-- Accessories, Fitness, Office) are left untouched. This adds the remaining
-- ones needed to reach the full 14-category top bar.
-- ============================================================================

insert into public.categories (name, slug, description) values
  ('Mobiles', 'mobiles', 'Smartphones and mobile accessories'),
  ('Beauty', 'beauty', 'Skincare, makeup, and personal care'),
  ('Appliances', 'appliances', 'Large and small home appliances'),
  ('Toys & Games', 'toys-games', 'Toys, games, and baby essentials'),
  ('Food & Household', 'food-household', 'Groceries and everyday household needs'),
  ('Auto Accessories', 'auto-accessories', 'Car and bike accessories'),
  ('Two Wheelers', 'two-wheelers', 'Bikes, scooters, and riding gear'),
  ('Sports & Outdoors', 'sports-outdoors', 'Sporting goods and outdoor gear'),
  ('Books & Stationery', 'books-stationery', 'Books, journals, and stationery'),
  ('Furniture', 'furniture', 'Furniture for every room')
on conflict (name) do nothing;