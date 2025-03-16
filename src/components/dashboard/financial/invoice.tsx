// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { InvoiceComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { ReactNode } from 'react';
import num2persian from 'num2persian';

// Creating and exporting Invoice componnent as default
export default function Invoice({
  value,
}: InvoiceComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className="lg:py-3 lg:px-3 py-[18px] px-[12px] lg:rounded-lg rounded-[14px] border border-black/10 bg-white flex flex-col justify-between items-start lg:h-full h-auto">
      <div className="border-b-[3px] border-black/10 border-dashed lg:mb-3 mb-[20px] lg:pb-3 pb-[20px] w-full">
        <span className="lg:text-cs85 text-[12px] font-semibold text-black truncate block">
          صورتحساب پرداختی
        </span>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center justify-between gap-3">
          <span className="block text-right font-medium text-gray-600 truncate lg:text-cs07 text-[12px]">
            مبلغ نهایی :
          </span>
          <span className="block text-left font-medium text-black truncate lg:text-cs07 text-[12px]">
            {value !== 0
              ? `${numberSeparation(value)} تومان`
              : 'مبلغی وارد نشده!'}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="block text-right font-medium text-gray-600 truncate lg:text-cs07 text-[12px]">
            معادل ریالی مبلغ :
          </span>
          <span className="block text-left font-medium text-black truncate lg:text-cs07 text-[12px]">
            {value !== 0 ? `${num2persian(value)} تومان` : 'نامعلوم'}
          </span>
        </div>
        <button
          disabled={value === 0}
          className="bg-green-600 lg:h-auto h-[50px] lg:rounded-lg rounded-[8px] text-white flex items-center justify-center lg:p-3 p-[18px] transition-all duration-500 hover:bg-green-700 disabled:bg-gray-200 disabled:text-gray-500"
        >
          <span className="text-current lg:font-medium font-semibold lg:text-cs07 text-[12px] block text-center truncate">
            تایید نهایی پرداخت
          </span>
        </button>
      </div>
    </div>
  );
}
