'use client';

import 'swiper/css';

import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TopBarConfig } from '../../shared';
import SocialMedia from './molecules/SocialMedia';

import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  link: string;
  type: string;
  type_fa: string;
};

type ApiResponse = {
  data: Data[];
};

export const ContactUsMap = dynamic(
  () =>
    import('./molecules/ContactUsMap').then(({ ContactUsMap }) => ContactUsMap),
  {
    ssr: false,
  },
);

// ---------------------------------------

export function SocialMedias() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['social-media'],
    queryFn: () => generalInstance('/config/social-media'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div>
      <TopBarConfig
        subtitle="ما را در شبکه های اجتماعی دنبال کنید"
        title={{ type: 'single', text: 'شبکه های اجتماعی' }}
      />

      <div className="gap-12 grid-cols-2 xl:grid">
        {/* Social-Media (Small-Device) */}
        <div className="-ml-5 xl:ml-0 xl:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={'auto'}
            slidesOffsetAfter={22}
          >
            {status === 'pending' ? (
              <Skeleton className="w-full h-44 rounded-l-none rounded-r-xl" />
            ) : (
              data?.data.map((socialMedia, index) => (
                <SwiperSlide key={index} className="max-w-60 pb-4 select-none">
                  <SocialMedia {...socialMedia} />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>

        {/* Social-Media (Large-Device) */}
        <div className="hidden h-[23rem] grid-cols-2 gap-6 xl:grid">
          {status === 'pending' ? (
            <>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="rounded-xl" />
                ))}
            </>
          ) : (
            data?.data.map((socialMedia, index) => (
              <SocialMedia key={index} {...socialMedia} />
            ))
          )}
        </div>

        {/* Map */}
        <div className="bg-zinc-200/70 h-64 mt-6 overflow-hidden rounded-2xl xl:h-auto xl:mt-0">
          <ContactUsMap />
        </div>
      </div>
    </div>
  );
}
