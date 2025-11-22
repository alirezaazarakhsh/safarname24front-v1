// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ICX } from '@/components/icons/ICX';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { EditCurrentCardDialogPropsType } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { isShebaValid, verifyCardNumber } from '@persian-tools/persian-tools';
import { JSX, useContext, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import NormalInput from '../../profile/normalInput';
import { getBankFromCard } from '@/utils/string';
import Loading from '../../ui/loading';
import useUserLegalInfo from '@/hooks/dashboard/useUserLegalInfo';
import toast from '../../ui/customSonner/toast';
import { userFetchedInfoContext } from '../../page';

// Defining form schema
const formSchema = z.object({
  cardNumber: z.string({
    message: "لطفا این فیلد را پر کنید.",
  }).refine(value => verifyCardNumber(Number(value)), {
    message: "شماره کارت را درست وارد کنید"
  }),
  iban: z.string({
    message: "لطفا این فیلد را پر کنید.",
  }).refine(value => isShebaValid(value), {
    message: "شماره شبا را درست وارد کنید"
  }),
  ownerName: z.string({
    message: "لطفا این فیلد را پر کنید.",
  }).min(3, "این فیلد باید دارای حداقل 3 کاراکتر باشد.").max(20, "این فیلد باید دارای حداکثر 20 کاراکتر باشد."),
});

// Defining form Type
type formType = z.infer<typeof formSchema>;

// Creating and exporting EditCurrentCardDialog component as default
export default function EditCurrentCardDialog({
  open, onOpenChange,
  mode, data
}: EditCurrentCardDialogPropsType): JSX.Element {
  // Defining hooks
  const userLegalInfo = useUserLegalInfo();
  const userInfo = useContext(userFetchedInfoContext);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: data.card_number,
      iban: data.iban,
      ownerName: data.account_holder_name
    }
  })

  // Defining variables
  const formData = form.watch();

  // Defining onSubmit event
  const onSubmit: SubmitHandler<formType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 seconds
    console.log(data);

    onOpenChange?.(false);

    (mode === "company")
      ? userLegalInfo.refetch?.()
      : userInfo?.refetch?.();

    toast({
      description: "کارت شما با موفقیت ویرایش گردید.",
      title: "عملیات موفقیت امیز بود.",
      theme: "green"
    })

    // toast({
    //   description: "کارت مد نظر ویرایش پیدا نکرد.",
    //   title: "خطا در ارسال اطلاعات.",
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
              اضافه کردن کارت بانکی
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
                شماره کارت :
              </span>
              <NormalInput
                type="text"
                error={form.formState.errors.cardNumber?.message}
                className="h-[45px] w-full"
                placeholder="24 رقم شماره شبا را وارد نمایید"
                validationText={{
                  isValid: !form.getFieldState("cardNumber").invalid,
                  label: "24 رقم"
                }}
                onChange={(e) =>
                  form.setValue('cardNumber', e.currentTarget.value)
                }
                value={form.watch('cardNumber')}
                name={form.register('cardNumber').name}
              />
            </div>
            <div className='w-full'>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                شماره شبا :
              </span>
              <NormalInput
                type="text"
                error={form.formState.errors.iban?.message}
                className="h-[45px] w-full"
                placeholder="24 رقم شماره شبا را وارد نمایید"
                validationText={{
                  isValid: !form.getFieldState("iban").invalid,
                  label: "24 رقم"
                }}
                onChange={(e) =>
                  form.setValue('iban', e.currentTarget.value)
                }
                value={form.watch('iban')}
                name={form.register('iban').name}
              />
            </div>
            <div>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                نام و نام خانوادگی صاحب حساب :
              </span>
              <NormalInput
                className="h-[45px] w-full"
                placeholder="نام صاحب حساب را وارد کنید"
                error={form.formState.errors.ownerName?.message}
                {...form.register("ownerName")}
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
