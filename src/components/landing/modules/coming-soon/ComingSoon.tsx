'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import { useQuery } from '@tanstack/react-query';
import { generalInstance } from '@/utils/services';

export const DynamicComingSoonCountDown = dynamic(
  () =>
    import('./ComingSoonCountDown').then(
      ({ ComingSoonCountDown }) => ComingSoonCountDown,
    ),
  { ssr: false },
);

type Data = {
  logo: string;
  title: string;
  end_date: Date;
  subtitle: string;
  background: string;
  copyright_text: string;
};

type ApiResponse = {
  data: { data: Data };
};

// --------------------------

export function ComingSoon() {
  const { data } = useQuery<ApiResponse>({
    queryKey: ['config-coming-soon'],
    queryFn: () => generalInstance('/config/coming-soon'),
  });

  return (
    <div
      dir="ltr"
      className="relative w-full min-h-dvh text-white text-center font-medium font-inter px-5 pt-12 pb-8 flex flex-col items-center justify-between"
    >
      {data?.data.data.background && (
        <Image
          fill
          priority
          alt="coming-soon"
          src={data?.data.data.background}
          className="absolute inset-0 -z-10 full-size object-cover"
        />
      )}

      <div className="grid place-items-center gap-2">
        <div className="w-28 mb-1">
          {data?.data.data.logo && (
            <Image
              alt="logo"
              width={200}
              height={200}
              src={data?.data.data.logo}
              className="full-size object-contain"
            />
          )}
        </div>

        <h1 className="text-lg font-bold uppercase tracking-[0.2rem]">
          {data?.data.data.title}
        </h1>
        <span className="text-cs08 -mt-1">{data?.data.data.subtitle}</span>
      </div>

      <DynamicComingSoonCountDown date={data?.data.data.end_date} />
      <p className="text-[clamp(0.7rem,2vw,0.8rem)]">
        {data?.data.data.copyright_text}
      </p>
    </div>
  );
}
