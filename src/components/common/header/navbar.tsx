'use client';

import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/constants/header';

// ------------------------------

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="hidden items-center lg:flex">
      {content.navbar.map((item) => (
        <Button
          key={item.id}
          nativeButton={false}
          variant={'ghost'}
          // className={item.href === pathname ? 'bg-input/60' : 'opacity-80'}
          // variant={item.href === pathname ? 'secondary' : 'link'}
          render={
            <Link href={item.href} className="relative font-semibold!">
              <item.icon className="hidden xl:block" />

              <span>{item.label}</span>
            </Link>
          }
        />
      ))}
    </div>
  );
}
