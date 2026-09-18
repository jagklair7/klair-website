-- Tighten device_av: authenticated isn't enough on its own —
-- must be admin or technician
drop policy if exists "auth read av" on public.device_av;
create policy "admin and technician read av"
on public.device_av
for select
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'technician')
);

-- device_metrics
drop policy if exists "auth read metrics" on public.device_metrics;
create policy "admin and technician read metrics"
on public.device_metrics
for select
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'technician')
);

-- devices
drop policy if exists "auth read devices" on public.devices;
create policy "admin and technician read devices"
on public.devices
for select
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'technician')
);

-- network_scans
drop policy if exists "auth read scans" on public.network_scans;
create policy "admin and technician read scans"
on public.network_scans
for select
to authenticated
using (
  (auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'technician')
);