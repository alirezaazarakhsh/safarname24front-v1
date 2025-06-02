import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        port: '',
        search: '',
        protocol: 'http',
        // pathname: '/media/images/**',
        hostname: 'cps.safarnameh24.com',
      },
    ],
  },
};

export default nextConfig;
