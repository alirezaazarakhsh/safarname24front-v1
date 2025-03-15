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
    <div className="p-3 rounded-lg border border-black/10 bg-white flex flex-col justify-between items-start">
      <div className="border-b-[3px] border-black/10 border-dashed mb-3 pb-3 w-full">
        <span className="text-cs08 font-bold text-black block truncate text-right">
          صورتحساب پرداختی
        </span>
      </div>
      <div className="flex flex-col gap-7 w-full">
        <div className="flex items-center justify-between gap-3">
          <span className="block text-right font-medium text-gray-600 truncate text-cs07">
            مبلغ نهایی :
          </span>
          <span className="block text-left font-medium text-black truncate text-cs07">
            {`${numberSeparation(value)} تومان`}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="block text-right font-medium text-gray-600 truncate text-cs07">
            معادل ریالی مبلغ :
          </span>
          <span className="block text-left font-medium text-black truncate text-cs07">
            {`${num2persian(value)} تومان`}
          </span>
        </div>
        <button className="bg-green-600 rounded-lg text-white flex items-center justify-center p-3">
          <span className="text-current font-medium text-cs07 block text-center truncate">
            تایید نهایی پرداخت
          </span>
        </button>
      </div>
    </div>
  );
}
