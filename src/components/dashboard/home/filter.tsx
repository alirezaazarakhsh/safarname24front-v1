// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ICChevronBottom } from '@/components/icons/ICChevronBottom';
import { getTodayDate } from '@/utils/date';
import { ReactNode, useState } from 'react';
import * as DropDown from '@/components/ui/dropdown-menu';
import { FilterComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';

// Creating and exporting Filter component as defualt
export default function Filter({
  className,
}: FilterComponentPropsType): ReactNode {
  // Defining current date in tehran
  const date = getTodayDate();

  // Defining states of component
  const [filter, setFilter] = useState<string>('7'); // values: 7, 2, 1

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
      <div className="lg:flex block lg:shrink-0 lg:gap-2">
        <div className="flex lg:gap-2 gap-[17px] lg:mb-0 mb-[17px]">
          <div className="bg-white lg:rounded-md rounded-[7px] lg:px-3 px-[20px] lg:h-10 h-[45px] flex items-center justify-center lg:w-auto w-full">
            <span className="lg:text-cs07 text-[12px] font-medium text-black block text-center whitespace-nowrap truncate">
              {date.date}
            </span>
          </div>
          <div className="flex items-center justify-between lg:gap-2 gap-[5px] col-span-1 lg:shrink shrink-0">
            <div className="bg-white lg:rounded-md rounded-[7px] aspect-square lg:aspect-square lg:h-10 h-[45px] lg:w-10 w-full flex items-center justify-center">
              <span className="lg:text-cs07 text-[12px] font-medium text-black block text-center">
                {date.time.minute}
              </span>
            </div>
            <span className="text-cs08 font-medium text-black block shrink-0 ">
              :
            </span>
            <div className="bg-white lg:rounded-md rounded-[7px] aspect-square lg:h-10 h-[45px] lg:w-10 w-full flex items-center justify-center">
              <span className="lg:text-cs07 text-[12px] font-medium text-black block text-center">
                {date.time.hour}
              </span>
            </div>
          </div>
        </div>
        <DropDown.DropdownMenu>
          <DropDown.DropdownMenuTrigger asChild>
            <button className="bg-white rounded-md lg:px-3 px-[20px] lg:h-10 h-[45px] flex items-center lg:justify-center justify-between text-black gap-3 lg:w-auto w-full group">
              <span className="lg:text-cs07 text-[12px] lg:font-medium font-semibold text-black block lg:text-center text-right">
                فیلتر تایم لاین
              </span>
              <ICChevronBottom className="w-3 h-3 text-current transition-all duration-500 group-data-[state='close']:rotate-0 group-data-[state='open']:rotate-180" />
            </button>
          </DropDown.DropdownMenuTrigger>
          <DropDown.DropdownMenuContent
            align="start"
            className="w-[200px] rounded-lg shadow-[0_0_2rem_rgba(0,0,0,0.1)]"
          >
            <DropDown.DropdownMenuLabel className="p-3">
              <span className="truncate block text-cs08 font-medium text-black text-right">
                {`تایم لاین : ${filter} روز گذشته`}
              </span>
            </DropDown.DropdownMenuLabel>
            <DropDown.DropdownMenuSeparator className="mx-3 mb-3" />
            <DropDown.DropdownMenuRadioGroup
              value={filter}
              onValueChange={(e) => setFilter(e)}
            >
              <DropDown.DropdownMenuRadioItem
                value="7"
                asChild
                className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red block"
                data-active={filter === '7'}
              >
                <button>
                  <span className="text-cs08 font-normal text-current text-right truncate block">
                    7 روز گذشته
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
              <DropDown.DropdownMenuRadioItem
                asChild
                value="2"
                className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red block"
                data-active={filter === '2'}
              >
                <button>
                  <span className="text-cs08 font-normal text-current text-right truncate block">
                    2 ماه گذشته
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
              <DropDown.DropdownMenuRadioItem
                value="1"
                asChild
                className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red block"
                data-active={filter === '1'}
              >
                <button>
                  <span className="text-cs08 font-normal text-current text-right truncate block">
                    1 سال گذشته
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
            </DropDown.DropdownMenuRadioGroup>
          </DropDown.DropdownMenuContent>
        </DropDown.DropdownMenu>
      </div>
    </div>
  );
}
