-- ============================================================================
-- NovaCart — Promote a user to admin
-- Run this AFTER you've signed up at least one account through the app's
-- Sign Up page. Replace the email below with the account you want to promote.
-- ============================================================================

update public.profiles
set role = 'admin'
where email = 'dwivediswapnil73@gmail.com';

-- Verify it worked:
-- select id, email, full_name, role from public.profiles where email = 'you@example.com';
