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
import { CustomerClubGiftGainedPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { hanldeClipboardCopy } from '@/utils/string';
import { DialogPortal } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

// Creating and exporting GiftGainedDialog component as default
export default function GiftGainedDialog({
  closeFn,
  isOpened = false,
  code,
}: CustomerClubGiftGainedPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const router = useRouter();

  // Defining a function to handle click events
  async function handleClick() {
    closeFn && closeFn();
    hanldeClipboardCopy(code);

    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds
    router.push('/dashboard/customer-club/list');
  }

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
        <DialogPortal>
          <DialogContent className="w-full max-w-[450px]">
            <div className="mb-5 overflow-hidden">
              <div className="flex items-center justify-start gap-3 mb-5 overflow-hidden">
                <div
                  className="cursor-pointer bg-gradient-to-tr from-green-900 via-green-500 to-green-600 flex items-center text-white h-[50px] w-[100px] justify-center rounded-lg shrink-0"
                  onClick={handleClick}
                >
                  <IconsaxIcons
                    className="size-[30px] text-current"
                    name="Cup"
                    color="currentColor"
                  />
                </div>
                <div
                  onClick={handleClick}
                  className="cursor-pointer flex-1 overflow-hidden"
                >
                  <span className="text-cs08 font-normal text-black w-full block text-right truncate mb-1">
                    کد تخفیف شما :
                  </span>
                  <span className="text-cs85 font-bold text-black w-full block text-right truncate">
                    {code}
                  </span>
                </div>
              </div>
              <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black mb-3">
                جایزه شما با موفقیت دریافت کردید
              </DialogTitle>
              <DialogDescription className="text-right text-sm font-medium text-black">
                مشترک گرامی عزیز جایزه شما با موفقیت ثبت شد و میتوانید از جایزه
                خود استفاده نمایید از همراهی شما متشکریم.
              </DialogDescription>
            </div>
            <DialogFooter dir="ltr">
              <DialogClose asChild>
                <button
                  onClick={closeFn}
                  className="flex items-center justify-center w-full lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-white bg-green-600"
                >
                  متوجه شدم
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }
}
