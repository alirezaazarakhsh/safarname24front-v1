'use client';

import { SearchProvider } from '@/context/SearchContext';
import { UserAccountProvider } from '@/context/UserAccountContext';

type Props = {
  children: React.ReactNode;
};

// --------------------------------------------

export default function MainWrapper(props: Props) {
  return (
    <>
      <UserAccountProvider>
        <SearchProvider>{props.children}</SearchProvider>
      </UserAccountProvider>
    </>
  );
}
