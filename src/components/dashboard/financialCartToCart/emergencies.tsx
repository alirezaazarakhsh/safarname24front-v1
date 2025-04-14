// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode } from 'react';
import InputAndLabel from './inputAndLabel';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { numberSeparation } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/utils';
import { EmergenciesComponentPropsType } from '@/types/dashboard/component';
import toast from '../ui/customSonner/toast';

// Defining form type and its schema
const formSchema = z.object({
  codePeigiri: z
    .string({ message: 'لطفا این فیلد را پر کنید.' })
    .length(12, { message: 'شماره پیگیری باید دقیقا 12 رقم باشد' }),
  additionalPrice: z
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
  transactionDate: z.string({
    message: 'لطفا این فیلد را پر کنید.',
  }),
});

type formType = z.infer<typeof formSchema>;

// Creating and exporting Emergencies component as default
export default function Emergencies({
  previousInfos: { card, file },
}: EmergenciesComponentPropsType): ReactNode {
  // Defining hooks
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining a function to handle submit event of form
  const handleSubmit: SubmitHandler<formType> = (data) => {
    if (card && file) {
      form.clearErrors();
      console.log({ ...data, card, file });
    } else if (card && !file) {
      toast({
        description: 'لطفا فایل مربوطه را اپلود کنید.',
        title: 'عدم اپلود فایل مربوطه.',
      });
    } else if (!card && file) {
      toast({
        description: 'لطفا کارت مدنظر را انتخواب کنید.',
        title: 'عدم انتخواب کارت.',
      });
    } else {
      toast({
        description: 'لطفا کارت و فایل مربوطه را انتخواب و اپلود کنید.',
        title: 'عدم اپلود فایل و انتخواب کارت.',
      });
    }
  };

  // Returning JSX
  return (
    <form
      action="#"
      className="bg-white border border-black/10 rounded-lg overflow-hidden row-span-3 w-[30%]"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="px-3 py-4 flex items-center justify-start border-b border-b-black/10 gap-3">
        <div className="shrink-0 w-[38px] h-[38px] rounded-md flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Warning2"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full lg:block flex items-center justify-between gap-3">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right lg:mb-1">
            موراد ضروری
          </span>
          <p className="lg:text-right text-left truncate text-black/50 lg:text-cs75 text-[16px] lg:font-semibold font-bold">
            فیلد های ضروری (ستاره دار) زیر را با دقت پر نمایید.
          </p>
        </div>
      </div>
      <div className="px-3 py-4 flex flex-col gap-7 border-b border-b-black/10">
        <InputAndLabel
          placeholder="* شماره پیگیری خود را وارد نمایید"
          validation="12 رقم"
          label="شماره پیگیری"
          type={'text'}
          error={form.formState.errors.codePeigiri?.message}
          isValid={!form.getFieldState('codePeigiri').invalid}
          {...form.register('codePeigiri')}
        />
        <InputAndLabel
          placeholder="* مبلغ مد نظر خود را وارد نمایید"
          label="مبلغ اضافه"
          type={'text'}
          error={form.formState.errors.additionalPrice?.message}
          onInput={(e) => {
            const value = e.currentTarget.value;
            const removedCommas = value.replace(/,/g, '');
            const formattedValue = numberSeparation(removedCommas);

            e.currentTarget.value = formattedValue;
          }}
          {...form.register('additionalPrice')}
        />
        <InputAndLabel
          placeholder="* تاریخ واریز خود را انتخاب نمایید"
          label="تاریخ واریز وجه"
          type="date"
          error={form.formState.errors.transactionDate?.message}
          {...form.register('transactionDate')}
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-3 py-4">
        <Button className="bg-black rounded-lg flex items-center justify-center py-3 px-5">
          <span className="font-normal text-white truncate block w-full text-center text-xs">
            ثبت اطلاعات
          </span>
        </Button>
        <div
          className={cn(
            'transition-all duration-500 rounded-lg gap-2 flex items-center justify-center p-3 ',
            form.formState.isValid && card && file
              ? 'bg-green-100 text-green-500'
              : 'bg-gray-100 text-black/50',
          )}
        >
          <IconsaxIcons
            name={
              form.formState.isValid && card && file
                ? 'TickSquare'
                : 'CloseSquare'
            }
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal  truncate block w-full text-right text-xs text-current">
            {form.formState.isValid && card && file ? 'تکمیل شد' : 'تکمیل نشده'}
          </span>
        </div>
      </div>
    </form>
  );
}
