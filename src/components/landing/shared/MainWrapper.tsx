'use client';

import {
  DatePickerProvider,
  PassengersProvider,
  SearchSettingProvider,
} from '@/context';

import AuthHandler from './AuthHandler';
import { generalInstance } from '@/utils/services';
import { Suspense, useEffect, useState } from 'react';
import { SearchProvider } from '@/context/SearchContext';

import { UserAccountProvider } from '@/context/UserAccountContext';
import { ComingSoon } from '@/components/landing/modules/coming-soon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
          <SearchSettingProvider>
            <DatePickerProvider>
              <PassengersProvider>
                <SearchProvider>
                  <Suspense fallback={null}>
                    <AuthHandler />
                  </Suspense>
                  {props.children}
                </SearchProvider>
              </PassengersProvider>
            </DatePickerProvider>
          </SearchSettingProvider>
        </UserAccountProvider>
      )}
    </QueryClientProvider>
  );
}
