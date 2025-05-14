// Forcing next.js to render this component as client side component
'use client';

// Imporitng part
import useLocalStorage from '@/hooks/useLocalStorage';
import { PageComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react';
import Header from './header';
import MobileNav from './mobileNav';
import Loading from './ui/loading';
import Logo from './ui/logo';

// Creating and exporting a context for deeper components within this component to get the value of user id (uid)
export const uidContext = createContext<string>('');

// Crating and exporting Page component (container like for dashboard pages) component as defualt
export default function Page({
  children,
  className,
}: PageComponentPropsType): ReactNode {
  // Defining states of component
  const [userLoginStatus, setUserLoginStatus] = useState<{
    uid: string | undefined;
    loading: boolean;
  }>({
    uid: undefined,
    loading: true,
  });

  // Defining hooks to use later
  const uid = useLocalStorage({ value: 'uid' });
  const router = useRouter();
  const pathname = usePathname();
  const x = 's';

  // Making fake waiting to show the loading modal
  // TODO: Remove Later
  useEffect(() => {
    const interval = setInterval(
      () =>
        setUserLoginStatus({
          uid: 'FakeUIDToPass',
          loading: false,
        }),
      5000,
    );

    return () => clearInterval(interval);
  }, []);

  // Condititional rendering for conditions of :
  // loading the user id in local storage, uid exists in local storage which means user is logged in , and if user is not logged in
  if (userLoginStatus.loading) {
    return (
      <>
        <div className="bg-black/10 fixed top-0 left-0 w-dvw h-dvh z-0" />
        <div className="bg-white rounded-2xl w-[200px] aspect-square fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 p-4 flex items-center justify-center flex-col">
          <Logo onlyLogo />
          <div className="w-full mt-3 mb-6">
            <span className="font-bold text-black text-cs08 block text-center truncate mb-0">
              Agency Safarnameh 24 Hotel
            </span>
            <span className="font-bold text-gray-500 text-cs08 block text-center truncate">
              در حال بررسی
            </span>
          </div>
          <Loading className="bg-cs-red" />
        </div>
      </>
    );
  } else if (!userLoginStatus.loading && userLoginStatus.uid) {
    // else if (uid.data)
    return (
      <uidContext.Provider value={uid.data ? uid.data : 'undefined_user_id'}>
        {!pathname.startsWith('/dashboard/reservations/') && <Header />}
        <MobileNav />
        <div
          className={cn(
            'max-w-screen-template overflow-x-hidden overflow-y-auto mx-auto bg-[#F9F9F9]',
            className,
          )}
        >
          {children}
        </div>
      </uidContext.Provider>
    );
  }
  // else if (!uid.data) {
  //  // redirecting user to auth page
  //  router.push("/auth/login");
  //
  //  // Returning JSX
  //  return (
  //    <div className="max-w-screen-template min-h-dvh mx-auto flex items-center justify-center">
  //      <span className="font-medium text-center text-lg block">
  //        شما درحال انتقال به صفحه ورود هستید.
  //      </span>
  //    </div>
  //  );
  //}
}
