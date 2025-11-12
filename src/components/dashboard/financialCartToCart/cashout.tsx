// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import CheckboxItem from '@/components/dashboard/financial/checkboxItem';
import NormalInput from '../profile/normalInput';
import CreditCardDropDown from '../profile/creditCardDropdown';
import Selecter from './selecter';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isShebaValid } from '@persian-tools/persian-tools';

// Defining form schema
const formSchema = z.object({
  walletAmount: z
    .string({
      message: 'لفا این فیلد را پر کنید.',
    })
    .refine((val) => Number(val) >= 10000, {
      message: 'مقدار وارد شده نباید کمتر از 10,000 تومان باشد',
    }),
  shaba: z
    .string({
      required_error: 'لطفا این فیلد را پر کنید.',
    })
    .refine((val) => isShebaValid(val), {
      message: 'شماره شبای وارد شده معتبر نمیباشد.',
    }),
  cardNumber: z
    .string()
    .min(1, { message: 'شماره کارت را وارد نمایید.' })
    .length(16, { message: 'شماره کارت باید ۱۶ رقمی باشد.' })
    .refine((val) => Number(val), {
      message: 'شماره کارت باید فقط شامل اعداد باشد.',
    }),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting CashOut section/component of cart-to-cart dashboard (financial) page as default
export default function CashOut(): ReactNode {
  // Defining hooks
  const [profile, setProfile] = useState<'profile' | 'legal'>('legal');
  const [approved, setApproved] = useState<boolean>(false);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining form submit event
  const onSubmit: SubmitHandler<formType> = (data) => {
    console.log(data);
  };

  // Returning JSX
  return (
    <section className="bg-white border rounded-xl border-black/10 p-4 grid grid-cols-4 gap-10">
      <div className="flex flex-col justify-between">
        <div className="w-full">
          <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
            بخش مالی - برداشت وجه
          </span>
          <span className="text-cs75 font-normal truncate text-right block text-black/70 mb-5">
            پروفایل خود را انتخاب نمایید
          </span>
        </div>
        <div className="flex flex-col items-center justify-between w-full lg:gap-3 gap-[24px]">
          <CheckboxItem
            hideTooltip
            onClick={() => setProfile('profile')}
            checked={profile === 'profile'}
            title={'پروفایل حقیقی'}
            isCardSelection
            className="lg:h-[50px]"
          />
          <CheckboxItem
            onClick={() => setProfile('legal')}
            hideTooltip
            checked={profile === 'legal'}
            title={'پروفایل حقوقی'}
            isCardSelection
            className="lg:h-[50px]"
          />
        </div>
      </div>
      <form
        action="#"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid col-span-3 grid-cols-3 gap-4"
      >
        <div>
          <div className="mb-5 w-full">
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              مبلغ برداشت کیف پول
            </span>
            <NormalInput
              type="number"
              placeholder="مبلغ مد نظر خود را وارد نمایید"
              error={form.formState.errors.walletAmount?.message}
              value={form.watch('walletAmount')}
              onChange={(e) =>
                form.setValue('walletAmount', e.currentTarget.value)
              }
              name={form.register('walletAmount').name}
            />
          </div>
          <div className="w-full">
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              شماره کارت بانکی
            </span>
            <CreditCardDropDown
              placeholder="مبلغ مد نظر خود را وارد نمایید"
              className="w-full"
              hideCreate
              value={form.watch('cardNumber')}
              reset={() => form.setValue('cardNumber', '')}
              onValueChange={(card) => form.setValue('cardNumber', card)}
              {...form.register('walletAmount')}
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-between">
          <div className="mb-5 w-full">
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              شماره شبا کارت بانکی
            </span>
            <NormalInput
              type="text"
              placeholder="24 رقم شماره شبا کارت را وارد نمایید"
              clearFn={() => form.setValue('shaba', '')}
              error={form.formState.errors.shaba?.message}
              value={form.watch('shaba')}
              onChange={(e) => form.setValue('shaba', e.currentTarget.value)}
              name={form.register('shaba').name}
            />
          </div>
          <div className="flex items-center justify-between gap-4 w-full">
            <Selecter
              label="شماره کارت و شماره شبا را تایید میکنم."
              checked={approved}
              onCheckChange={setApproved}
            />
            <button
              disabled={!approved}
              className="px-4 h-[45px] transition-all text-cs75 shrink-0 duration-500 text-white bg-green-500 disabled:text-black disabled:bg-gray-100  rounded-md flex items-center justify-center"
            >
              ارسال درخواست (برداشت وجه)
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
