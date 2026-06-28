-- ============================================================================
-- NovaCart Row Level Security Policies
-- Run this AFTER 01_schema.sql in the Supabase SQL Editor.
-- ============================================================================

-- ============================================================================
-- Helper: is the current user an admin?
-- Defined as a function so policies can reuse it without recursive RLS checks.
-- ============================================================================
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable set search_path = public;

-- ============================================================================
-- PROFILES
-- ============================================================================
alter table public.profiles enable row level security;

create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Profiles are insertable by the owning user"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================================================
-- CATEGORIES — public read, admin write
-- ============================================================================
alter table public.categories enable row level security;

create policy "Categories are publicly viewable"
  on public.categories for select
  using (true);

create policy "Admins can manage categories"
  on public.categories for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- PRODUCTS — public read (active only), admin write
-- ============================================================================
alter table public.products enable row level security;

create policy "Active products are publicly viewable"
  on public.products for select
  using (is_active = true or public.is_admin());

create policy "Admins can manage products"
  on public.products for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- PRODUCT IMAGES — public read, admin write
-- ============================================================================
alter table public.product_images enable row level security;

create policy "Product images are publicly viewable"
  on public.product_images for select
  using (true);

create policy "Admins can manage product images"
  on public.product_images for all
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================================
-- WISHLIST — owner only
-- ============================================================================
alter table public.wishlist enable row level security;

create policy "Users can view their own wishlist"
  on public.wishlist for select
  using (auth.uid() = user_id);

create policy "Users can add to their own wishlist"
  on public.wishlist for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from their own wishlist"
  on public.wishlist for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- CART ITEMS — owner only
-- ============================================================================
alter table public.cart_items enable row level security;

create policy "Users can view their own cart"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can add to their own cart"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart items"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can remove their own cart items"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- ORDERS — owner can view/create their own; admins can view/update all
-- ============================================================================
alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Admins can view all orders"
  on public.orders for select
  using (public.is_admin());

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Admins can update any order"
  on public.orders for update
  using (public.is_admin());

-- ============================================================================
-- ORDER ITEMS — readable if the parent order belongs to the user, or by admins
-- ============================================================================
alter table public.order_items enable row level security;

create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id and orders.user_id = auth.uid()
    )
  );

create policy "Admins can view all order items"
  on public.order_items for select
  using (public.is_admin());

create policy "Users can insert order items for their own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id and orders.user_id = auth.uid()
    )
  );

-- ============================================================================
-- REVIEWS — public read, owner can write/update their own
-- ============================================================================
alter table public.reviews enable row level security;

create policy "Reviews are publicly viewable"
  on public.reviews for select
  using (true);

create policy "Users can create their own reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);
