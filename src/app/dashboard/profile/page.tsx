// Forcing next.js to render this component as client side component
'use client';

// Importing part
import BankInfoForm from '@/components/dashboard/profile/bankInfoForm';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import Description from '@/components/dashboard/profile/description';
import PersonalInfoForm from '@/components/dashboard/profile/personalInfoForm';
import ProfileToggler from '@/components/dashboard/profile/profileToggler';
import SubscriptionType from '@/components/dashboard/profile/subscriptionType';
import { ReactNode, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LegalBankInfo from '@/components/dashboard/profile/legal/legalBankInfo';
import LegalInfoForm from '@/components/dashboard/profile/legal/legalInfoForm';
import Upload from '@/components/dashboard/financialCartToCart/upload';
import LegalNotes from '@/components/dashboard/profile/legal/legalNotes';
import WaitForAcceptDialog from '@/components/dashboard/profile/dialog/waitForAcceptDialog';
import PersonalAccountBannedDialog from '@/components/dashboard/profile/dialog/personalAccountBannedDialog';
import LegalAccountBannedDialog from '@/components/dashboard/profile/dialog/legalAccountBannedDialog';

// Defining form schemas
const personalFormSchema = z.object({
  name: z.string().min(2, { message: 'نام باید حداقل ۲ حرف باشد' }),
  fullName: z
    .string()
    .min(3, { message: 'نام و نام خانوادگی باید حداقل ۳ حرف باشد' }),
  meliCode: z
    .string()
    .length(10, { message: 'کد ملی باید ۱۰ رقم و معتبر باشد' }),
  tell: z.string().regex(/^09\d{9}$/, {
    message: 'شماره تلفن باید با 09 شروع شده و ۱۱ رقم باشد',
  }),
  email: z
    .string()
    .email({ message: 'ایمیل وارد شده معتبر نیست' })
    .or(z.literal(''))
    .optional(),
  postCode: z
    .string()
    .length(10, { message: 'کد پستی باید ۱۰ رقم باشد' })
    .or(z.literal(''))
    .optional(),
  creditCard: z.string().length(15, { message: 'شماره کارت باید ۱۶ رقم باشد' }),
  shabaNumber: z
    .string()
    .length(24, { message: 'شماره شبا باید 24 رفم باشد.' }),
  address: z
    .string()
    .min(5, { message: 'کمترین مقدار ادرس 5 کارکتر میباشد' })
    .or(z.literal(''))
    .optional(),
});

const legalFormSchema = z.object({
  name: z.string().min(2, { message: 'نام باید حداقل ۲ حرف باشد' }),
  id: z
    .string()
    .length(11, { message: 'شناسه ملی باید ۱۱ رقم باشد' })
    .regex(/^[1-9][0-9]{10}$/, {
      message: 'شناسه ملی باید فقط شامل اعداد معتبر باشد',
    })
    .refine((val) => !/^(\d)\1+$/.test(val), {
      message: 'شناسه ملی معتبر نیست',
    }),
  registrationId: z
    .string()
    .min(5, { message: 'شماره ثبت باید حداقل ۵ رقم باشد' })
    .max(10, { message: 'شماره ثبت نمی‌تواند بیشتر از ۱۰ رقم باشد' })
    .regex(/^\d+$/, { message: 'شماره ثبت باید فقط شامل عدد باشد' }),
  economicCode: z
    .string()
    .length(12, { message: 'کد اقتصادی باید ۱۲ رقم باشد' })
    .regex(/^\d+$/, { message: 'کد اقتصادی باید فقط شامل عدد باشد' }),
  tell: z.string().regex(/^09\d{9}$/, {
    message: 'شماره تلفن باید با 09 شروع شده و ۱۱ رقم باشد',
  }),
  email: z
    .string()
    .email({ message: 'ایمیل وارد شده معتبر نیست' })
    .or(z.literal(''))
    .optional(),
  postCode: z.string().length(10, { message: 'کد پستی باید ۱۰ رقم باشد' }),
  creditCard: z.string().length(15, { message: 'شماره کارت باید ۱۶ رقم باشد' }),
  shabaNumber: z
    .string()
    .length(24, { message: 'شماره شبا باید 24 رفم باشد.' }),
  address: z
    .string()
    .min(5, { message: 'کمترین مقدار ادرس 5 کارکتر میباشد' })
    .or(z.literal(''))
    .optional(),
});

// Defining formType
type personalFormType = z.infer<typeof personalFormSchema>;
type legalFormType = z.infer<typeof legalFormSchema>;

// Creating and exporting Profile page as default
export default function ProfilePage(): ReactNode {
  // Defining hooks
  const [file, setFile] = useState<File | undefined>();

  const [waitingDialogOpened, setWaitingDialogOpened] =
    useState<boolean>(false);

  const [legalAccountBannedDialogOpened, setLegalAccountBannedDialogOpened] =
    useState<boolean>(false);

  const [
    personalAccountBannedDialogOpened,
    setPersonalAccountBannedDialogOpened,
  ] = useState<boolean>(false);

  const [profileState, setProfileState] = useState<'personal' | 'legal'>(
    'personal',
  );

  const personalForm = useForm<personalFormType>({
    resolver: zodResolver(personalFormSchema),
  });

  const legalForm = useForm<legalFormType>({
    resolver: zodResolver(legalFormSchema),
  });

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      <LegalAccountBannedDialog
        isOpened={legalAccountBannedDialogOpened}
        closeFn={() => setLegalAccountBannedDialogOpened(false)}
      />
      <PersonalAccountBannedDialog
        isOpened={personalAccountBannedDialogOpened}
        closeFn={() => setPersonalAccountBannedDialogOpened(false)}
      />
      <WaitForAcceptDialog
        isOpened={waitingDialogOpened}
        closeFn={() => setWaitingDialogOpened(false)}
      />
      <div className='grid grid-cols-4 gap-5'>
        {profileState === 'personal' ? (
          <ProfileToggler
            className='col-span-2'
            defaultVal={profileState}
            onToggleChange={(val) => setProfileState(val)}
          />
        ) : (
          <div className='col-span-2 flex flex-col items-start gap-[24px] justify-between h-[458px]'>
            <ProfileToggler
              className='shrink-0 w-full'
              defaultVal={profileState}
              onToggleChange={(val) => setProfileState(val)}
            />
            <LegalInfoForm
              form={legalForm}
              className='overflow-auto scrollbar-hide w-full h-full'
            />
          </div>
        )}
        {profileState === 'personal' ? (
          <>
            <CartBalance hasMobileView balance={0} />
            <SubscriptionType type='premium' />
            <PersonalInfoForm className='col-span-2' form={personalForm} />
            <BankInfoForm className='col-span-2' form={personalForm} />
            <Description className='col-span-4' />
          </>
        ) : (
          <>
            <LegalBankInfo
              className='col-span-2 h-[458px] overflow-auto scrollbar-hide'
              form={legalForm}
              documentImage={file}
            />
            <div className='col-span-4 flex gap-5'>
              <Upload onChange={(file) => setFile(file)} className='w-[50%]' />
              <LegalNotes className='w-[50%]' />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
