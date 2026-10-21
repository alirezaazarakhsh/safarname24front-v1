import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// ------------------------------

const iransans_font = localFont({
  src: [
    { path: '../assets/fonts/IRANSansX-Light.woff2', weight: '400' },
    { path: '../assets/fonts/IRANSansX-Regular.woff2', weight: '500' },
    { path: '../assets/fonts/IRANSansX-Medium.woff2', weight: '600' },
    { path: '../assets/fonts/IRANSansX-SemiBold.woff2', weight: '700' },
    { path: '../assets/fonts/IRANSansX-Bold.woff2', weight: '800' },
    { path: '../assets/fonts/IRANSansX-ExtraBold.woff2', weight: '900' },
  ],
  variable: '--font-iransans',
});

const inter_font = Inter({ subsets: ['latin'], variable: '--font-inter' });

// ------------------------------

export { iransans_font, inter_font };
