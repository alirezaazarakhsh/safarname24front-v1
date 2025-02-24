// Forcing next.js to render this component as client side component 
'use client';

// Importing part 
import { ReservationsFilterComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import { cn } from "@/utils/utils";
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting Filter component as default
export default function Filter({ className }:ReservationsFilterComponentPropsType):ReactNode {
    // Returning JSX 
    return (
        <section>
            <div
              className={cn(
                'lg:flex block lg:items-center lg:justify-between lg:gap-5 gap-[17px]',
                className,
              )}
            >
              <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
                داشبورد سفرنامه
              </span>
            <div className="lg:flex grid grid-cols-4 items-center justify-end lg:gap-4 gap-2">
                    <div className="bg-white lg:rounded-md rounded-lg flex items-center justify-between text-black lg:w-[200px] w-auto col-span-3">
                        <div className="lg:h-8 h-10 aspect-square flex items-center justify-center">
                            <IconsaxIcons name="SearchStatus" className="lg:h-3 lg:w-3 w-4 h-4 text-current shrink-0 aspect-square" />
                        </div>
                        <input 
                            className="lg:h-8 h-10 p-2 w-full block placeholder:text-xs placeholder:font-normal text-xs font-normal text-current placeholder:text-current outline-0 bg-transparent"
                            placeholder="جستجو مسافر، هتل"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 lg:h-8 h-10 text-black bg-white lg:rounded-md rounded-lg px-3">
                        <IconsaxIcons name="Add" className="lg:w-3 lg:h-3 w-4 h-4 text-gray-600"  />
                        <span className="block text-right truncate font-normal whitespace-nowrap text-sm text-current">ثبت رزرو</span>
                    </button>
                </div>
          </div>
        </section>
    );
}
