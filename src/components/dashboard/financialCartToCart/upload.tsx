// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

// Creating and exporting Upload component as default
export default function Upload(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-white border border-black/10 rounded-lg overflow-hidden flex flex-col items-start justify-start w-[50%]">
      <div className="px-3 py-4 flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="CloudAdd"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
            بارگزاری فایل مربوطه
          </span>
          <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
            فایل، عکس، فاکتور و غیره میتوانید در این قسمت آپلود کنید.
          </p>
        </div>
      </div>
      <div className="px-3 py-4 h-full border-b border-b-black/10 w-full flex">
        <div className="w-full h-full border-[3px] border-black/10 rounded-xl border-dashed flex items-center justify-center cursor-pointer">
          <div>
            <IconsaxIcons
              color="black"
              name="DocumentUpload"
              className="w-[40px] h-[40px] block mx-auto mb-3"
            />
            <p className="text-black font-normal text-xs block text-center truncate mb-2">
              <span className="font-bold inline-block ml-[4px]">
                کلیک کردن برای آپلود فایل
              </span>
              یا درگ کردن فایل
            </p>
            <span className="text-black/50 font-normal text-xs block text-center truncate">
              حداکثر آپلود فایل 30MB میباشد
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 px-3 py-4 shrink-0 w-full">
        <div className="flex items-center justify-between gap-3">
          <Button className="bg-black rounded-lg flex items-center justify-center py-3 px-5">
            <span className="font-normal text-white truncate block w-full text-center text-xs">
              آپلود فایل
            </span>
          </Button>
          <Button className="bg-white border border-black/10 rounded-lg flex items-center justify-center py-3 px-5 hover:bg-gray-50">
            <span className="font-normal text-black/60 truncate block w-full text-center text-xs">
              مشاهده تمام فایل
            </span>
          </Button>
        </div>
        <Button
          className={
            'transition-all duration-500 rounded-lg gap-2 flex items-center justify-center p-3 hover:bg-gray-200 bg-gray-100 text-black/50'
          }
        >
          <IconsaxIcons
            name={'Trash'}
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal  truncate block w-full text-right text-xs text-current">
            حذف فایل
          </span>
        </Button>
      </div>
    </div>
  );
}
