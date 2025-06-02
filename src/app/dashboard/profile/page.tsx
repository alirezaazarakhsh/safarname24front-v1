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

// Defining form schema
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

// Defining formType
type personalFormType = z.infer<typeof personalFormSchema>;

// Creating and exporting Profile page as default
export default function ProfilePage(): ReactNode {
  // Defining hooks
  const personalForm = useForm<personalFormType>({
    resolver: zodResolver(personalFormSchema),
  });

  const [profileState, setProfileState] = useState<'personal' | 'legal'>(
    'personal',
  );

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      <div className='grid grid-cols-4 gap-5'>
        <ProfileToggler
          className='col-span-2'
          defaultVal={profileState}
          onToggleChange={(val) => setProfileState(val)}
        />
        {profileState === 'personal' ? (
          <>
            <CartBalance hasMobileView balance={112459000} />
            <SubscriptionType type='premium' />
            <PersonalInfoForm className='col-span-2' form={personalForm} />
            <BankInfoForm className='col-span-2' form={personalForm} />
            <Description className='col-span-4' />
          </>
        ) : (
          'k'
        )}
      </div>
    </main>
  );
}
