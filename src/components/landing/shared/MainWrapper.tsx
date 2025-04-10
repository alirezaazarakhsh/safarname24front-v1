'use client';

import { UserAccountProvider } from '@/context/UserAccountContext';

type Props = {
  children: React.ReactNode;
};

// --------------------------------------------

export default function MainWrapper(props: Props) {
  return (
    <>
      <UserAccountProvider>{props.children}</UserAccountProvider>
    </>
  );
}
