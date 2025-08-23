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
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import Loading from '../../ui/loading';
import Link from 'next/link';

// Creating and exporting ExitTicketsDialog component as default
export default function ExitTicketsDialog({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [errorDrawerOpenedMobile, setErrorDrawerOpenedMobile] =
    useState<boolean>(false);
  const [successDrawerOpenedMobile, setSuccessDrawerOpenedMobile] =
    useState<boolean>(false);

  // conditional rendering
  if (isMobile) {
    return (
      <>
        <CanclationErrorDrawer
          title="خطایی رخ داد!"
          description="مشکلی در حذف مسافر به وجود امد."
          isOpened={errorDrawerOpenedMobile}
          closeFn={() => setErrorDrawerOpenedMobile(false)}
        />
        <CanclationErrorDrawer
          title="مسافر با موفقیت حذف شد!"
          description="مشتری گرامی مسافر مد نظر شما حذف شد"
          theme="green"
          isOpened={successDrawerOpenedMobile}
          closeFn={() => setSuccessDrawerOpenedMobile(false)}
        />
        <Drawer open={isOpened} onClose={closeFn}>
          <DrawerContent>
            <DrawerHeader className="px-[24px] py-0 mb-[10px]">
              <DrawerTitle className="text-[14px] font-bold text-black truncate block text-right">
                آیا مطمن هستید از خروج تیکت ؟
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-[24px] py-0">
              <DrawerDescription className="text-[12px] font-medium text-gray-500">
                مشتری گرامی عزیز در صورت تایید خروج از تیکت، سیستم به طور
                اتوماسیون شما را به صفحه داشبورد هدایت مینمایید.
              </DrawerDescription>
            </div>
            <DrawerFooter className="px-[24px] mt-[20px] py-0">
              <Link
                href="/dashboard"
                className="px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit transition-all duration-500 disabled:bg-gray-100"
              >
                <span className="text-[12px] font-semibold text-white">
                  بله مطمن هستم
                </span>
              </Link>
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
              آیا مطمن هستید از خروج تیکت ؟
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-right text-sm font-medium text-black">
            مشتری گرامی عزیز در صورت تایید خروج از تیکت، سیستم به طور اتوماسیون
            شما را به صفحه داشبورد هدایت مینمایید.
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
            <Link
              href="/dashboard"
              className="flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium  transition-all duration-500 text-white bg-red-600 disabled:bg-gray-100"
            >
              <span className="text-[12px] font-semibold text-white">
                بله مطمن هستم
              </span>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
