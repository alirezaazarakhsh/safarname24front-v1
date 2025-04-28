// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { DatePickerComponentPropsType } from '@/types/dashboard/component';
import { handleZeroBeforeNumber } from '@/utils/string';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';

// Creating and exporting DatePicker component as default
export default function DatePicker({
  closeFn,
  isOpened,
  className,
}: DatePickerComponentPropsType): ReactNode {
  // Defining Variables
  const weekDayNames = ['ش', 'ی', 'د', 'س', 'ج', 'پ', 'ج'];
  const persianMonthNames = [
    'فروردین', // 0
    'اردیبهشت', // 1
    'خرداد', // 2
    'تیر', // 3
    'مرداد', // 4
    'شهریور', // 5
    'مهر', // 6
    'آبان', // 7
    'آذر', // 8
    'دی', // 9
    'بهمن', // 10
    'اسفند', // 11
  ];

  // Returning JSX
  return createPortal(
    <>
      <div
        className="z-40 bg-black/20 w-full h-full fixed top-0 left-0 origin-center transition-all duration-500 data-[opened='true']:opacity-100 data-[opened='true']:visible data-[opened='false']:opacity-0 data-[opened='false']:invisible"
        onClick={closeFn}
        data-opened={isOpened}
      />
      <div
        data-opened={isOpened}
        className={cn(
          'bg-white p-5 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 origin-center w-[600px] max-h-[85dvh] overflow-auto scrollbar-hide transition-all duration-500 data-[opened="false"]:opacity-0 data-[opened="false"]:scale-95 data-[opened="false"]:invisible data-[opened="true"]:opacity-100 data-[opened="true"]:scale-100 data-[opened="true"]:visible rounded-xl shadow-xl',
          className,
        )}
      >
        <div className="grid grid-cols-2 gap-10 mb-4">
          <button className="flex items-center">
            <div className="w-5 h-5 aspect-square bg-gray-100 flex items-center justify-center rounded-md shrink-0">
              <IconsaxIcons
                name="ArrowRight2"
                color="black"
                className="w-2.5 h-2.5"
              />
            </div>
            <span className="block mx-auto w-full text-center truncate text-cs08 font-semibold text-black">
              X
            </span>
          </button>
          <button className="flex items-center">
            <span className="block mx-auto w-full text-center truncate text-cs08 font-semibold text-black">
              X
            </span>
            <div className="w-5 h-5 aspect-square bg-gray-100 flex items-center justify-center rounded-md shrink-0">
              <IconsaxIcons
                name="ArrowLeft2"
                color="black"
                className="w-2.5 h-2.5"
              />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-2 mb-3">
          <div className="grid grid-cols-7 gap-3 pl-5 border-l border-l-black/10">
            {weekDayNames.map((item, index) => (
              <div
                className="bg-gray-100 flex items-center justify-center aspect-square rounded-md"
                key={`${index}-JWD-1`}
              >
                <span className="text-cs06 font-medium text-black">{item}</span>
              </div>
            ))}
            {[...new Array(2)].map((item, index) => (
              <div key={`${index}-JDDX-1`} className="aspect-square" />
            ))}
            {[...new Array(30)].map((item, index) => (
              <div
                key={`${index}-JDD-1`}
                data-role={'normal'}
                className={cn(
                  'flex items-center justify-center aspect-square rounded-md transition-all',
                  "data-[role='passed']:bg-white data-[role='passed']:text-gray-200",
                  "data-[role='selected']:bg-cs-red data-[role='selected']:text-white",
                  "data-[role='today']:bg-black data-[role='today']:text-white",
                  "data-[role='normal']:bg-white data-[role='normal']:text-black",
                )}
              >
                <span className="text-cs06 font-medium text-current">
                  {handleZeroBeforeNumber((index + 1).toString())}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-3 pr-5">
            {weekDayNames.map((item, index) => (
              <div
                className="bg-gray-100 flex items-center justify-center aspect-square rounded-md"
                key={`${index}-JWD-2`}
              >
                <span className="text-cs06 font-medium text-black">{item}</span>
              </div>
            ))}
            {[...new Array(2)].map((item, index) => (
              <div key={`${index}-JDDX-2`} className="aspect-square" />
            ))}
            {[...new Array(30)].map((item, index) => (
              <div
                key={`${index}-JDD-2`}
                data-role={'normal'}
                className={cn(
                  'flex items-center justify-center aspect-square rounded-md transition-all',
                  "data-[role='passed']:bg-white data-[role='passed']:text-gray-200",
                  "data-[role='selected']:bg-cs-red data-[role='selected']:text-white",
                  "data-[role='today']:bg-black data-[role='today']:text-white",
                  "data-[role='normal']:bg-white data-[role='normal']:text-black",
                )}
              >
                <span className="text-cs06 font-medium text-current">
                  {handleZeroBeforeNumber((index + 1).toString())}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <Button className="bg-white border border-black/10 rounded-lg flex items-center justify-center py-3 px-5 hover:bg-gray-50">
            <span className="font-normal text-black/60 truncate block w-full text-center text-xs">
              تبدیل به تقویم میلادی
            </span>
          </Button>
          <div className="flex items-center justify-end gap-3">
            <Button className="bg-cs-red rounded-lg flex items-center justify-center py-3 px-5 hover:bg-cs-red">
              <span className="font-normal text-white truncate block w-full text-center text-xs">
                پاک کردن
              </span>
            </Button>
            <Button
              onClick={closeFn}
              className="bg-black rounded-lg flex items-center justify-center py-3 px-5 hover:bg-black"
            >
              <span className="font-normal text-white truncate block w-full text-center text-xs">
                تایید تاریخ
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
