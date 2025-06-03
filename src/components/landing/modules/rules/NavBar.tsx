'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { useMediaQuery } from '@/hooks';
import { useEffect, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

type Props = {
  activeSection: string;
  navList?: Array<{ id: string; tab_title: string }>;
};

// --------------------------------------------

export function NavBar(props: Props) {
  const { activeSection, navList } = props;

  const swiperRef = useRef<SwiperType>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ====== Handle Click-Scroll
  const scrollToWithOffset = (id: string) => {
    const element = document.getElementById(id.toString());
    if (!element || !navList) return;

    const offset = isDesktop ? 190 : id === navList[0]?.id ? 30 : 75;
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // ====== Auto Slide-Change
  useEffect(() => {
    if (!swiperRef.current || !navList) return;

    if (swiperRef.current && activeSection) {
      const index = navList.findIndex((nav) => nav.id === activeSection);
      if (index !== -1) swiperRef.current.slideTo(index);
    }
  }, [activeSection, navList]);

  return (
    <div className="-mx-5 lg:mx-0">
      <Swiper
        spaceBetween={20}
        slidesPerView={'auto'}
        breakpoints={{
          0: {
            spaceBetween: 20,
            slidesOffsetBefore: 20,
            slidesOffsetAfter: 20,
          },
          1024: {
            spaceBetween: 0,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="bg-white h-12 lg:h-10"
      >
        {navList?.map((nav, index) => (
          <SwiperSlide
            key={index}
            className="max-w-fit pb-2 select-none lg:pb-0"
          >
            <div
              className={`relative bg-white h-full text-cs08 font-bold pt-2 flex-center cursor-pointer rounded-lg transition-colors duration-300 ease-in-out lg:px-4 lg:pt-0 lg:border ${activeSection === nav.id ? 'text-red-500 lg:bg-cs-red/10 lg:border-cs-red' : 'text-zinc-400 lg:bg-transparent lg:border-transparent'}`}
              onClick={() => scrollToWithOffset(nav.id)}
            >
              {nav.tab_title}

              {/* Small-Device Flag */}
              <div
                className={`absolute -z-10 inset-x-0 bg-cs-red h-1 rounded-t-md transition-all duration-300 ease-in-out lg:hidden ${activeSection === nav.id ? '-bottom-2' : '-bottom-full'}`}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
