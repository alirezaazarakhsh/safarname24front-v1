import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        port: '',
        search: '',
        protocol: 'http',
        hostname: 'cps.safarnameh24.com',
      },
      {
        port: '',
        search: '',
        protocol: 'https',
        hostname: 'safarnameh24.com',
      },
    ],
  },
};

export default nextConfig;
