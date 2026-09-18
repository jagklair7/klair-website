-- Public read access to blog-images bucket objects (needed for
-- cover images and inline post images to display on the public site)
create policy "Public can read blog-images"
on storage.objects
for select
to public
using (bucket_id = 'blog-images');

-- Only authenticated users (i.e. logged-in admins via AdminBlog)
-- can upload new images
create policy "Authenticated users can upload blog-images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'blog-images');

-- Only authenticated users can overwrite/replace existing images
create policy "Authenticated users can update blog-images"
on storage.objects
for update
to authenticated
using (bucket_id = 'blog-images')
with check (bucket_id = 'blog-images');

-- Only authenticated users can delete images
create policy "Authenticated users can delete blog-images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'blog-images');