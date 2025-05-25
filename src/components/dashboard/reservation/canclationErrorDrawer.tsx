// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { CanclationErrorDrawerPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';

// Creating and exporting CanclationErrorDrawer component as default
export default function CanclationErrorDrawer({
  closeFn,
  isOpened = false,
  description,
  title,
  theme = 'theme',
}: CanclationErrorDrawerPropsType): ReactNode {
  // Defining states of component
  const [time, setTime] = useState<number>(0); // in Seconds

  // Using useEffect to estimate time
  useEffect(() => {
    if (time < 5 && isOpened) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [time, isOpened]);

  // Using useEffect to blur from focused input (just in case)
  useEffect(() => {
    const allTextArea = document.querySelectorAll('textarea');
    const allInput = document.querySelectorAll('input');
    const allInputElements = [...allTextArea, ...allInput];

    isOpened && allInputElements.forEach((item) => (item.disabled = true));
  }, [isOpened]);

  // Returning JSX
  return (
    <Drawer
      open={isOpened}
      onClose={() => {
        closeFn && closeFn();
        setTime(0);
      }}
      dismissible={time === 5}
    >
      <DrawerContent>
        <DrawerHeader className='px-[24px] py-0 mb-[10px]'>
          <DrawerTitle
            className={cn(
              'text-[14px] font-bold truncate block text-right',
              theme === 'theme' ? 'text-cs-red' : 'text-green-500',
            )}
          >
            {title}
          </DrawerTitle>
        </DrawerHeader>
        <div className='px-[24px] py-0'>
          <DrawerDescription className='text-[14px] font-medium text-black'>
            {description}
          </DrawerDescription>
        </div>
        <DrawerFooter>
          <div className='bg-gray-100 mt-[10px] overflow-hidden  rounded-[50rem]'>
            <div
              className={cn(
                'h-[5px] rounded-[50rem] w-[30%] transition-all duration-500',
                theme === 'theme' ? 'bg-red-600' : 'bg-green-500',
              )}
              style={{ width: `${(time / 5) * 100}%` }}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
