'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';

type Data = {
  order: number;
  image: string;
  link: string | null;
};

type ApiResponse = {
  data: { banners: Data[] };
};

// ------------------------------------------------

export function Gallery() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-banners'],
    queryFn: () => generalInstance('/config/banners?path=/about-us'),
  });

  if (status !== 'pending' && !data?.data?.banners?.length) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="h-80 grid grid-cols-2 grid-rows-[1.4fr_1fr] gap-5 lg:h-96 lg:gap-6">
        <div className="bg-zinc-200 overflow-hidden rounded-xl">
          {data?.data.banners[2]?.image && (
            <Image
              width={400}
              height={200}
              alt="about-us-gallery"
              src={data?.data.banners[2]?.image}
              className="full-size object-cover"
            />
          )}
        </div>

        <div className="bg-zinc-200 overflow-hidden rounded-xl">
          {data?.data.banners[1]?.image && (
            <Image
              width={400}
              height={200}
              alt="about-us-gallery"
              src={data?.data.banners[1]?.image}
              className="full-size object-cover"
            />
          )}
        </div>

        <div className="bg-zinc-200 col-start-1 col-end-3 overflow-hidden rounded-xl">
          {data?.data.banners[3]?.image && (
            <Image
              width={400}
              height={200}
              alt="about-us-gallery"
              src={data?.data.banners[3]?.image}
              className="full-size object-cover"
            />
          )}
        </div>
      </div>

      <div className="h-80 bg-zinc-200 overflow-hidden rounded-xl lg:h-96">
        {data?.data.banners[0]?.image && (
          <Image
            width={400}
            height={200}
            alt="about-us-gallery"
            src={data?.data.banners[0]?.image}
            className="full-size object-cover"
          />
        )}
      </div>
    </div>
  );
}
