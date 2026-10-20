// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ICX } from '@/components/icons/ICX';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { AddCardDialogPropsType } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { isShebaValid, verifyCardNumber } from '@persian-tools/persian-tools';
import { JSX, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import NormalInput from '../../profile/normalInput';
import CardShowCase from '../cardShowCase';
import { BankInfo } from '@/types/utils';
import { getBankFromCard } from '@/utils/string';
import Loading from '../../ui/loading';
import useUserLegalInfo from '@/hooks/dashboard/useUserLegalInfo';
import toast from '../../ui/customSonner/toast';
import { userFetchedInfoContext } from '../../page';
import { AnimatePresence, motion } from 'framer-motion';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import { handleNoWord } from '@/utils/utils';
import { numberSeparation } from '@/utils';

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

// Creating and exporting AddCardDialog component as default
export default function AddCardDialog({
  open, onOpenChange,
  mode
}: AddCardDialogPropsType): JSX.Element {
  // Defining hooks
  const [cardInfo, setCardInfo] = useState<BankInfo | null>();
  const userLegalInfo = useUserLegalInfo();
  const userInfo = useContext(userFetchedInfoContext);
  const form = useForm<formType>({
     resolver: zodResolver(formSchema),
     mode: "all",
     defaultValues: {
        cardNumber: "",
        iban: "",
        ownerName: ""
     }
  })

  const post = useApiMutation({
    url: "/card-numbers/",
    method: "post",
    options: {
      onSettled: () => {
        onOpenChange?.(false);
        (mode === "company")
          ? userLegalInfo.refetch?.()
          : userInfo?.refetch?.();
      },
      onSuccess: () => {
        toast({
          description: "کارت شما با موفقیت اضافه گردید.",
          title: "عملیات موفقیت امیز بود.",
          theme: "green"
        })
      }, onError: () => {
        toast({
          description: "شماره کارت اضافه نشد.",
          title: "خطا در ارسال اطلاعات.",
          theme: "theme"
        })
      }
    }
  })

  // Defining variables
  const formData = form.watch();

  // Defining onSubmit event
  const onSubmit: SubmitHandler<formType> = async (data) => {
    await post.mutateAsync({
      profile_type: mode === "company" ? "juridical" : "natural",
      card_number: data.cardNumber,
      iban: data.iban,
      account_holder_name: data.ownerName
    })
  }

  // Using useEffect to reset values
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form])

  // Using useEffect to set card show case infos when form is valid
  useEffect(() => {
     if (form.formState.isValid) {
      setCardInfo(getBankFromCard(formData.cardNumber));
    }
  }, [form.formState.isValid, formData.cardNumber])

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
          <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-4 lg:max-h-[calc(100dvh-50px-25px)] max-h-[calc(100dvh-50px)] overflow-auto scrollbar-hide'>
            <AnimatePresence>
              {
                 form.formState.isValid && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0
                    }}
                    exit={{
                      height: 0,
                      opacity: 0
                    }}
                    animate={{
                      height: 200,
                      opacity: 100
                    }}
                    className="bg-gray-200 rounded-xl py-4 px-8 overflow-hidden lg:col-span-2">
                    <CardShowCase
                      className="h-[calc(200px-32px)]"
                      data={{
                        bankIcon: cardInfo?.type || 'unknown',
                        bankName: cardInfo?.name || 'نامعلوم',
                        holderName: formData.ownerName,
                        iban: formData.iban || "-",
                        number: formData.cardNumber || "-",
                      }}
                    />
                  </motion.div>
                )
              }
            </AnimatePresence>

            <div className='w-full'>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                شماره کارت :
              </span>
              <NormalInput
                type="text"
                error={form.formState.errors.cardNumber?.message}
                className="h-[45px] w-full"
                placeholder="16 رقم شماره شبا را وارد نمایید"
                lenghtValidation={16}
                lenghtValidationEmtpyValueCount={3}
                textLTR
                       onChange={(e) => {
                                                                 const newValue = numberSeparation(handleNoWord(e.target.value), " ", 4);
                                                                 const removedWhiteSpace = newValue.replace(/\s/g, "");

                                                                 e.target.value = newValue;
                          form.setValue('cardNumber', removedWhiteSpace, {
                                                                    shouldValidate: true,
                                                                 })
                                                       }}
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
                leftSideIcon="IR"
                textLTR
                lenghtValidation={24}
                lenghtValidationEmtpyValueCount={5}
                onChange={(e) => {
                                          const newValue = numberSeparation(handleNoWord(e.target.value), " ", 4);
                                          const removedWhiteSpace = newValue.replace(/\s/g, "");

                                          e.target.value = newValue;
                                          form.setValue('iban', removedWhiteSpace, {
                                             shouldValidate: true,
                                          })
                                }}
              />
            </div>
            <div>
              <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
                نام و نام خانوادگی صاحب حساب :
              </span>
              <NormalInput
                className="h-[45px] w-full"
                placeholder="نام صاحب حساب را وارد کنید"
                       onChange={(e) => {
                  const value = e.target.value.replace(/[^\u0600-\u06FF\s]/g, "");

                          e.target.value = value;
                          form.setValue('ownerName', value, {
                             shouldValidate: true
                  });
                }}
              />
            </div>
               <button disabled={form.formState.isSubmitting || !form.formState.isValid} className="h-[45px] rounded-md flex items-center justify-center bg-[#252525] text-white w-full disabled:text-[#252525] disabled:bg-[#e7e7e7] disabled:cursor-not-allowed transition-all duration-500 text-cs08 font-semibold px-4">
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
