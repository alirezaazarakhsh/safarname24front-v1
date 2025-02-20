// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ICChevronBottom } from '@/components/icons/ICChevronBottom';
import { getTodayDate } from '@/utils/date';
import { ReactNode } from 'react';
import * as DropDown from '@/components/ui/dropdown-menu';
import { FilterComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';

// Creating and exporting Filter component as defualt
export default function Filter({
  className,
}: FilterComponentPropsType): ReactNode {
  // Defining current date in tehran
  const date = getTodayDate();

  // Returning JSX
  return (
    <div
      className={cn(
        'lg:flex block lg:items-center lg:justify-between lg:gap-5 gap-[17px]',
        className,
      )}
    >
      <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
        داشبورد سفرنامه
      </span>
      <div className="lg:flex grid grid-cols-4 lg:shrink-0 lg:gap-2 gap-[17px]">
        <div className="bg-white lg:rounded-md rounded-[7px] lg:px-3 px-[20px] lg:h-10 h-[45px] flex items-center justify-center col-span-3">
          <span className="lg:text-cs07 text-[12px] font-medium text-black block text-center">
            {date.date}
          </span>
        </div>
        <div className="flex items-center justify-between lg:gap-2 gap-[5px] col-span-1">
          <div className="bg-white lg:rounded-md rounded-[7px] lg:aspect-square lg:h-10 h-[45px] lg:w-10 w-full flex items-center justify-center">
            <span className="lg:text-cs07 text-[12px] font-medium text-black block text-center">
              {date.time.minute}
            </span>
          </div>
          <span className="text-cs08 font-medium text-black block shrink-0">
            :
          </span>
          <div className="bg-white lg:rounded-md rounded-[7px] lg:aspect-square lg:h-10 h-[45px] lg:w-10 w-full flex items-center justify-center">
            <span className="lg:text-cs07 text-[12px] font-medium text-black block text-center">
              {date.time.hour}
            </span>
          </div>
        </div>
        <DropDown.DropdownMenu>
          <DropDown.DropdownMenuTrigger asChild>
            <button className="bg-white rounded-md lg:px-3 px-[20px] lg:h-10 h-[45px] flex items-center lg:justify-center justify-between text-black gap-3 col-span-4">
              <span className="lg:text-cs07 text-[12px] lg:font-medium font-semibold text-black block lg:text-center text-right">
                فیلتر تایم لاین
              </span>
              <ICChevronBottom className="w-3 h-3 text-current" />
            </button>
          </DropDown.DropdownMenuTrigger>
          <DropDown.DropdownMenuContent align="start" className="w-[200px]">
            <DropDown.DropdownMenuLabel className="p-3">
              <span className="truncate block text-cs08 font-medium text-black text-right">
                تایم لاین حالت دیفالت
              </span>
            </DropDown.DropdownMenuLabel>
            <DropDown.DropdownMenuSeparator className="mx-3 mb-3" />
            <DropDown.DropdownMenuItem
              asChild
              className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
            >
              <button>
                <span className="text-cs08 font-normal text-current text-right truncate block">
                  7 روز گذشته
                </span>
              </button>
            </DropDown.DropdownMenuItem>
            <DropDown.DropdownMenuItem
              asChild
              className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
            >
              <button>
                <span className="text-cs08 font-normal text-current text-right truncate block">
                  2 ماه گذشته
                </span>
              </button>
            </DropDown.DropdownMenuItem>
            <DropDown.DropdownMenuItem
              asChild
              className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
            >
              <button>
                <span className="text-cs08 font-normal text-current text-right truncate block">
                  1 سال گذشته
                </span>
              </button>
            </DropDown.DropdownMenuItem>
          </DropDown.DropdownMenuContent>
        </DropDown.DropdownMenu>
      </div>
    </div>
  );
}
