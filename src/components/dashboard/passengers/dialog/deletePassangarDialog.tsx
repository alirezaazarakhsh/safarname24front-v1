// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
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
import toast from '../../ui/customSonner/toast';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';

// Creating and exporting DeletePassangerDialog component as default
export default function DeletePassangerDialog({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [errorMobileDrawerOpened, setErrorMobileDrawerOpened] =
    useState<boolean>(false);

  // conditional rendering
  if (isMobile) {
    return (
      <>
        <CanclationErrorDrawer
          title="خطایی رخ داد!"
          description="در ایجاد مسافر مشکلی رخ داد مجدد تلاش کنید."
          isOpened={errorMobileDrawerOpened}
          closeFn={() => setErrorMobileDrawerOpened(false)}
        />
        <Drawer open={isOpened} onClose={closeFn}>
          <DrawerContent>
            <DrawerHeader className="px-[24px] py-0 mb-[10px]">
              <DrawerTitle className="text-[14px] font-bold text-black truncate block text-right">
                آیا از حذف شدن مسافر خود مطمئن هستید؟
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-[24px] py-0">
              <DrawerDescription className="text-[12px] font-medium text-gray-500">
                مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن، مسافر
                شما به طور کامل از تاریخچه حذف میشود.
              </DrawerDescription>
            </div>
            <DrawerFooter className="px-[24px] mt-[20px] py-0">
              <button
                onClick={() => {
                  closeFn && closeFn();
                  setErrorMobileDrawerOpened(true);
                }}
                className="px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit"
              >
                <span className="text-[12px] font-semibold text-white">
                  تایید اطلاعات
                </span>
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogContent className="lg:w-auto w-[calc(100vw-25px)]">
          <DialogHeader>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">
              آیا از حذف شدن مسافر خود مطمئن هستید؟
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right text-sm font-medium text-black">
            مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن، مسافر شما
            به طور کامل از تاریخچه حذف میشود.
          </DialogDescription>
          <DialogFooter dir="ltr" className="space-x-2">
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-black border border-black/10"
              >
                انصراف
              </button>
            </DialogClose>
            <button
              onClick={() => {
                closeFn && closeFn();
                toast({
                  title: 'خطایی رخ داد!',
                  description: 'در حذف لیست مشکلی پیش آمد مجدد تلاش کنید.',
                  theme: 'theme',
                });
              }}
              className="flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium text-white bg-red-600"
            >
              تایید اطلاعات
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
