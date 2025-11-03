import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/swiper-pagination.css';

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

type Props = {
  pictures: string[];
  ref: React.RefObject<SwiperType | null>;
  setActiveIndex: (index: number) => void;
};

// --------------------------------

export default function Pictures(props: Props) {
  const { pictures, ref, setActiveIndex } = props;

  return (
    <div className="full-size">
      <Swiper
        slidesPerView={1}
        modules={[Pagination]}
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
        }}
        className="swiper-pagination-dynamic-custom"
        onSwiper={(swiper) => (ref.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {pictures?.map(
          (image, index) =>
            image && (
              <SwiperSlide
                key={image + index}
                className="bg-zinc-800 select-none overflow-hidden"
              >
                <Image
                  fill
                  src={image}
                  alt="hotel-picture"
                  className="object-cover"
                />

                <div className="absolute pointer-events-none inset-0 top-2/3 bg-gradient-to-t from-[#0E0E0E]/50 to-transparent" />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
