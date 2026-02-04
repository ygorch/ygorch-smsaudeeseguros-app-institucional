import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL // Fallback generally won't work on client unless prefixed, but added for consistency
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_PUBLIC

  if (!supabaseUrl || !supabaseKey) {
     console.error("Supabase URL or Key missing in client")
     // Return a dummy client or handle error gracefully to prevent crash if possible,
     // but client creation usually expects valid strings.
  }

  return createBrowserClient(
    supabaseUrl!,
    supabaseKey!
  )
}
