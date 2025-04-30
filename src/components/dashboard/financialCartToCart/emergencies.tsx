// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode, useState } from 'react';
import InputAndLabel from './inputAndLabel';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { numberSeparation } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/utils';
import { EmergenciesComponentPropsType } from '@/types/dashboard/component';
import toast from '../ui/customSonner/toast';
import CartToCartError from './dialog/cartToCartError';
import CartToCartSuccess from './dialog/cartToCartSuccess';
import DatePickerInput from './datePickerInput';

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
  const [submitState, setSubmitState] = useState<
    'suceess' | 'error' | undefined
  >();
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining a function to handle submit event of form
  const handleSubmit: SubmitHandler<formType> = (data) => {
    if (card && file) {
      form.clearErrors();
      console.log({ ...data, card, file });
      setSubmitState('suceess');
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
      className="bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden"
      onSubmit={form.handleSubmit(handleSubmit, (e) => {
        if (e.codePeigiri?.message)
          toast({
            title: 'خطایی رخ داد!',
            description: e.codePeigiri.message,
          });

        if (e.additionalPrice?.message)
          toast({
            title: 'خطایی رخ داد!',
            description: e.additionalPrice.message,
          });
      })}
    >
      <CartToCartError
        isOpened={submitState === 'error'}
        closeFn={() => setSubmitState(undefined)}
      />
      <CartToCartSuccess
        isOpened={submitState === 'suceess'}
        closeFn={() => setSubmitState(undefined)}
      />
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 lg:w-[38px] lg:h-[38px] w-[44px] h-[44px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="Warning2"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            موراد ضروری
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            فیلد های ضروری (ستاره دار) زیر را با دقت پر نمایید.
          </p>
        </div>
      </div>
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex flex-col lg:gap-7 gap-[14px] border-b border-b-black/10">
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
        <DatePickerInput
          placeholder="* تاریخ واریز خود را انتخاب نمایید"
          label="تاریخ واریز وجه"
          error={form.formState.errors.transactionDate?.message}
          onChange={(date) =>
            form.setValue(
              'transactionDate',
              date.locale('fa').format('jYYYY/jMM/jDD'),
            )
          }
        />
      </div>
      <div className="flex items-center justify-between gap-4 lg:px-3 lg:py-4 px-[14px] py-[14px] overflow-auto scrollbar-hide">
        <Button className="bg-black lg:rounded-lg rounded-[8px] flex items-center justify-center lg:py-3 py-0 lg:px-5 px-[19px] lg:h-auto h-[40px]">
          <span className="font-normal text-white truncate block w-full text-center text-xs">
            ثبت اطلاعات
          </span>
        </Button>
        <div
          className={cn(
            'transition-all duration-500 lg:rounded-lg rounded-[8px] gap-2 flex items-center justify-center lg:px-3 lg:py-3 px-[11px] py-0 lg:h-auto h-[40px]',
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
