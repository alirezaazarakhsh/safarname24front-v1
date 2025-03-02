// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { UserStatusInfoComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';
import { numberSeparation } from '@/utils';
import { ICHoriz3Dots } from '@/components/icons/ICHoriz3Dots';
import * as DropDown from '@/components/ui/dropdown-menu';
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
        'bg-white border border-black/10 lg:rounded-[12px] rounded-[14px] lg:px-[10px] lg:py-[12px] px-[15px] py-[20px] flex items-center justify-between gap-2 lg:h-auto h-[83px]',
        className,
      )}
    >
      <div
        data-mode={mode}
        className="flex items-center justify-center lg:gap-3 gap-[15px] lg:data-[mode='normal']:w-[calc(100%-16px)] data-[mode='normal']:w-[calc(100%-20px)] data-[mode='bar']:w-[50%] transition-all duration-500 overflow-hidden"
      >
        {mode === 'normal' ? (
          <div className="lg:w-[38px] lg:h-[38px] w-[43px] h-[43px] lg:rounded-md rounded-[7px] aspect-square flex items-center justify-center bg-gray-100 shrink-0">
            {data.icon}
          </div>
        ) : (
          false
        )}

        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1 mb-2">
            {data.title}
          </span>
          <span className="lg:text-cs75 text-[10px] font-semibold text-black truncate block text-right">
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
        {mode === 'bar' && (
          <div
            className={cn(
              'w-[100px]',
              data.value.count === 0 ? 'flex items-center justify-end' : '',
            )}
          >
            {data.value.count === 0 ? (
              <ICChartDown className="w-[60px] aspect-square block" />
            ) : (
              <UserInfoBarChart />
            )}
          </div>
        )}
        <DropDown.DropdownMenu>
          <DropDown.DropdownMenuTrigger asChild>
            <button className="shrink-0">
              <ICHoriz3Dots className="text-gray-200 lg:w-4 lg:h-4 w-[20px] h-[20px]" />
            </button>
          </DropDown.DropdownMenuTrigger>
          <DropDown.DropdownMenuContent
            align="start"
            className="w-[200px] rounded-lg shadow-[0_0_2rem_rgba(0,0,0,0.1)]"
          >
            <DropDown.DropdownMenuRadioGroup
              value={mode}
              onValueChange={(e) => setMode(e)}
            >
              <DropDown.DropdownMenuRadioItem
                value="normal"
                asChild
                className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red w-full cursor-pointer data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red block"
                data-active={mode === 'normal'}
              >
                <button>
                  <span className="text-cs08 font-normal text-current text-right truncate block">
                    حالت معمولی
                  </span>
                </button>
              </DropDown.DropdownMenuRadioItem>
              <DropDown.DropdownMenuSeparator className="mx-3" />
              <DropDown.DropdownMenuRadioItem
                value="bar"
                asChild
                className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red w-full cursor-pointer data-[active='true']:bg-cs-red/10 data-[active='true']:text-cs-red block"
                data-active={mode === 'bar'}
              >
                <button>
                  <span className="text-cs08 font-normal text-current text-right truncate block">
                    حالت حرفه ای - چارت لاین
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
