import '@/theme/globals.css';

import type { Metadata } from 'next';
import { Providers } from '@/providers';
import { inter_font, hezargan_font, iransans_font } from '@/theme/font';

export const metadata: Metadata = {
  title: 'Safarname24',
  description: 'Safarname24 booking agency',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${iransans_font.variable} ${hezargan_font.variable} ${inter_font.variable} ss01 antialiased`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
