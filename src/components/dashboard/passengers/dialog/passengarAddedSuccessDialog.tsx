// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

// Creating and exporting PassengerAddedSuccessDialog component as default
export default function PassengerAddedSuccessDialog({
  closeFn,
  isOpened = false,
  infos,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Defingin variables
  const name = infos && infos[0];

  // Conditional rendering
  if (isMobile) {
    return (
      <Drawer open={isOpened} onClose={closeFn}>
        <DrawerContent>
          <DrawerHeader className='px-[24px] py-0 mb-[10px]'>
            <DrawerTitle className='text-[14px] font-bold text-black truncate block text-right'>
              مسافر با موفقیت اضافه شد
            </DrawerTitle>
          </DrawerHeader>
          <div className='px-[24px] py-0'>
            <DrawerDescription className='text-[12px] font-medium text-gray-500'>
              مشترک گرامی عزیز مسافر “{name}” با موفقیت به لیست خود اضافه شد و
              در صورت لازم میتوایند عملیات ویرایش انجام دهید از همراهی شما
              متشکریم.
            </DrawerDescription>
          </div>
          <DrawerFooter className='px-[24px] py-0 mt-[10px]'>
            <DrawerClose asChild>
              <button className='px-[50px] h-[43px] flex items-center justify-center bg-green-600 rounded-[8px] w-fit'>
                <span className='text-[12px] font-semibold text-white'>
                  متوجه شدم
                </span>
              </button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogContent className='lg:w-auto w-[calc(100vw-25px)]'>
          <DialogHeader>
            <DialogTitle className='text-right lg:text-[14px] text-[12px] font-bold text-black'>
              مسافر با موفقیت اضافه شد
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-right text-sm font-medium text-black'>
            مشترک گرامی عزیز مسافر “{name}” با موفقیت به لیست خود اضافه شد و در
            صورت لازم میتوایند عملیات ویرایش انجام دهید از همراهی شما متشکریم.
          </DialogDescription>
          <DialogFooter dir='ltr'>
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className='flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-white bg-green-600'
              >
                متوجه شدم
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
