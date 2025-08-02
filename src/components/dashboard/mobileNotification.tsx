// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { NotificationSheetMobilePropsType } from '@/types/dashboard/component';
import * as NotificationComponent from '@/components/dashboard/notification';
import { ReactNode, useEffect, useState } from 'react';
import Sheet from './ui/sheet';
import IconsaxIcons from '../icons/iconsaxIcons';
import useNotification from '@/hooks/dashboard/useNotifications';
import moment from 'jalali-moment';
import useLocalStorageState from 'use-local-storage-state';

// Creating and exporting MobileNotification component as default
export default function MobileNotification({
  index,
}: NotificationSheetMobilePropsType): ReactNode {
  // Defining states of component
  const [notificationOpened, setNotificationOpened] = useState<boolean>(false);
  const notifications = useNotification();
  const [localStorageNotifications] = useLocalStorageState<number[]>(
    'opened-notifications',
  );

  // Defining variables
  const unseenCount = notifications.filter(
    (item) => !localStorageNotifications?.includes(item.id),
  ).length;

  // Using useEffect to close the sheet whenever new notification arrives
  useEffect(() => setNotificationOpened(false), [notifications.length]);

  // Returning JSX
  return (
    <>
      <Sheet
        isOpened={notificationOpened}
        closeFn={() => setNotificationOpened(false)}
        className="lg:hidden block"
      >
        <div>
          <div className="flex items-center justify-between gap-3 lg:pb-3 pb-[15px]">
            <span className="lg:text-cs75 text-[12px] font-semibold text-right text-black truncate w-full">
              نوتیفیکشن ها
            </span>
            {unseenCount !== 0 && (
              <div className="bg-cs-red/10 text-cs-red lg:px-3 px-[10px] lg:py-3 py-[12px] lg:rounded-md rounded-[6px] shrink-0 flex items-center justify-center">
                <span className="text-[9px] font-semibold text-current block text-center">{`${unseenCount} پیام ناخوانده`}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col lg:gap-3 gap-[15px] border-t-2 border-dashed border-gray-200 lg:pt-3 pt-[15px]">
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
      <button
        key={index}
        className="flex items-center justify-start w-full gap-[15px] p-[20px] bg-white border border-black/10 rounded-[14px]"
        onClick={() => setNotificationOpened(true)}
      >
        <div className="w-[43px] h-[43px] aspect-square rounded-[7px] flex items-center justify-center bg-gray-100 text-black relative">
          <div className="absolute top-0 right-0 bg-cs-red w-2 h-2 z-10 rounded-full -translate-y-[50%] translate-x-[50%]" />
          <div className="absolute top-[-4px] right-[-4px] bg-cs-red/40 duration-1000 delay-1000 animate-ping z-0 origin-center w-2 h-2 rounded-full" />
          <IconsaxIcons
            name={'NotificationStatus'}
            className="w-[20px] h-[20px] text-current"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="text-[12px] truncate block w-full text-right text-black font-semibold mb-[6px]">
            اعلان ها
          </span>
          <span className="text-[10px] truncate block w-full text-right text-gray-500 font-semibold">
            پیامات دریافت شده !
          </span>
        </div>
      </button>
    </>
  );
}
