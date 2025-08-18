// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { TicketsSendMessagePropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting Tikcets SendMessage component as default
export default function SendMessage({
  className,
  disabled = false,
}: TicketsSendMessagePropsType): ReactNode {
  // Conditional rendering
  if (disabled) {
    return (
      <div
        className={cn(
          'flex items-center justify-start text-black/50 bg-gray-50 gap-5 px-[24px] py-[12px] rounded-lg cursor-not-allowed',
          className,
        )}
      >
        <IconsaxIcons
          name="Lock"
          className="shrink-0 size-5"
          color="currentColor"
        />
        <span className="text-cs65 font-medium text-black/30 text-right truncate block flex-1">
          مشتری گرامی صفحه چت برای شما قفل میباشد، برای استارت ابتدا دپارتمان
          خود را انتخاب نمایید
        </span>
      </div>
    );
  } else {
    return 'NOT YET';
  }
}
