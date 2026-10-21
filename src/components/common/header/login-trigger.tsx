'use client';

import Link from 'next/link';

import { LogIn } from 'lucide-react';
import { routes } from '@/config/routes';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

// ---------------------------------

export function LoginTrigger() {
  const pathname = usePathname();

  return (
    <Button
      className={'sm:px-5'}
      nativeButton={false}
      render={
        <Link
          href={{
            pathname: routes.login,
            query: { 'last-url': pathname },
          }}
        />
      }
    >
      <LogIn />
      <span>ورود</span>
    </Button>
  );
}
