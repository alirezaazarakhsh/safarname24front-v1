import './globals.css';
import type { Metadata } from 'next';

import localFont from 'next/font/local';
import { Outfit } from 'next/font/google';

// ---------------------------------------------------

const outfitFont = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const iranSansFont = localFont({
  src: [
    { path: '../../public/font/woff/IRANSansX-Light.woff', weight: '400' },
    { path: '../../public/font/woff2/IRANSansX-Light.woff2', weight: '400' },
    { path: '../../public/font/woff/IRANSansX-Regular.woff', weight: '500' },
    { path: '../../public/font/woff2/IRANSansX-Regular.woff2', weight: '500' },
    { path: '../../public/font/woff/IRANSansX-Medium.woff', weight: '600' },
    { path: '../../public/font/woff2/IRANSansX-Medium.woff2', weight: '600' },
    { path: '../../public/font/woff/IRANSansX-DemiBold.woff', weight: '700' },
    { path: '../../public/font/woff2/IRANSansX-DemiBold.woff2', weight: '700' },
    { path: '../../public/font/woff/IRANSansX-Bold.woff', weight: '800' },
    { path: '../../public/font/woff2/IRANSansX-Bold.woff2', weight: '800' },
    { path: '../../public/font/woff/IRANSansX-Black.woff', weight: '900' },
    { path: '../../public/font/woff2/IRANSansX-Black.woff2', weight: '900' },
  ],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Safarname 24',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='fa' dir='rtl'>
      <body className={`${outfitFont.variable} ${iranSansFont.variable} font-sans antialiased ss01`}>{children}</body>
    </html>
  );
}
