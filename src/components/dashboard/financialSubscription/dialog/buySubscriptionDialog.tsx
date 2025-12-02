// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ICX } from '@/components/icons/ICX';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { BuySubscriptionDialogPropsType } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyIranianNationalId } from '@persian-tools/persian-tools';
import { JSX, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import NormalInput from '../../profile/normalInput';
import Loading from '../../ui/loading';
import { phoneNumberValidator } from '@persian-tools/persian-tools';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import toast from '../../ui/customSonner/toast';

// Defining form schema
const formSchema = z.object({
  name: z
    .string({
      required_error: "وارد کردن نام الزامی است."
    })
    .min(2, { message: "نام باید حداقل ۲ کاراکتر باشد." })
    .max(256, { message: "نام نمی‌تواند بیشتر از ۲۵۶ کاراکتر باشد." }),
  phoneNumber: z
    .string({
      required_error: "وارد کردن شماره موبایل الزامی است."
    })
    .refine(val => phoneNumberValidator(val), {
      message: "شماره موبایل معتبر نیست.",
    }),
  nationalCode: z
    .string({
      required_error: "وارد کردن کد ملی الزامی است."
    })
    .refine(val => verifyIranianNationalId(val), {
      message: "کد ملی معتبر نیست.",
    })
});

// Defining form Type
type formType = z.infer<typeof formSchema>;

// Creating and exporting BuySubscriptionDialog component as default
export default function BuySubscriptionDialog({
  open, onOpenChange, id
}: BuySubscriptionDialogPropsType): JSX.Element {
  // Defining hooks
  const userInfo = useUserInfo();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${userInfo.first_name} ${userInfo.last_name}`,
      nationalCode: userInfo.national_code,
      phoneNumber: userInfo.phone_number
    }
  })

  // Defining onSubmit event
  const onSubmit: SubmitHandler<formType> = async (submitData) => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds
    onOpenChange?.(false);
    toast({
      title: "خرید اشتراک موفقیت امیز بود!",
      description: "مشتری عزیز, پس از تایید ما اشتراک جدید شما فعال میشود.",
      theme: "green"
    })

    // toast({
    //   title: "خطایی رخ داد!",
    //   description: "مشتری عزیز, در هنگام خرید اشتراک شما مشکلی پیش امد.",
    //   theme: "theme"
    // })
  }

  // Using useEffect to reset values
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open])

  // Returning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="w-full lg:max-w-[450px] max-w-full gap-0 p-0 lg:rounded-xl rounded-none">
          <DialogHeader className='flex !flex-row items-center justify-between gap-3 border-b border-b-black/10 w-full px-4 h-[50px]'>
            <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black truncate flex-1">
              خرید اشتراک
            </DialogTitle>
            <DialogClose className='shrink-0 !mt-0' asChild>
              <button>
                <ICX className='size-3' />
              </button>
            </DialogClose>
          </DialogHeader>
          <form action="#" onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-4 lg:max-h-[calc(100dvh-50px-25px)] max-h-[calc(100dvh-50px)] overflow-auto scrollbar-hide'>
            <div className='w-full'>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                نام و نام خوانوادگی
              </span>
              <NormalInput
                type="text"
                className="h-[45px] w-full"
                placeholder="نام و نام خانوادگی خود را وارد کنید"
                error={form.formState.errors.name?.message}
                {...form.register("name")}
              />
            </div>
            <div className='w-full'>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                شماره همراه
              </span>
              <NormalInput
                type="tel"
                className="h-[45px] w-full"
                placeholder="شماره همراه خود را وارد کنید"
                error={form.formState.errors.phoneNumber?.message}
                lenghtValidation={11}
                {...form.register("phoneNumber")}
              />
            </div>
            <div className='w-full'>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                کد ملی
              </span>
              <NormalInput
                type="text"
                className="h-[45px] w-full"
                placeholder="کد ملی خود را وارد کنید"
                error={form.formState.errors.nationalCode?.message}
                lenghtValidation={10}
                {...form.register("nationalCode")}
              />
            </div>
            <button disabled={form.formState.isSubmitting} className="h-[45px] rounded-md flex items-center justify-center bg-green-500 text-white w-full disabled:text-gray-700 disabled:bg-gray-200 disabled:cursor-not-allowed transition-all duration-500 text-cs08 font-semibold px-4">
              {
                !form.formState.isSubmitting
                  ? "ثبت اطلاعات"
                  : <Loading className='bg-current' />
              }
            </button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
