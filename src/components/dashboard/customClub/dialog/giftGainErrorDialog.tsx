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
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';

// Creating and exporting GiftGainErrorDialog component as default
export default function GiftGainErrorDialog({
  closeFn,
  refetch,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // conditional rendering
  if (isMobile) {
    return (
      <CanclationErrorDrawer
        isOpened={isOpened}
        closeFn={closeFn}
        description="مشترک گرامی عزیز عملیات دریافت جایزه ناموفق بود لطفاً مجدد تلاش کنید از صبر و شکیبایی شما متشکریم."
        title="مشکلی در دریافت جایزه رخ داد!"
      />
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
            <button
              onClick={() => {
                closeFn && closeFn();
                refetch && refetch();
              }}
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
