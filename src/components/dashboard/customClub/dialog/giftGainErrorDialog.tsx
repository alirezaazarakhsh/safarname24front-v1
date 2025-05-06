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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';

// Creating and exporting GiftGainErrorDialog component as default
export default function GiftGainErrorDialog({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // conditional rendering
  if (isMobile) {
    return (
      <Drawer open={isOpened} onClose={closeFn}>
        <DrawerContent>
          <DrawerHeader className="px-[24px] py-0 mb-[10px]">
            <DrawerTitle className="text-[14px] font-bold text-black truncate block text-right">
              مشکلی در دریافت جایزه رخ داد!
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-[24px] py-0">
            <DrawerDescription className="text-[12px] font-medium text-gray-500">
              مشترک گرامی عزیز عملیات دریافت جایزه ناموفق بود لطفاً مجدد تلاش
              کنید از صبر و شکیبایی شما متشکریم.
            </DrawerDescription>
          </div>
          <DrawerFooter className="px-[24px] mt-[20px] py-0">
            <button className="px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit">
              <span className="text-[12px] font-semibold text-white">
                تلاش مجدد
              </span>
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogContent className="lg:w-auto w-[calc(100vw-25px)]">
          <DialogHeader>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">
              مشکلی در دریافت جایزه رخ داد!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right text-sm font-medium text-black">
            مشترک گرامی عزیز عملیات دریافت جایزه ناموفق بود لطفاً مجدد تلاش کنید
            از صبر و شکیبایی شما متشکریم.
          </DialogDescription>
          <DialogFooter dir="ltr" className="space-x-2">
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-black border border-black/10"
              >
                بستن
              </button>
            </DialogClose>
            <button className="flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium text-white bg-red-600">
              تلاش مجدد
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
