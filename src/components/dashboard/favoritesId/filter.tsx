// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { FilterFavPageComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import ToggleButtons from '../ui/toggleButtons';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting Filter component/section of Favorites Single page as default
export default function Filter({
  onChange,
  favName,
  loading = true,
}: FilterFavPageComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-3 lg:w-auto w-full lg:p-0 p-[24px] lg:bg-transparent bg-white rounded-[10px] lg:border-0 border border-black/10">
      {loading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-md lg:block hidden" />
      ) : (
        <span className="lg:block hidden truncate text-right font-bold text-cs85 text-black">
          {favName}
        </span>
      )}
      <div
        className={
          'lg:flex block items-center justify-end lg:gap-3 lg:w-auto w-full'
        }
      >
        <div className="lg:hidden block mb-[12px]">
          <span className="block truncate text-right w-full font-semibold lg:text-[16px] text-[12px] text-black lg:mb-0 mb-[12px]">
            دسته بندی :
          </span>
          {loading ? (
            <Skeleton className="w-[100px] h-[18px] rounded-md" />
          ) : (
            <span className="text-[10px] font-semibold text-gray-500 w-full truncate block text-right">
              {favName}
            </span>
          )}
        </div>
        {loading ? (
          <>
            <Skeleton className="w-[150px] h-[45px] rounded-md lg:block hidden" />
            <Skeleton className="lg:w-[250px] w-full h-[45px] rounded-md" />
          </>
        ) : (
          <>
            <Link
              href="/dashboard/favorites"
              className="lg:flex hidden items-center justify-center lg:gap-2 gap-[12px] bg-cs-red/10 lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-cs-red col-span-2 transition-all duration-500 hover:bg-cs-red/20"
            >
              <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
                برگشت به صفحه
              </span>
            </Link>
            <ToggleButtons
              buttons={['هتل های ذخیره شده', 'وبلاگ های ذخیره شده']}
              className="h-[45px] lg:bg-white bg-gray-100 col-span-3"
              width="lg:w-[250px] w-full"
              onChange={(index) => {
                if (onChange) {
                  index === 0
                    ? onChange('savedHotels')
                    : onChange('savedBlogs');
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
