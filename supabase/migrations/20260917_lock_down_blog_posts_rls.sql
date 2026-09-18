-- Remove the overly permissive policy that granted full read/write
-- access to the PUBLIC role (which includes the unauthenticated
-- anon role using the public anon key shipped in the client bundle).
drop policy if exists "Service can do everything" on public.blog_posts;

-- service_role bypasses RLS entirely by default — no policy needed
-- for server-side/admin operations performed with the service key.

-- Only genuinely authenticated Supabase Auth users (e.g. logged-in
-- admins via the new AdminBlog auth gate) can insert/update/delete.
create policy "Authenticated users can manage posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);

-- Existing "Public can read published posts" (SELECT, public role,
-- scoped to published = true) is untouched and still correct —
-- it's exactly what the static Astro build needs at build time.