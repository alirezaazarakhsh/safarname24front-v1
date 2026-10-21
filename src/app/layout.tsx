import '@/theme/globals.css';

import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Providers } from '@/providers';
import { inter_font, iransans_font } from '@/theme/font';

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

      className={cn('ss01 antialiased', inter_font.variable, iransans_font)}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
