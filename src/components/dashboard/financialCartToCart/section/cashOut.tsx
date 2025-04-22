// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import { Label } from '@/components/ui/label';
import CheckboxItem from '../../financial/checkboxItem';
import InputAndLabel from '../inputAndLabel';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { numberSeparation } from '@/utils';
import LabledCheckbox from '../labledCheckbox';
import { Button } from '@/components/ui/button';

// Defining from schema and form type
const formSchema = z.object({
  profile: z.enum(['legal', 'profile']),
  cashOutAmount: z
    .string({
      message: 'لطفا این فیلد را پر کنید.',
    })
    .transform((value) => {
      const removedCommas = value.replace(/,/g, '');
      return Number(removedCommas);
    })
    .refine((val) => val > 1000000, {
      message: 'حداقل وارد کردن مبلغ سقف (1,000,000 تومان) میباشد',
    })
    .refine((val) => val < 99999999, {
      message: 'حداکثر وارد کردن مبلغ به سقف (99,999,999 تومان) میباشد.',
    }),
  creditCardNumber: z
    .string({
      message: 'لطفا این فیلد را پر کنید.',
    })
    .transform((value) => {
      const removedSigns = value.replace(/-/g, '');
      return removedSigns;
    })
    .refine((val) => val.length !== 16, {
      message: 'شماره کارت بانکی باید 16 رقم باشد.',
    }),
  creditCardShabaNumber: z
    .string({
      message: 'لطفا این فیلد را پر کنید.',
    })
    .transform((value) => {
      const removedSigns = value.replace(/-/g, '').replace(/IR /g, '');
      return removedSigns;
    })
    .refine((val) => val.length !== 24, {
      message: 'شماره شبا کارت بانکی باید 24 رقم باشد.',
    }),
  acceptTheNumbers: z.boolean({ message: 'لطفا این فیلد را پر کنید.' }),
});

type formType = z.infer<typeof formSchema>;

// Creating and exporting CashOut section/component of cart-to-cart dashboard (financial) page as deafult
export default function CashOut(): ReactNode {
  // Defining hooks
  const form = useForm<formType>({ resolver: zodResolver(formSchema) });

  // Defining a submit handler
  const handleSubmitEvent: SubmitHandler<formType> = async (data) => {
    console.log(data);
  };

  // Returning JSX
  return (
    <form
      action="#"
      onSubmit={form.handleSubmit(handleSubmitEvent)}
      className="bg-white border border-black/10 rounded-lg overflow-hidden w-full px-3 py-4 grid grid-cols-4 gap-12"
    >
      <div>
        <h3 className="block text-right font-bold text-cs08 text-black truncate w-full mb-3">
          بخش مالی - برداشت وجه
        </h3>
        <Label
          className={
            'block truncate text-right w-full text-[10px] font-medium text-black mb-2'
          }
        >
          پروفایل خود را انتخاب نمایید
        </Label>
        <div className="flex flex-col items-center justify-between w-full gap-3">
          <CheckboxItem
            checked={form.getValues('profile') === 'profile'}
            title={'پروفایل حقیقی'}
            isCardSelection
            className="lg:h-[50px]"
            onClick={() => form.setValue('profile', 'profile')}
          />
          <CheckboxItem
            checked={form.getValues('profile') === 'legal'}
            title={'پروفایل حقوقی'}
            isCardSelection
            className="lg:h-[50px]"
            onClick={() => form.setValue('profile', 'legal')}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-2">
        <InputAndLabel
          label="مبلغ برداشت کیف پول"
          type="text"
          className="w-full h-[50px]"
          isValid={!form.getFieldState('cashOutAmount').invalid}
          validation="ICON"
          validationType="icon"
          placeholder="*120,000 تومان"
          onInput={(e) => {
            let value = e.currentTarget.value;
            value = value.replace(/\s*تومان\s*/g, '');
            value = value.replace(/,/g, '');
            value = value.replace(/\D/g, '');
            const formattedValue = numberSeparation(value);

            e.currentTarget.value = `${formattedValue} تومان`;
          }}
          {...form.register('cashOutAmount')}
        />
        <InputAndLabel
          label="شماره کارت بانکی"
          type="text"
          className="w-full h-[50px]"
          isValid={!form.getFieldState('creditCardNumber').invalid}
          validation="ICON"
          validationType="icon"
          placeholder="* 0000-0000-0000-0000"
          onInput={(e) => {
            let value = e.currentTarget.value.replace(/-/g, '');
            const formattedValue = numberSeparation(value, '-', 4);

            e.currentTarget.value = formattedValue;
          }}
          {...form.register('creditCardNumber')}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full gap-2 col-span-2">
        <InputAndLabel
          label="شماره شبا کارت بانکی"
          type="text"
          className="w-full h-[50px]"
          isValid={!form.getFieldState('creditCardShabaNumber').invalid}
          validation="ICON"
          validationType="icon"
          placeholder="* 0000-0000-0000-0000-0000-0000"
          onInput={(e) => {
            let value = e.currentTarget.value
              .replace(/-/g, '')
              .replace('IR ', '');
            const formattedValue = numberSeparation(value, '-', 4);

            e.currentTarget.value = `IR ${formattedValue}`;
          }}
          {...form.register('creditCardShabaNumber')}
        />
        <div className="flex items-center justify-between gap-5 w-full">
          <LabledCheckbox
            label="شماره کارت و شماره شبا را تایید میکنم."
            disabled={false}
            onChange={(checked) => form.setValue('acceptTheNumbers', checked)}
          />
          <Button
            disabled={!form.formState.isValid}
            type="submit"
            className={
              'transition-all duration-500 rounded-lg flex items-center justify-center h-[50px] px-5 bg-black  text-white disabled:bg-gray-100 disabled:text-black/50 disabled:opacity-100 shrink-0 w-fit font-normal  truncate text-center text-xs'
            }
          >
            ارسال درخواست (برداشت وجه)
          </Button>
        </div>
      </div>
    </form>
  );
}
