// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import {
  BankInfoFormComponentPropsType,
  PersonalInfoType,
} from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useState } from 'react';
import InputAndLabel from '../financialCartToCart/inputAndLabel';
import { SubmitHandler } from 'react-hook-form';
import Loading from '../ui/loading';
import NormalInput from './normalInput';
import { banks } from '../financialCartToCart/creditCard';
import { useDropzone } from 'react-dropzone';
import toast from '../ui/customSonner/toast';
import Image from 'next/image';

// Creating and exporting PersonalInfoForm component as default
export default function BankInfoForm({
  className,
  form,
}: BankInfoFormComponentPropsType): ReactNode {
  // Defining hooks
  const [file, setFile] = useState<File | undefined>();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      maxFiles: 1,
      maxSize: 10 * 1024 * 1024, // 30MB in bytes
      onDropRejected: () => {
        toast({
          title: 'خطایی رخ داد!',
          description: 'مشتری گرامی حداکثر اپلود عکس 10MB هست.',
        });
      },
      onDropAccepted: (files) => {
        setFile(files[0]);
      },
      accept: {
        'image/*': [],
      },
    });

  // Defining a function to handle submit event
  const submitHandleFunction: SubmitHandler<PersonalInfoType> = async (
    data,
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log({ ...data, file });
  };

  // Defining variables
  const slicedCreditCardNumber = form.getValues('creditCard');
  const bankName = banks[slicedCreditCardNumber];

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
          <NormalInput
            placeholder='آدرس مسکونی '
            error={form.formState.errors.address?.message}
            noErrorText
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
                {bankName ? bankName : 'سیستم بانکی ناشناخته است!'}
              </p>
            </div>
          </div>
          <button
            {...getRootProps()}
            className='flex items-center justify-start w-full gap-3 group'
          >
            <input {...getInputProps()} hidden />
            <div className='shrink-0 aspect-square w-[50px] h-[50px] flex items-center justify-center text-black border border-black/10 rounded-md relative overflow-hidden'>
              {acceptedFiles.length === 0 ? (
                <IconsaxIcons
                  name='Image'
                  color='currentColor'
                  className='w-[20px] h-[20px]'
                />
              ) : (
                <>
                  <Image
                    width={50}
                    height={50}
                    alt='عکس اپلود شده!'
                    src={URL.createObjectURL(acceptedFiles[0])}
                    className='absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] object-cover w-full h-full z-0'
                  />
                  <div className='bg-black/50 w-full h-full opacity-0 transition-all duration-500 group-hover:opacity-100 z-[10] flex items-center justify-center absolute top-0 left-0'>
                    <IconsaxIcons
                      name='Trash'
                      className='w-[20px] h-[20px]'
                      color='white'
                    />
                  </div>
                </>
              )}
            </div>
            <div className='overflow-hidden w-full'>
              <span className='lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1'>
                آپلود عکس
              </span>
              <p className='text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold'>
                * حداکثر حجم کمتر از 10MB باشد
              </p>
            </div>
          </button>
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
