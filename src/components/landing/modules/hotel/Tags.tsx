'use client';

import 'swiper/css';
import { TopBarConfig } from '../../shared';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  tags: string[];
};

// -----------------------------------------------

export function Tags(props: Props) {
  const { tags } = props;

  if (!tags) return null;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        className="lg:mb-4"
        title={{ type: 'single', text: 'برچسب های هتل' }}
      />

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
        {tags?.map((tag, index) => (
          <SwiperSlide
            key={index}
            className="max-w-fit select-none xl:max-w-full"
          >
            <h3 className="h-10 px-6 bg-zinc-200/80 text-zinc-800 text-cs08 font-semibold flex-center cursor-pointer rounded-lg transition-colors duration-200 delay-100 ease-in-out hover:text-zinc-100 hover:bg-[#252525]">
              {tag}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
