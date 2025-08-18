// Forcing next.js to render this component as client side component
'use client';

// Importing part
import BankInfoForm from '@/components/dashboard/profile/bankInfoForm';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import Description from '@/components/dashboard/profile/description';
import PersonalInfoForm from '@/components/dashboard/profile/personalInfoForm';
import ProfileToggler from '@/components/dashboard/profile/profileToggler';
import SubscriptionType from '@/components/dashboard/profile/subscriptionType';
import { ReactNode, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LegalBankInfo from '@/components/dashboard/profile/legal/legalBankInfo';
import LegalInfoForm from '@/components/dashboard/profile/legal/legalInfoForm';
import Upload from '@/components/dashboard/upload/upload';
import LegalNotes from '@/components/dashboard/profile/legal/legalNotes';
import WaitForAcceptDialog from '@/components/dashboard/profile/dialog/waitForAcceptDialog';
import PersonalAccountBannedDialog from '@/components/dashboard/profile/dialog/personalAccountBannedDialog';
import LegalAccountBannedDialog from '@/components/dashboard/profile/dialog/legalAccountBannedDialog';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETLegalProfile } from '@/types/dashboard/api/get';
import Cookies from 'js-cookie';
import {
  isShebaValid,
  verifyCardNumber,
  verifyIranianNationalId,
} from '@persian-tools/persian-tools';

// Defining form schemas
const personalFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'نام باید حداقل ۲ حرف باشد' })
    .max(32, { message: 'نام نباید بیشتر از ۳۲ حرف باشد' }),

  lastName: z
    .string()
    .min(3, { message: 'نام خانوادگی باید حداقل ۳ حرف باشد' })
    .max(32, { message: 'نام خانوادگی نباید بیشتر از ۳۲ حرف باشد' }),

  meliCode: z
    .string()
    .length(10, { message: 'کد ملی باید دقیقاً ۱۰ رقم باشد' })
    .refine((value) => verifyIranianNationalId(value), {
      message: 'کد ملی وارد شده معتبر نیست',
    }),

  tell: z.string().regex(/^09\d{9}$/, {
    message: 'شماره تلفن باید با ۰۹ شروع شده و ۱۱ رقم باشد',
  }),

  email: z
    .string()
    .max(254, { message: 'ایمیل نباید بیشتر از ۲۵۴ حرف باشد' })
    .email({ message: 'ایمیل وارد شده معتبر نیست' })
    .or(z.literal(''))
    .optional(),

  postCode: z
    .string()
    .length(10, { message: 'کد پستی باید دقیقاً ۱۰ رقم باشد' })
    .or(z.literal(''))
    .optional(),

  creditCard: z
    .string()
    .length(16, { message: 'شماره کارت باید دقیقاً ۱۶ رقم باشد' })
    .or(z.literal(''))
    .optional(),

  shabaNumber: z
    .string()
    .length(24, { message: 'شماره شبا باید دقیقاً ۲۴ رقم باشد' })
    .or(z.literal(''))
    .optional(),
  address: z
    .string()
    .min(5, { message: 'آدرس باید حداقل ۵ حرف باشد' })
    .max(256, { message: 'آدرس نباید بیشتر از ۲۵۶ حرف باشد' })
    .or(z.literal(''))
    .optional(),
});

const legalFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'نام شرکت باید حداقل ۲ حرف باشد' })
    .max(64, { message: 'نام شرکت نباید بیشتر از ۶۴ حرف باشد' }),
  id: z
    .string()
    .length(11, { message: 'شماره ثبت نباید بیشتر از ۱۶ رقم باشد' }),
  registrationId: z
    .string()
    .min(1, { message: 'شماره ثبت الزامی است' })
    .max(16, { message: 'شماره ثبت نباید بیشتر از ۱۶ رقم باشد' })
    .regex(/^\d+$/, { message: 'شماره ثبت باید فقط شامل اعداد باشد' }),

  economicCode: z
    .string()
    .min(1, { message: 'کد اقتصادی الزامی است' })
    .max(16, { message: 'کد اقتصادی نباید بیشتر از ۱۶ رقم باشد' })
    .regex(/^\d+$/, { message: 'کد اقتصادی باید فقط شامل اعداد باشد' }),

  tell: z.string().regex(/^09\d{9}$/, {
    message: 'شماره تلفن باید با ۰۹ شروع شده و ۱۱ رقم باشد',
  }),

  email: z
    .string()
    .max(254, { message: 'ایمیل نباید بیشتر از ۲۵۴ حرف باشد' })
    .email({ message: 'ایمیل وارد شده معتبر نیست' })
    .or(z.literal(''))
    .optional(),

  postCode: z
    .string()
    .length(10, { message: 'کد پستی باید دقیقاً ۱۰ رقم باشد' })
    .or(z.literal(''))
    .optional(),

  creditCard: z
    .string()
    .length(16, { message: 'شماره کارت باید دقیقاً ۱۶ رقم باشد' })
    .or(z.literal(''))
    .optional(),

  shabaNumber: z
    .string()
    .length(24, { message: 'شماره شبا باید دقیقاً ۲۴ رقم باشد' })
    .or(z.literal(''))
    .optional(),

  address: z
    .string()
    .min(5, { message: 'آدرس باید حداقل ۵ حرف باشد' })
    .max(254, { message: 'آدرس نباید بیشتر از ۲۵۴ حرف باشد' })
    .or(z.literal(''))
    .optional(),
});

