// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect } from 'react';
import toast from '../ui/customSonner/toast';
import { Button } from '@/components/ui/button';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { cn } from '@/utils/utils';
import { ErrorTableComponentPropsType } from '@/types/dashboard/component';

// Creating and exporting ErrorTable component as default
// Ths component has to be rendred on conditions and not via props like open or etc
export default function ErrorTable({
  className,
  refetch,
}: ErrorTableComponentPropsType): ReactNode {
  // Rendering a toast
  useEffect(() => {
    toast({
      title: 'خطا در دریافت اطلاعات',
      description:
        'در دریافت داده‌ها مشکلی به‌وجود آمده است. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.',
      theme: 'theme',
    });
  }, []);

  // Returning JSX
  return (
    <section
      className={cn(
        'lg:bg-white bg-transparent overflow-hidden lg:rounded-[14px] lg:border border-black/10 lg:h-[500px] h-[calc(100dvh-20dvh)] flex items-center justify-center lg:p-10 p-6 flex-col text-cs-red',
        className,
      )}
    >
      <IconsaxIcons
        name='Alarm'
        color='currentColor'
        className='lg:w-32 lg:h-32 w-16 h-16 block mx-auto lg:mb-4 mb-2'
      />
      <span className='block text-center w-full text-current lg:text-cs95 text-[14px] mb-2 font-bold'>
        !خطایی رخ داده است
      </span>
      <span className='block text-center w-full lg:text-black text-gray-500 lg:text-cs09 text-[14px] font-normal lg:mb-4 mb-3'>
        !متأسفانه در بارگذاری این بخش مشکلی پیش آمده. لطفاً صفحه را بازنشانی
        کرده یا بعداً دوباره امتحان کنید.
      </span>
      <Button
        onClick={() => refetch && refetch()}
        className='flex items-center justify-center gap-2 mx-auto bg-cs-red/10 rounded-[7px] p-[14px] text-cs-red hover:bg-cs-red/20 hover:text-cs-red'
      >
        <IconsaxIcons
          name='ArrowRotateRight'
          color='currentColor'
          className='w-[18px] h-[18px] shrink-0'
        />
        <span className='block text-right truncate font-normal whitespace-nowrap text-[12px] text-current'>
          تلاش مجدد
        </span>
      </Button>
    </section>
  );
}
