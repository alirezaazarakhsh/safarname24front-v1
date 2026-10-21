'use client';

import {
  DatePickerProvider,
  PassengersProvider,
  HotelOrCityProvider,
} from '@/context';

import { ToastContainer } from 'react-toastify';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthHandler from './AuthHandler';
import { HotelQueryProvider } from '@/context';
import { Toaster } from '@/components/ui/sooner';
import { generalInstance } from '@/utils/services';

import { ServerError } from './ServerError';
import { UserAccountProvider } from '@/context/UserAccountContext';
import { ComingSoon } from '@/components/landing/modules/coming-soon';

type ApiResponse = {
  data: { data: { is_active: boolean } };
};

type Props = {
  children: React.ReactNode;
};

// ------------------------------

export default function MainWrapper(props: Props) {
  const [isError, setError] = useState(false);
  const [isActive, setActive] = useState(false);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // === Check Activate-Status
  useEffect(() => {
    (async () => {
      try {
        const response: ApiResponse = await generalInstance(
          '/config/coming-soon',
        );

        setActive(response?.data?.data?.is_active || false);
      } catch (error) {
        // Log error but allow app to render normally
        console.warn('Coming soon config check failed:', error);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isError ? (
        <ServerError />
      ) : isActive ? (
        <ComingSoon />
      ) : (
        <UserAccountProvider>
          <HotelOrCityProvider>
            <DatePickerProvider>
              <PassengersProvider>
                <Suspense fallback={null}>
                  <AuthHandler />
                </Suspense>

                <HotelQueryProvider>
                  <NuqsAdapter>{props.children}</NuqsAdapter>

                  <ToastContainer newestOnTop style={{ zIndex: 99999 }} />
                </HotelQueryProvider>
              </PassengersProvider>
            </DatePickerProvider>
          </HotelOrCityProvider>
        </UserAccountProvider>
      )}
    </QueryClientProvider>
  );
}
