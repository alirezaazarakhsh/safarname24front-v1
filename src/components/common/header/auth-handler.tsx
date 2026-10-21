'use client';

import { Spinner } from '@/components/ui/spinner';
import { LoginTrigger } from './login-trigger';

// ------------------------------

export default function AuthHandler() {
  //   const { data: user, isPending } = useCurrentUser();

  // const user = {};
  const user = undefined;
  const isPending = false;

  return (
    <>
      {isPending ? (
        <Spinner className="" />
      ) : user ? (
        ''
      ) : (
        // <UserInfo info={user} />
        <LoginTrigger />
      )}
    </>
  );
}
