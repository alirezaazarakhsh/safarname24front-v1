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
import { DeleteCollectionDialogPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import toast from '../../ui/customSonner/toast';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';
import useApiMutation from '@/hooks/dashboard/useApiMutation';

// Creating and exporting DeleteCollectionDialog component as default
export default function DeleteCollectionDialog({
  closeFn,
  isOpened = false,
  id,
  refetch,
}: DeleteCollectionDialogPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [successMobileDrawerOpened, setSuccessMobileDrawerOpened] =
    useState<boolean>(false);

  const [errorMobileDrawerOpened, setErrorMobileDrawerOpened] =
    useState<boolean>(false);

  // Defining fetchings
  const fetchingData = useApiMutation({
    url: `/profile/favorite-collections/${id}`,
    method: 'delete',
    options: {
      onError: () => {
        closeFn && closeFn();
        refetch && refetch();

        if (isMobile) {
          setErrorMobileDrawerOpened(true);
        } else {
          toast({
            title: 'خطایی رخ داد!',
            description: 'در حذف لیست مشکلی پیش آمد مجدد تلاش کنید.',
            theme: 'theme',
          });
        }
      },
      onSuccess: () => {
        closeFn && closeFn();
        refetch && refetch();

        if (isMobile) {
          setSuccessMobileDrawerOpened(true);
        } else {
          toast({
            title: 'محموعه با موفقیت حذف شد',
            description: 'مجموعه مدنظر با موفقیت حذف شد !',
            theme: 'green',
          });
        }
      },
    },
  });

  // conditional rendering
  if (isMobile) {
    return (
      <>
        <CanclationErrorDrawer
          title='محموعه با موفقیت حذف شد'
          description='مجموعه مدنظر با موفقیت حذف شد !'
          isOpened={successMobileDrawerOpened}
          closeFn={() => setSuccessMobileDrawerOpened(false)}
        />
        <CanclationErrorDrawer
          title='خطایی رخ داد'
          description='در حذف لیست مشکلی پیش آمد مجدد تلاش کنید.'
          isOpened={errorMobileDrawerOpened}
          closeFn={() => setErrorMobileDrawerOpened(false)}
        />
        <Drawer open={isOpened} onClose={closeFn}>
          <DrawerContent>
            <DrawerHeader className='px-[24px] py-0 mb-[10px]'>
              <DrawerTitle className='text-[14px] font-bold text-black truncate block text-right'>
                آیا از حذف شدن لیست خود مطمئن هستید؟
              </DrawerTitle>
            </DrawerHeader>
            <div className='px-[24px] py-0'>
              <DrawerDescription className='text-[12px] font-medium text-gray-500'>
                مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن، لیست
                محتوای داخل مورد علاقه شما به طور کامل حذف میشود.
              </DrawerDescription>
            </div>
            <DrawerFooter className='px-[24px] mt-[20px] py-0'>
              <button
                onClick={async () => await fetchingData.mutateAsync({})}
                className='px-[50px] h-[43px] flex items-center justify-center bg-cs-red rounded-[8px] w-fit'
              >
                <span className='text-[12px] font-semibold text-white'>
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
        <DialogContent className='lg:w-auto w-[calc(100vw-25px)]'>
          <DialogHeader>
            <DialogTitle className='text-right lg:text-[14px] text-[12px] font-bold text-black'>
              آیا از حذف شدن لیست خود مطمئن هستید؟
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className='text-right text-sm font-medium text-black'>
            مشترک گرامی عزیز لازم به ذکر میباشد که در صورت تایید کردن، لیست
            محتوای داخل مورد علاقه شما به طور کامل حذف میشود.
          </DialogDescription>
          <DialogFooter dir='ltr' className='space-x-2'>
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className='flex items-center justify-center lg:px-6 px-4 lg:py-2.5 py-2 rounded-md lg:text-cs08 text-cs07 font-medium text-black border border-black/10'
              >
                بستن
              </button>
            </DialogClose>
            <button
              onClick={async () => await fetchingData.mutateAsync({})}
              className='flex items-center justify-center px-6 py-2.5 rounded-md text-cs08 font-medium text-white bg-red-600'
            >
              تایید اطلاعات
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
