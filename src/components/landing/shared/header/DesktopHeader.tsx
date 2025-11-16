'use client';

import { Profile2User } from 'iconsax-react';
import { usePathname } from 'next/navigation';

import NavLinks from './NavLinks';
import DHeaderStatics from './DHeaderStatics';

import { useScrollPosition } from '@/hooks';
import UserProfile from '../auth/UserProfile';
import UserFavorites from '../auth/UserFavorites';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import { useUserAccountContext } from '@/context/UserAccountContext';

// --------------------------------

export default function DesktopHeader() {
  const pathname = usePathname();
  const { toggle } = useUserAccountContext();
  const scrollPosition = useScrollPosition();

  const desktopCondition = scrollPosition > 0 || pathname !== '/';

  const personalData = useApiQuery<GETPersonalProfile>({
    url: '/natural-profiles/',
    queryKey: ['personalProfile', 'personal', 'profile'],
    options: {
      staleTime: Infinity,
    },
  });

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
          {/* Logo | Title | Subtitle */}
          <DHeaderStatics />
          {/* -------- */}
          <NavLinks />

          {/* User-Favorites - User-Profile */}
          <div className="flex h-11 gap-2 text-cs07 text-zinc-800 xl:gap-3">
            <UserFavorites />

            {personalData.isLoading ? (
              <button className="flex-center w-16 gap-2 rounded-lg bg-zinc-200/50 xl:w-28">
                <span className="loader-dots-dark"></span>
              </button>
            ) : personalData.data?.first_name ? (
              <UserProfile
                userName={
                  personalData.isError || !personalData.data
                    ? 'خطا در دریافت اطلاغات!'
                    : `${personalData.data.first_name} ${personalData.data.last_name}`
                }
              />
            ) : (
              <button
                className="flex-center gap-2 rounded-lg bg-zinc-200/50 px-4 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80"
                onClick={() => toggle()}
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
