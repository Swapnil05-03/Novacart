-- ============================================================================
-- 25_convert_prices_to_inr.sql
--
-- The seed data stored product prices in dollar-scale numbers (e.g. 179.00 for
-- headphones) while the storefront formats them as ₹. This converts every
-- product price to a realistic rupee price point.
--
-- * Conversion rate: 1 USD = 83 INR (edit v_rate below if you want another).
-- * Prices are rounded to retail-style points: under ₹1,000 -> ends in 9
--   (e.g. ₹499), ₹1,000 and above -> ends in 99 (e.g. ₹14,999).
-- * compare_at_price (the struck-through "MRP") is converted the same way and
--   is cleared if it would not be higher than the new price.
-- * Past orders are NOT touched: order_items keeps its own price snapshot.
-- * Safe against double-running: the original prices are saved in
--   products_price_backup_usd the first time, and the script does nothing if
--   that backup table already exists. To undo, see the bottom of this file.
-- ============================================================================

do $$
declare
  v_rate numeric := 83;
begin
  if to_regclass('public.products_price_backup_usd') is not null then
    raise notice 'Prices already converted (backup table exists). Skipping.';
    return;
  end if;

  create table public.products_price_backup_usd as
    select id, price, compare_at_price from public.products;

  update public.products p
  set
    price = case
      when p.price * v_rate < 1000
        then greatest(round(p.price * v_rate / 10) * 10 - 1, 9)
      else round(p.price * v_rate / 100) * 100 - 1
    end,
    compare_at_price = case
      when p.compare_at_price is null then null
      when (case when p.compare_at_price * v_rate < 1000
                 then greatest(round(p.compare_at_price * v_rate / 10) * 10 - 1, 9)
                 else round(p.compare_at_price * v_rate / 100) * 100 - 1 end)
           > (case when p.price * v_rate < 1000
                   then greatest(round(p.price * v_rate / 10) * 10 - 1, 9)
                   else round(p.price * v_rate / 100) * 100 - 1 end)
        then (case when p.compare_at_price * v_rate < 1000
                   then greatest(round(p.compare_at_price * v_rate / 10) * 10 - 1, 9)
                   else round(p.compare_at_price * v_rate / 100) * 100 - 1 end)
      else null
    end;

  raise notice 'Converted % products to INR.', (select count(*) from public.products);
end $$;

-- Check the result:
--   select name, price, compare_at_price from public.products order by price desc limit 20;

-- To undo (restores the original dollar-scale values):
--   update public.products p set price = b.price, compare_at_price = b.compare_at_price
--   from public.products_price_backup_usd b where b.id = p.id;
--   drop table public.products_price_backup_usd;