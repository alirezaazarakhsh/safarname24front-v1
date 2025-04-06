'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
  sectionList: Array<{ title: string; hash: string }>;
};

// --------------------------------------------

export function NavBar(props: Props) {
  const { sectionList } = props;

  const [activeSection, setActiveSection] = useState('');

  return (
    <div className="bg-white h-12 -mx-5">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={20}
        breakpoints={{
          0: { slidesOffsetBefore: 22, slidesOffsetAfter: 22 },
          1280: { slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        }}
      >
        {sectionList?.map((section, index) => (
          <SwiperSlide key={index} className="max-w-fit select-none">
            <div className="bg-red-100 flex h-full">{section.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
