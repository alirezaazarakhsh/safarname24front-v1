// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Loading from '../ui/loading';
import toast from '../ui/customSonner/toast';
import { customChargeComponentPropsType } from '@/types/dashboard/component';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import CanclationErrorDrawer from '../reservation/canclationErrorDrawer';
import { useMediaQuery } from '@/hooks';
import { addCommas, removeCommas } from '@persian-tools/persian-tools';

// Defining formSchema
const formSchema = z.object({
  amount: z
    .string({
      message: 'لطفا این فیلد را پر کنید.',
    })
    .refine((val) => Number(removeCommas(val)) >= 1000000, {
      message: 'حداقل وارد کردن مبلغ سقف (1,000,000 تومان) میباشد',
    })
    .refine((val) => Number(removeCommas(val)) < 100000000, {
      message: 'حداکثر وارد کردن مبلغ به سقف (100,000,000 تومان) میباشد.',
    }),
});

type formType = z.infer<typeof formSchema>;

// Creating and exporting CustomCharge component as default
export default function CustomCharge({
  disabled,
  onSubmit,
}: customChargeComponentPropsType): ReactNode {
  // Defining hooks
  const [errorOpened, setErrorOpened] = useState<boolean>(false);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining a function to handle submit Event
  const submitEventHandler: SubmitHandler<formType> = async (data) => {
    onSubmit(Number(removeCommas(data.amount)));
  };

  // Returning JSX
  return (
    <form
      data-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onSubmit={form.handleSubmit(submitEventHandler, (error) => {
        if (isMobile) {
          setErrorOpened(true);
        } else {
          if (error.amount?.message) {
            toast({
              description: error.amount.message,
              title: 'خطایی رخ داد!',
            });
          }
        }
      })}
      action="#"
      className="bg-white lg:rounded-[10px] lg:border border-black/10 lg:p-3 p-[24px] lg:col-span-2 col-span-1 lg:flex flex-col items-start justify-around gap-6 transition-all duration-500 data-[disabled='false']:opacity-100 data-[disabled='true']:opacity-50 data-[disabled='true']:pointer-events-none data-[disabled='false']:pointer-events-auto"
    >
      <CanclationErrorDrawer
        isOpened={errorOpened}
        closeFn={() => setErrorOpened(false)}
        title="خطایی رخ داد!"
        description="مشتری گرامی حداکثر  وراد کردن مبلغ را رعایت بفرمایید."
      />
      <div className="w-full lg:mb-0 mb-4">
        <span className="text-[14px] lg:font-bold font-semibold text-black truncate block mb-2">
          تراکنش‌های با مبلغ بالا
        </span>
        <p className="text-[12px] font-semibold text-gray-500 lg:line-clamp-2">
          مشتری گرامی لازم به ذکر است که محدوده مجاز برای شارژ حساب بین ۱,۰۰۰,۰۰۰ تا ۱۰۰,۰۰۰,۰۰۰ تومان می‌باشد.
        </p>
      </div>
      <div className="w-full">
        <div className="flex items-center lg:justify-start justify-between gap-3 flex-wrap lg:mb-2 lg:w-auto w-full">
          <div className="flex items-center justify-start gap-[8px] lg:w-auto w-fit">
            <input
              className="bg-white border border-blac/10 rounded-md px-3 block w-[250px] h-[40px] placeholder:text-cs75 placeholder:font-normal text-cs75 font-normal text-black placeholder:black transition-all duration-500 opacity-80 focus:opacity-100 data-[errored='true']:bg-cs-red/10 data-[errored='true']:placeholder:text-cs-red data-[errored='true']:text-cs-red data-[errored='true']:border-cs-red"
              placeholder="مثال : 21,000,000 تومان"
              disabled={disabled}
              data-errored={form.formState.errors.amount?.message !== undefined}
              onInput={(e) => {
                const value = e.currentTarget.value;
                const removedCommas = removeCommas(value);
                const translatedValue = addCommas(removedCommas);
                e.currentTarget.value = translatedValue;
              }}
              type="text"
              inputMode="numeric"
              {...form.register('amount')}
            />
            <button
              disabled={form.getValues('amount') === undefined}
              type="button"
              onClick={() => {
                form.resetField('amount', undefined);
                onSubmit(undefined);
              }}
              className="h-[35px] w-[35px] rounded-[6px] transition-all duration-500 bg-cs-red/10 text-cs-red disabled:bg-gray-100 disabled:text-gray-300 lg:hidden flex items-center justify-center"
            >
              <IconsaxIcons
                name="Trash"
                className="w-[16px] h-[16px]"
                color="currentColor"
              />
            </button>
          </div>
          <button
            disabled={form.formState.isSubmitting || disabled}
            className="lg:h-[40px] h-[35px] lg:rounded-md rounded-[7px] lg:px-5 px-3 lg:text-cs08 text-[10px] font-medium transition-all duration-500 disabled:bg-gray-100 disabled:text-gray-300 flex items-center justify-center bg-black text-white truncate"
          >
            {form.formState.isSubmitting ? <Loading /> : 'اضافه کردن'}
          </button>
        </div>
        <button
          type="button"
          disabled={form.getValues('amount') === undefined}
          className="font-normal text-cs08 transition-all duration-500 disabled:text-black text-cs-red lg:inline-block hidden"
          onClick={() => form.resetField('amount')}
        >
          پاک کردن
        </button>
      </div>
    </form>
  );
}
