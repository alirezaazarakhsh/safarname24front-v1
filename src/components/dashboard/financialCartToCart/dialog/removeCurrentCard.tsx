// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ICX } from '@/components/icons/ICX';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { RemoveCurrentCardDialogProps } from '@/types/dashboard/component';
import { JSX, useContext, useState } from 'react';
import Loading from '../../ui/loading';
import useUserLegalInfo from '@/hooks/dashboard/useUserLegalInfo';
import toast from '../../ui/customSonner/toast';
import { userFetchedInfoContext } from '../../page';
import { numberSeparation } from '@/utils';

// Creating and exporting RemoveCurrentCardDialog component as default
export default function RemoveCurrentCardDialog({
  open, onOpenChange,
  mode, data
}: RemoveCurrentCardDialogProps): JSX.Element {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(false);
  const userLegalInfo = useUserLegalInfo();
  const userInfo = useContext(userFetchedInfoContext);

  // Returning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="w-full lg:max-w-[450px] max-w-full gap-0 p-0 lg:rounded-xl rounded-none">
          <DialogHeader className='flex !flex-row items-center justify-between gap-3 border-b border-b-black/10 w-full px-4 h-[50px]'>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black truncate flex-1">
              حذف کردن کارت بانکی <span dir="ltr">({numberSeparation(data.card_number, " - ", 4)})</span>
            </DialogTitle>
            <DialogClose className='shrink-0 !mt-0' asChild>
              <button>
                <ICX className='size-3' />
              </button>
            </DialogClose>
          </DialogHeader>
          <div className='p-4 space-y-4 lg:max-h-[calc(100dvh-50px-25px)] max-h-[calc(100dvh-50px)] overflow-auto scrollbar-hide'>
            <DialogDescription className='text-right text-xs font-medium text-black leading-6'>
              مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن، کارت بانکی شما به طور کامل از تاریخچه حذف میشود.
            </DialogDescription>
            <DialogFooter dir="ltr">
              <button
                disabled={loading}
                className='flex items-center justify-center px-6 h-[45px] rounded-md text-cs08 font-medium  transition-all duration-500 text-white bg-red-600 disabled:bg-gray-100'
                onClick={async () => {
                  setLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds
                  setLoading(false);
                  onOpenChange?.(false);

                  toast({
                    description: "کارت بانکی مد نظر با موفقیت حذف شد.",
                    title: "عملیات موفقیت امیز بود",
                    theme: "green"
                  })

                  // toast({
                  //   description: "کارت بانکی مد نظر حذف نشد.",
                  //   title: "عملیات با خطا رو به رو شد.",
                  //   theme: "theme"
                  // })
                }}
              >
                {
                  loading ? <Loading className="bg-black/70" /> : (
                    <span className='text-[12px] font-semibold text-white'>
                      تایید اطلاعات
                    </span>
                  )}
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
