'use client';

import { SearchProvider } from '@/context/SearchContext';
import { UserAccountProvider } from '@/context/UserAccountContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: React.ReactNode;
};

// --------------------------------------------
const queryClient = new QueryClient();

export default function MainWrapper(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserAccountProvider>
        <SearchProvider>{props.children}</SearchProvider>
      </UserAccountProvider>
    </QueryClientProvider>
  );
}
