'use client';

import { Link } from 'react-scroll';
import { sectionLinks } from '@/constants';
import { useEffect, useRef, useState } from 'react';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

// -----------------------------------------------

export function SectionLinks() {
  const swiperRef = useRef<SwiperType>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  const [isAtTop, setIsAtTop] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Calculate Sticky Position
  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        rect.top <= 0 ? setIsAtTop(true) : setIsAtTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Swiper Automatic-Scroll to Active Section
  useEffect(() => {
    if (activeSection && swiperRef.current) {
      const activeIndex = sectionLinks.findIndex(
        (link) => link.id === activeSection,
      );
      if (activeIndex !== -1) swiperRef.current.slideTo(activeIndex);
    }
  }, [activeSection]);

  return (
    <div
      ref={stickyRef}
      className={`sticky top-0 z-20 bg-white h-12 -mx-5 transition-all duration-300 ease-in-out lg:shadow-none lg:top-20 lg:mx-0 ${isAtTop ? 'shadow-[0_0_1rem_rgba(0,0,0,0.1)]' : 'shadow-[0_0_1rem_rgba(0,0,0,0.03)]'}`}
    >
      <Swiper
        freeMode
        speed={800}
        modules={[FreeMode]}
        slidesPerView={'auto'}
        slidesOffsetAfter={8}
        slidesOffsetBefore={8}
        className="hotelSectionLinks-swiper"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {sectionLinks.map((sectionLink) => (
          <SwiperSlide key={sectionLink.id} className="max-w-fit select-none">
            <Link
              isDynamic
              spy={true}
              smooth={true}
              duration={1000}
              ignoreCancelEvents
              to={sectionLink.id}
              className="relative h-12 flex-center"
              onSetActive={() => setActiveSection(sectionLink.id)}
              offset={sectionLink.id === 'description' ? -130 : -80}
            >
              <div
                className={`full-size text-cs07 font-bold  px-4 cursor-pointer flex-center border-2 border-transparent rounded-lg transition-all duration-300 ease-in-out ${
                  sectionLink.id === activeSection
                    ? 'text-cs-red lg:bg-cs-red/10 lg:border-cs-red/60'
                    : 'text-zinc-400 border-transparent'
                }`}
              >
                {sectionLink.title}
              </div>

              <div
                className={`absolute inset-x-4 bg-cs-red h-[5px] rounded-t-xl transition-all duration-200 ease-in-out lg:-bottom-full ${
                  sectionLink.id === activeSection ? 'bottom-0' : '-bottom-2'
                }`}
              ></div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
