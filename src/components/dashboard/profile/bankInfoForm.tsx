// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import {
  BankInfoFormComponentPropsType,
  PersonalInfoType,
} from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import InputAndLabel from '../financialCartToCart/inputAndLabel';
import { SubmitHandler } from 'react-hook-form';
import Loading from '../ui/loading';

// Creating and exporting PersonalInfoForm component as default
export default function BankInfoForm({
  className,
  form,
}: BankInfoFormComponentPropsType): ReactNode {
  // Defining a function to handle submit event
  const submitHandleFunction: SubmitHandler<PersonalInfoType> = async (
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  };

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden row-span-2 col-span-1',
        className,
      )}
    >
      <div className='lg:px-3 lg:py-4 px-[14px] py-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full'>
        <div className='shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black'>
          <IconsaxIcons
            name='CardEdit'
            className='w-[20px] h-[20px]'
            color='currentColor'
          />
        </div>
        <div className='overflow-hidden w-full'>
          <span className='lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1'>
            اطلاعات بانکی و پروفایل
          </span>
          <p className='text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold'>
            مشتری گرامی شماره کارت و شبا خود را پر نمایید.
          </p>
        </div>
      </div>
      <div className='lg:px-3 lg:py-4 px-[14px] py-[14px] grid grid-cols-2 gap-6'>
        <div className='grid grid-cols-1 gap-6'>
          <InputAndLabel
            validationType='icon'
            isValid={!form.getFieldState('creditCard').invalid}
            validation='creditCardNumberValidation'
            placeholder='16 رقم شماره کارت را وارد نمایید'
            error={form.formState.errors.creditCard?.message}
            {...form.register('creditCard')}
          />
          <InputAndLabel
            validationType='icon'
            isValid={!form.getFieldState('shabaNumber').invalid}
            validation='shabaNumberValidation'
            placeholder='24 رقم شماره شبا کارت را وارد نمایید'
            error={form.formState.errors.shabaNumber?.message}
            {...form.register('shabaNumber')}
          />
          <InputAndLabel
            placeholder='آدرس مسکونی '
            error={form.formState.errors.address?.message}
            {...form.register('address')}
          />
        </div>
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-start w-full gap-3'>
            <div className='shrink-0 aspect-square w-[50px] h-[50px] flex items-center justify-center text-black border border-black/10 rounded-md'>
              <IconsaxIcons
                name='Bank'
                color='currentColor'
                className='w-[20px] h-[20px]'
              />
            </div>
            <div className='overflow-hidden w-full'>
              <span className='lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1'>
                نام بانک
              </span>
              <p className='text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold'>
                سیستم بانکی ناشناخته است!
              </p>
            </div>
          </div>
          <div className='flex items-center justify-start w-full gap-3'>
            <div className='shrink-0 aspect-square w-[50px] h-[50px] flex items-center justify-center text-black border border-black/10 rounded-md'>
              <IconsaxIcons
                name='Image'
                color='currentColor'
                className='w-[20px] h-[20px]'
              />
            </div>
            <div className='overflow-hidden w-full'>
              <span className='lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1'>
                آپلود عکس
              </span>
              <p className='text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold'>
                * حداکثر حجم کمتر از 10MB باشد
              </p>
            </div>
          </div>
          <div className='flex items-center justify-end'>
            <button
              onClick={form.handleSubmit(submitHandleFunction)}
              disabled={form.formState.isSubmitting}
              className='bg-green-500 hover:bg-green-600 transition-all duration-500 text-white rounded-lg px-5 h-[50px] text-cs07 font-medium disabled:bg-gray-400 disabled:hover:bg-gray-400'
            >
              {form.formState.isSubmitting ? <Loading /> : 'ثبت اطلاعات'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
