import 'swiper/css';
// import './swiper.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/styles/swiper-pagination.css';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

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
        pagination={{
          enabled: true,
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          enabled: true,
        }}
        modules={[Pagination, Navigation]}
        className="swiper-pagination-dynamic-custom DHotelGallery-swiper"
        onSwiper={(swiper) => (ref.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {pictures?.map(
          (image, index) =>
            image && (
              <SwiperSlide
                key={image + index}
                className="select-none overflow-hidden bg-zinc-100"
              >
                <Image
                  fill
                  src={image}
                  alt="hotel-picture"
                  className="object-cover"
                />

                <div className="pointer-events-none absolute inset-0 top-2/3 bg-gradient-to-t from-[#0E0E0E]/50 to-transparent" />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
