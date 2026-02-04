/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Expose these specific server-side variables to the client side
    // This allows process.env.SUPABASE_URL to be available in the browser
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_PUBLIC: process.env.SUPABASE_ANON_PUBLIC,
    SUPABASE_BUCKET: process.env.SUPABASE_BUCKET,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow external images from Supabase
      },
    ],
  },
};

export default nextConfig;
