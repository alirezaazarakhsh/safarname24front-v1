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
    <div className='-ml-5 lg:ml-0'>
      <TopBarConfig title='دلایل انتخاب سفرنامه 24' subtitle='چند تا موارد مهم برای اینکه باید سفرنامه اولویت باشه !' />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto' },
          1280: {
            slidesPerView: 4,
          },
        }}
        className='reasonOfSelection-swiper'
      >
        {src.map((item, index) => (
          <SwiperSlide key={index} className='max-w-72 select-none xl:max-w-full'>
            <div className='relative bg-zinc-200 h-80 group overflow-hidden rounded-2xl'>
              <Image src={item.image} alt='reason-image' width={400} height={400} className='full-size object-cover' />

              <div className='absolute bottom-4 inset-x-4 bg-white px-6 py-4 flex flex-col items-center gap-2 rounded-xl'>
                <span className='text-zinc-800 text-cs08 font-bold'>{item.title}</span>

                <p className='h-8 text-zinc-500 text-cs07 text-justify font-semibold overflow-hidden transition-all duration-700 group-hover:h-56'>
                  هتل های سفرنامه 24 یکی از مقرون به صرفه ترین هتل های ایران محسوب میشه هتل های سفرنامه 24 یکی از مقرون
                  به صرفه ترین هتل های ایران محسوب میشه هتل های سفرنامه 24 یکی از مقرون به صرفه ترین هتل های ایران محسوب
                  میشه هتل های سفرنامه 24 یکی از مقرون به صرفه ترین هتل های ایران محسوب میشه هتل های سفرنامه 24 یکی از
                  مقرون به صرفه ترین هتل های ایران محسوب میشه هتل های سفرنامه 24 یکی از مقرون به صرفه ترین هتل های ایران
                  محسوب میشه.
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
