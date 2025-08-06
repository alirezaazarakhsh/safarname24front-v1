// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { LegalBankInfoFormComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import toast from '../../ui/customSonner/toast';
import NormalInput from '../normalInput';
import Loading from '../../ui/loading';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';
import { useMediaQuery } from '@/hooks';
import { legalFormType } from '@/app/dashboard/profile/page';
import { getBankFromCard } from '@/utils/string';
import { BankInfo } from '@/types/utils';
import BankIcon from '../../ui/bankIcon';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import InputAndLabel from '../../financialCartToCart/inputAndLabel';
import CreditCardInput from '../creditCardInput';

// Creating and exporting LegalBankInfo component as default
export default function LegalBankInfo({
  className,
  form,
  loading,
}: LegalBankInfoFormComponentPropsType): ReactNode {
  // Defining hooks
  const [file, setFile] = useState<File | undefined>();
  const [useUserImage, setUseUserImage] = useState<boolean>(true);
  const [bankInfo, setBankInfo] = useState<BankInfo | null>(null);
  const userInfo = useUserInfo();
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB in bytes
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

  // Defining name and image of banks
  const creditCardVal = form.watch('creditCard') || '';

  useEffect(() => {
    const value = creditCardVal.slice(0, 6);
    const info = getBankFromCard(value);

    setBankInfo(info);
  }, [creditCardVal]);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [mobileErrorDrawerOpened, setMobileErrorDrawerOpened] =
    useState<boolean>(false);
  const [mobileSuccessDrawerOpened, setMobileSuccessDrawerOpened] =
    useState<boolean>(false);

  // Handling api fetches
  const setLegalInfoFetch = useApiMutation({
    url: '/juridical-profiles/me/',
    method: 'put',
    options: {
      onSuccess: () => {
        window.location.reload();
        if (isMobile) {
          setMobileSuccessDrawerOpened(true);
        } else {
          toast({
            title: 'تغیرات با موفقیت اعمال شد!',
            description: 'مشتری گرامی, اطلاعات پروفایل حقوقی شما ارسال شد.',
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

  // Defining a function to handle submit event
  const submitHandleFunction: SubmitHandler<legalFormType> = async (data) => {
    const formData = new FormData();

    formData.append('organization_name', data.name);
    formData.append('national_id', data.id);
    formData.append('registeration_number', data.registrationId);
    formData.append('economical_code', data.economicCode);
    formData.append('phone_number', data.tell);
    formData.append('postal_code', data.postCode || '');
    formData.append('address', data.address || '');
    formData.append('email', data.email || '');
    formData.append('status', 'accpeted');
    formData.append('reject_reason', '');
    formData.append('image', file ? file : '');

    await setLegalInfoFetch.mutateAsync(formData);
  };

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden row-span-2 col-span-1',
        className,
      )}
    >
      {isMobile && (
        <>
          <CanclationErrorDrawer
            title="تغیرات با موفقیت اعمال شد!"
            description="مشتری گرامی, اطلاعات پروفایل حقوقی شما ارسال شد."
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
          {loading ? (
            <Loading className="bg-current w-[5px] h-[5px]" />
          ) : (
            <IconsaxIcons
              name="Bank"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          )}
        </div>
        <div className="overflow-hidden w-full">
          <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
            اطلاعات بانکی شرکت
          </span>
          <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
            مشتری گرامی شماره کارت و شبا خود را پر نمایید.
          </p>
        </div>
      </div>
      <div className="px-3 py-4 grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-[16px]">
        <div
          data-loading={loading}
          className='lg:hidden flex items-center justify-start w-full gap-3 transition-all duration-500 data-[loading="false"]:opacity-100 data-[loading="true"]:opacity-50'
        >
          <div className="shrink-0 aspect-square w-[45px] h-[45px] flex items-center justify-center text-black border border-black/10 rounded-md">
            {!form.getFieldState('creditCard').invalid &&
              !form.getFieldState('shabaNumber').invalid &&
              bankInfo ? (
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
              {!form.getFieldState('creditCard').invalid &&
                !form.getFieldState('shabaNumber').invalid &&
                bankInfo
                ? bankInfo?.name
                : 'سیستم بانکی ناشناخته است!'}
            </p>
          </div>
        </div>
        <button
          {...getRootProps()}
          className="lg:hidden flex items-center justify-start w-full gap-3 group transition-all duration-500 disabled:opacity-50 disabled:pointer-events-none"
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
        <CreditCardInput
          type="number"
          isValid={!form.getFieldState('creditCard').invalid}
          validation="creditCardNumberValidation"
          placeholder="16 رقم شماره کارت را وارد نمایید"
          error={form.formState.errors.creditCard?.message}
          autoComplete="off"
          setValue={(number, sheba) => {
            form.setValue('creditCard', number);
            form.setValue('shabaNumber', sheba);
          }}
          {...form.register('creditCard')}
        />
        <div
          data-loading={loading}
          className='lg:flex hidden items-center justify-start w-full gap-3 transition-all duration-500 data-[loading="false"]:opacity-100 data-[loading="true"]:opacity-50'
        >
          <div className="shrink-0 aspect-square w-[50px] h-[50px] flex items-center justify-center text-black border border-black/10 rounded-md">
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
        <InputAndLabel
          validationType="icon"
          isValid={!form.getFieldState('shabaNumber').invalid}
          validation="shabaNumberValidation"
          placeholder="24 رقم شماره شبا کارت را وارد نمایید"
          error={form.formState.errors.shabaNumber?.message}
          autoComplete="off"
          disabled={loading}
          reset={() =>
            form.reset({
              shabaNumber: '',
            })
          }
          {...form.register('shabaNumber')}
        />
        <button
          {...getRootProps()}
          className="lg:flex hidden items-center justify-start w-full gap-3 group transition-all duration-500 disabled:opacity-50 disabled:pointer-events-none"
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
        <NormalInput
          placeholder="آدرس شرکت "
          error={form.formState.errors.address?.message}
          noErrorText
          wholeClassName="lg:col-span-2"
          disabled={loading}
          {...form.register('address')}
        />
        <NormalInput
          placeholder="کد پستی شرکت"
          error={form.formState.errors.postCode?.message}
          disabled={loading}
          noErrorText
          {...form.register('postCode')}
        />
        <div />
        <div className="lg:col-span-2">
          <button
            onClick={form.handleSubmit(submitHandleFunction, (errors) => {
              const errorsArr = Object.values(errors);

              errorsArr.forEach((item) => {
                const message = item.message;

                if (message) {
                  toast({
                    title: 'مشکلی در اعتبار سنجی رخ داد!',
                    description: message,
                    theme: 'theme',
                  });
                }
              });
            })}
            disabled={form.formState.isSubmitting || loading}
            className="bg-green-500 hover:bg-green-600 transition-all duration-500 text-white rounded-lg px-5 h-[50px] text-cs07 font-medium disabled:bg-gray-400 disabled:hover:bg-gray-400"
          >
            {form.formState.isSubmitting ? <Loading /> : 'ثبت اطلاعات'}
          </button>
        </div>
      </div>
    </div>
  );
}
