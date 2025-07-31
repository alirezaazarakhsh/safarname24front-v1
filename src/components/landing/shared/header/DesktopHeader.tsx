'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Profile2User } from 'iconsax-react';
import { usePathname } from 'next/navigation';

import NavLinks from './NavLinks';
import DHeaderStatics from './DHeaderStatics';

import { useScrollPosition } from '@/hooks';
import UserProfile from '../auth/UserProfile';
import UserFavorites from '../auth/UserFavorites';
import { useUserAccountContext } from '@/context/UserAccountContext';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import toast from '@/components/dashboard/ui/customSonner/toast';

// --------------------------------

export default function DesktopHeader() {
  const pathname = usePathname();
  const { toggle } = useUserAccountContext();
  const scrollPosition = useScrollPosition();

  const desktopCondition = scrollPosition > 0 || pathname !== '/';
  const [userIsLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const cookie = Cookies.get('AUTH');
    setUserLoggedIn(!!cookie);
  }, []);

  const personalDataFetch = useApiQuery<GETPersonalProfile>({
    url: '/natural-profiles/',
    queryKey: ['personalProfile', 'persoanl', 'profile'],
    options: {
      staleTime: Infinity,
    },
  });

  // Using useEffect to handle errors of personal data fetching
  useEffect(() => {
    toast({
      title: 'مشکلی رخ داد!',
      description: 'در دریافت اطلاعات مشکلی پیش امد.',
      theme: 'theme',
    });
  }, [personalDataFetch.isError]);

  return (
    <>
      <div
        className={`fixed top-0 inset-x-0 z-20 bg-[#f8f8f8] h-[5rem] hidden border-b transition-all duration-500 ease-in-out lg:block ${
          desktopCondition
            ? 'shadow-[0_0_2rem_rgba(0,0,0,0.1)]'
            : 'border-transparent'
        }`}
      ></div>

      <header className="sticky top-0 z-30 max-w-screen-template h-[5rem] mx-auto hidden lg:flex-center">
        <section className="w-full font-bold mx-5 flex-between items-center gap-4">
          {/* Logo | Title | Subtitle */}
          <DHeaderStatics />
          {/* -------- */}
          <NavLinks />

          {/* User-Favorites - User-Profile */}
          <div className="h-11 text-zinc-800 text-cs07 flex gap-2 xl:gap-3">
            <UserFavorites />
            {personalDataFetch.isLoading ? (
              <button className="bg-zinc-200/50 w-16 flex-center gap-2 rounded-lg xl:w-28">
                <span className="loader-dots-dark"></span>
              </button>
            ) : userIsLoggedIn ? (
              <UserProfile
                userName={
                  personalDataFetch.isError || !personalDataFetch.data
                    ? 'خطا در دریافت اطلاغات!'
                    : `${personalDataFetch.data.first_name} ${personalDataFetch.data.last_name}`
                }
              />
            ) : (
              <button
                className="bg-zinc-200/50 px-4 flex-center gap-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-zinc-200/80"
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
