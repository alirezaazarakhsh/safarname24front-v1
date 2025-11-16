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

// Creating and exporting PaymentErrorDialog component as default
export default function PaymentErrorDialog({
  closeFn,
  isOpened = false,
  refetch,
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
              پرداخت شما موفقیت آمیز نبود!
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-[24px] py-0">
            <DrawerDescription className="text-[12px] font-medium text-gray-500">
              مشترک گرامی عزیز عملیات پرداخت شما ناموفق بود لطفاً مجدد تلاش کنید
              از صبر و شکیبایی شما متشکریم.
            </DrawerDescription>
          </div>
          <DrawerFooter className="px-[24px] mt-[20px] py-0 flex items-start justify-start gap-4 lg:flex-wrap">
            <button
              onClick={refetch}
              className="px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit"
            >
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
      <Dialog
        open={isOpened}
        onOpenChange={(open) => {
          !open && closeFn && closeFn();
        }}
      >
        <DialogContent className="lg:w-auto w-[calc(100vw-25px)]">
          <DialogHeader>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">
              پرداخت شما موفقیت آمیز نبود!
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right text-sm font-medium text-black">
            مشترک گرامی عزیز عملیات پرداخت شما ناموفق بود لطفاً مجدد تلاش کنید
            از صبر و شکیبایی شما متشکریم.
          </DialogDescription>
          <DialogFooter dir="ltr" className="space-x-2">
            <button
              onClick={refetch}
              className="flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium text-white bg-red-600"
            >
              تلاش مجدد
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
