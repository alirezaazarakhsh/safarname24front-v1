'use client';

import 'swiper/css';
import '@/styles/swiper.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { sectionLinks } from '@/constants';
import { useState } from 'react';

type Props = {};

// -----------------------------------------

export function SectionLinks(props: Props) {
  const {} = props;

  const [activeLink, setActiveLink] = useState('rooms');

  return (
    <div className='sticky top-0 z-20 bg-white h-12 -mx-5 shadow-[0_0_1rem_rgba(0,0,0,0.1)]'>
      <Swiper slidesPerView={'auto'} className='hotelSectionLinks-swiper'>
        {sectionLinks?.map((sectionLink) => (
          <SwiperSlide key={sectionLink.id} className='max-w-fit select-none'>
            <button className='relative h-12 px-4 flex-center' onClick={() => setActiveLink(sectionLink.id)}>
              <span
                className={`text-cs07 font-bold transition-all duration-200 ease-in-out ${
                  sectionLink.id === activeLink ? 'text-cs-red' : 'text-zinc-400'
                }`}
              >
                {sectionLink.title}
              </span>

              <div
                className={`absolute inset-x-4 bg-cs-red h-[0.35rem] rounded-t-xl transition-all duration-200 ease-in-out ${
                  sectionLink.id === activeLink ? 'bottom-0' : '-bottom-2'
                }`}
              ></div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
