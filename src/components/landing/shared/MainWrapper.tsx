'use client';

import {
  DatePickerProvider,
  PassengersProvider,
  HotelOrCityProvider,
} from '@/context';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AuthHandler from './AuthHandler';
import { HotelQueryProvider } from '@/context';
import { generalInstance } from '@/utils/services';

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
  const [isActive, setActive] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  // === Check Activate-Status
  useEffect(() => {
    (async () => {
      try {
        const response: ApiResponse = await generalInstance(
          '/config/coming-soon',
        );
        setActive(response?.data.data.is_active);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isActive ? (
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
                </HotelQueryProvider>
              </PassengersProvider>
            </DatePickerProvider>
          </HotelOrCityProvider>
        </UserAccountProvider>
      )}
    </QueryClientProvider>
  );
}
