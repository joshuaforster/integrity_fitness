import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'pub-6e6bb53af6c34756a861d2c0a8259e84.r2.dev' },
    ]
  }
};

export default nextConfig;
