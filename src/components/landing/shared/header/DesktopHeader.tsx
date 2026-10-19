'use client';

import NavLinks from './NavLinks';
import { Profile2User } from 'iconsax-react';

import { usePathname } from 'next/navigation';
import DHeaderStatics from './DHeaderStatics';
import UserProfile from '../auth/UserProfile';
import { axiosInstance } from '@/utils/axios';

import { useQuery } from '@tanstack/react-query';
import UserFavorites from '../auth/UserFavorites';

import { useCheckAuth, useScrollPosition } from '@/hooks';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import { useUserAccountContext } from '@/context/UserAccountContext';
import { useCurrentUser } from '@/hooks/use-current-user';

// --------------------------------

export default function DesktopHeader() {
  const pathname = usePathname();
  const { isAuthenticated } = useCheckAuth();

  const { toggle } = useUserAccountContext();
  const scrollPosition = useScrollPosition();

  const desktopCondition = scrollPosition > 0 || pathname !== '/';
  const { data: user, isPending } = useCurrentUser() 

  // const {
  //   status,
  //   fetchStatus,
  //   data: personalData,
  // } = useQuery<GETPersonalProfile>({
  //   enabled: isAuthenticated,
  //   queryKey: ['natural-profiles'],
  //   queryFn: () =>
  //     axiosInstance('/natural-profiles/').then((data) => data.data),
  // });

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-20 hidden h-[5rem] border-b bg-[#f8f8f8] transition-all duration-500 ease-in-out lg:block ${
          desktopCondition
            ? 'shadow-[0_0_2rem_rgba(0,0,0,0.1)]'
            : 'border-transparent'
        }`}
      ></div>

      <header className="lg:flex-center sticky top-0 z-30 mx-auto hidden h-[5rem] max-w-screen-template">
        <section className="flex-between mx-5 w-full items-center gap-4 font-bold">
          <DHeaderStatics />
          <NavLinks />

          <div className="flex h-11 gap-2 text-cs07 text-zinc-800 xl:gap-3">
            <UserFavorites />

            {/* {fetchStatus !== 'idle' && status === 'pending' ? (
              <button className="flex-center w-16 gap-2 rounded-lg bg-zinc-200/50 xl:w-28">
                <span className="loader-dots-dark"></span>
              </button>
            ) : personalData?.first_name ? (
              <UserProfile
                userName={`${personalData.first_name} ${personalData.last_name}`}
              />
            ) : (
              <button
                className="flex-center gap-2 rounded-lg bg-zinc-200/50 px-4 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80"
                onClick={() => toggle()}
              >
                <Profile2User size={19} color="#292D32" />
                <span className="hidden xl:block">حساب کاربری</span>
              </button>
            )} */}

          {user ? (
          <UserProfile
                userName={`${user.first_name} ${user.last_name}`}
              />
          ) : (
              <button
              onClick={() => toggle()}
                className="flex-center gap-2 rounded-lg bg-zinc-200/50 px-4 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80"
              >
                <Profile2User size={19} color="#292D32" />
                <span className="hidden xl:block">حساب کاربری</span>
              </button>
          )}
          </div>
        </section>
      </header>
    </>
  );
}
