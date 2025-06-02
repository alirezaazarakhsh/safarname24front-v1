'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  order: number;
  image: string;
  link: string | null;
};

type ApiResponse = {
  data: { banners: Data[] };
};

// --------------------------

export function AdvertisingBanners() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-banners'],
    queryFn: () => generalInstance('/config/banners?page=1'),
  });

  if (status !== 'pending' && !data?.data?.banners?.length) return null;

  return (
    <div className="hidden -my-4 grid-cols-2 items-end gap-8 xl:grid">
      {status === 'pending' ? (
        <Skeleton className="h-60 rounded-2xl" />
      ) : (
        data?.data.banners[0].image && (
          <Image
            width={600}
            height={300}
            alt="graphical-hotel"
            src={data?.data.banners[0].image}
            className="full-size object-contain"
          />
        )
      )}

      {status === 'pending' ? (
        <Skeleton className="h-60 rounded-2xl" />
      ) : (
        data?.data.banners[1].image && (
          <Image
            width={600}
            height={300}
            alt="graphical-hotel"
            src={data?.data.banners[1].image}
            className="full-size object-contain"
          />
        )
      )}
    </div>
  );
}
