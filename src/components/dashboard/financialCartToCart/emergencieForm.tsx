// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { EmergencieFormPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useEffect } from 'react';
import NormalInput from '../profile/normalInput';
import DatePickerInput from './datePickerInput';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Defining form schema
const formSchema = z.object({
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
});

// Defining form type
export type formType = z.infer<typeof formSchema>;

// Creating and exporting EmergencieForm component as default
export default function EmergencieForm({
  className,
  onChange,
}: EmergencieFormPropsType): JSX.Element {
  // Defining hooks
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<formType> = (data) =>
    onChange && onChange(data);

  // Returning JSX
  return (
    <form
      action="#"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden flex items-center justify-between flex-col',
        className,
      )}
    >
      <div className="flex items-center justif-start gap-3 lg:p-4 p-[14px] border-b border-b-black/10 shrink-0 w-full">
        <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
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
      <div className="lg:p-4 p-[14px] h-full w-full space-y-5 overflow-auto scrollbar-hide">
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            نام واریز کننده
          </span>
          <NormalInput
            type="text"
            className="h-[45px]"
            placeholder="نام واریز کننده فیش خود را وارد نمایید"
            error={form.formState.errors.depositorName?.message}
            {...form.register('depositorName')}
          />
        </div>
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            شماره پیگیری
          </span>
          <NormalInput
            type="text"
            className="h-[45px]"
            placeholder="شماره پیگیری خود را وارد نمایید"
            validationText="12 رقم"
            error={form.formState.errors.trackingNumber?.message}
            onChange={(e) =>
              form.setValue('trackingNumber', e.currentTarget.value)
            }
            value={form.watch('trackingNumber')}
            name={form.register('trackingNumber').name}
          />
        </div>
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            مبلغ اضافه
          </span>
          <NormalInput
            type="number"
            className="h-[45px]"
            placeholder="مبلغ مد نظر خود را وارد نمایید"
            error={form.formState.errors.extraAmount?.message}
            {...form.register('extraAmount')}
          />
        </div>
        <div>
          <DatePickerInput
            label="تاریخ واریز وجه"
            className="h-[45px]"
            placeholder="تاریخ واریز خود را انتخاب نمایید"
            error={form.formState.errors.depositDate?.message}
            onChange={(date) =>
              form.setValue('depositDate', date.format('jYYYY-jMM-jDD'))
            }
          />
          {form.formState.errors.depositDate?.message && (
            <p className="text-cs07 font-medium text-cs-red block text-right mt-2">
              {form.formState.errors.depositDate.message}
            </p>
          )}
        </div>
      </div>
      <div className="lg:p-4 p-[14px] shrink-0 w-full border-t border-t-black/10">
        <button
          data-invalid={!form.formState.isValid}
          className={cn(
            'transition-all duration-500 w-fit  h-[40px] lg:rounded-lg rounded-[10px] lg:gap-2 flex items-center justify-center lg:p-3',
            'data-[invalid=false]:bg-green-500/5 data-[invalid=false]:hover:bg-green-500/10 data-[invalid=false]:text-green-500',
            'data-[invalid=true]:bg-gray-100 data-[invalid=true]:text-black/50 data-[invalid=true]:opacity-100',
          )}
        >
          <IconsaxIcons
            name={!form.formState.isValid ? 'CloseSquare' : 'TickSquare'}
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal truncate w-full text-right text-xs text-current block">
            {form.formState.isValid
              ? 'اطلاعات فیلد ها تکمیل شده'
              : 'اطلاعات فیلد ها تکمیل نشده'}
          </span>
        </button>
      </div>
    </form>
  );
}
