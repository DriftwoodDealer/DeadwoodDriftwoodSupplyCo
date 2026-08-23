/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb"
    }
  },
  images: {
    domains: ["dkrsgkoxafribdkcnbbl.supabase.co"],
    remotePatterns: [{ protocol: "https", hostname: "dkrsgkoxafribdkcnbbl.supabase.co", pathname: "/storage/v1/object/public/**" }],
    unoptimized: true
  }
};

export default nextConfig;
