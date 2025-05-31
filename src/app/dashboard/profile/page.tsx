// Forcing next.js to render this component as client side component
'use client';

// Importing part
import BankInfoForm from '@/components/dashboard/profile/bankInfoForm';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import PersonalInfoForm from '@/components/dashboard/profile/personalInfoForm';
import ProfileToggler from '@/components/dashboard/profile/profileToggler';
import SubscriptionType from '@/components/dashboard/profile/subscriptionType';
import { ReactNode, useState } from 'react';

// Creating and exporting Profile page as default
export default function ProfilePage(): ReactNode {
  // Defining hooks
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
        <CartBalance hasMobileView balance={112459000} />
        <SubscriptionType type='premium' />
        <PersonalInfoForm className='col-span-2' />
        <BankInfoForm className='col-span-2' />
      </div>
    </main>
  );
}
