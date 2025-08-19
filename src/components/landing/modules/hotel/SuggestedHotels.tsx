'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useRef } from 'react';
import { Hotel } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Autoplay } from 'swiper/modules';

import { Skeleton } from '@/components/ui/skeleton';
import { SuggestedHotel, TopBarConfig } from '../../shared';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';
import { Section } from './molecules/Section';

type Props = { hotelSlug: string };
type ApiResponse = { data: Array<Hotel> };

// ----------------------------

export function SuggestedHotels(props: Props) {
  const { data: initialInfo } = useQuery<any>({
    queryKey: ['hotel-information'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${props.hotelSlug}/introduction`),
  });

  const city = initialInfo?.data?.city_name;
  const swiperRef = useRef<SwiperType>(null);

  const { data, status } = useQuery<ApiResponse>({
    enabled: !!city,
    queryKey: ['suggested-hotels'],
    queryFn: () => generalInstance(`/hotel/hotels/by-city/${city}`),
  });

  const topBarConfigTitle = city
    ? `هتل های پیشنهادی شهر ${city}`
    : 'هتل های پیشنهادی';

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <Section sectionID="suggested-hotels" className="-ml-5 xl:ml-0">
      <TopBarConfig
        arraylength={data?.data.length}
        viewAllHref={`/best-hotels?city=${city}`}
        subtitle="هتل های پیشنهادی سفرنامه رو از دست نده !"
        title={{ type: 'single', text: topBarConfigTitle }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
      />

      {status === 'pending' ? (
        <>
          <Skeleton className="h-[23.5rem] xl:hidden" />
          <div className="h-[23.5rem] hidden grid-cols-4 gap-5 xl:grid">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-xl" />
              ))}
          </div>
        </>
      ) : (
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
            1280: {
              slidesPerView: 4,
              slidesOffsetAfter: 0,
            },
          }}
          speed={600}
          autoplay={
            data?.data && data?.data?.length > 4
              ? {
                  delay: 4000,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          modules={[Navigation, Autoplay]}
          className="suggestedHotels-swiper"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {data?.data?.map((hotel, index) => (
            <SwiperSlide
              key={index}
              className="max-w-72 pb-4 select-none xl:max-w-full"
            >
              <SuggestedHotel hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Section>
  );
}
