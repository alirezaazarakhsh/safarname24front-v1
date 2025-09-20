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
  newNotifications,
  type = 'active',
  lastItem = false,
}: TicketItemPropsType): ReactNode {
  // Returning JSX
  return (
    <button
      disabled={disabled}
      onClick={() => !disabled && onClick && onClick()}
      className={cn(
        'flex items-center justify-between gap-3 w-full transition-all duration-500 disabled:cursor-not-allowed cursor-pointer bg-white disabled:hover:bg-white hover:bg-gray-100 py-[12px] lg:px-[20px] px-[12px] rounded-lg',
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
      {type === 'active' ? (
        <div className="shrink-0 flex items-end justify-center flex-col">
          <span className="text-cs65 font-medium text-black/70 text-left truncate block">
            {data?.createdAt
              ? moment(data.createdAt).locale('fa').format('HH:mm A')
              : 'مشخص نشده'}
          </span>
          {newNotifications && newNotifications !== 0 && (
            <div className="bg-cs-red/10 text-cs-red rounded-full size-[20px] shrink-0 aspect-square flex items-center justify-center mt-1">
              <span className="lg:text-[9px] text-[10px] font-semibold -mb-1 text-current text-center truncate block">
                {newNotifications}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-cs-blue/10 text-cs-blue px-3 rounded-md h-[30px] flex items-center justify-center shrink-0">
          <span className="text-cs65 font-medium text-current text-center truncate block">
            {data?.createdAt
              ? moment(data.createdAt).locale('fa').format('YYYY/MM/DD')
              : 'مشخص نشده'}
          </span>
        </div>
      )}
    </button>
  );
}
