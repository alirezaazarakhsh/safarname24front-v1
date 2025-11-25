// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import { SelectModePropsType, WalletIntroductionPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX } from 'react';
import Loading from '../ui/loading';
import Selecter from '../financialCartToCart/selecter';

// Creating and exporting SelectMode component as default
export default function Introduction({
  className,
  value,
  onValueChange
}: WalletIntroductionPropsType): JSX.Element {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] flex lg:flex-row flex-col items-center justify-between gap-3',
        className,
      )}
    >
      <div className="overflow-hidden flex-1 lg:w-auto w-full">
        <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
          بخش مالی - شارژ کیف پول
        </span>
        <span className="text-cs75 font-normal truncate text-right block text-black/70">
          مشتری گرامی لطفا از بین دو روش انتخابی شارژ کیف پول خود یکی را انتخاب نمایید.
        </span>
      </div>
      <div className="flex lg:flex-row flex-col lg:w-auto w-full items-center justify-end gap-5 shrink-0">
        <Selecter
          label="مبلغ انتخابی"
          className="lg:w-auto w-full"
          checked={value === 'static'}
          onCheckChange={(checked) => checked && onValueChange('static')}
        />
        <Selecter
          label="مبلغ دستی اضافه"
          checked={value === 'dynamic'}
          className="lg:w-auto w-full"
          onCheckChange={(checked) => checked && onValueChange('dynamic')}
        />
      </div>
    </div>
  );
}
