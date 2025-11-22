// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
import CashOut from '@/components/dashboard/financialCartToCart/cashout';
import EmergencieForm from '@/components/dashboard/financialCartToCart/emergencieForm';
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
import Subscription from '@/components/dashboard/financialCartToCart/subscription/subscription';
import UserCreditCard from '@/components/dashboard/financialCartToCart/userCreditCard';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import toast from '@/components/dashboard/ui/customSonner/toast';
import Upload from '@/components/dashboard/upload/upload';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import useUserLegalInfo from '@/hooks/dashboard/useUserLegalInfo';
import { CartToCartFinancialMode } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { isShebaValid, verifyCardNumber } from '@persian-tools/persian-tools';
import { JSX, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

// Defining formschema 
const formSchema = z.object({
  creditCardNumber: z.string({
    message: "لطفا شماره کارت را وارد کنید."
  })
  // .refine(val => verifyCardNumber(Number(val)), {
  //   message: "شماره شبا معتبر نمی باشد."
  // })
  ,
  creditCardIban: z.string({
    message: "لطفا شماره شبا را وارد کنید."
  })
  // .refine(val => isShebaValid(val), {
  //   message: "شماره شبا معتبر نمی باشد."
  // })
  ,
  depositorName: z
    .string()
    .min(2, { message: 'نام واریز کننده باید حداقل ۲ کاراکتر باشد' })
    .nonempty({ message: 'وارد کردن نام واریز کننده الزامی است' }),
  trackingNumber: z
    .string()
    .length(12, { message: 'شماره پیگیری باید دقیقا ۱۲ رقم باشد' })
    .regex(/^[0-9]+$/, { message: 'شماره پیگیری فقط باید شامل اعداد باشد' }),
  extraAmount: z
    .string({
      required_error: 'وارد کردن مبلغ اضافه الزامی است',
      invalid_type_error: 'مبلغ باید عدد باشد',
    })
    .refine((val) => Number(val) > 10000, {
      message: 'مبلغ باید بیشتر از 10,000 تومان باشد باشد',
    }),
  depositDate: z
    .string()
    .nonempty({ message: 'تاریخ واریز وجه را وارد نمایید' }),
})

// Defining form type
export type cartToCartFormType = z.infer<typeof formSchema>;

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): JSX.Element {
  // Defining hooks
  const [mode, setMode] = useState<CartToCartFinancialMode>('personal');
  const userInfo = useUserInfo();
  const userLegalInfo = useUserLegalInfo();

  const form = useForm<cartToCartFormType>({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      creditCardNumber: userInfo.card_numbers[0].card_number,
      creditCardIban: userInfo.card_numbers[0].iban,
    }
  });

  // Defining submit handler
  const onSubmit: SubmitHandler<cartToCartFormType> = (data) => {
    console.log(data);
  }

  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <SelectMode
        value={mode}
        onValueChange={setMode}
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          const errorMessages = [errors.creditCardIban?.message, errors.creditCardNumber?.message];

          errorMessages.forEach(item => {
            if (item) {
              toast({
                title: "خطایی در ارسال فرم رخ داد!",
                description: item,
                theme: "theme"
              })
            }
          })
        })}
      />
      <div className="grid lg:grid-cols-3 lg:gap-5 gap-[24px]">
        <UserCreditCard
          title={mode === "company" ? "حقوقی" : "حقیقی"}
          mode={mode}
          data={(mode === "company") ? userLegalInfo.data.card_numbers : userInfo.card_numbers}
          onValueChange={(data) => {
            form.setValue("creditCardNumber", data.card_number);
            form.setValue("creditCardIban", data.iban);
          }}
        />
        <div className="flex items-center justify-between flex-col lg:gap-5 gap-[24px]">
          <CartBalance hasMobileView className="shrink-0 w-full" />
          <div className="w-full h-full">
            <Upload
              className="lg:w-full w-full h-full"
              onChange={() => { }}
            />
          </div>
        </div>
        <EmergencieForm form={form} />
      </div>
      <div className="lg:grid flex flex-col  lg:grid-cols-5 lg:gap-5 gap-[24px]">
        <div className="bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] lg:col-span-2">
          <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
            بخش مالی - بخش اطلاعاتی
          </span>
          <p className="text-cs75 font-normal truncate text-right block text-black/70">
            مشتری گرامی در این بخش میتوایند مبلغ مدنظرتون واریز و برداشت کنید.
          </p>
        </div>
        <div className="bg-white border rounded-xl border-black/10 lg:p-4 p-[14px] lg:col-span-3">
          <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
            نکته ضروری :
          </span>
          <p className="text-cs75 font-normal truncate text-right block text-black/70">
            اگر مبلغی را واریز کردید و به کیف پول شما واریز نگردید در آنی واحد
            به تیم{' '}
            <span className="text-cs-red font-semibold">
              پشتیبانی سفرنامه 24
            </span>{' '}
            تماس بگیرید.
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-6  lg:gap-5 gap-[24px]">
        <AdminCreditCardInfo className="lg:col-span-4" />
        <Subscription className="lg:col-span-2" />
      </div>
      <div className="bg-white border rounded-xl border-black/10 lg:p-4 p-[14px]">
        <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
          توضیحات تکمیلی :
        </span>
        <p className="text-cs75 font-normal text-right block text-black/70">
          مشتری گرامی لازم به ذکر میباشد که مبلغ بالای 10,000,000 تومان اگر به
          شارژ کیف پول اقدام نمایید در مدت 24 ساعت کاری (بانک) مبلغ به حساب کیف
          پول شما واریز میشود و اگر مبلغ کمتر از 10,000,000 تومان واریز انجام
          دهید مبلغ به کیف پول شما در آنی واحد واریز میشود. مشتری گرامی لازم به
          ذکر میباشد که مبلغ بالای 10,000,000 تومان اگر به شارژ کیف پول اقدام
          نمایید در مدت 24 ساعت کاری (بانک) مبلغ به حساب کیف پول شما واریز میشود
          و اگر مبلغ کمتر از 10,000,000 تومان واریز انجام دهید مبلغ به کیف پول
          شما در آنی واحد واریز میشود.
        </p>
      </div>
      <CashOut />
    </main>
  );
}
