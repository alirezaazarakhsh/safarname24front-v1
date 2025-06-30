// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Sheet from '../ui/sheet';
import { ICNotificationStatus } from '@/components/icons/ICNotifcationStatus';
import * as NotificationComponent from '@/components/dashboard/notification';
import { ICDashedBorder } from '@/components/icons/ICDashedBorder';
import useNotification from '@/hooks/dashboard/useNotifications';
import moment from 'jalali-moment';

// Creating and exporting Notification component as default
export default function Notification(): ReactNode {
  // Defining hooks
  const [sheetOpened, setSheetOpened] = useState<boolean>(false);
  const notifications = useNotification();

  // Defining variables
  const unseenCount = notifications.filter(
    (item) => item.status === 'new',
  ).length;

  // Returning JSX
  return (
    <>
      <button
        onClick={() => setSheetOpened((prev) => !prev)}
        className='flex h-12 px-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200 text-gray-700 items-center justify-center gap-2 rounded-lg relative'
      >
        {unseenCount !== 0 && (
          <>
            <div className='absolute top-0 left-0 bg-cs-red w-2 h-2 z-10 rounded-full -translate-y-[50%] -translate-x-[50%]' />
            <div className='absolute top-[-4px] left-[-4px] bg-cs-red/40 duration-1000 delay-1000 animate-ping z-0 origin-center w-2 h-2 rounded-full' />
          </>
        )}
        <ICNotificationStatus className='w-5 h-5 text-current shrink-0' />
        <span className='font-medium text-cs08 text-current block truncate w-full'>
          اعلان ها
        </span>
      </button>
      <Sheet
        className='lg:block hidden'
        isOpened={sheetOpened}
        closeFn={() => setSheetOpened(false)}
      >
        <div>
          <div className='flex items-center justify-between gap-3 pb-4'>
            <span className='text-[14px] font-bold text-right text-[#2b2b2b] truncate w-full'>
              نوتیفیکشن ها
            </span>
            {unseenCount !== 0 && (
              <div className='bg-cs-red/10 text-cs-red px-3 py-3 rounded-md shrink-0 flex items-center justify-center'>
                <span className='text-[12px] font-bold text-current block text-center'>{`${unseenCount} پیام ناخوانده`}</span>
              </div>
            )}
          </div>
          <ICDashedBorder className='w-full text-[#d4d4d4]' />
          <div className='flex flex-col gap-3 pt-4'>
            {notifications.map((item, index) => (
              <NotificationComponent.default
                key={index}
                className={
                  index + 1 !== notifications.length
                    ? 'border-b border-b-black/20 pb-4'
                    : ''
                }
                data={{
                  content: item.message,
                  createdAt: moment(
                    `${item.created_date_jalali} ${item.created_time}`,
                    'jYYYY/jMM/jDD HH:mm:ss:',
                  ).format(''),
                  id: item.id,
                  status: item.status === 'new' ? 'unseen' : 'important',
                  title: item.title,
                  isForAll: item.send_to_all,
                }}
              />
            ))}
          </div>
        </div>
      </Sheet>
    </>
  );
}
