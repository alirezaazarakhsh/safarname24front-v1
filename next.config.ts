import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'safarnameh24.com',
      },
      {
        protocol: 'https',
        hostname: 'cps.safarnameh24.com',
      },
    ],


  },

  // امنیت اضافی هدرها (خیلی مهمه برای production)
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },

        ],
      },
    ];
  },

  poweredByHeader: false,
};

export default nextConfig;