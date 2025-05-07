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

// Creating and exporting GiftGainedDialog component as default
export default function GiftGainedDialog({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // Conditional rendering
  if (isMobile) {
    return (
      <CanclationErrorDrawer
        isOpened={isOpened}
        theme="green"
        closeFn={closeFn}
        description="مشترک گرامی عزیز جایزه شما با موفقیت ثبت شد و میتوانید از جایزه خود استفاده نمایید از همراهی شما متشکریم."
        title="جایزه شما با موفقیت دریافت کردید"
      />
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogContent className="lg:w-auto w-[calc(100vw-25px)]">
          <DialogHeader>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">
              جایزه شما با موفقیت دریافت کردید
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right text-sm font-medium text-black">
            مشترک گرامی عزیز جایزه شما با موفقیت ثبت شد و میتوانید از جایزه خود
            استفاده نمایید از همراهی شما متشکریم.
          </DialogDescription>
          <DialogFooter dir="ltr">
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-white bg-green-600"
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
