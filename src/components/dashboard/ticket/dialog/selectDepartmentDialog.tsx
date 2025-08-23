// Forcing next.js to render this component as client side component
'use client';

// Importing part
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { ICX } from '@/components/icons/ICX';
import { TicketsSelectDepartmentPropsType } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import RadioItem from '../radioItem';
import Loading from '../../ui/loading';
import toast from '../../ui/customSonner/toast';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { useMediaQuery } from '@/hooks';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';

// Defining data of radio items to render
type departmentTypes =
  | 'reservation'
  | 'financial'
  | 'managment'
  | 'counseling'
  | 'technical';

const radioGroupData: {
  label: string;
  value: departmentTypes;
}[] = [
  {
    label: 'دپارتمان رزرواسیون',
    value: 'reservation',
  },
  {
    label: 'دپارتمان مالی',
    value: 'financial',
  },
  {
    label: 'دپارتمان مدیریت',
    value: 'managment',
  },
  {
    label: 'دپارتمان مشاوره',
    value: 'counseling',
  },
  {
    label: 'دپارتمان بخش فنی',
    value: 'technical',
  },
];

// Defining form schema
const formSchema = z.object({
  department: z.enum(
    ['reservation', 'financial', 'managment', 'counseling', 'technical'],
    {
      message: 'لطفا دپارتمان مد نظر را انتخواب کنید .',
    },
  ),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting SelectDepartmentDialog component as default
export default function SelectDepartmentDialog({
  closeFn,
  isOpened,
}: TicketsSelectDepartmentPropsType): ReactNode {
  // Defining hooks
  const [succesMobileDrawerOpened, setSuccesMobileDrawerOpened] =
    useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining submit function
  const submitHandler: SubmitHandler<formType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    closeFn && closeFn();

    form.reset({ department: undefined });

    if (isMobile) {
      setSuccesMobileDrawerOpened(true);
    } else {
      toast({
        theme: 'green',
        title: 'تیکت شما با موفقیت ایجاد شد',
        description: 'مشتری گرامی میتوانید چت خود را آغاز نمایید',
      });
    }
  };

  // Defining variables
  const department = form.watch('department');

  // Returning JSX
  return (
    <Dialog
      open={isOpened}
      onOpenChange={(open) => {
        closeFn && !open && closeFn();
      }}
    >
      <CanclationErrorDrawer
        description="مشتری گرامی میتوانید چت خود را آغاز نمایید"
        title="تیکت شما با موفقیت ایجاد شد"
        closeFn={() => setSuccesMobileDrawerOpened(false)}
        isOpened={succesMobileDrawerOpened}
        theme="green"
      />
      <DialogPortal>
        <DialogContent className="lg:p-6 p-0 w-full lg:max-w-[400px] max-w-[100vw] lg:h-auto h-dvh gap-0 block lg:!rounded-2xl !rounded-none overflow-hidden">
          <div className="px-6 py-5 border-b border-b-black/10 flex items-center justify-between gap-3 lg:bg-white bg-gray-100 w-full shrink-0 lg:h-auto h-[50px]">
            <div className="flex items-center justify-start gap-3">
              <DialogClose asChild className="lg:hidden block">
                <button onClick={closeFn} className="shrink-0" type="button">
                  <IconsaxIcons
                    name="ArrowRight"
                    className="w-5 h-5 text-black"
                  />
                </button>
              </DialogClose>
              <DialogTitle className="text-right text-[14px] font-bold text-[#2b2b2b] truncate w-full lg:block hidden">
                انتخواب دپارتمان تیکت
              </DialogTitle>
              <span className="text-right text-[14px] font-bold text-[#2b2b2b] truncate w-full lg:hidden block">
                بازگشت به صفحه
              </span>
            </div>
            <DialogClose asChild className="lg:block hidden">
              <button onClick={closeFn} className="shrink-0" type="button">
                <ICX className="w-3 h-3 text-black" fill="currentColor" />
              </button>
            </DialogClose>
          </div>
          <form
            onSubmit={form.handleSubmit(submitHandler, (errors) => {
              if (!isMobile) {
                Object.values(errors).forEach((item) => {
                  toast({
                    theme: 'theme',
                    description: item?.message || '',
                    title: 'خطایی رخ داد',
                  });
                });
              }
            })}
            action="#"
            className="p-6 w-full lg:h-auto h-[calc(100dvh-50px)] lg:block flex flex-col items-start justify-between gap-8 overflow-auto custom-scrollbar"
          >
            <div className="flex flex-col gap-4 lg:mb-7 w-full">
              <DialogDescription className="text-right text-[14px] font-bold text-[#2b2b2b] w-full lg:hidden block">
                برای ایجاد تیکت جدید دپارتمان خودرا انتخواب کنید.
              </DialogDescription>
              {radioGroupData.map((item, index) => (
                <RadioItem
                  key={index}
                  label={item.label}
                  isActive={department === item.value}
                  onClick={() => form.setValue('department', item.value)}
                />
              ))}
              {isMobile && form.formState.errors.department?.message && (
                <p className="text-cs08 font-semibold text-right text-cs-red mt-4">
                  {form.formState.errors.department.message}
                </p>
              )}
            </div>
            <button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full p-4 lg:h-[40px] h-[50px] rounded-lg bg-green-500 flex items-center justify-center transition-all duration-500 hover:bg-green-600 text-white disabled:opacity-50"
            >
              {!form.formState.isSubmitting ? (
                <span className="text-center block font-bold text-current text-cs07">
                  ثبت تیکت
                </span>
              ) : (
                <Loading className="size-2" />
              )}
            </button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
