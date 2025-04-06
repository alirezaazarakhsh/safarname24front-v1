'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import { TopBarConfig } from '../../shared';

type Props = {
  src: { image: string; title: string; desc: string }[];
};

// ------------------------------------------------

export function ReasonOfSelection(props: Props) {
  const { src } = props;

  return (
    <div className="-ml-5 lg:ml-0">
      <TopBarConfig
        title={{ type: 'single', text: 'دلایل انتخاب سفرنامه 24' }}
        subtitle="چند تا موارد مهم برای اینکه باید سفرنامه اولویت باشه !"
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: {
            slidesPerView: 4,
            slidesOffsetAfter: 0,
          },
        }}
      >
        {src?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="max-w-72 select-none xl:max-w-full"
          >
            <div className="relative bg-zinc-200 h-80 overflow-hidden rounded-2xl lg:h-96">
              {item.image && (
                <Image
                  width={500}
                  height={500}
                  src={item.image}
                  alt="reason-image"
                  className="full-size object-cover"
                />
              )}

              <div className="absolute top-[12.8rem] bottom-4 inset-x-4 bg-white px-6 py-4 flex flex-col items-center gap-2 rounded-xl transition-all duration-500 ease-in-out hover:top-4">
                <span className="text-zinc-800 text-cs08 font-bold">
                  {item.title}
                </span>

                <p className="text-zinc-500 text-cs75/5 text-justify font-semibold overflow-hidden">
                  {item.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
