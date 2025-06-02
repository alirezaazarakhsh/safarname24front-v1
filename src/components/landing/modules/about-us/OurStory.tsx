'use client';

import { useMediaQuery } from '@/hooks';
import { TopBarConfig } from '../../shared';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
  title: string;
  image: string;
  description: string;
  items: { title: string; subtitle: string }[];
};

type ApiResponse = {
  data: Data;
};

// -----------------------------------------------

export function OurStory() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['config-statistics'],
    queryFn: () => generalInstance('/config/statistics'),
  });

  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'درباره ما' }}
        subtitle="داستان آژانس سفرنامه 24 از کجا شروع شد ؟"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:grid-flow-col-dense">
        {/* Story */}
        <div className="bg-white px-3 py-6 space-y-3 border-2 border-zinc-200 rounded-xl shadow-[0_0.5rem_1.5rem_rgb(0,0,0,0.05)] lg:rounded-2xl lg:order-2 lg:py-8 lg:space-y-3">
          {status === 'pending' ? (
            <Skeleton className="w-1/3 h-6" />
          ) : (
            <h2 className="text-zinc-800 text-base font-extrabold px-4 lg:text-xl">
              {data?.data.title}
            </h2>
          )}

          {status === 'pending' ? (
            Array(11)
              .fill(null)
              .map((_, index) => <Skeleton key={index} className="h-4" />)
          ) : (
            <p
              dir={isDesktop ? 'rtl' : 'ltr'}
              className="h-72 text-zinc-600 text-cs08/[1.5rem] text-justify font-semibold px-4 overflow-auto custom-scrollbar lg:h-[26rem]"
            >
              {data?.data.description}
            </p>
          )}
        </div>

        {/* Image | Information */}
        <div className="flex flex-col gap-8 lg:order-1">
          <div className="bg-zinc-200 h-64 overflow-hidden rounded-xl shadow-[0_0.5rem_1.5rem_rgb(0,0,0,0.05)] lg:rounded-2xl lg:h-72">
            {data?.data.image && (
              <Image
                width={400}
                height={200}
                alt="our-story"
                src={data?.data.image}
                className="full-size object-cover"
              />
            )}
          </div>

          <div className="bg-white p-4 grid gap-3 border-2 border-zinc-200 rounded-xl shadow-[0_0.5rem_1.5rem_rgb(0,0,0,0.05)] lg:rounded-2xl lg:grid-cols-2 lg:flex-1">
            {status === 'pending'
              ? Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[5.4rem]" />
                  ))
              : data?.data.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-100 h-[5.4rem] px-5 flex flex-col justify-center gap-1.5 rounded-cs-10 lg:h-auto"
                  >
                    <span className="text-zinc-800 font-extrabold">
                      {item.title}
                    </span>
                    <span className="text-zinc-600 text-cs08 font-semibold">
                      {item.subtitle}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
