// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSendMessagePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';

// Creating and exporting Tikcets SendMessage component as default
export default function SendMessage({
  className,
  disabled = false,
}: TicketsSendMessagePropsType): ReactNode {
  // Defining hooks
  const [value, setValue] = useState<string>('');

  // Conditional rendering
  if (disabled) {
    return (
      <div
        className={cn(
          'flex justify-between text-black/50 bg-gray-50 rounded-lg gap-[12px] h-[50px] cursor-not-allowed overflow-hidden',
          className,
        )}
      >
        <div className="flex items-center justify-center shrink-0 h-full aspect-square">
          <IconsaxIcons
            name="Lock"
            className="shrink-0 size-5"
            color="currentColor"
          />
        </div>
        <div className="h-[50px] flex-1 flex items-center overflow-hidden">
          <span className="text-cs65 font-medium text-black/30 text-right truncate block w-full">
            مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت ابتدا دپارتمان
            خود را انتخاب نمایید
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <form
        action="#"
        className={cn(
          'flex justify-between text-black/50 bg-gray-50 gap-[12px] rounded-lg h-[50px] overflow-hidden',
          className,
        )}
      >
        <button className="flex items-center justify-center shrink-0 h-full aspect-square">
          <IconsaxIcons
            name="Happyemoji"
            className="size-5"
            color="currentColor"
          />
        </button>
        <input
          onChange={(e) => setValue(e.currentTarget.value)}
          className="text-cs65 font-medium placeholder:text-cs65 placeholder:black/30 text-black text-right truncate block flex-1  h-[50px] bg-transparent outline-0"
          type="text"
          placeholder="متن خود را بنویسید..."
        />
        {value === '' ? (
          <div className="flex items-center justify-between gap-[12px] shrink-0">
            <button className="flex items-center justify-center shrink-0 h-full aspect-square">
              <IconsaxIcons
                name="Gallery"
                className="size-5"
                color="currentColor"
              />
            </button>
            <button className="flex items-center justify-center shrink-0 h-full aspect-square">
              <IconsaxIcons
                name="Microphone"
                className="size-5"
                color="currentColor"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-[12px] shrink-0">
            <button className="flex items-center justify-center shrink-0 h-full aspect-square">
              <IconsaxIcons
                name="Send"
                className="size-5 rotate-180"
                color="currentColor"
              />
            </button>
          </div>
        )}
      </form>
    );
  }
}
