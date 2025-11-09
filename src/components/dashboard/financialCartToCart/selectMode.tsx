// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import { SelectModePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX } from 'react';
import Selecter from './selecter';

// Creating and exporting SelectMode component as default
export default function SelectMode({
  className,
  onValueChange,
  value,
}: SelectModePropsType): JSX.Element {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] flex items-center justify-between gap-3',
        className,
      )}
    >
      <div className="overflow-hidden flex-1">
        <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
          بخش مالی - کارت به کارت
        </span>
        <span className="text-cs75 font-normal truncate text-right block text-black/70">
          مشتری گرامی در این بخش میتوایند مبلغ مدنظرتون واریز و برداشت کنید.
        </span>
      </div>
      <div className="flex items-center justify-end gap-5 shrink-0">
        <Selecter
          label="انتخاب شماره کارت حقیقی"
          checked={value === 'personal'}
          onCheckChange={(checked) =>
            checked && onValueChange && onValueChange('personal')
          }
        />
        <Selecter
          label="انتخاب شماره کارت حقوقی"
          checked={value === 'company'}
          onCheckChange={(checked) =>
            checked && onValueChange && onValueChange('company')
          }
        />
        <Selecter
          label="انتخاب شماره کارت دلخواه"
          checked={value === 'custom'}
          onCheckChange={(checked) =>
            checked && onValueChange && onValueChange('custom')
          }
        />
        <button className="px-6 py-3 flex items-center justify-center rounded-md text-black border border-black/10 bg-gray-50 transition-all duration-500 hover:bg-gray-100 text-cs75 font-medium truncate">
          ارسال اطلاعات
        </button>
      </div>
    </div>
  );
}
