// Forcing next.js to render this component as client side component
'use client';

// Importing part
import ProfileToggler from '@/components/dashboard/profile/profileToggler';
import { ReactNode, useState } from 'react';

// Creating and exporting Profile page as default
export default function ProfilePage(): ReactNode {
  // Defining states of component
  const [profileState, setProfileState] = useState<'personal' | 'legal'>(
    'personal',
  );

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      <div className='grid grid-cols-4 gap-3'>
        <ProfileToggler className='col-span-2' defaultVal={profileState} />
      </div>
    </main>
  );
}
