import './globals.css';
import type { Metadata } from 'next';

import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// ---------------------------------------------------

const interFont = Inter({ subsets: ['latin'], variable: '--font-inter' });
const iranSansFont = localFont({
  src: [
    { path: '../../public/font/woff/IRANSansX-LightD4.woff', weight: '400' },
    { path: '../../public/font/woff2/IRANSansX-LightD4.woff2', weight: '400' },
    { path: '../../public/font/woff/IRANSansX-RegularD4.woff', weight: '500' },
    {
      path: '../../public/font/woff2/IRANSansX-RegularD4.woff2',
      weight: '500',
    },
    { path: '../../public/font/woff/IRANSansX-MediumD4.woff', weight: '600' },
    { path: '../../public/font/woff2/IRANSansX-MediumD4.woff2', weight: '600' },
    { path: '../../public/font/woff/IRANSansX-DemiBoldD4.woff', weight: '700' },
    {
      path: '../../public/font/woff2/IRANSansX-DemiBoldD4.woff2',
      weight: '700',
    },
    { path: '../../public/font/woff/IRANSansX-BoldD4.woff', weight: '800' },
    { path: '../../public/font/woff2/IRANSansX-BoldD4.woff2', weight: '800' },
    { path: '../../public/font/woff/IRANSansX-BlackD4.woff', weight: '900' },
    { path: '../../public/font/woff2/IRANSansX-BlackD4.woff2', weight: '900' },
  ],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '8494190',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${interFont.variable} ${iranSansFont.variable} font-sans antialiased ss01`}
      >
        {children}
      </body>
    </html>
  );
}
