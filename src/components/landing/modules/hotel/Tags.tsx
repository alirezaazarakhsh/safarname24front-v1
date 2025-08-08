'use client';

import 'swiper/css';
import { TopBarConfig } from '../../shared';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  title: string;
};

type ApiResponse = {
  data: Data[];
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------------

export function Tags(props: Props) {
  const { hotelSlug } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-tags'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/tags`),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        className="lg:mb-4"
        title={{ type: 'single', text: 'برچسب های هتل' }}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-10 lg:hidden" />

          <div className="h-10 hidden grid-cols-6 gap-6 lg:grid">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto' },
            1280: {
              slidesPerView: 6,
            },
          }}
          className="hotelTags-swiper"
        >
          {data?.data.map((tag, index) => (
            <SwiperSlide
              key={index}
              className="max-w-fit select-none xl:max-w-full"
            >
              <h3 className="h-10 px-6 bg-zinc-200/50 text-zinc-800 text-cs08 font-semibold flex-center rounded-lg transition-colors duration-200 ease-in-out hover:text-zinc-100 hover:bg-[#252525]">
                {tag.title}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
