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
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETLegalProfile } from '@/types/dashboard/api/get';
import Cookies from 'js-cookie';
import {
  isShebaValid,
  verifyCardNumber,
  verifyIranianNationalId,
} from '@persian-tools/persian-tools';
import useLocalStorageState from 'use-local-storage-state';
import { cn } from '@/utils/utils';

// Defining form schemas
const personalFormSchema = z.object({
  name: z.string().min(2).max(32),
  lastName: z.string().min(3).max(32),
  meliCode: z
    .string()
    .length(10)
    .refine((value) => verifyIranianNationalId(value)),
  tell: z.string().regex(/^09\d{9}$/),
  email: z.string().max(254).email().or(z.literal('')).optional(),
  postCode: z.string().length(10).or(z.literal('')).optional(),
  creditCard: z
    .string()
    .length(16)
    .refine((value) => verifyCardNumber(Number(value)))
    .or(z.literal(''))
    .optional(),
  shabaNumber: z
    .string()
    .length(24)
    .refine((value) => isShebaValid(value))
    .or(z.literal(''))
    .optional(),
  address: z.string().min(5).max(256).or(z.literal('')).optional(),
});

const legalFormSchema = z.object({
  name: z.string().min(2).max(64),
  id: z.string().length(11),
  registrationId: z.string().min(1).max(16).regex(/^\d+$/),
  economicCode: z.string().min(1).max(16).regex(/^\d+$/),
  tell: z.string().regex(/^09\d{9}$/),
  email: z.string().max(254).email().or(z.literal('')).optional(),
  postCode: z.string().length(10).or(z.literal('')).optional(),
  creditCard: z
    .string()
    .length(16)
    .refine((value) => verifyCardNumber(Number(value)))
    .or(z.literal(''))
    .optional(),
  shabaNumber: z
    .string()
    .length(24)
    .refine((value) => isShebaValid(value))
    .or(z.literal(''))
    .optional(),
  address: z.string().min(5).max(254).or(z.literal('')).optional(),
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
  const [userStatus, setUserStatus] = useState<
    | {
        status: 'checking' | 'accpeted' | 'rejected';
        rejectReason: string | null;
      }
    | undefined
  >();

  const [profileState, setProfileState] = useLocalStorageState<
    'personal' | 'legal'
  >('profilePageActiveTab', { defaultValue: 'personal' });

  const [waitingDialogOpened, setWaitingDialogOpened] =
    useState<boolean>(false);

  const personalForm = useForm<personalFormType>({
    resolver: zodResolver(personalFormSchema),
    reValidateMode: 'onChange',
  });

  const legalForm = useForm<legalFormType>({
    resolver: zodResolver(legalFormSchema),
    reValidateMode: 'onChange',
  });

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

      setUserStatus({
        rejectReason: legalInfo.reject_reason,
        status: legalInfo.status,
      });

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

  // Using useEffect to validate forms on change of mode
  useEffect(() => {
    if (profileState === 'personal') {
      personalForm.trigger();
    } else {
      if (!legalUserFetching.isLoading) {
        legalForm.trigger();
      }
    }
  }, [profileState, legalUserFetching.isLoading]);

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px]">
      <WaitForAcceptDialog
        isOpened={waitingDialogOpened}
        closeFn={() => setWaitingDialogOpened(false)}
      />
      <div
        className={cn(
          'grid lg:gap-5 gap-[20px] lg:grid-cols-4',
          profileState === 'legal'
            ? 'lg:grid-rows-[80px_1fr_auto_auto_auto]'
            : 'lg:grid-rows-[80px_auto_auto]',
        )}
      >
        <ProfileToggler
          className={'lg:col-span-2'}
          defaultVal={profileState}
          onToggleChange={setProfileState}
        />
        {profileState === 'legal' && (
          <LegalInfoForm
            loading={legalUserFetching.isLoading}
            form={legalForm}
            className="overflow-auto scrollbar-hide lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-2"
          />
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
              className="overflow-auto scrollbar-hide lg:col-span-2 lg:row-span-3 lg:col-start-3 lg:row-start-1"
              form={legalForm}
              creditCards={legalUserFetching.data?.card_numbers || []}
              refetch={legalUserFetching.refetch}
              userStatus={{
                rejectReason: legalUserFetching.data?.reject_reason || '',
                status: legalUserFetching.data?.status,
              }}
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
