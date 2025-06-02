// Importing part
import { LegalNotesProfileComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Defining data to be render inside component
const notes: string[] = [
  'مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید.',
  'مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید.',
  'مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید.',
  'مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید.',
  'مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید مشتری گرامی لازم به ذکر میباشد که پروفایل حقیقی خود را با دقت پر کنید و در صورت خطا به تیم پشتیبانی سفرنامه 24 پیام دهید.',
];

// Creating and exporting LegalNotes component as default
export default function LegalNotes({
  className,
}: LegalNotesProfileComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden lg:px-3 lg:py-4 px-[14px] py-[14px]',
        className,
      )}
    >
      <span className='lg:text-cs75 text-[14px] font-semibold text-black truncate block text-right mb-3'>
        توضیحات مهم برای ارسال مدارک شرکت :
      </span>
      <ol className='flex flex-col gap-3'>
        {notes.map((item, index) => (
          <li
            key={index}
            className='text-right text-black/50 lg:text-cs75 text-[12px] lg:font-semibold font-bold'
          >
            {`${index + 1} - ${item}`}
          </li>
        ))}
      </ol>
    </div>
  );
}
