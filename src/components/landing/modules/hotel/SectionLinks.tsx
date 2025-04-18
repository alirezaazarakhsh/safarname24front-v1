'use client';

import { useMediaQuery } from '@/hooks';
import { useEffect, useRef } from 'react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

type Props = {
  activeSection: string;
  sectionList: Array<{ id: string; title: string }>;
};

// --------------------------------------------

export function SectionLinks(props: Props) {
  const { activeSection, sectionList } = props;

  const swiperRef = useRef<SwiperType>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ====== Handle Click-Scroll
  const scrollToWithOffset = (id: string) => {
    const element = document.getElementById(id.toString());
    if (!element) return;

    const offset = isDesktop ? 190 : 145;
    const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // ====== Auto Slide-Change
  useEffect(() => {
    if (swiperRef.current && activeSection) {
      const index = sectionList.findIndex((nav) => nav.id === activeSection);
      if (index !== -1) swiperRef.current.slideTo(index);
    }
  }, [activeSection, sectionList]);

  return (
    <div>
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
        className="h-10"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {sectionList?.map((section, index) => (
          <SwiperSlide
            key={index}
            className="max-w-fit pb-2 select-none lg:pb-0"
          >
            <div
              className={`relative h-full text-cs08 font-bold pt-1 flex-center cursor-pointer rounded-lg transition-colors duration-300 ease-in-out lg:px-4 lg:pt-0 lg:border ${activeSection === section.id ? 'text-red-500 lg:bg-cs-red/10 lg:border-cs-red' : 'text-zinc-400 lg:bg-transparent lg:border-transparent'}`}
              onClick={() => scrollToWithOffset(section.id)}
            >
              {section.title}

              {/* Small-Device Flag */}
              <div
                className={`absolute -z-10 inset-x-0 bg-cs-red h-1 rounded-t-md transition-all duration-300 ease-in-out lg:hidden ${activeSection === section.id ? '-bottom-2' : '-bottom-full'}`}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
