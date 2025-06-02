'use client';

import { SearchProvider } from '@/context/SearchContext';
import { UserAccountProvider } from '@/context/UserAccountContext';

import { ComingSoon } from '@/components/landing/modules/coming-soon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

// --------------------------------------------

export default function MainWrapper(props: Props) {
  const comingSoonIsActive = false;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  if (comingSoonIsActive) return <ComingSoon />;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserAccountProvider>
          <SearchProvider>{props.children}</SearchProvider>
        </UserAccountProvider>
      </QueryClientProvider>
    </>
  );
}
