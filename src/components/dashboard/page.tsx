// Forcing next.js to render this component as client side component
'use client';

// Imporitng part
import { PageComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, ReactNode } from 'react';
import Header from './header';
import MobileNav from './mobileNav';
import Loading from './ui/loading';
import Logo from './ui/logo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import {
  GETNotifications,
  GETPersonalProfile,
  GETUserPoints,
  GETWalletBalance,
} from '@/types/dashboard/api/get';
import {
  CustomerClubPointsContext,
  NotificationsContext,
  PsersonalInfoContext,
} from '@/types/dashboard/context';
import useLocalStorageState from 'use-local-storage-state';

// Creating and exporting a context for deeper components within this component to get the value of user id (uid)
export const uidContext = createContext<string>('');
export const userFetchedInfoContext = createContext<
  PsersonalInfoContext | undefined
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
  const router = useRouter();
  const pathname = usePathname();

  // Wrapping everything in QueryClientProvider so hooks below work correctly
  return (
    <QueryClientProvider client={queryClient}>
      <InnerPage router={router} pathname={pathname} className={className}>
        {children}
      </InnerPage>
    </QueryClientProvider>
  );
}

// Inner component to allow hooks after QueryClientProvider
function InnerPage({
  children,
  className,
  router,
  pathname,
}: {
  children: ReactNode;
  className?: string;
  router: ReturnType<typeof useRouter>;
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
    },
  });

  const walletBalanceFetch = useApiQuery<GETWalletBalance>({
    url: '/finance/wallet/',
    queryKey: ['walletBalance'],
    options: {
      enabled: personalDataFetch.data !== undefined,
      staleTime: Infinity,
    },
  });

  const notificationsFetch = useApiQuery<GETNotifications>({
    url: '/notification/notifications/',
    queryKey: ['notifications'],
    options: {
      enabled:
        personalDataFetch.data !== undefined &&
        walletBalanceFetch.data !== undefined,
      staleTime: 10000,
      refetchInterval: 10000,
    },
  });

  const customerClubPointsFetch = useApiQuery<GETUserPoints>({
    url: '/crm/customer-club/points/',
    queryKey: ['user-points'],
    options: {
      enabled:
        personalDataFetch.data !== undefined &&
        walletBalanceFetch.data !== undefined,
      refetchInterval: 5000,
    },
  });

  const isReservationSubPage = /^\/dashboard\/reservations\/[^/]+$/.test(
    pathname,
  );

  const isTicketPage = pathname.includes('/dashboard/tickets');
  const irregularPages = isReservationSubPage || isTicketPage;

  // Condititional rendering
  if (
    personalDataFetch.isLoading ||
    walletBalanceFetch.isLoading ||
    notificationsFetch.isLoading ||
    customerClubPointsFetch.isLoading
  ) {
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
  } else if (
    !personalDataFetch.isError &&
    !walletBalanceFetch.isError &&
    !customerClubPointsFetch.isError &&
    personalDataFetch.data &&
    walletBalanceFetch.data &&
    customerClubPointsFetch.data
  ) {
    return (
      <userFetchedInfoContext.Provider
        value={{
          data: personalDataFetch.data,
          refetch: personalDataFetch.refetch,
        }}
      >
        <userWalletBalanceContext.Provider value={walletBalanceFetch.data}>
          <notificationContext.Provider
            value={{
              data: notificationsFetch.data ? notificationsFetch.data : [],
              refetch: notificationsFetch.refetch,
            }}
          >
            <customerClubPointsContext.Provider
              value={{
                points: customerClubPointsFetch.data.points ?? 0,
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
      </userFetchedInfoContext.Provider>
    );
  } else {
    // redirecting user
    router.push('/');

    // Returning JSX
    return (
      <div className="max-w-screen-template min-h-dvh mx-auto flex items-center justify-center">
        <span className="font-medium text-center text-lg block">
          شما درحال انتقال به صفحه ورود هستید.
        </span>
      </div>
    );
  }
}
