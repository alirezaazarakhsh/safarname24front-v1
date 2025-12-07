// Forcing next.js to render this component as client side component
"use client";

import { ICX } from '@/components/icons/ICX';
// Importing part
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RenewSubscriptionDialogProps } from '@/types/dashboard/component';
import { JSX } from 'react';

// Creating and exporting AddCardDialog component as default
export default function RenewSubscriptionDialog({
  open, onOpenChange,
}: RenewSubscriptionDialogProps): JSX.Element {
  // Returning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full lg:max-w-[450px] max-w-full gap-0 p-0 lg:rounded-xl rounded-none">
        <DialogHeader className='flex !flex-row items-center justify-between gap-3 border-b border-b-black/10 w-full px-4 h-[50px]'>
          <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black truncate flex-1">
            آیا از تمدید اشتراک خود مطمئن هستید؟
          </DialogTitle>
          <DialogClose className='shrink-0 !mt-0' asChild>
            <button>
              <ICX className='size-3' />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className='p-4 space-y-4 lg:max-h-[calc(100dvh-50px-25px)] max-h-[calc(100dvh-50px)] overflow-auto scrollbar-hide'>
          <DialogDescription className='text-right text-sm font-medium text-black'>
            مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن، با حسب مبلغ مد نظر اشتراک شما تمدید خواهد شد.
          </DialogDescription>
          <DialogFooter dir='ltr' className='space-x-2'>
            <DialogClose asChild>
              <button
                className='flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-black border border-black/10'
              >
                انصراف
              </button>
            </DialogClose>
            <button
              className='flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium  transition-all duration-500 text-white bg-red-600 disabled:bg-gray-100'
            >
              <span className='text-[12px] font-semibold text-white'>
                تایید
              </span>
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
