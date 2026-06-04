import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 70, 75],
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { 
        protocol: 'https',
        hostname: '*.r2.dev' 
      },
    ]
  }
};

export default nextConfig;
