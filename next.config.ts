// Importing next config type
import type { NextConfig } from 'next';

// Defining configs of next.js
const nextConfig: NextConfig = {
  output: 'standalone',
  skipTrailingSlashRedirect: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cps.zarvantrip.com',
      },
      {
        protocol: 'https',
        hostname: 'zarvantrip.com',
      },
      {
        protocol: 'http',
        hostname: 'cps.zarvantrip.com',
      },
    ],
  },
};

// Exporting the configs
export default nextConfig;
