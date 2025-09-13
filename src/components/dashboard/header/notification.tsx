// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Sheet from '../ui/sheet';
import { ICNotificationStatus } from '@/components/icons/ICNotifcationStatus';
import * as NotificationComponent from '@/components/dashboard/notification';
import { ICDashedBorder } from '@/components/icons/ICDashedBorder';
import useNotification from '@/hooks/dashboard/useNotifications';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting Notification component as default
export default function Notification(): ReactNode {
  // Defining hooks
  const [sheetOpened, setSheetOpened] = useState<boolean>(false);
  const { data } = useNotification();

  // Defining variables
  const unseenCount: number = data.filter((item) => !item.is_read).length;

  // Using useEffect to close the sheet whenever new notification arrives
  useEffect(() => setSheetOpened(false), [data.length]);

  // Returning JSX
  return (
    <>
      <button
        onClick={() => setSheetOpened((prev) => !prev)}
        className="flex h-12 px-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200/60 text-gray-700 items-center justify-center gap-2 rounded-lg relative"
      >
        {unseenCount !== 0 && (
          <>
            <div className="absolute top-0 left-0 bg-cs-red w-2 h-2 z-10 rounded-full -translate-y-[50%] -translate-x-[50%]" />
            <div className="absolute top-[-4px] left-[-4px] bg-cs-red/40 duration-1000 delay-1000 animate-ping z-0 origin-center w-2 h-2 rounded-full" />
          </>
        )}
        <ICNotificationStatus className="w-5 h-5 text-current shrink-0" />
        <span className="font-semibold text-[13px] text-current block truncate w-full">
          اعلان ها
        </span>
      </button>
      <Sheet
        className="lg:block hidden"
        isOpened={sheetOpened}
        closeFn={() => setSheetOpened(false)}
      >
        <div className="h-[calc(100dvh-130px)] flex flex-col">
          <div className="flex items-center justify-between gap-3 pb-4 shrink-0">
            <span className="text-[14px] font-bold text-right text-[#2b2b2b] truncate w-full">
              نوتیفیکشن ها
            </span>
            {unseenCount !== 0 && (
              <div className="bg-cs-red/10 text-cs-red px-3 py-3 rounded-md shrink-0 flex items-center justify-center">
                <span className="text-[12px] font-bold text-current block text-center">{`${unseenCount} پیام ناخوانده`}</span>
              </div>
            )}
          </div>
          <ICDashedBorder className="w-full text-[#d4d4d4] shrink-0" />
          <div className="flex flex-col gap-3 pt-4 h-full  overflow-auto custom-scrollbar">
            {data.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-cs-red ">
                  <IconsaxIcons
                    name="Forbidden2"
                    color="currentColor"
                    className="size-20 mb-4 block mx-auto"
                  />
                  <span className="text-center truncate block text-[14px] font-semibold text-black mb-1">
                    صندوق پیام خالی است!
                  </span>
                  <p className="text-center text-[12px] font-medium text-gray-500">
                    در حال حاضر هیچ پیامی برایتان ارسال نشده است.
                  </p>
                </div>
              </div>
            ) : (
              data.map((item, index) => (
                <NotificationComponent.default
                  key={index}
                  data={item}
                  className={
                    index + 1 !== data.length
                      ? 'border-b border-b-[##7e7e7e33] pb-4'
                      : ''
                  }
                />
              ))
            )}
          </div>
        </div>
      </Sheet>
    </>
  );
}
