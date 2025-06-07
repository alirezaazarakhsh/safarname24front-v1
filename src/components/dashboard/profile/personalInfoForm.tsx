// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { PersonalInfoFormComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import NormalInput from './normalInput';
import Loading from '../ui/loading';

// Creating and exporting PersonalInfoForm component as default
export default function PersonalInfoForm({
  className,
  form,
  loading = false,
}: PersonalInfoFormComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      data-loading={loading}
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden row-span-2 col-span-1 transition-all duration-500 data-[loading="false"]:cursor-auto data-[loading="true"]:cursor-wait',
        className,
      )}
    >
      <div className='lg:px-3 lg:py-4 px-[14px] py-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full'>
        <div className='shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black'>
          {loading ? (
            <Loading className='w-[5px] h-[5px] text-current' />
          ) : (
            <IconsaxIcons
              name={'TaskSquare'}
              className={'w-[20px] h-[20px]'}
              color='currentColor'
            />
          )}
        </div>
        <div className='overflow-hidden w-full'>
          <span className='lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1'>
            اطلاعات شخصی
          </span>
          <p className='text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold'>
            مشتری گرامی اطلاعات شخصی خود را با دقت پر نمایید.
          </p>
        </div>
      </div>
      <div className='lg:px-3 lg:py-4 px-[14px] py-[14px] grid lg:grid-cols-2 lg:gap-6 gap-[15px]'>
        <NormalInput
          placeholder='نام خود را وارد نمایید'
          required
          type='text'
          error={form.formState.errors.name?.message}
          noErrorText
          disabled={loading}
          {...form.register('name')}
        />
        <NormalInput
          placeholder='کد ملی خود را وارد نمایید'
          required
          type='text'
          error={form.formState.errors.meliCode?.message}
          noErrorText
          disabled={loading}
          {...form.register('meliCode')}
        />
        <NormalInput
          placeholder='نام و نام خانوادگی خود را وارد نمایید'
          required
          type='text'
          error={form.formState.errors.fullName?.message}
          noErrorText
          disabled={loading}
          {...form.register('fullName')}
        />
        <NormalInput
          placeholder='ایمیل خود را وارد نمایید'
          type='email'
          error={form.formState.errors.email?.message}
          noErrorText
          disabled={loading}
          {...form.register('email')}
        />
        <NormalInput
          placeholder='شماره همراه خود را وارد نمایید'
          type='tell'
          required
          error={form.formState.errors.tell?.message}
          noErrorText
          disabled={loading}
          {...form.register('tell')}
        />
        <NormalInput
          placeholder='کد پستی خود را وارد نمایید'
          type='text'
          disabled={loading}
          error={form.formState.errors.postCode?.message}
          noErrorText
          {...form.register('postCode')}
        />
      </div>
    </div>
  );
}
