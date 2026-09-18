-- Assign the admin role to your existing account
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
where email = 'sunny@klair.ca';

-- Tighten blog_posts writes: authenticated is no longer enough on
-- its own — must also carry role admin or blog_editor
drop policy if exists "Authenticated users can manage posts" on public.blog_posts;

create policy "Admins and blog editors can manage posts"
on public.blog_posts
for all
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'blog_editor')
)
with check (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'blog_editor')
);

-- Same tightening for blog-images storage writes
drop policy if exists "Authenticated users can upload blog-images" on storage.objects;
create policy "Admins and blog editors can upload blog-images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'blog-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'blog_editor')
);

drop policy if exists "Authenticated users can update blog-images" on storage.objects;
create policy "Admins and blog editors can update blog-images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'blog-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'blog_editor')
)
with check (
  bucket_id = 'blog-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'blog_editor')
);

drop policy if exists "Authenticated users can delete blog-images" on storage.objects;
create policy "Admins and blog editors can delete blog-images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'blog-images'
  and (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'blog_editor')
);