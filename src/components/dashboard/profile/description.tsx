// Importing part
import { DescriptionProfileComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting Description component as default
export default function Description({
  className,
}: DescriptionProfileComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden lg:p-4 p-[14px]',
        className,
      )}
    >
      <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
        توضیحات تکمیلی :
      </span>
      <p className="text-right text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
        مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و
        در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید تا مشکلاتان را برطرف
        کنند از همراهی شما سپاسگزاریم.
      </p>
    </div>
  );
}
