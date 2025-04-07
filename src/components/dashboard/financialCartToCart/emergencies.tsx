// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode } from 'react';
import InputAndLabel from './inputAndLabel';
import { Button } from '@/components/ui/button';

// Creating and exporting Emergencies component as default
export default function Emergencies(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden row-span-3">
      <div className="px-3 py-4 flex items-center justify-start border-b border-b-black/10 gap-3">
        <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Warning2"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
            موراد ضروری
          </span>
          <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
            فیلد های ضروری (ستاره دار) زیر را با دقت پر نمایید.
          </p>
        </div>
      </div>
      <div className="px-3 py-4 flex flex-col gap-7 border-b border-b-black/10">
        <InputAndLabel
          placeholder="* شماره پیگیری خود را وارد نمایید"
          validation="12 رقم"
          label="شماره پیگیری"
        />
        <InputAndLabel
          placeholder="* مبلغ مد نظر خود را وارد نمایید"
          label="مبلغ اضافه"
        />
        <InputAndLabel
          placeholder="* تاریخ واریز خود را انتخاب نمایید"
          label="تاریخ واریز وجه"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-3 py-4">
        <Button className="bg-black rounded-lg flex items-center justify-center py-3 px-5">
          <span className="font-normal text-white truncate block w-full text-center text-xs">
            ثبت اطلاعات
          </span>
        </Button>
        <Button className="bg-gray-100 rounded-lg gap-2 flex items-center justify-center p-3 text-black/50 transition-all duration-500 hover:bg-gray-200">
          <IconsaxIcons
            name="CloseSquare"
            color="currentColor"
            className="h-[15px] w-[15px]"
          />
          <span className="font-normal  truncate block w-full text-right text-xs text-current">
            تکمیل نشده
          </span>
        </Button>
      </div>
    </div>
  );
}
