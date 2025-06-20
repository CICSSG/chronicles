import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://placehold.co/**'), new URL('https://i.imgur.com/**')],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb'
    }
  }
};

export default nextConfig;
