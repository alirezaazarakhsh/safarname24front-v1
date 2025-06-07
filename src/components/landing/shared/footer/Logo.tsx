'use client';

import Image from 'next/image';
import { Footer } from './Footer';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = {
  data: Footer;
};

// --------------------------------------

export default function Logo() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['main-configs'],
    queryFn: () => generalInstance('/config/main'),
  });

  const logo = data?.data.footer_logo;
  if (status !== 'pending' && !logo) return null;

  return (
    <div className="w-full flex-center">
      {status === 'pending' ? (
        <Skeleton className="w-24 h-20 xl:mb-3" />
      ) : (
        logo && (
          <Image
            width={200}
            height={200}
            src={logo}
            alt="safarname24-logo"
            className="w-24 object-contain aspect-auto mt-3 xl:mt-1 xl:mb-4"
          />
        )
      )}
    </div>
  );
}
