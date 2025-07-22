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

// Defining form schemas
const personalFormSchema = z.object({
  name: z.string().min(2, { message: 'ERROR' }).max(32, { message: 'ERROR' }),
  fullName: z
    .string()
    .min(3, { message: 'ERROR' })
    .max(32, { message: 'ERROR' }),
  meliCode: z.string().length(10, { message: 'ERROR' }),
  tell: z.string().regex(/^09\d{9}$/, {
    message: 'ERROR',
  }),
  email: z
    .string()
    .max(254, { message: 'ERROR' })
    .email({ message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  postCode: z
    .string()
    .length(10, { message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  creditCard: z
    .string()
    .length(16, { message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  shabaNumber: z
    .string()
    .length(24, { message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  address: z
    .string()
    .min(5, { message: 'ERROR' })
    .max(256, { message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
});

const legalFormSchema = z.object({
  name: z.string().min(2, { message: 'ERROR' }).max(64, { message: 'ERROR' }),
  id: z
    .string()
    .length(11, { message: 'ERROR' })
    .regex(/^[1-9][0-9]{10}$/, {
      message: 'ERROR',
    })
    .refine((val) => !/^(\d)\1+$/.test(val), {
      message: 'ERROR',
    }),
  registrationId: z
    .string()
    .min(1, { message: 'ERROR' })
    .max(16, { message: 'ERROR' })
    .regex(/^\d+$/, { message: 'ERROR' }),
  economicCode: z
    .string()
    .min(1, { message: 'ERROR' })
    .max(16, { message: 'ERROR' })
    .regex(/^\d+$/, { message: 'ERROR' }),
  tell: z.string().regex(/^09\d{9}$/, {
    message: 'ERROR',
  }),
  email: z
    .string()
    .max(254, { message: 'ERROR' })
    .email({ message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  postCode: z.string().length(10, { message: 'ERROR' }),
  creditCard: z
    .string()
    .length(16, { message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  shabaNumber: z
    .string()
    .length(24, { message: 'ERROR' })
    .or(z.literal(''))
    .optional(),
  address: z
    .string()
    .min(5, { message: 'ERROR' })
    .max(254, { message: 'ERROR' })
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
  const userInfo = useUserInfo();
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

  // Setting form values based on parsed userInfo in first fetch and passed with context
  useEffect(() => {
    personalForm.setValue('address', userInfo.address);
    personalForm.setValue('name', userInfo.first_name);
    personalForm.setValue('meliCode', userInfo.national_code);
    personalForm.setValue('fullName', userInfo.last_name);
    personalForm.setValue('email', userInfo.email);
    personalForm.setValue('postCode', userInfo.postal_code);
  }, [personalForm, userInfo]);

  // Setting value of legal and personal form (phone number)
  useEffect(() => {
    const savedTelNumber = Cookies.get('UPN') ? `0${Cookies.get('UPN')}` : '';

    personalForm.setValue('tell', savedTelNumber);
    legalForm.setValue('tell', savedTelNumber);
  }, []);

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
      !legalUserFetching.isLoading
    ) {
      const legalInfo = legalUserFetching.data;

      legalForm.setValue('name', legalInfo.organization_name);
      legalForm.setValue('id', legalInfo.national_id);
      legalForm.setValue('registrationId', legalInfo.registeration_number);
      legalForm.setValue('economicCode', legalInfo.economical_code);
      legalForm.setValue('email', legalInfo.email || '');
      legalForm.setValue('address', legalInfo.address);
      legalForm.setValue('postCode', legalInfo.postal_code);
    }
  }, [legalForm, legalUserFetching.isLoading]);

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px]'>
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
      <div className='grid lg:grid-cols-4 lg:gap-5 gap-[20px]'>
        {profileState === 'personal' ? (
          <ProfileToggler
            className='lg:col-span-2'
            defaultVal={profileState}
            onToggleChange={(val) => setProfileState(val)}
          />
        ) : (
          <div className='lg:col-span-2 flex flex-col items-start gap-[24px] justify-between lg:h-[458px] h-auto'>
            <ProfileToggler
              className='shrink-0 w-full'
              defaultVal={profileState}
              onToggleChange={(val) => setProfileState(val)}
            />
            <LegalInfoForm
              loading={legalUserFetching.isLoading}
              form={legalForm}
              className='overflow-auto scrollbar-hide w-full h-full'
            />
          </div>
        )}
        {profileState === 'personal' ? (
          <>
            <CartBalance hasMobileView />
            <SubscriptionType
              type={
                userInfo.level === 0
                  ? 'guest'
                  : userInfo.level === 1
                    ? 'silver'
                    : 'premium'
              }
            />
            <PersonalInfoForm className='lg:col-span-2' form={personalForm} />
            <BankInfoForm className='lg:col-span-2' form={personalForm} />
            <Description className='lg:col-span-4' />
          </>
        ) : (
          <>
            <LegalBankInfo
              loading={legalUserFetching.isLoading}
              className='lg:col-span-2 lg:h-[458px] h-auto overflow-auto scrollbar-hide'
              form={legalForm}
            />
            <div className='lg:col-span-4 flex lg:flex-row flex-col lg:gap-5 gap-[20px]'>
              <Upload
                onChange={(file) => setFile(file)}
                className='lg:w-[50%] w-full lg:h-auto h-[350px]'
                fetchURL='/juridical-profile-documents/'
              />
              <LegalNotes className='lg:w-[50%] w-full' />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
