// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { UserStatusInfoComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';
import { numberSeparation } from '@/utils';
import { ICHoriz3Dots } from '@/components/icons/ICHoriz3Dots';
import * as Dropdown from '@/components/ui/dropdown-menu';

// Creating and eporting UserStatusInfo component as default
export default function UserStatusInfo({
  className,
  data,
}: UserStatusInfoComponentPropsType): ReactNode {
  // Defining states of component
  const [mode, setMode] = useState<string>('normal');

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 rounded-lg px-3 py-4 flex items-center justify-between gap-2',
        className,
      )}
    >
      <div data-mode={mode} className="flex items-center justify-center gap-3 data-[mode='normal']:w-[calc(100%-16px)] data-[mode='bar']:w-[50%] transition-all duration-500 overflow-hidden">
                {
                    (mode === "normal")
                        ? (
<div className="w-8 h-8 rounded-md aspect-square flex items-center justify-center bg-gray-100 shrink-0">
          {data.icon}
        </div>
                        ) : false
                }
        
        <div className="overflow-hidden w-full">
          <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
            {data.title}
          </span>
          <span className="text-cs75 font-medium text-black truncate block text-right">
            {`${numberSeparation(data.value.count)} ${data.value.unit}`}
          </span>
        </div>
      </div>
        <div className="flex items-center justify-between gap-3 shrink-0">
                {
                    (mode === 'normal')
                        ? false 
                        : (
                        <div className="bg-red-600 w-full ">
                                <h1>Hello world</h1>
                            </div>
                        )
                }
<Dropdown.DropdownMenu>
        <Dropdown.DropdownMenuTrigger asChild>
          <button className="shrink-0">
            <ICHoriz3Dots className="text-gray-200 w-4 h-4" />
          </button>
        </Dropdown.DropdownMenuTrigger>
        <Dropdown.DropdownMenuContent align="start">
          <Dropdown.DropdownMenuRadioGroup value={mode} onValueChange={(e) => setMode(e)}>
            <Dropdown.DropdownMenuRadioItem
              className="p-3 bg-white block transition-all duration-500 hover:bg-cs-red/10"
              value="normal"
            >
              <span
                data-active={mode === 'normal'}
                className="text-cs08 text-black text-right truncate block transition-all duration-500 data-[active='true']:font-bold data-[active='false']:font-normal"
              >
                حالت معمولی
              </span>
            </Dropdown.DropdownMenuRadioItem>
            <Dropdown.DropdownMenuSeparator className="mx-3 mb-3" />
            <Dropdown.DropdownMenuRadioItem
              className="p-3 bg-white block"
              value="bar"
            >
              <span
                data-active={mode === 'bar'}
                className="text-cs08 text-black text-right truncate block transition-all duration-500 data-[active='true']:font-bold data-[active='false']:font-normal"
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
