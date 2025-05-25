// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReservationsFilterComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import IconInput from '../ui/iconInput';
import { Button } from '@/components/ui/button';

// Creating and exporting Filter component as default
export default function Filter({
  className,
  dataNotEmpty,
  onChange,
}: ReservationsFilterComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <section>
      <div
        className={cn(
          'lg:flex block lg:items-center lg:justify-between lg:gap-5 gap-[14px]',
          className,
        )}
      >
        <span className='lg:block hidden truncate text-right w-full font-bold text-[16px] text-black'>
          لیست رزرو هتل های من
        </span>
        <div className='flex items-center justify-end lg:gap-4 gap-[14px]'>
          {dataNotEmpty && (
            <IconInput
              wholeClassName='lg:bg-white bg-gray-100 lg:hover:bg-white hover:bg-gray-100 lg:w-auto w-full'
              icon='SearchStatus'
              className='lg:h-10 h-[45px]'
              placeholder='جستجو مسافر، هتل'
              onChange={(e) => onChange && onChange(e.target.value)}
            />
          )}
          <Button className='flex items-center justify-center gap-2 lg:h-10 h-[45px] lg:bg-white lg:hover:bg-white hover:bg-gray-100 bg-gray-100 lg:rounded-md rounded-[7px] lg:px-3 px-[10px] lg:shrink shrink-0 text-[#2b2b2b]'>
            <IconsaxIcons
              name='Add'
              className='w-[18px] h-[18px]  shrink-0 text-current'
            />
            <span className='block text-right truncate font-semibold whitespace-nowrap text-[12px] text-current'>
              ثبت رزرو
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
