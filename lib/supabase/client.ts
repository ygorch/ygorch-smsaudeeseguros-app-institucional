import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // These variables must be exposed via next.config.js 'env' config to be available in the browser
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_ANON_PUBLIC

  if (!supabaseUrl || !supabaseKey) {
     console.error("Supabase URL or Key missing in client. Ensure next.config.mjs exposes SUPABASE_URL and SUPABASE_ANON_PUBLIC.")
     // Return a dummy client to prevent build crashes during prerendering
     // This allows the build to complete even if env vars are missing in the CI/Build environment
     return createBrowserClient(
        'https://example.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.signature'
     )
  }

  return createBrowserClient(
    supabaseUrl,
    supabaseKey
  )
}
