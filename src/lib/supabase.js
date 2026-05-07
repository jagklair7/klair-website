import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://kcvdsajsevvodckayzrd.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdmRzYWpzZXZ2b2Rja2F5enJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxMTExMTcsImV4cCI6MjA5MzY4NzExN30.FOknLNshO5Lvesr1MWMmr-ug3rMG_ljeSepZ3JcWNuM'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)