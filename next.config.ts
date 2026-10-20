// Importing next config type
import type { NextConfig } from 'next';

// Defining configs of next.js
const nextConfig: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*/',
        destination: 'https://cps.safarnameh24.com/api/v1/:path*/',
      },
      {
        source: '/api/v1/:path*',
        destination: 'https://cps.safarnameh24.com/api/v1/:path*/',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cps.safarnameh24.com',
      },
      {
        protocol: 'https',
        hostname: 'safarnameh24.com',
      },
      {
        protocol: 'http',
        hostname: 'cps.safarnameh24.com',
      },
    ],
  },
};

// Exporting the configs
export default nextConfig;
