// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { UserStatusInfoComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';
import { numberSeparation } from '@/utils';
import { ICHoriz3Dots } from '@/components/icons/ICHoriz3Dots';
import * as Dropdown from '@/components/ui/dropdown-menu';
import { UserInfoBarChart } from './userInfoBarCharts';
import { ICChartDown } from '@/components/icons/ICChartDown';

// Creating and eporting UserStatusInfo component as default
export default function UserStatusInfo({
  className,
  data,
}: UserStatusInfoComponentPropsType): ReactNode {
  // Defining states of component
  const [mode, setMode] = useState<string>('normal'); // values: normal, bar

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] lg:px-3 lg:py-4 px-[20px] py-[20px] flex items-center justify-between gap-2 lg:h-auto h-[83px]',
        className,
      )}
    >
      <div
        data-mode={mode}
        className="flex items-center justify-center lg:gap-3 gap-[15px] lg:data-[mode='normal']:w-[calc(100%-16px)] data-[mode='normal']:w-[calc(100%-20px)] data-[mode='bar']:w-[50%] transition-all duration-500 overflow-hidden"
      >
        {mode === 'normal' && data.value.count !== 0 ? (
          <div className="lg:w-8 lg:h-8 w-[43px] h-[43px] lg:rounded-md rounded-[7px] aspect-square flex items-center justify-center bg-gray-100 shrink-0">
            {data.icon}
          </div>
        ) : (
          false
        )}

        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] lg:font-medium font-semibold text-black truncate block text-right lg:mb-1 mb-2">
            {data.title}
          </span>
          <span className="lg:text-cs75 text-[10px] lg:font-medium font-semibold text-black truncate block text-right">
            {data.value.count !== 0
              ? `${numberSeparation(data.value.count)} ${data.value.unit}`
              : `${data.value.unit} نداشتید!`}
          </span>
        </div>
      </div>
      <div
        data-mode={mode}
        className="flex items-center justify-end gap-1 shrink-0 transition-all duration-500 data-[mode='normal']:w-auto data-[mode='bar']:w-[50%]"
      >
        {mode === 'normal' ? (
          false
        ) : (
          <div className="w-[100px]">
            <UserInfoBarChart />
          </div>
        )}
        {data.value.count === 0 ? (
          <div className="w-[100px]">
            <ICChartDown className="w-full" />
          </div>
        ) : (
          false
        )}
        <Dropdown.DropdownMenu>
          <Dropdown.DropdownMenuTrigger
            asChild
            disabled={data.value.count === 0}
          >
            <button className="shrink-0">
              <ICHoriz3Dots className="text-gray-200 lg:w-4 lg:h-4 w-[20px] h-[20px]" />
            </button>
          </Dropdown.DropdownMenuTrigger>
          <Dropdown.DropdownMenuContent align="start">
            <Dropdown.DropdownMenuRadioGroup
              value={mode}
              onValueChange={(e) => setMode(e)}
            >
              <Dropdown.DropdownMenuRadioItem
                className="lg:p-3 p-[15px] bg-white block transition-all duration-500 hover:bg-cs-red/10 hover:text-cs-red text-black cursor-pointer"
                value="normal"
              >
                <span
                  data-active={mode === 'normal'}
                  className="lg:text-cs08 text-[10px] text-current text-right lg:font-medium font-bold truncate block transition-all duration-500 data-[active='true']:font-bold data-[active='false']:font-normal"
                >
                  حالت معمولی
                </span>
              </Dropdown.DropdownMenuRadioItem>
              <Dropdown.DropdownMenuSeparator className="mx-3 mb-3" />
              <Dropdown.DropdownMenuRadioItem
                className="lg:p-3 p-[15px] bg-white block transition-all duration-500 hover:bg-cs-red/10 hover:text-cs-red text-black cursor-pointer"
                value="bar"
              >
                <span
                  data-active={mode === 'bar'}
                  className="lg:text-cs08 text-[10px] text-current text-right lg:font-medium font-bold truncate block transition-all duration-500 data-[active='true']:font-bold data-[active='false']:font-normal"
                >
                  حالت حرفه ای - چارت لاین
                </span>
              </Dropdown.DropdownMenuRadioItem>
            </Dropdown.DropdownMenuRadioGroup>
          </Dropdown.DropdownMenuContent>
        </Dropdown.DropdownMenu>
      </div>
    </div>
  );
}
