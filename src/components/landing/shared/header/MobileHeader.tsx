'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

import { ArrowRight } from 'iconsax-react';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  header_logo: string;
  header_title: string;
  header_sub_title: string;
};

type ApiResponse = {
  data: Data;
};

// --------------------------------

export default function MobileHeader() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['main-configs'],
    queryFn: () => generalInstance('/config/main'),
  });

  const router = useRouter();
  const pathname = usePathname();

  const logo = data?.data.header_logo;
  const title = data?.data.header_title;
  const subtitle = data?.data.header_sub_title;

  const noDisplayCondition = useMemo(() => {
    return (
      /^\/best-hotels\/.+/.test(pathname) ||
      pathname === '/about-us' ||
      pathname === '/contact-us'
    );
  }, [pathname]);

  if (noDisplayCondition) return null;

  return (
    <header className="pt-3 mx-5 flex-between items-center lg:hidden">
      {/* Logo | Titles */}
      <div className="flex items-center gap-3">
        {status === 'pending' ? (
          <Skeleton className="w-14 h-14 mt-2" />
        ) : (
          <Link
            href={'/'}
            className="w-16 h-16 flex-center overflow-hidden rounded-lg"
          >
            {logo && (
              <Image
                src={logo}
                alt="logo"
                width={100}
                height={100}
                className="w-full aspect-auto"
              />
            )}
          </Link>
        )}

        {status === 'pending' ? (
          <div className="space-y-3 mt-2">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-40 h-4" />
          </div>
        ) : (
          <div className="text-cs85 text-zinc-800 space-y-0.5">
            <h1 className="font-extrabold">{title}</h1>
            <h2 className="font-inter font-bold capitalize">{subtitle}</h2>
          </div>
        )}
      </div>

      {pathname === '/best-hotels' && (
        <button
          onClick={() => router.back()}
          className="bg-zinc-200/60 w-9 h-9 mr-auto flex-center cursor-pointer
      rounded-lg"
        >
          <ArrowRight size={20} color="#444" />
        </button>
      )}
    </header>
  );
}
