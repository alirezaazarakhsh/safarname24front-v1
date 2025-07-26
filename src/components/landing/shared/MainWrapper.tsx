'use client';

import { generalInstance } from '@/utils/services';
import { SearchProvider } from '@/context/SearchContext';
import { UserAccountProvider } from '@/context/UserAccountContext';
import { ComingSoon } from '@/components/landing/modules/coming-soon';

import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DatePickerProvider } from '@/context';

type ApiResponse = {
  data: { data: { is_active: boolean } };
};

type Props = {
  children: React.ReactNode;
};

// --------------------------------------------

export default function MainWrapper(props: Props) {
  const [comingSoonIsActive, setActive] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  // Fetching ComingSoon-Data for Activate
  useEffect(() => {
    async function fetchData() {
      try {
        const response: ApiResponse = await generalInstance(
          '/config/coming-soon',
        );

        setActive(response?.data.data.is_active);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {comingSoonIsActive ? (
          <ComingSoon />
        ) : (
          <UserAccountProvider>
            <DatePickerProvider>
              <SearchProvider>{props.children}</SearchProvider>
            </DatePickerProvider>
          </UserAccountProvider>
        )}
      </QueryClientProvider>
    </>
  );
}
