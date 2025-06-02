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

// ------------------------------------------------

export function Gallery() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-banners'],
    queryFn: () => generalInstance('/config/banners?page=3'),
  });

  console.log(data?.data)

  // if (status !== 'pending' && !data?.data?.banners?.length) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="h-80 grid grid-cols-2 grid-rows-[1.4fr_1fr] gap-5 lg:h-96 lg:grid-rows-[1.8fr_1fr] lg:gap-6">
        <div className="bg-zinc-200 overflow-hidden rounded-xl">
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

        <div className="bg-zinc-200 overflow-hidden rounded-xl">
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

        <div className="bg-[#E2E6F8] text-[#4B5BCE] px-6 col-start-1 col-end-3 flex flex-col justify-center gap-3 rounded-xl">
          <span className="text-xl font-black lg:text-2xl">
            خلق تجربه ی مدرن و پایدار سفر
          </span>

          <span className="text-cs08 font-extrabold lg:text-cs09">
            با هتل هایی همچون لوکس و آرامش بخش !
          </span>
        </div>
      </div>

      <div className="h-80 bg-zinc-200 overflow-hidden rounded-xl lg:h-96">
        {data?.data.banners[2]?.image && (
          <Image
            width={400}
            height={200}
            src={data?.data.banners[2]?.image}
            alt="about-us-gallery"
            className="full-size object-cover"
          />
        )}
      </div>
    </div>
  );
}
