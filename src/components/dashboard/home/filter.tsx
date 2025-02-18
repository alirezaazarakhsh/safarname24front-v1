// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ICChevronBottom } from "@/components/icons/ICChevronBottom";
import { getTodayDate } from "@/utils/date";
import { ReactNode } from "react";
import * as DropDown from "@/components/ui/dropdown-menu";
import { FilterComponentPropsType } from "@/types/dashboard/component";
import { cn } from "@/utils/utils";

// Creating and exporting Filter component as defualt
export default function Filter({
  className,
}: FilterComponentPropsType): ReactNode {
  // Defining current date in tehran
  const date = getTodayDate();

  // Returning JSX
  return (
    <div className={cn("flex items-center justify-between gap-5", className)}>
      <span className="block truncate text-right w-full font-bold text-cs85 text-black">
        داشبورد سفرنامه
      </span>
      <div className="flex shrink-0 gap-2">
        <div className="bg-white rounded-md px-3 h-10 flex items-center justify-center">
          <span className="text-cs07 font-medium text-black block text-center">
            {date.date}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="bg-white rounded-md aspect-square h-10 flex items-center justify-center">
            <span className="text-cs07 font-medium text-black block text-center">
              {date.time.minute}
            </span>
          </div>
          <span className="text-cs08 font-medium text-black block">:</span>
          <div className="bg-white rounded-md aspect-square h-10 flex items-center justify-center">
            <span className="text-cs07 font-medium text-black block text-center">
              {date.time.hour}
            </span>
          </div>
        </div>
        <DropDown.DropdownMenu>
          <DropDown.DropdownMenuTrigger asChild>
            <button className="bg-white rounded-md px-3 h-10 flex items-center justify-center text-black gap-3">
              <span className="text-cs07 font-medium text-black block text-center">
                فیلتر تایم لاین
              </span>
              <ICChevronBottom className="w-3 h-3 text-current" />
            </button>
          </DropDown.DropdownMenuTrigger>
          <DropDown.DropdownMenuContent
                        align="start"
            className="shadow-none w-[170px]"
          >
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