// Defining formType
export type personalFormType = z.infer<typeof personalFormSchema>;
export type legalFormType = z.infer<typeof legalFormSchema>;

// Creating and exporting Profile page as default
export default function ProfilePage(): ReactNode {
  // Defining hooks
  const [file, setFile] = useState<File | undefined>();
  const userInfo = useUserInfo();
  const [legalUserImage, setLegalUserImage] = useState<string | undefined>();
  const [userImage, setUserImage] = useState<string | undefined>();
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
    reValidateMode: 'onBlur',
  });

  const legalForm = useForm<legalFormType>({
    resolver: zodResolver(legalFormSchema),
    reValidateMode: 'onBlur',
  });

  // Defining small variables
  const authCookie = Cookies.get('auth') || '';
  const savedTellNumber = `0${JSON.parse(authCookie).phoneNumber}`;
  const creditCard = userInfo.card_numbers[0];

  // Setting form values based on parsed userInfo in first fetch and passed with context
  useEffect(() => {
    personalForm.setValue('address', userInfo.address);
    personalForm.setValue('name', userInfo.first_name);
    personalForm.setValue('meliCode', userInfo.national_code);
    personalForm.setValue('lastName', userInfo.last_name);
    personalForm.setValue('email', userInfo.email);
    personalForm.setValue('postCode', userInfo.postal_code);
    personalForm.setValue('tell', savedTellNumber);
    setUserImage(userInfo.image || '');

    if (creditCard) {
      if (
        verifyCardNumber(Number(creditCard.card_number)) &&
        isShebaValid(creditCard.iban)
      ) {
        personalForm.setValue('creditCard', creditCard.card_number);
        personalForm.setValue('shabaNumber', creditCard.iban);
      }
    }
  }, [personalForm, userInfo]);

  // Fetching stuff
  const legalUserFetching = useApiQuery<GETLegalProfile>({
    url: '/juridical-profiles/',
    queryKey: ['legalUserInfo'],
    options: {
      enabled: profileState === 'legal',
      staleTime: Infinity,
    },
  });

  // Setting form values (legal profiles)
  useEffect(() => {
    if (
      legalUserFetching &&
      legalUserFetching.data &&
      !legalUserFetching.isLoading &&
      !legalUserFetching.isRefetching
    ) {
      const legalInfo = legalUserFetching.data;
      const firstCard = legalInfo.card_numbers[0];

      legalForm.setValue('name', legalInfo.organization_name);
      legalForm.setValue('id', legalInfo.national_id);
      legalForm.setValue('registrationId', legalInfo.registeration_number);
      legalForm.setValue('economicCode', legalInfo.economical_code);
      legalForm.setValue('email', legalInfo.email || '');
      legalForm.setValue('address', legalInfo.address);
      legalForm.setValue('postCode', legalInfo.postal_code);
      legalForm.setValue('tell', savedTellNumber);
      setLegalUserImage(legalInfo.image || '');
      if (firstCard) {
        if (
          verifyCardNumber(Number(firstCard.card_number)) &&
          isShebaValid(firstCard.iban)
        ) {
          legalForm.setValue('creditCard', firstCard.card_number);
          legalForm.setValue('shabaNumber', firstCard.iban);
        }
      }
    }
  }, [legalForm, legalUserFetching.isLoading, legalUserFetching.isRefetching]);

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px]">
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
      <div className="grid lg:grid-cols-4 lg:gap-5 gap-[20px]">
        {profileState === 'personal' ? (
          <ProfileToggler
            className="lg:col-span-2"
            defaultVal={profileState}
            onToggleChange={(val) => setProfileState(val)}
          />
        ) : (
          <div className="lg:col-span-2 flex flex-col items-start gap-[24px] justify-between lg:h-[458px] h-auto">
            <ProfileToggler
              className="shrink-0 w-full"
              defaultVal={profileState}
              onToggleChange={(val) => setProfileState(val)}
            />
            <LegalInfoForm
              loading={legalUserFetching.isLoading}
              form={legalForm}
              className="overflow-auto scrollbar-hide w-full h-full"
            />
          </div>
        )}
        {profileState === 'personal' ? (
          <>
            <CartBalance hasMobileView />
            <SubscriptionType />
            <PersonalInfoForm className="lg:col-span-2" form={personalForm} />
            <BankInfoForm
              className="lg:col-span-2"
              form={personalForm}
              userImage={userImage}
            />
            <Description className="lg:col-span-4" />
          </>
        ) : (
          <>
            <LegalBankInfo
              userImage={legalUserImage}
              loading={legalUserFetching.isLoading}
              className="lg:col-span-2 lg:h-[458px] h-auto overflow-auto scrollbar-hide"
              form={legalForm}
              creditCards={legalUserFetching.data?.card_numbers || []}
              refetch={legalUserFetching.refetch}
            />
            <div className="lg:col-span-4 flex lg:flex-row flex-col lg:gap-5 gap-[20px]">
              <Upload
                onChange={(file) => setFile(file)}
                className="lg:w-[50%] w-full lg:h-[400px]"
                fetchURL="/juridical-profile-documents/"
              />
              <LegalNotes className="lg:w-[50%] w-full lg:h-[400px]" />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
