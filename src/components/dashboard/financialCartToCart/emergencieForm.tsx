// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { EmergencieFormPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX } from 'react';
import NormalInput from '../profile/normalInput';
import DatePickerInput from './datePickerInput';

// Creating and exporting EmergencieForm component as default
export default function EmergencieForm({
  className,
}: EmergencieFormPropsType): JSX.Element {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden flex items-center justify-between flex-col',
        className,
      )}
    >
      <div className="flex items-center justif-start gap-3 lg:p-4 p-[14px] border-b border-b-black/10 shrink-0 w-full">
        <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Warning2"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            موراد ضروری
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            فیلد های ضروری (ستاره دار) زیر را با دقت پر نمایید.
          </p>
        </div>
      </div>
      <div className="lg:p-4 p-[14px] h-full w-full space-y-5 overflow-auto scrollbar-hide">
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            نام واریز کننده
          </span>
          <NormalInput
            type="text"
            required
            className="h-[45px]"
            placeholder="نام واریز کننده فیش خود را وارد نمایید"
          />
        </div>
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            شماره پیگیری
          </span>
          <NormalInput
            type="text"
            required
            className="h-[45px]"
            placeholder="شماره پیگیری خود را وارد نمایید"
            validationText="12 رقم"
          />
        </div>
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            مبلغ اضافه
          </span>
          <NormalInput
            type="text"
            required
            className="h-[45px]"
            placeholder="مبلغ مد نظر خود را وارد نمایید"
          />
        </div>
        <DatePickerInput
          label="تاریخ واریز وجه"
          className="h-[45px]"
          placeholder="تاریخ واریز خود را انتخاب نمایید"
        />
      </div>
      <div className="lg:p-4 p-[14px] shrink-0 w-full border-t border-t-black/10">
        <div
          className={cn(
            'transition-all duration-500 lg:w-auto w-[40px] h-[40px] lg:rounded-lg rounded-[10px] lg:gap-2 flex items-center justify-center lg:p-3',
            'bg-green-500/5 hover:bg-green-500/10 text-green-500 ',
            // 'bg-gray-100 text-black/50 opacity-100 hover:bg-gray-100',
          )}
        >
          <IconsaxIcons
            name={'TickSquare'} // CloseSquare
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal truncate w-full text-right text-xs text-current lg:block hidden">
            اطلاعات فیلد ها تکمیل شده
            {/*اطلاعات فیلد ها تکمیل نشده*/}
          </span>
        </div>
      </div>
    </div>
  );
}
