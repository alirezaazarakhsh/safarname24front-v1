// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import Link from 'next/link';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting Filter component/section of Favorites page as default
export default function Filter(): ReactNode {
  // Returning JSX
  return (
    <div className="lg:flex block items-center justify-between gap-3 lg:w-auto w-full">
      <span className="block truncate text-right w-full lg:font-bold font-semibold lg:text-cs85 text-[12px] text-black lg:mb-0 mb-[12px]">
        لیست مورد علاقه ها
      </span>
      <div
        className={
          'flex items-center justify-end lg:gap-3 gap-[10px] lg:w-auto w-full'
        }
      >
        <Link
          href="/dashboard/favorites"
          className="flex items-center justify-center lg:gap-2 gap-[12px] bg-cs-red/10 lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-cs-red col-span-2 transition-all duration-500 hover:bg-cs-red/20 lg:w-auto w-[50%]"
        >
          <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
            بازگشت به حالت اولیه
          </span>
        </Link>
        <button className="flex items-center justify-center lg:gap-2 gap-[12px] bg-white lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-black/50 border border-black/10 col-span-2 transition-all duration-500 hover:bg-black/5 lg:w-auto w-[50%]">
          <IconsaxIcons
            name="Add"
            className="lg:w-4 lg:h-4 w-[20px] h-[20px] shrink-0"
            color="currentColor"
          />
          <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
            ثبت لیست جدید
          </span>
        </button>
      </div>
    </div>
  );
}
