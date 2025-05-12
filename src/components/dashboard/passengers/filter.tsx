// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { PassnegersPageFilterComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import IconInput from '../ui/iconInput';
import { Button } from '@/components/ui/button';

// Creating and exporting Filter component as default
export default function Filter({
  onChange,
  className,
  dataNotEmpty,
}: PassnegersPageFilterComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <section>
      <div
        className={cn(
          'lg:flex block lg:items-center lg:justify-between lg:gap-5 gap-[14px]',
          className,
        )}
      >
        <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
          لیست مسافران من
        </span>
        <div className="lg:flex grid grid-cols-4 items-center justify-end lg:gap-4 gap-[14px]">
          <Button className="flex items-center justify-center gap-2 lg:h-10 h-[45px] text-black lg:bg-white lg:hover:bg-white hover:bg-gray-100 bg-gray-100 lg:rounded-md rounded-[7px] lg:px-3 px-[10px]">
            <IconsaxIcons
              name="Add"
              className="lg:w-3 lg:h-3 w-[18px] h-[18px] text-gray-600 shrink-0"
            />
            <span className="block text-right truncate font-normal whitespace-nowrap lg:text-sm text-[12px] text-current">
              افزودن مسافر
            </span>
          </Button>
          {dataNotEmpty && (
            <IconInput
              wholeClassName="lg:bg-white bg-gray-100 lg:hover:bg-white hover:bg-gray-100"
              icon="SearchStatus"
              className="lg:h-10 h-[45px]"
              placeholder="جستجو نام مسافر، کد ملی..."
              onChange={(e) => onChange && onChange(e.target.value)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
