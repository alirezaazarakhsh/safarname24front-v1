// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { LegalInfoFormComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import NormalInput from '../normalInput';
import Loading from '../../ui/loading';

// Creating and exporting LegalInfoForm component as default
export default function LegalInfoForm({
  className,
  form,
  loading,
}: LegalInfoFormComponentPropsType): ReactNode {
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
          {loading ? (
            <Loading className='bg-current w-[5px] h-[5px]' />
          ) : (
            <IconsaxIcons
              name='TaskSquare'
              className='w-[20px] h-[20px]'
              color='currentColor'
            />
          )}
        </div>
        <div className='overflow-hidden w-full'>
          <span className='lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1'>
            اطلاعات شرکت
          </span>
          <p className='text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold'>
            مشتری گرامی اطلاعات شخصی خود را با دقت پر نمایید.
          </p>
        </div>
      </div>
      <div className='lg:px-3 lg:py-4 px-[14px] py-[14px] grid lg:grid-cols-2 lg:gap-6 gap-[16px]'>
        <NormalInput
          placeholder='نام شرکت خود را وارد نمایید'
          required
          type='text'
          error={form.formState.errors.name?.message}
          noErrorText
          disabled={loading}
          {...form.register('name')}
        />
        <NormalInput
          placeholder='شناسنامه ملی شرکت'
          required
          type='text'
          error={form.formState.errors.id?.message}
          noErrorText
          disabled={loading}
          {...form.register('id')}
        />
        <NormalInput
          placeholder='شماره ثبت شرکت خود را وارد نمایید'
          required
          type='text'
          error={form.formState.errors.registrationId?.message}
          noErrorText
          disabled={loading}
          {...form.register('registrationId')}
        />
        <NormalInput
          placeholder='کد اقتصادی شرکت'
          type='text'
          error={form.formState.errors.economicCode?.message}
          noErrorText
          required
          disabled={loading}
          {...form.register('economicCode')}
        />
        <NormalInput
          placeholder='شماره شرکت خود را وارد نمایید'
          type='tell'
          required
          error={form.formState.errors.tell?.message}
          noErrorText
          disabled={loading}
          {...form.register('tell')}
        />
        <NormalInput
          placeholder='ایمیل شرکت خود را وارد نمایید'
          type='email'
          error={form.formState.errors.email?.message}
          noErrorText
          disabled={loading}
          {...form.register('email')}
        />
      </div>
    </div>
  );
}
