import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cps.safarnameh24.com',
      },
      {
        protocol: 'https',
        hostname: 'safarnameh24.com',
      },
    ],
  },
};

export default nextConfig;