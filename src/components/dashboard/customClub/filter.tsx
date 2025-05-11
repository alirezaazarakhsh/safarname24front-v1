// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { FilterCustomClubPageComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import ToggleButtons from '../ui/toggleButtons';
import Link from 'next/link';

// Creating and exporting Filter component/section of Customers club page as default
export default function Filter({
  onChange,
  totalScore,
}: FilterCustomClubPageComponentPropsType): ReactNode {
  // Defining states of component
  const [val, setVal] = useState<'shoppingCentre' | 'hotel'>('shoppingCentre');

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange && onChange(val), [val]);

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-3 lg:w-auto w-full lg:px-0 px-[24px]">
      <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
        باشگاه مشتریان - جوایز هتل
      </span>
      <div
        className={
          'lg:flex grid items-center justify-end lg:gap-3 gap-[12px] grid-cols-3 lg:w-auto w-full'
        }
      >
        <Link
          href="/dashboard/customer-club/list"
          className="lg:hidden flex items-center justify-center bg-gray-100 rounded-[6px] px-2 h-[40px] text-black"
        >
          <span className="text-[10px] font-semibold text-current block text-center truncate w-full">
            لیست جایزه های دریافتی
          </span>
        </Link>
        <div className="flex items-center justify-center lg:gap-2 gap-[12px] bg-black lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-white col-span-2">
          <IconsaxIcons
            name="Crown1"
            className="lg:w-5 lg:h-5 w-[19px] h-[19px] shrink-0"
            color="currentColor"
          />
          <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
            جمع دریافتی : {totalScore} امتیاز
          </span>
        </div>
        <ToggleButtons
          buttons={['جوایز مرکز خرید', 'جوایز هتل']}
          className="lg:h-[45px] h-[40px] lg:bg-white bg-gray-100 col-span-3"
          onChange={(index) => setVal(index === 0 ? 'shoppingCentre' : 'hotel')}
          width="lg:w-[250px] w-full"
        />
      </div>
    </div>
  );
}
