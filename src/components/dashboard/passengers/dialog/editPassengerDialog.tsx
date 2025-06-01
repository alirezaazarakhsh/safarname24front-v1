// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { EditPassengerDialogPropsType } from '@/types/dashboard/component';
import { ICX } from '@/components/icons/ICX';
import DialogInput from '../dialogInput';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '../../ui/loading';
import toast from '../../ui/customSonner/toast';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { useMediaQuery } from '@/hooks';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';

// Defining form schema
const formSchema = z.object({
  firstName: z.string().min(1, { message: 'وارد کردن نام الزامی است' }),
  lastName: z.string().min(1, { message: 'وارد کردن خانوادگی الزامی است' }),
  meliCodeOrPassportCode: z
    .string()
    .min(1, { message: 'کد ملی یا شماره پاسپورت الزامی است' }),
  tell: z
    .string()
    .regex(/^0\d{10}$/, { message: 'شماره تلفن باید ۱۱ رقم و با ۰ شروع شود' }),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditPassengersDialog component as default
export default function EditPassengersDialog({
  closeFn,
  isOpened = false,
  data,
}: EditPassengerDialogPropsType): ReactNode {
  // Defining hooks
  const [errorDrawerOpenedMobile, setErrorDrawerOpenedMobile] =
    useState<boolean>(false);
  const [successDrawerOpenedMobile, setSuccessDrawerOpenedMobile] =
    useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onSubmit',
    values: {
      firstName: data?.name.firstName || '',
      lastName: data?.name.lastName || '',
      meliCodeOrPassportCode: data?.meliCodeOrPassportNumber || '',
      tell: data?.tell || '',
    },
  });

  // Defining submit handler
  const submitEventHandler: SubmitHandler<formType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    closeFn && closeFn();
    if (isMobile) {
      setSuccessDrawerOpenedMobile(true);
    } else {
      toast({
        title: 'تغیرات موفقیت امیز بود!',
        description: 'تغیرات انجام شده برای مسافر انجام شد!',
        theme: 'green',
      });
    }
  };

  // Returning JSX
  return (
    <Dialog
      open={isOpened}
      onOpenChange={(open) => !open && closeFn && closeFn()}
    >
      {isMobile && (
        <>
          <CanclationErrorDrawer
            title="خطایی رخ داد!"
            description="در بروزرسانی اطلاعات مشکلی رخ داد مجدد تلاش کنید."
            theme="theme"
            isOpened={errorDrawerOpenedMobile}
            closeFn={() => setErrorDrawerOpenedMobile(false)}
          />
          <CanclationErrorDrawer
            title="با موفقیت بروزرسانی شد"
            description="مشتری گرامی تغییرات اطلاعات مسافر خود اعمال شد."
            theme="green"
            isOpened={successDrawerOpenedMobile}
            closeFn={() => setSuccessDrawerOpenedMobile(false)}
          />{' '}
        </>
      )}

      <DialogContent className="lg:w-[28dvw] w-dvw p-0 block gap-0 scrollbar-hide overflow-auto lg:max-h-[calc(100dvh-50px)] max-h-dvh lg:rounded-2xl rounded-none lg:h-auto h-dvh">
        <div className="px-3 py-3 border-b border-b-black/10 lg:hidden block">
          <DialogClose asChild>
            <button className="flex items-center justify-start gap-[10px] w-full">
              <IconsaxIcons
                name="ArrowRight"
                className="w-[12px] h-[12px] text-current"
                color="black"
              />
              <DialogTitle className="text-right text-[12px] font-semibold text-black block truncate w-full">
                برگشت به صفحه
              </DialogTitle>
            </button>
          </DialogClose>
        </div>
        <div className="px-6 py-3 border-b border-b-black/10 items-center justify-between gap-3 lg:flex hidden">
          <DialogTitle className="text-right text-[14px] font-bold text-black block truncate w-full">
            تغییرات اطلاعات
          </DialogTitle>
          <DialogClose asChild>
            <button
              onClick={closeFn}
              className="shrink-0 text-black"
              type="button"
            >
              <ICX className="w-3 h-3 text-current" fill="currentColor" />
            </button>
          </DialogClose>
        </div>
        <form
          action="#"
          onSubmit={form.handleSubmit(submitEventHandler)}
          className="px-3 lg:py-3 py-4 w-full flex flex-col items-center justify-between gap-3 lg:h-auto h-[calc(100%-40px)]"
        >
          <div className="lg:gap-6 gap-[12px] flex flex-col w-full">
            <DialogTitle className="text-right text-[12px] font-bold text-black lg:hidden block truncate w-full">
              تغییرات اطلاعات
            </DialogTitle>
            <DialogInput
              required
              label="نام"
              type="text"
              placeholder={'نام مسافر خود را وارد نمایید'}
              error={form.formState.errors.firstName?.message}
              {...form.register('firstName')}
            />
            <DialogInput
              required
              label="نام خانوادگی"
              type="text"
              placeholder={'نام خانوادگی مسافر خود را وارد نمایید'}
              error={form.formState.errors.lastName?.message}
              {...form.register('lastName')}
            />
            <DialogInput
              required
              label="شماره همراه"
              type="tel"
              placeholder={'شماره همراه مسافر خود را وارد نمایید'}
              error={form.formState.errors.tell?.message}
              {...form.register('tell')}
            />
            <DialogInput
              required
              label="کد ملی / شماره پاسپورت"
              type="text"
              placeholder={'کد ملی یا شماره پاسپورت مسافر خود را وارد نمایید'}
              error={form.formState.errors.meliCodeOrPassportCode?.message}
              {...form.register('meliCodeOrPassportCode')}
            />
          </div>
          <DialogFooter className="grid lg:grid-cols-2 grid-cols-1 gap-3 w-full shrink-0">
            <button
              className="bg-black lg:rounded-md rounded-[10px] flex items-center justify-center text-white lg:font-medium font-semibold lg:text-cs07 text-[14px] h-[45px] px-3 truncate"
              type="submit"
            >
              {form.formState.isSubmitting ? <Loading /> : 'بروزرسانی'}
            </button>
            <DialogClose asChild>
              <button
                className="lg:flex hidden items-center justify-center transition-all duration-500 bg-white hover:bg-gray-100 text-black font-medium text-cs07 h-[45px] px-3 truncate"
                type="button"
              >
                منصرف شدم
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
