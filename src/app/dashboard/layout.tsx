// Importing part
import { RootLayoutPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { Metadata } from 'next/types';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import 'swiper/css';
import '@/styles/scrollbar.css';
import Page from '@/components/dashboard/page';

// Defining some variables to user later
const siteInfo = {
  name: 'سفرنامه | داشبورد رزرو بلیط و هتل',
  description:
    'سفرنامه، داشبورد مدیریت رزرو بلیط، هتل و خدمات مسافرتی به زبان فارسی.',
  url: 'https://safarname24.com',
};

// Defining metadata
// The keywords can be removed if required
export const metadata: Metadata = {
  title: {
    template: 'داشبورد کاربر | %s',
    default: siteInfo.name,
  },
  description: siteInfo.description,
  keywords: [
    'رزرو بلیط',
    'رزرو هتل',
    'سفرنامه',
    'داشبورد مسافرتی',
    'خرید بلیط آنلاین',
    'تور مسافرتی',
    'رزرو آنلاین هتل',
    'سیستم مدیریت سفر',
    'بلیط هواپیما',
    'بلیط قطار',
    'رزرو اقامتگاه',
    'پکیج های مسافرتی',
    'تور داخلی',
    'تور خارجی',
    'سیستم رزرواسیون',
    'هتل های ایران',
    'بهترین قیمت بلیط',
    'رزرو آسان',
    'رزرو سریع بلیط',
    'خرید تور لحظه آخری',
    'سایت رزرو هتل',
    'سامانه خرید بلیط',
    'بلیط ارزان',
    'بهترین سامانه رزرواسیون',
  ],
  themeColor: '#F30F26',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: siteInfo.url,
    title: siteInfo.name,
    description: siteInfo.description,
    siteName: siteInfo.name,
  },
};

// Defining fonts
const interFont = Inter({ subsets: ['latin'], variable: '--font-inter' }); // For english text
const iranSansFont = localFont({
  src: [
    { path: '../../../public/font/woff/IRANSansX-LightD4.woff', weight: '400' },
    {
      path: '../../../public/font/woff2/IRANSansX-LightD4.woff2',
      weight: '400',
    },
    {
      path: '../../../public/font/woff/IRANSansX-RegularD4.woff',
      weight: '500',
    },
    {
      path: '../../../public/font/woff2/IRANSansX-RegularD4.woff2',
      weight: '500',
    },
    {
      path: '../../../public/font/woff/IRANSansX-MediumD4.woff',
      weight: '600',
    },
    {
      path: '../../../public/font/woff2/IRANSansX-MediumD4.woff2',
      weight: '600',
    },
    {
      path: '../../../public/font/woff/IRANSansX-DemiBoldD4.woff',
      weight: '700',
    },
    {
      path: '../../../public/font/woff2/IRANSansX-DemiBoldD4.woff2',
      weight: '700',
    },
    { path: '../../../public/font/woff/IRANSansX-BoldD4.woff', weight: '800' },
    {
      path: '../../../public/font/woff2/IRANSansX-BoldD4.woff2',
      weight: '800',
    },
    { path: '../../../public/font/woff/IRANSansX-BlackD4.woff', weight: '900' },
    {
      path: '../../../public/font/woff2/IRANSansX-BlackD4.woff2',
      weight: '900',
    },
  ],
  variable: '--font-sans',
});

// Creating and exporting RootLayout component as default
export default function RootLayout({
  children,
}: RootLayoutPropsType): ReactNode {
  // Returning JSX
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-dvh overflow-x-hidden overflow-y-auto bg-[#F9F9F9]',
          interFont.variable,
          iranSansFont.className,
        )}
      >
        <Toaster duration={5} position="bottom-left" />
        <Page>{children}</Page>
      </body>
    </html>
  );
}
