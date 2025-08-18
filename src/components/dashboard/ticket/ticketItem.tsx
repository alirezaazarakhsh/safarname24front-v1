// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { TicketItemPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import Image from 'next/image';
import moment from 'jalali-moment';

// Creating and exporting TikcetItem component as default
export default function TicketItem({
  className,
  data,
  disabled,
  onClick,
}: TicketItemPropsType): ReactNode {
  // Returning JSX
  return (
    <button
      disabled={disabled}
      onClick={() => !disabled && onClick && onClick()}
      className={cn(
        'flex items-center justify-between gap-3 w-full transition-all duration-500 disabled:cursor-not-allowed cursor-pointer bg-white disabled:hover:bg-white hover:bg-gray-100 p-[12px] rounded-lg',
        className,
      )}
    >
      <div className="flex items-center justify-start gap-3 flex-1 overflow-hidden w-full">
        {data?.img ? (
          <Image
            width={100}
            height={100}
            alt="پروفایل کاریر"
            src={data.img}
            className="size-[40px] aspect-square block object-cover rounded-full shrink-0"
          />
        ) : (
          <div className="bg-cs-red size-[40px] aspect-square shrink-0 rounded-full" />
        )}
        <div className="flex-1 w-full overflow-hidden">
          <span className="text-cs75 font-medium text-black text-right truncate block mb-1">
            {data?.title || '-'}
          </span>
          <span className="text-cs75 font-medium text-black/70 text-right truncate block">
            {data?.subTitle || 'صحبتی ایجاد نشده !'}
          </span>
        </div>
      </div>
      <span className="text-cs65 font-medium text-black/70 text-left truncate block shrink-0">
        {data?.createdAt
          ? moment(data.createdAt).locale('fa').format('HH:mm A')
          : 'مشخص نشده'}
      </span>
    </button>
  );
}
