// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { BankInfoFormComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Loading from '../ui/loading';
import NormalInput from './normalInput';
import { useDropzone } from 'react-dropzone';
import toast from '../ui/customSonner/toast';
import Image from 'next/image';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import { useMediaQuery } from '@/hooks';
import CanclationErrorDrawer from '../reservation/canclationErrorDrawer';
import { personalFormType } from '@/app/dashboard/profile/page';
import { BankInfo } from '@/types/utils';
import { getBankFromCard } from '@/utils/string';
import BankIcon from '../ui/bankIcon';
import InputAndLabel from '../financialCartToCart/inputAndLabel';

// Creating and exporting PersonalInfoForm component as default
export default function BankInfoForm({
  className,
  form,
}: BankInfoFormComponentPropsType): ReactNode {
  // Defining hooks
  const [file, setFile] = useState<File | undefined>();
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const [useUserImage, setUseUserImage] = useState<boolean>(true);
  const userInfo = useUserInfo();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
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

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [mobileErrorDrawerOpened, setMobileErrorDrawerOpened] =
    useState<boolean>(false);
  const [mobileSuccessDrawerOpened, setMobileSuccessDrawerOpened] =
    useState<boolean>(false);

  // Handling api fetches
  const setPersonalInfoFetch = useApiMutation({
    url: '/natural-profiles/me/',
    method: 'put',
    options: {
      onSuccess: () => {
        window.location.reload();
        if (isMobile) {
          setMobileSuccessDrawerOpened(true);
        } else {
          toast({
            title: 'تغیرات با موفقیت اعمال شد!',
            description: 'مشتری گرامی, اطلاعات پروفایل حقیقی شما ارسال شد.',
            theme: 'green',
          });
        }
      },
      onError: () => {
        if (isMobile) {
          setMobileErrorDrawerOpened(true);
        } else {
          toast({
            title: 'خطایی رخ داد!',
            description: 'در ارسال اطلاعات مشکلی پیش امد.',
            theme: 'theme',
          });
        }
      },
    },
  });

  const submitHandleFunction: SubmitHandler<personalFormType> = async (
    data,
  ) => {
    const formData = new FormData();

    formData.append('first_name', data.name);
    formData.append('last_name', data.fullName);
    formData.append('email', data.email || '');
    formData.append('national_code', data.meliCode);
    formData.append('postal_code', data.postCode || '');
    formData.append('address', data.address || '');
    formData.append('level', userInfo.level?.toString() || '0');
    formData.append('image', file ? file : '');

    await setPersonalInfoFetch.mutateAsync(formData);
  };

  // Defining name and image of banks
  const creditCardVal = form.watch('creditCard') || '';

  useEffect(() => {
    const value = creditCardVal.slice(0, 6);
    const info = getBankFromCard(value);

    setBankInfo(info);
  }, [creditCardVal]);

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] lg:overflow-hidden row-span-2 col-span-1',
        className,
      )}
    >
      {isMobile && (
        <>
          <CanclationErrorDrawer
            title="تغیرات با موفقیت اعمال شد!"
            description="مشتری گرامی, اطلاعات پروفایل حقیقی شما ارسال شد."
            closeFn={() => setMobileSuccessDrawerOpened(false)}
            isOpened={mobileSuccessDrawerOpened}
            theme="green"
          />
          <CanclationErrorDrawer
            title="خطایی رخ داد!"
            description="در ارسال اطلاعات مشکلی پیش امد."
            closeFn={() => setMobileErrorDrawerOpened(false)}
            isOpened={mobileErrorDrawerOpened}
            theme="theme"
          />
        </>
      )}
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] flex items-center justify-start border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className="shrink-0 w-[45px] h-[45px] lg:rounded-md rounded-[10px] flex items-center justify-center border border-black/10 text-black">
          <IconsaxIcons
            name="CardEdit"
            className="w-[20px] h-[20px]"
            color="currentColor"
          />
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            اطلاعات بانکی و پروفایل
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            مشتری گرامی شماره کارت و شبا خود را پر نمایید.
          </p>
        </div>
      </div>
      <div className="lg:px-3 lg:py-4 px-[14px] py-[14px] lg:grid flex flex-col-reverse grid-cols-2 lg:gap-6 gap-[20px]">
        <button
          onClick={form.handleSubmit(submitHandleFunction)}
          disabled={form.formState.isSubmitting}
          className="bg-green-500 w-full lg:text-cs07 text-[12px] hover:bg-green-600 transition-all duration-500 text-white lg:rounded-lg rounded-[8px] lg:px-5 px-3 h-[50px] lg:font-medium font-semibold disabled:bg-gray-400 disabled:hover:bg-gray-400 lg:hidden flex items-center justify-center"
        >
          {form.formState.isSubmitting ? <Loading /> : 'ثبت اطلاعات'}
        </button>
        <div className="flex flex-col lg:gap-5 gap-[16px]">
          <InputAndLabel
            validationType="icon"
            isValid={!form.getFieldState('creditCard').invalid}
            validation="creditCardNumberValidation"
            placeholder="16 رقم شماره کارت را وارد نمایید"
            error={form.formState.errors.creditCard?.message}
            autoComplete="off"
            {...form.register('creditCard')}
          />
          <InputAndLabel
            validationType="icon"
            isValid={!form.getFieldState('shabaNumber').invalid}
            validation="shabaNumberValidation"
            placeholder="24 رقم شماره شبا کارت را وارد نمایید"
            error={form.formState.errors.shabaNumber?.message}
            autoComplete="off"
            {...form.register('shabaNumber')}
          />
          <NormalInput
            placeholder="آدرس مسکونی "
            error={form.formState.errors.address?.message}
            noErrorText
            {...form.register('address')}
          />
        </div>
        <div className="flex flex-col lg:gap-6 gap-[16px]">
          <div className="flex items-center justify-start w-full gap-3">
            <div className="shrink-0 aspect-square lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] flex items-center justify-center text-black border border-black/10 rounded-md">
              {bankInfo ? (
                <BankIcon name={bankInfo.type} className="w-[30px] h-[30px]" />
              ) : (
                <IconsaxIcons name="Bank" color="currentColor" />
              )}
            </div>
            <div className="overflow-hidden w-full">
              <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                نام بانک
              </span>
              <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                {bankInfo?.name || 'سیستم بانکی ناشناخته است!'}
              </p>
            </div>
          </div>
          <button
            {...getRootProps()}
            className="flex items-center justify-start w-full gap-3 group"
          >
            <input {...getInputProps()} hidden />
            <div className="shrink-0 aspect-square lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] flex items-center justify-center text-black border border-black/10 rounded-md relative overflow-hidden">
              {acceptedFiles.length === 0 ? (
                userInfo.image && useUserImage ? (
                  <>
                    <Image
                      width={50}
                      height={50}
                      alt="عکس اپلود شده!"
                      src={userInfo.image}
                      className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] object-cover w-full h-full z-0"
                    />
                    <div
                      onClick={() => setUseUserImage(false)}
                      className="bg-black/50 w-full h-full opacity-0 transition-all duration-500 group-hover:opacity-100 z-[10] flex items-center justify-center absolute top-0 left-0"
                    >
                      <IconsaxIcons
                        name="Trash"
                        className="w-[20px] h-[20px]"
                        color="white"
                      />
                    </div>
                  </>
                ) : (
                  <IconsaxIcons
                    name="Image"
                    color="currentColor"
                    className="w-[20px] h-[20px]"
                  />
                )
              ) : (
                <>
                  <Image
                    width={50}
                    height={50}
                    alt="عکس اپلود شده!"
                    src={URL.createObjectURL(acceptedFiles[0])}
                    className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] object-cover w-full h-full z-0"
                  />
                  <div className="bg-black/50 w-full h-full opacity-0 transition-all duration-500 group-hover:opacity-100 z-[10] flex items-center justify-center absolute top-0 left-0">
                    <IconsaxIcons
                      name="Trash"
                      className="w-[20px] h-[20px]"
                      color="white"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="overflow-hidden w-full">
              <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
                آپلود عکس
              </span>
              <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
                * حداکثر حجم کمتر از 10MB باشد
              </p>
            </div>
          </button>
          <div className="lg:flex hidden items-center justify-end">
            <button
              onClick={form.handleSubmit(submitHandleFunction)}
              disabled={form.formState.isSubmitting}
              className="bg-green-500 hover:bg-green-600 transition-all duration-500 text-white rounded-lg px-5 h-[50px] text-cs07 font-medium disabled:bg-gray-400 disabled:hover:bg-gray-400"
            >
              {form.formState.isSubmitting ? <Loading /> : 'ثبت اطلاعات'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
