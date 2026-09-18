-- Make the view execute with the querying user's own permissions,
-- not the view owner's — this is what makes it respect the RLS
-- policies on devices/device_metrics/device_av instead of bypassing them
alter view public.device_latest set (security_invoker = on);

-- Explicitly lock down grants: remove any implicit public/anon
-- access, leave only authenticated (RLS on the underlying tables
-- then further restricts to admin/technician roles specifically)
revoke all on public.device_latest from public;
revoke all on public.device_latest from anon;
grant select on public.device_latest to authenticated;