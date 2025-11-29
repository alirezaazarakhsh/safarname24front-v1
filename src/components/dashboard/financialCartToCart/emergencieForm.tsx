// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { EmergencieFormPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { JSX, useEffect, useState } from 'react';
import NormalInput from '../profile/normalInput';
import DatePickerInput from './datePickerInput';
import { addCommas, removeCommas } from '@persian-tools/persian-tools';

// Creating and exporting EmergencieForm component as default
export default function EmergencieForm({
  className,
  form,
  disabled = false
}: EmergencieFormPropsType): JSX.Element {
  // Defining hooks
  const [fieldsComplete, setFieldsComplete] = useState<boolean>(false);

  // Defining variables
  const formWatch = form.watch();

  // Using useEffect to setFieldsComplete state 
  useEffect(() => {
    const arrayOfFields = [formWatch.depositorName, formWatch.depositDate, formWatch.extraAmount, formWatch.trackingNumber];
    const isValid = arrayOfFields.every(item => typeof item === "string" && item);

    setFieldsComplete(isValid);
  }, [formWatch])

  // Returning JSX
  return (
    <div
      data-disabled={disabled}
      className={cn(
        'bg-white border rounded-xl border-black/10 overflow-hidden flex items-center justify-between flex-col transition-all duration-500 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed',
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
            disabled={disabled}
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
            error={form.formState.errors.trackingNumber?.message}
            lenghtValidation={12}
            disabled={disabled}
            {...form.register("trackingNumber")}
          />
        </div>
        <div>
          <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
            مبلغ اضافه
          </span>
          <NormalInput
            className="h-[45px]"
            placeholder="مبلغ مد نظر خود را وارد نمایید"
            error={form.formState.errors.extraAmount?.message}
            disabled={disabled}
            onInput={(e) => {
              const value = e.currentTarget.value;
              const removedCommas = removeCommas(value);
              const translatedValue = addCommas(removedCommas);
              e.currentTarget.value = translatedValue;
            }}
            type="text"
            inputMode="numeric"
            {...form.register('extraAmount')}
          />
        </div>
        <div>
          <DatePickerInput
            disabled={disabled}
            label="تاریخ واریز وجه"
            className="h-[45px]"
            placeholder="تاریخ واریز خود را انتخاب نمایید"
            error={form.formState.errors.depositDate?.message}
            value={form.watch("depositDate")}
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
        <div
          data-invalid={!fieldsComplete}
          className={cn(
            'transition-all duration-500 lg:w-fit  w-full h-[40px] lg:rounded-lg rounded-[10px] gap-2 flex items-center justify-start px-3',
            'data-[invalid=false]:bg-green-500/5 data-[invalid=false]:hover:bg-green-500/10 data-[invalid=false]:text-green-500',
            'data-[invalid=true]:bg-gray-100 data-[invalid=true]:text-black/50 data-[invalid=true]:opacity-100',
          )}
        >
          <IconsaxIcons
            name={fieldsComplete ? 'CloseSquare' : 'TickSquare'}
            color="currentColor"
            className="h-[20px] w-[20px]"
          />
          <span className="font-normal truncate w-full text-right text-xs text-current block">
            {fieldsComplete
              ? 'اطلاعات فیلد ها تکمیل شده'
              : 'اطلاعات فیلد ها تکمیل نشده'}
          </span>
        </div>
      </div>
    </div>
  );
}
