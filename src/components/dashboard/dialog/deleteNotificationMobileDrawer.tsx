// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
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
import CanclationErrorDrawer from '../reservation/canclationErrorDrawer';

// Creating and exporting DeleteNotificationMobileDrawer component as default
export default function DeleteNotificationMobileDrawer({
  closeFn,
  isOpened = false,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [errorDrawerOpened, setErrorDrawerOpened] = useState<boolean>(false);

  // conditional rendering
  if (isMobile) {
    return (
      <Drawer open={isOpened} onClose={closeFn}>
        <CanclationErrorDrawer
          isOpened={errorDrawerOpened}
          closeFn={() => setErrorDrawerOpened(false)}
          description="در حذف نوتیفیکشن مشکلی پیش آمد مجدد تلاش کنید."
          title="خطایی رخ داد!"
          theme="theme"
        />
        <DrawerContent>
          <DrawerHeader className="px-[24px] py-0 mb-[10px]">
            <DrawerTitle className="text-[14px] font-bold text-black truncate block text-right">
              آیا از حذف شدن پیام خود مطمئن هستید؟
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-[24px] py-0">
            <DrawerDescription className="text-[12px] font-medium text-gray-500">
              مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن،
              نوتیفیکشن شما به طور کامل از تاریخچه حذف میشود.
            </DrawerDescription>
          </div>
          <DrawerFooter className="px-[24px] mt-[20px] py-0">
            <button
              className="px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit"
              onClick={() => {
                closeFn && closeFn();
                setErrorDrawerOpened(true);
              }}
            >
              <span className="text-[12px] font-semibold text-white">
                تایید اطلاعات
              </span>
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return false;
  }
}
