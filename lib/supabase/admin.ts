import { createClient } from '@supabase/supabase-js'

export const createAdminClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SECRET_SERVICE_ROLE

  if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase Admin credentials (SUPABASE_URL, SUPABASE_SECRET_SERVICE_ROLE) missing")
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
