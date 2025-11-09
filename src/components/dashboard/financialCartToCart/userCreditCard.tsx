// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { UserCreditCardPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX } from 'react';

// Creating and exporting UserCreditCart component as default
export default function UserCreditCard({
  className,
  data,
}: UserCreditCardPropsType): JSX.Element {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden',
        className,
      )}
    >
      <div className="flex items-center justif-start gap-3 lg:p-4 p-[14px] border-b border-b-black/10">
        <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Cards"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            حساب بانکی شما (کارت دلخواه)
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            میتوانید کارت بانکی دلخواه مدنظر خود را اضافه نمایید.
          </p>
        </div>
      </div>
      <div className="lg:p-4 p-[14px]">
        <div className="h-[200px] bg-gray-200 mb-4 rounded-lg"></div>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-cs07 text-black truncate text-right mb-1 block">
              بانک
            </span>
            <span className="font-medium text-cs07 text-black/70 truncate text-right block">
              سیستم بانکی ناشناخته است!
            </span>
          </div>
          <div>
            <span className="font-semibold text-cs85 text-black truncate text-right mb-1 block">
              شماره کارت بانکی
            </span>
            <div className="bg-gray-100 h-[20px] w-full" />
          </div>
          <div>
            <span className="font-semibold text-cs85 text-black truncate text-right mb-1 block">
              شماره شبا کارت بانکی
            </span>
            <div className="bg-gray-100 h-[20px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
