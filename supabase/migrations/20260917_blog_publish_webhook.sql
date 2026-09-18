-- Enable pg_net so Postgres can make outbound HTTP requests
create extension if not exists pg_net with schema extensions;

-- Function: notifies Vercel to rebuild when a post's published
-- status is relevant — covers publish, unpublish, edits to an
-- already-published post, and deletion of a published post.
create or replace function public.trigger_blog_rebuild()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  deploy_hook_url text := 'https://api.vercel.com/v1/integrations/deploy/PASTE_YOUR_HOOK_ID_HERE';
begin
  perform net.http_post(
    url := deploy_hook_url,
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  );
  return null; -- AFTER trigger, return value ignored
end;
$$;

-- Fire after INSERT when the new post is published
create trigger blog_posts_rebuild_on_insert
after insert on public.blog_posts
for each row
when (new.published = true)
execute function public.trigger_blog_rebuild();

-- Fire after UPDATE when publish status changes either way,
-- or when an already-published post's content changes
create trigger blog_posts_rebuild_on_update
after update on public.blog_posts
for each row
when (
  new.published is distinct from old.published
  or (new.published = true and (
    new.title is distinct from old.title or
    new.slug is distinct from old.slug or
    new.excerpt is distinct from old.excerpt or
    new.content is distinct from old.content or
    new.cover_url is distinct from old.cover_url or
    new.author is distinct from old.author
  ))
)
execute function public.trigger_blog_rebuild();

-- Fire after DELETE when the deleted post was published
-- (so its now-orphaned static page gets removed on next build)
create trigger blog_posts_rebuild_on_delete
after delete on public.blog_posts
for each row
when (old.published = true)
execute function public.trigger_blog_rebuild();