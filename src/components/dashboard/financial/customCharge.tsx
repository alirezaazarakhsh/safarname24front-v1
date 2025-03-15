// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Loading from '../ui/loading';
import toast from '../ui/customSonner/toast';
import { customChargeComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';

// Defining formSchema
const formSchema = z.object({
  amount: z
    .string()
    .transform((value) => {
      const removedCommas = value.replace(/,/g, '');
      return Number(removedCommas);
    })
    .refine((val) => val > 1000000, {
      message: 'حداقل مبلف شارژ 1,000,000 تومان است',
    }),
});

type formType = z.infer<typeof formSchema>;

// Creating and exporting CustomeCharge component as default
export default function CustomeCharge({
  disabled,
}: customChargeComponentPropsType): ReactNode {
  // Defining hooks
  const form = useForm<formType>({ resolver: zodResolver(formSchema) });

  // Defining a function to handle submit Event
  const submitEventHandler: SubmitHandler<formType> = async (data) => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

    console.log(data);
  };

  // Returning JSX
  return (
    <form
      data-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onSubmit={form.handleSubmit(submitEventHandler, (error) => {
        if (error.amount?.message) {
          toast({
            description: error.amount.message,
            title: 'خطایی رخ داد!',
          });
        }
      })}
      action="#"
      className="bg-white rounded-lg border border-black/10 p-3 col-span-2 flex flex-col items-start justify-around gap-6 transition-all duration-500 data-[disabled='false']:opacity-100 data-[disabled='true']:opacity-50 data-[disabled='true']:pointer-events-none data-[disabled='false']:pointer-events-auto"
    >
      <div className="w-full">
        <span className="text-cs08 font-medium text-black truncate block mb-2">
          مبلغ بیشتر شارژ کیف پول
        </span>
        <p className="text-cs75 font-normal text-gray-500 line-clamp-2">
          مشتری گرامی لازم به ذکر است که حداقل وارد کردن مبلغ سقف (1,000,000
          تومان) و حداکثر وارد کردن مبلغ به سقف (100,000,000 تومان) میباشد.
        </p>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-start gap-3 flex-wrap mb-2">
          <input
            className="bg-white border border-blac/10 rounded-md px-3 block w-[250px] h-[40px] placeholder:text-cs75 placeholder:font-normal text-cs75 font-normal text-black placeholder:black transition-all duration-500 opacity-80 focus:opacity-100"
            placeholder="مثال : 21,000,000 تومان"
            onInput={(e) => {
              const value = e.currentTarget.value;
              const removedCommas = value.replace(/,/g, '');
              const formattedValue = numberSeparation(removedCommas);

              e.currentTarget.value = formattedValue;
            }}
            {...form.register('amount')}
          />
          <button
            disabled={
              form.getValues('amount') === undefined ||
              form.getValues('amount').toString() === '0' ||
              form.formState.isSubmitting
            }
            className="h-[40px] rounded-md px-5 text-cs08 font-medium transition-all duration-500 disabled:bg-gray-100 disabled:text-gray-300 flex items-center justify-center bg-black text-white"
          >
            {form.formState.isSubmitting ? <Loading /> : 'اضافه کردن'}
          </button>
        </div>
        <button
          type="button"
          disabled={form.getValues('amount') === undefined}
          className="font-normal text-cs08 transition-all duration-500 disabled:text-black text-cs-red"
          onClick={() => form.setValue('amount', 0)}
        >
          پاک کردن
        </button>
      </div>
    </form>
  );
}
