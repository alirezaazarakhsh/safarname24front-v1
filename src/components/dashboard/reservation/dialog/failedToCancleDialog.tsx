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

// Creating and exporting FailedToCancleDialog component as default
export default function FailedToCancleDialog({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <Dialog open={isOpened}>
      <DialogContent className="lg:w-auto w-[calc(100vw-25px)]">
        <DialogHeader>
          <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">
            پیام کنسلی شما ارسال نشد!
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-right text-sm font-medium text-black">
          مشترک گرامی عزیز عملیات ارسال فرم کنسلی رزرو ناموفق بود لطفاً مجدد
          تلاش کنید از صبر و شکیبایی شما متشکریم.
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
          <button className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-white bg-red-600">
            تلاش مجدد
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
