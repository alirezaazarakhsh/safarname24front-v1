// MHotelCard.tsx
// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { FilterFavPageComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import ToggleButtons from '../ui/toggleButtons';
import Link from 'next/link';

// Creating and exporting Filter component/section of Customers club page as default
export default function Filter({
  onChange,
}: FilterFavPageComponentPropsType): ReactNode {
  // Defining states of component
  const [val, setVal] = useState<'savedHotels' | 'savedBlogs'>('savedHotels');

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange && onChange(val), [val]);

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-3 lg:w-auto w-full lg:p-0 p-[24px] lg:bg-transparent bg-white rounded-[10px] lg:border-0 border border-black/10">
      <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
        My Favourite List
      </span>
      <div
        className={
          'lg:flex block items-center justify-end lg:gap-3 lg:w-auto w-full'
        }
      >
        <div className="lg:hidden block mb-[12px]">
          <span className="text-[12px] font-semibold text-black w-full truncate block text-right mb-[10px]">
            دسته بندی :
          </span>
          <span className="text-[10px] font-semibold text-gray-500 w-full truncate block text-right">
            My Favourite List
          </span>
        </div>
        <Link
          href="/"
          className="lg:flex hidden items-center justify-center lg:gap-2 gap-[12px] bg-cs-red/10 lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-cs-red col-span-2 transition-all duration-500 hover:bg-cs-red/20"
        >
          <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
            برگشت به صفحه
          </span>
        </Link>
        <ToggleButtons
          buttons={['هتل های ذخیره شده', 'وبلاگ های ذخیره شده']}
          className="h-[45px] lg:bg-white bg-gray-100 col-span-3"
          onChange={(index) =>
            setVal(index === 0 ? 'savedHotels' : 'savedBlogs')
          }
          width="lg:w-[250px] w-full"
        />
      </div>
    </div>
  );
}
