'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { useRef } from 'react';
import Image from 'next/image';
import { TopBarConfig } from '../../shared';

type Props = {
  cities: {
    image: string;
    city: string;
    province: string;
    numberOfResidence: number;
  }[];
};

// -----------------------------------------------

export function MostVisitedCities(props: Props) {
  const { cities } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        subtitle="شهر های پر بازدید ایران رو از دست نده !"
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        title={{ type: 'single', text: 'شهر های پر بازدید ایران' }}
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: { slidesPerView: 6, slidesOffsetAfter: 0 },
        }}
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {cities?.map((city, index) => (
          <SwiperSlide
            key={index}
            className="max-w-44 select-none xl:max-w-full"
          >
            <div className="relative group cursor-pointer">
              {/* Image */}
              <div className="bg-zinc-200 h-48 overflow-hidden rounded-xl xl:h-52">
                {city?.image && (
                  <Image
                    src={city.image}
                    alt={city.city}
                    width={300}
                    height={300}
                    className="full-size object-cover"
                  />
                )}
              </div>

              {/* Number of residence */}
              <div className="absolute top-3.5 right-3.5 bg-zinc-100 h-6 px-3 text-zinc-800 text-cs07 font-bold pt-1 flex-center gap-1 opacity-100 rounded-md transition-all duration-200 ease-in-out md:top-0 md:opacity-0 md:group-hover:opacity-100 md:group-hover:top-3 xl:h-7 xl:text-cs75">
                <span>{city.numberOfResidence}</span>
                <span>اقامتگاه</span>
              </div>

              {/* Province | City */}
              <div className="text-cs08 mt-3.5 truncate flex items-center gap-1 xl:text-cs85">
                <span className="text-zinc-800 font-extrabold">
                  {city.province}
                </span>
                <span>,</span>
                <span className="text-zinc-600 font-semibold">{city.city}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
