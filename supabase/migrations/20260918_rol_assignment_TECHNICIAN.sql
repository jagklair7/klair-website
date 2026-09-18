update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role": "blog_editor"}'::jsonb
where email = 'new-staff-email@klair.ca';