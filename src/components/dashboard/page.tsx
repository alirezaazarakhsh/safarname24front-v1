// Forcing next.js to render this component as client side component
'use client';

// Imporitng part
import { PageComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode } from 'react';
import Header from './header';
import MobileNav from './mobileNav';
import Loading from './ui/loading';
import Logo from './ui/logo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import {
  GETLegalProfile,
  GETNotifications,
  GETPersonalProfile,
  GETUserPoints,
  GETWalletBalance,
} from '@/types/dashboard/api/get';
import {
  CustomerClubPointsContext,
  LegalUserInfoContext,
  NotificationsContext,
  PsersonalInfoContext,
} from '@/types/dashboard/context';
import useLocalStorageState from 'use-local-storage-state';
import Link from 'next/link';

// Creating and exporting a context for deeper components within this component to get the value of user id (uid)
export const uidContext = createContext<string>('');
export const userFetchedInfoContext = createContext<
  PsersonalInfoContext | undefined
>(undefined);

export const legalProfileInfoContext = createContext<
  LegalUserInfoContext | undefined
>(undefined);

export const userWalletBalanceContext = createContext<
  GETWalletBalance | undefined
>(undefined);

export const notificationContext = createContext<
  NotificationsContext | undefined
>(undefined);

export const customerClubPointsContext = createContext<
  CustomerClubPointsContext | undefined
>(undefined);

// defining query client for react query
const queryClient = new QueryClient();

// Crating and exporting Page component (container like for dashboard pages) component as defualt
export default function Page({
  children,
  className,
}: PageComponentPropsType): ReactNode {
  // Defining hooks to use later
  const pathname = usePathname();

  // Wrapping everything in QueryClientProvider so hooks below work correctly
  return (
    <QueryClientProvider client={queryClient}>
      <InnerPage pathname={pathname} className={className}>
        {children}
      </InnerPage>
    </QueryClientProvider>
  );
}

// Inner component to allow hooks after QueryClientProvider
function InnerPage({
  children,
  className,
  pathname,
}: {
  children: ReactNode;
  className?: string;
  pathname: string;
}) {
  // Defining hooks
  const openedNotifications = useLocalStorageState<number[]>(
    'openedNotifications',
    {
      defaultValue: [],
    },
  );

  const personalDataFetch = useApiQuery<GETPersonalProfile>({
    url: '/natural-profiles/',
    queryKey: ['personalProfile', 'persoanl', 'profile'],
    options: {
      staleTime: Infinity,
      refetchInterval: Infinity,
    },
  });

  const walletBalanceFetch = useApiQuery<GETWalletBalance>({
    url: '/finance/wallet/',
    queryKey: ['walletBalance'],
    options: {
      staleTime: Infinity,
      refetchInterval: 10000,
    },
  });

  const notificationsFetch = useApiQuery<GETNotifications>({
    url: '/notification/notifications/',
    queryKey: ['notifications'],
    options: {
      staleTime: Infinity,
      refetchInterval: 10000,
    },
  });

  const customerClubPointsFetch = useApiQuery<GETUserPoints>({
    url: '/crm/customer-club/points/',
    queryKey: ['user-points'],
    options: {
      refetchInterval: 10000,
      staleTime: Infinity,
    },
  });

  const legalUserInfoFetching = useApiQuery<GETLegalProfile>({
    url: '/juridical-profiles/',
    queryKey: ['legalUserInfo'],
    options: {
      staleTime: Infinity,
      refetchInterval: Infinity,
    },
  });

  // Defining variables
  const isReservationSubPage = /^\/dashboard\/reservations\/[^/]+$/.test(
    pathname,
  );

  const isTicketPage = pathname.includes('/dashboard/tickets');
  const irregularPages = isReservationSubPage || isTicketPage;
  const fetchingArray = [personalDataFetch, walletBalanceFetch, notificationsFetch, customerClubPointsFetch, legalUserInfoFetching];
  const loading = fetchingArray.some(item => item.isLoading);
  const error = fetchingArray.some(item => item.isError);

  // Condititional rendering
  if (loading) {
    return (
      <>
        <div className="bg-black/10 fixed top-0 left-0 w-dvw h-dvh z-0" />
        <div className="bg-white rounded-2xl lg:size-[225px] size-[200px] aspect-square fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 p-4 flex items-center justify-center flex-col">
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
  } else if (error) {
    return (
      <div className='h-dvh w-dvw flex items-center justify-center p-5'>
        <div className='text-black'>
          <h1 className='text-center text-current font-black block truncate text-4xl mb-4'>اوپس !</h1>
          <p className='text-center font-medium text-lg mb-3 text-current/70'>مشکلی در دریافت اطلاعات شما پیش امد.</p>
          <Link href="/" className='w-fit mx-auto h-10 px-4 bg-cs-red rounded-lg text-cs75 font-semibold text-white flex items-center justify-center'>
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <userFetchedInfoContext.Provider
        value={{
          data: personalDataFetch.data!,
          refetch: personalDataFetch.refetch,
        }}
      >
        <legalProfileInfoContext.Provider
          value={{
            data: legalUserInfoFetching.data!,
            refetch: legalUserInfoFetching.refetch,
          }}
        >
          <userWalletBalanceContext.Provider
            value={{
              balance: walletBalanceFetch.data?.balance!,
            }}
          >
            <notificationContext.Provider
              value={{
                data: notificationsFetch.data ? notificationsFetch.data : [],
                refetch: notificationsFetch.refetch,
              }}
            >
              <customerClubPointsContext.Provider
                value={{
                  points: customerClubPointsFetch.data?.points ?? 0,
                  refetch: customerClubPointsFetch.refetch,
                }}
              >
                {!irregularPages && <Header />}
                {!isTicketPage && <MobileNav />}
                <div
                  className={cn(
                    'overflow-hidden',
                    isReservationSubPage
                      ? 'bg-white'
                      : irregularPages
                        ? 'w-full'
                        : '',
                    className,
                  )}
                >
                  {isReservationSubPage ? (
                    <div className="max-w-screen-template bg-white mx-auto">
                      {children}
                    </div>
                  ) : irregularPages ? (
                    children
                  ) : (
                    <div className="max-w-screen-template mx-auto">
                      {children}
                    </div>
                  )}
                </div>
              </customerClubPointsContext.Provider>
            </notificationContext.Provider>
          </userWalletBalanceContext.Provider>
        </legalProfileInfoContext.Provider>
      </userFetchedInfoContext.Provider>
    );
  }
}
