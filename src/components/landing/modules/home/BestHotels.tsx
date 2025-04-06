'use client';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { TopBarConfig } from '../../shared';

type Props = {
  hotels: string[];
};

// -----------------------------------------------

export function BestHotels(props: Props) {
  const { hotels } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        viewAllHref="/best-hotels"
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        title={{ type: 'single', text: 'هتل های برتر ایران' }}
        subtitle="گروه هتداری بزرگ ایران که به ما اعتماد کرده اند"
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: { slidesPerView: 6, slidesOffsetAfter: 0 },
        }}
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="bestHotels-swiper h-32 lg:h-36"
      >
        {hotels.map((hotel, index) => (
          <SwiperSlide
            key={index}
            className="max-w-40 select-none xl:max-w-full"
          >
            <Link
              href={'/'}
              className="relative bg-white h-28 p-4 group flex-center rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] xl:h-32 xl:p-6"
            >
              {hotel && (
                <Image
                  src={hotel}
                  alt={'hotel-logo'}
                  width={200}
                  height={200}
                  className="full-size object-contain"
                />
              )}

              <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 bg-cs-red w-20 h-10 rounded-xl transition-all duration-200 ease-in-out delay-100 group-hover:-bottom-2"></div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
