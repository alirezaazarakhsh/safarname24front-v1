// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import { EmptyTableComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import EmptyImage from '../../../../public/image/empty.png';

// Creating and exporting EmptyTable component as default
// Ths component has to be rendred on conditions and not via props like open or etc
export default function EmptyTable({
  className,
}: EmptyTableComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-[14px] lg:border border-black/10 lg:h-[500px] h-[calc(100dvh-20dvh)] flex items-center justify-center lg:p-10 p-6 flex-col text-cs-red',
        className,
      )}
    >
      <div>
        <Image
          alt='هیچ لیست رزروی فعلا ندارید!'
          src={EmptyImage.src}
          width={500}
          height={500}
          className='h-auto lg:w-[250px] w-[200px] aspect-square block mb-4 mx-auto'
        />
        <span className='block text-center w-full text-black lg:text-cs95 text-[12px] lg:mb-2 mb-3 font-bold'>
          هیچ لیست رزروی فعلا ندارید!
        </span>
        <span className='block text-center w-full lg:text-black text-gray-500 lg:text-cs09 text-[10px] font-normal lg:mb-0 mb-6'>
          مشتری گرامی برای ثبت رزرو هتل میتوانید از دکمه بالا اقدام نمایید از
          همراهی شما متشکریم.
        </span>
      </div>
    </section>
  );
}
