// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { SubscriptionPickerPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useState } from 'react';
import { addCommas } from '@persian-tools/persian-tools';
import BuySubscriptionDialog from './dialog/buySubscriptionDialog';

// Creating and exporting SubscriptionPicker component as default
export default function SubscriptionPicker({
  className,
}: SubscriptionPickerPropsType): JSX.Element {
  // Defininig hooks
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden',
        className,
      )}
    >
      <BuySubscriptionDialog
        id={1}
        open={modalOpened}
        onOpenChange={setModalOpened}
      />
      <div className="flex items-center justify-between gap-3 lg:p-4 p-[14px] border-b border-b-black/10">
        <div className='flex items-center justify-start gap-3  flex-1 overflow-hidden'>
          <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
            <IconsaxIcons
              name="Crown1"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          </div>
          <div className="overflow-hidden w-full">
            <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
              خرید و تمدید اشتراک
            </span>
            <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
              برای خرید و تمدید اشتراک خود در سفرنامه 24 از این قسمت استفاده کنید.
            </p>
          </div>
        </div>
        <button
          className="lg:w-[125px] w-fit shrink-0 lg:text-sm text-xs lg:px-6 px-3 lg:h-[45px] h-[38px] flex items-center justify-center rounded-md disabled:text-black border disabled:border-black/10 disabled:bg-gray-50 transition-all duration-500 text-cs75 font-medium truncate bg-green-500 border-green-500 hover:bg-green-600 text-white"
          onClick={() => setModalOpened(true)}
        >
          ارسال اطلاعات
        </button>
      </div>
      <div className="lg:p-4 p-[14px] grid lg:grid-cols-9 gap-4">
        <div className="lg:h-[230px] h-[190px]  bg-gray-200 rounded-xl py-4 px-8 overflow-hidden lg:col-span-4">
          <div className='rounded-xl p-4 text-white flex flex-col items-center justify-between gap-3 bg-gray-300 from-transparent to-cs-red bg-gradient-to-bl h-full'>
            <div className='w-full'>
              <span className="text-left truncate block flex-1 text-white font-semibold text-cs75">
                اشتراک سفرنامه 24
              </span>
            </div>
            <div className='w-full'>
              <span className="text-left truncate block text-white font-medium text-cs95 mb-1.5">
                فلان
              </span>
              <span className="text-left truncate block text-white font-semibold text-cs85">
                {`${addCommas(1200000)} تومان`}
              </span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 grid lg:grid-cols-2 gap-4">
          <div className='space-y-4'>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="Tag"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  نام
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  فلان
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="InfoCircle"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  توضیحات
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  فلان توضیحات
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="Money"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  هزینه ماهانه
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  {`${addCommas(1200000)} تومان`}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="ColorSwatch"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <div className="overflow-hidden w-full">
                <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                  رنگ
                </span>
                <span className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                  قرمز
                </span>
              </div>
            </div>
          </div>
          <div className='space-y-4 flex items-center justify-between flex-col lg:h-[230px]'>
            <div className="flex items-center justify-start gap-3 w-full">
              <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
                <IconsaxIcons
                  name="Grid1"
                  className="w-[20px] h-[20px]"
                  color="currentColor"
                />
              </div>
              <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right">
                اپشن ها
              </span>
            </div>
            <ul className='w-full space-y-4 list-inside list-disc lg:h-full overflow-auto custom-scrollbar'>
              {
                [...new Array(20)].map((_, index) => (
                  <li className="text-right truncate text-black/75 lg:text-cs75 text-[12px] lg:font-semibold font-bold" key={index}>
                    فلان
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
}
