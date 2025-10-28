// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ToastProps } from '@/types/dashboard/component';
import CircluarTimer from '../circluarTimer';
import { cn } from '@/utils/utils';
import localFont from 'next/font/local';

// Defining font
const iranSansFont = localFont({
  src: [
    {
      path: '../../../../../public/font/woff/IRANSansX-LightD4.woff',
      weight: '400',
    },
    {
      path: '../../../../../public/font/woff2/IRANSansX-LightD4.woff2',
      weight: '400',
    },
    {
      path: '../../../../../public/font/woff/IRANSansX-RegularD4.woff',
      weight: '500',
    },
    {
      path: '../../../../../public/font/woff2/IRANSansX-RegularD4.woff2',
      weight: '500',
    },
    {
      path: '../../../../../public/font/woff/IRANSansX-MediumD4.woff',
      weight: '600',
    },
    {
      path: '../../../../../public/font/woff2/IRANSansX-MediumD4.woff2',
      weight: '600',
    },
    {
      path: '../../../../../public/font/woff/IRANSansX-DemiBoldD4.woff',
      weight: '700',
    },
    {
      path: '../../../../../public/font/woff2/IRANSansX-DemiBoldD4.woff2',
      weight: '700',
    },
    {
      path: '../../../../../public/font/woff/IRANSansX-BoldD4.woff',
      weight: '800',
    },
    {
      path: '../../../../../public/font/woff2/IRANSansX-BoldD4.woff2',
      weight: '800',
    },
    {
      path: '../../../../../public/font/woff/IRANSansX-BlackD4.woff',
      weight: '900',
    },
    {
      path: '../../../../../public/font/woff2/IRANSansX-BlackD4.woff2',
      weight: '900',
    },
  ],
});

// Creating and exporting ToastComponent which renders is our actual headless toast
export default function ToastComponent({
  title,
  description,
  theme = 'theme',
}: ToastProps) {
  // Returning JSX
  return (
    <div
      dir="rtl"
      className="flex items-center justify-between gap-3 lg:w-[23dvw] w-full bg-white p-3 rounded-md !z-[70] font-sans shadow-lg shadow-black/20"
    >
      <div className="overflow-hidden">
        <span
          className={cn(
            'mb-1 font-medium text-cs08 block truncate text-right w-full',
            iranSansFont.className,
            theme === 'theme' ? 'text-cs-red' : 'text-green-500',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'text-gray-500 font-medium text-cs65 block truncate text-right w-full',
            iranSansFont.className,
          )}
        >
          {description}
        </span>
      </div>
      <CircluarTimer duration={5} theme={theme} />
    </div>
  );
}
