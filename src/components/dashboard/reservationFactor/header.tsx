// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import Logo from '@/components/dashboard/ui/logo';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';
import Link from 'next/link';
import { useScrollPosition } from '@/hooks';

// Creating and exporting Header component as default
export default function Header(): ReactNode {
  // Defining scroll position of whole page in y axis
  const scrollY = useScrollPosition();

  // Returning JSX
  return (
    <header>
      <div className='lg:block hidden'>
        <Logo />
      </div>
      <div
        data-scrolled={scrollY !== 0}
        className="lg:hidden block py-[16px] px-[24px] border-b-[1.5px] border-b-black/10 fixed w-full top-0 left-0 z-30 bg-transparent transition-all duration-500 data-[scrolled='false']:bg-gray-100 data-[scrolled='true']:bg-white"
      >
        <Link
          href='/dashboard/reservations'
          className='flex items-center justify-start gap-[10px] w-full overflow-hidden'
        >
          <ICArrowFlashRight className='w-[24px] h-[24px] aspect-square shrink-0' />
          <span className='block truncate text-black text-[14px] font-bold w-full text-right'>
            بازگشت به صفحه اصلی
          </span>
        </Link>
      </div>
    </header>
  );
}
