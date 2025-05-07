// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { NotificationComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
import IconsaxIcons from '../icons/iconsaxIcons';
import moment from 'jalali-moment';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

// Creating and exporting Notification component as default
export default function Notification({
  data,
  className,
}: NotificationComponentPropsType): ReactNode {
  // Defining state of component
  const [opened, setOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className="flex items-start justify-between gap-4 mb-3 cursor-pointer"
        onClick={() => setOpened((prev) => !prev)}
      >
        <span className="text-cs85 font-medium text-right block w-full text-black line-clamp-2">
          {data.title}
        </span>
        <div className="flex items-center justify-between gap-3 shrink-0">
          <button>
            <IconsaxIcons name="Trash" color="black" className="w-4 h-4" />
          </button>
          <button>
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
        <p className="text-cs75 text-gray-500 font-normal text-right mb-3">
          {data.content}
        </p>
      </motion.div>
      <div className="flex items-center justify-start gap-3 flex-wrap">
        <span className="text-cs07 block text-gray-500 font-normal text-right">
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
