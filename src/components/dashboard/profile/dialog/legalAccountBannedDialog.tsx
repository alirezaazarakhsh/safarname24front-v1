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
  DialogPortal,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
} from '@/components/ui/drawer';
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import Link from 'next/link';

// Creating and exporting LegalAccountBannedDialog component as default
export default function LegalAccountBannedDialog({
  closeFn,
  isOpened = false,
  infos,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  // conditional rendering
  if (isMobile) {
    return (
      <Drawer open={isOpened} onClose={closeFn}>
        <DrawerPortal>
          <DrawerContent>
            <DrawerHeader className="px-[24px] py-0 mb-[10px]">
              <DrawerTitle className="text-[14px] font-bold text-black truncate block text-right">
                پروفایل حقوقی شما بسته شد!
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-[24px] py-0">
              <DrawerDescription className="text-[12px] font-medium text-gray-500">
                {infos
                  ? infos[0]
                  : 'مشترک گرامی عزیز اطلاعات شما توسط ادمین بسته شد شما میتوانید جهت پیگیری کار خود با مدیریت در ارتباط باشید.'}
              </DrawerDescription>
            </div>
            <DrawerFooter className="px-[24px] mt-[20px] py-0">
              <Link
                href="/dashboard/tickets"
                className="px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit"
              >
                <span className="text-[12px] font-semibold text-white">
                  تماس با مدیریت
                </span>
              </Link>
            </DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    );
  } else {
    return (
      <Dialog
        open={isOpened}
        onOpenChange={(open) => {
          if (!open && closeFn) closeFn();
        }}
      >
        <DialogPortal>
          <DialogContent className="w-full max-w-[450px]">
            <DialogHeader>
              <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black">
                پروفایل حقوقی شما بسته شد!
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-right text-sm font-medium text-black break-all whitespace-normal w-full">
              {infos
                ? infos[0]
                : 'مشترک گرامی عزیز اطلاعات شما توسط ادمین بسته شد شما میتوانید جهت پیگیری کار خود با مدیریت در ارتباط باشید.'}
            </DialogDescription>
            <DialogFooter dir="ltr" className="space-x-2">
              <DialogClose onClick={closeFn} asChild>
                <button className="flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-black border border-black/10">
                  بستن
                </button>
              </DialogClose>
              <Link
                href="/dashboard/tickets"
                className="flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium text-white bg-red-600"
              >
                تماس با مدیریت
              </Link>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
}
