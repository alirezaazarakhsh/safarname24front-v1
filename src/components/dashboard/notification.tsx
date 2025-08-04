// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { NotificationComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import IconsaxIcons from '../icons/iconsaxIcons';
import moment from 'jalali-moment';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';
import DeleteNotificationDialog from './dialog/deleteNotificationDialog';
import useLocalStorageState from 'use-local-storage-state';
import useNotification from '@/hooks/dashboard/useNotifications';

// Creating and exporting Notification component as default
export default function Notification({
  data,
  className,
}: NotificationComponentPropsType): ReactNode {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const { refetch } = useNotification();
  const [localStorageNotifications, setLocalStorageNotifications] =
    useLocalStorageState<number[]>('opened-notifications');

  // Using useEffect to set opened notifications in local storage
  useEffect(() => {
    if (opened) {
      const addedId = localStorageNotifications
        ? [...localStorageNotifications, data.id]
        : [data.id];
      setLocalStorageNotifications(addedId);
    } else {
      const removedId = localStorageNotifications?.filter(
        (item) => item !== data.id,
      );
      setLocalStorageNotifications(removedId);
    }
  }, [opened]);

  // Using useEffect to see if item is opened in local storage
  useEffect(() => {
    const itemExists = localStorageNotifications
      ? localStorageNotifications.includes(data.id)
      : false;

    itemExists ? setOpened(true) : setOpened(false);
  }, []);

  // Returning JSX
  return (
    <div className={cn('overflow-hidden', className)}>
      <DeleteNotificationDialog
        isOpened={deleteDialogOpened}
        closeFn={() => setDeleteDialogOpened(false)}
        id={data.id}
        refetch={refetch}
      />
      <div className="flex lg:items-start items-center justify-between gap-4 lg:mb-3 mb-[15px] cursor-pointer">
        <span className="lg:text-cs85 text-[12px] lg:font-bold font-semibold text-right block w-full text-[#2b2b2b] lg:line-clamp-2 line-clamp-1">
          {data.title}
        </span>
        <div className="flex items-center justify-between lg:gap-3 gap-[10px] shrink-0">
          {!data.isForAll && (
            <button onClick={() => setDeleteDialogOpened(true)}>
              <IconsaxIcons
                name="Trash"
                color="black"
                className="lg:w-4 lg:h-4 w-[18px] h-[18px]"
              />
            </button>
          )}
          <button onClick={() => setOpened((prev) => !prev)}>
            <IconsaxIcons
              name="ArrowUp2"
              color="black"
              className="w-4 h-4 transition-all duration-500 data-[opened='true']:rotate-180 data-[opened='false']:rotate-0"
              data-opened={opened}
            />
          </button>
        </div>
      </div>
      <motion.div
        exit={{ height: '0' }}
        initial={{ height: '0' }}
        animate={{ height: opened ? 'auto' : '0' }}
        className="overflow-hidden"
      >
        <p className="lg:text-cs75 text-[12px] text-gray-500 font-normal text-right lg:mb-3 mb-[12px]">
          {data.content}
        </p>
      </motion.div>
      <div className="flex items-center justify-start lg:gap-3 gap-[15px] flex-wrap">
        <span className="lg:text-cs07 text-[12px] block text-gray-500 font-normal text-right">
          {moment(data.createdAt).locale('fa').format('jYYYY/jMM/jDD')}
        </span>
        {data.status !== 'seen' && (
          <div
            className={cn(
              'h-[20px] px-[10px] w-fit rounded-[5px] flex items-center justify-center text-white',
              data.status === 'unseen' ? 'bg-cs-blue' : 'bg-cs-red',
            )}
          >
            <span className="text-current font-normal text-[8px] text-center block w-full">
              {data.status === 'important' ? 'مهم' : 'جدید !'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
