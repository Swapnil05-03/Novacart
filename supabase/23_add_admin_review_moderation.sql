-- ============================================================================
-- NovaCart — Admin review moderation
-- Run this in the Supabase SQL Editor. Safe to re-run.
--
-- Reviews previously had no admin-delete policy — only the review's own
-- author could delete it. This adds moderation access so admins can remove
-- inappropriate reviews from the new Admin → Reviews page.
-- ============================================================================

drop policy if exists "Admins can delete any review" on public.reviews;
create policy "Admins can delete any review"
  on public.reviews for delete
  using (public.is_admin());