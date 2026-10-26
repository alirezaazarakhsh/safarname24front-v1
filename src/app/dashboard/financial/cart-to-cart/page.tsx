// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import AdminCreditCardInfo from '@/components/dashboard/financialCartToCart/adminCreditCardInfo';
import CashOut from '@/components/dashboard/financialCartToCart/cashout';
import Details from '@/components/dashboard/financialCartToCart/details';
import EmergencieForm from '@/components/dashboard/financialCartToCart/emergencieForm';
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
import UserCreditCard from '@/components/dashboard/financialCartToCart/userCreditCard';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import toast from '@/components/dashboard/ui/customSonner/toast';
import Upload from '@/components/dashboard/upload/upload';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import useUserLegalInfo from '@/hooks/dashboard/useUserLegalInfo';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import { CartToCartFinancialMode } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeCommas } from '@persian-tools/persian-tools';
import moment from 'jalali-moment';
import { JSX, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

// Defining formschema
const formSchema = z.object({
  depositorName: z
    .string({ required_error: 'وارد کردن نام واریز کننده الزامی است' })
    .min(2, { message: 'نام واریز کننده باید حداقل ۲ کاراکتر باشد' })
    .nonempty({ message: 'وارد کردن نام واریز کننده الزامی است' }),
  trackingNumber: z
    .string({
      message: 'لطفا این فیلد را پر کنید.',
    })
    .length(12, { message: 'شماره پیگیری باید دقیقا ۱۲ رقم باشد' })
    .regex(/^[0-9]+$/, { message: 'شماره پیگیری فقط باید شامل اعداد باشد' }),
  extraAmount: z
    .string({
      required_error: 'وارد کردن مبلغ اضافه الزامی است',
      invalid_type_error: 'مبلغ باید عدد باشد',
    })
    .refine((val) => Number(removeCommas(val)) > 10000, {
      message: 'مبلغ باید بیشتر از 10,000 تومان باشد باشد',
    }),
  depositDate: z
    .string({
      message: 'لطفا این فیلد را پر کنید.',
    })
    .nonempty({ message: 'تاریخ واریز وجه را وارد نمایید' }),
});

// Defining form type
export type cartToCartFormType = z.infer<typeof formSchema>;

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): JSX.Element {
  // Defining hooks
  const [mode, setMode] = useState<CartToCartFinancialMode>('personal');
  const userInfo = useUserInfo();
  const userLegalInfo = useUserLegalInfo();
  const [image, setImage] = useState<File | undefined>();
  const [selectedCreditCard, setSelectedCreditCard] = useState<
    GETPersonalProfile['card_numbers'][0] | undefined
  >(userInfo.card_numbers[0]);
  const form = useForm<cartToCartFormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const depositReceipts = useApiMutation({
    method: 'post',
    url: '/finance/deposit-receipts/',
    isFormData: true,
    options: {
      onSuccess: () => {
        toast({
          title: 'انتقال مبلغ موفقیت امیز بود!',
          description:
            'مشترک گرامی , انتقال مبلغ مد نظر شما با موفقیت انجام شد. منتظر تایید ادمین باشید داشته باشه',
          theme: 'green',
        });

        form.resetField('trackingNumber');
        form.resetField('depositorName');
        form.resetField('extraAmount');
        form.setValue('depositDate', '');
      },
      onError: () => {
        toast({
          title: 'خطایی در انتقال وجه شکل گرفت!',
          description: 'مشترک گرامی , انتقال مبلغ مد نظر شما انجام نشد.',
          theme: 'theme',
        });
      },
    },
  });

  // Defining submit handler
  const onSubmit: SubmitHandler<cartToCartFormType> = async (data) => {
    if (!image) {
      toast({
        title: 'خطایی در ارسال فرم رخ داد!',
        description: 'لطفا عکس فیش مربوطه نیز اپلود کنید.',
        theme: 'theme',
      });
    } else if (!selectedCreditCard) {
      toast({
        title: 'خطایی در ارسال فرم رخ داد!',
        description: 'لطفا کارت مد نظر را چک کرده و مجددا امتحان کنید.',
        theme: 'theme',
      });
    } else {
      await depositReceipts.mutateAsync({
        profile_type: mode === 'personal' ? 'natural' : 'juridical',
        card_object_id: selectedCreditCard.id,
        depositor_name: data.depositorName,
        tracking_number: data.trackingNumber,
        amount: Number(removeCommas(data.extraAmount)),
        deposit_date_jalali: moment(data.depositDate).format('YYYY/MM/DD'),
        receipt_image: image,
      });
    }
  };

  // Returning JSX
  return (
    <main className="flex flex-col gap-[24px] p-5 pb-[50px] lg:gap-5 lg:pb-5">
      <SelectMode
        value={mode}
        submitLoading={depositReceipts.isPending}
        onSubmit={form.handleSubmit(onSubmit)}
        disabled={selectedCreditCard === undefined}
        onValueChange={(val) => {
          setMode(val);

          setImage(undefined);
          form.setValue('depositorName', '');
          form.setValue('trackingNumber', '');
          form.setValue('extraAmount', '');
          form.setValue('depositDate', '');

          val === 'company'
            ? setSelectedCreditCard(userLegalInfo.data.card_numbers[0])
            : setSelectedCreditCard(userInfo.card_numbers[0]);
        }}
      />
      <div className="grid gap-[24px] lg:grid-cols-3 lg:gap-5">
        <UserCreditCard
          title={mode === 'company' ? 'حقوقی' : 'حقیقی'}
          mode={mode}
          data={
            mode === 'company'
              ? userLegalInfo.data.card_numbers
              : userInfo.card_numbers
          }
          onValueChange={(card) => {
            setSelectedCreditCard(card);
            console.log(card);
          }}
        />
        <div className="flex flex-col items-center justify-between gap-[24px] lg:gap-5">
          <CartBalance hasMobileView className="w-full shrink-0" />
          <div className="h-full w-full">
            <Upload
              hideSubmit
              className="h-full w-full lg:w-full"
              onChange={setImage}
              useSingleFile
              disabled={
                mode === 'company'
                  ? userLegalInfo.data.card_numbers.length === 0
                  : userInfo.card_numbers.length === 0
              }
            />
          </div>
        </div>
        <EmergencieForm
          form={form}
          disabled={
            mode === 'company'
              ? userLegalInfo.data.card_numbers.length === 0
              : userInfo.card_numbers.length === 0
          }
        />
      </div>
      <div className="flex flex-col gap-[24px] lg:grid lg:grid-cols-5 lg:gap-5">
        <div className="rounded-xl border border-black/10 bg-white p-[14px] lg:col-span-2 lg:p-4">
          <span className="mb-2 block truncate text-right text-cs09 font-extrabold text-black">
            بخش مالی - بخش اطلاعاتی
          </span>
          <p className="block truncate text-right text-cs75 font-normal text-black/70">
            مشتری گرامی در این بخش میتوایند مبلغ مدنظرتون واریز و برداشت کنید.
          </p>
        </div>
        <div className="rounded-xl border border-black/10 bg-white p-[14px] lg:col-span-3 lg:p-4">
          <span className="mb-2 block truncate text-right text-cs09 font-extrabold text-black">
            نکته ضروری :
          </span>
          <p className="block truncate text-right text-cs75 font-normal text-black/70">
            اگر مبلغی را واریز کردید و به کیف پول شما واریز نگردید در آنی واحد
            به تیم{' '}
            <span className="font-semibold text-cs-red">
              پشتیبانی زروان تریپ
            </span>{' '}
            تماس بگیرید.
          </p>
        </div>
      </div>
      <div className="grid gap-[24px] lg:grid-cols-6 lg:gap-5">
        <AdminCreditCardInfo className="lg:col-span-4 lg:h-[302px]" />
        <Details className="lg:col-span-2 lg:h-[302px]" />
      </div>
      <CashOut />
    </main>
  );
}
