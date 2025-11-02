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
        protocol: 'https',
        hostname: 'safarnameh24.com',
        port: '',
        pathname: '/media/signatures/**',
      },
    ],
  },
};

export default nextConfig;
