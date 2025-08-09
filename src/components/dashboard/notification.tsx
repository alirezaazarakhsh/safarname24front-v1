// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { NotificationComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import IconsaxIcons from '../icons/iconsaxIcons';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';
import DeleteNotificationDialog from './dialog/deleteNotificationDialog';
import useNotification from '@/hooks/dashboard/useNotifications';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import Loading from './ui/loading';
import toast from './ui/customSonner/toast';
import { GETNotificationItem } from '@/types/dashboard/api/get';

// Creating and exporting Notification component as default
export default function Notification({
  data,
  className,
}: NotificationComponentPropsType): ReactNode {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(data.is_read || false);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const { refetch } = useNotification();
  const mutation = useApiMutation({
    url: `/notification/notifications/${data.id}/update-status/`,
    method: 'put',
    isFormData: false,
    options: {
      onSuccess: (data: GETNotificationItem) => {
        setOpened(data.is_read);
        refetch && refetch();
      },
      onError: () =>
        toast({
          title: 'خطایی رخ داد!',
          description: 'مشکلی در ارسال اطلاعات به وجود امد.',
          theme: 'theme',
        }),
    },
  });

  // Returning JSX
  return (
    <div
      data-disabled={mutation.isPending}
      className={cn(
        'overflow-hidden transition-all duration-500 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed',
        className,
      )}
    >
      <DeleteNotificationDialog
        isOpened={deleteDialogOpened}
        closeFn={() => setDeleteDialogOpened(false)}
        id={data.id}
        refetch={refetch}
      />
      <div
        onClick={() => {
          if (!mutation.isPending) {
            mutation.mutate({
              is_read: Boolean(!opened),
            });
          }
        }}
        className={cn(
          'flex lg:items-start items-center justify-between gap-4 cursor-pointer',
        )}
      >
        <span className="lg:text-cs85 text-[12px] lg:font-bold font-semibold text-right block w-full text-[#2b2b2b] lg:line-clamp-2 line-clamp-1">
          {data.title}
        </span>
        <div className="flex items-center justify-between lg:gap-3 gap-[10px] shrink-0">
          {!data.send_to_all && (
            <button
              disabled={mutation.isPending}
              onClick={() => !mutation.isPending && setDeleteDialogOpened(true)}
            >
              <IconsaxIcons
                name="Trash"
                color="black"
                className="lg:w-4 lg:h-4 w-[18px] h-[18px]"
              />
            </button>
          )}
          <div>
            {mutation.isPending ? (
              <Loading className="w-2 h-2" />
            ) : (
              <IconsaxIcons
                name="ArrowUp2"
                color="black"
                className="w-4 h-4 transition-all duration-500 data-[opened='true']:rotate-180 data-[opened='false']:rotate-0"
                data-opened={opened}
              />
            )}
          </div>
        </div>
      </div>
      <motion.div
        className="overflow-hidden lg:my-2 my-[15px]"
        exit={{ height: '0', opacity: 0 }}
        initial={{ height: '0', opacity: 0 }}
        animate={{
          height: opened ? 'auto' : '0',
          opacity: opened ? '100%' : '0%',
        }}
      >
        <p className="lg:text-cs75 text-[12px] text-gray-500 font-normal text-right w-[50%] whitespace-pre-line m-0 p-0">
          {data.message}
        </p>
      </motion.div>
      <div className="flex items-center justify-start lg:gap-3 gap-[15px] flex-wrap">
        <span className="lg:text-cs07 text-[12px] block text-gray-500 font-normal text-right">
          {`${data.created_date_jalali} ${data.created_time}`}
        </span>
        <div
          className={cn(
            'h-[20px] px-[10px] w-fit rounded-[5px] flex items-center justify-center text-white',
            data.status === 'important' ? 'bg-cs-blue' : 'bg-cs-red',
          )}
        >
          <span className="text-current font-normal text-[8px] text-center block w-full">
            {data.status === 'important' ? 'مهم' : 'جدید !'}
          </span>
        </div>
      </div>
    </div>
  );
}
