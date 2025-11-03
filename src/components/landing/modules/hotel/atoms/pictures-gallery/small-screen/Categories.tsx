import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import { TGallery } from '@/types/landing';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  categories: TGallery;
  categoryIndex: number;
  setCategoryIndex: (index: number) => void;
};

// --------------------------------

export default function Categories(props: Props) {
  const { categories, categoryIndex, setCategoryIndex } = props;

  return (
    <div className="-mx-6 overflow-hidden">
      <Swiper
        spaceBetween={15}
        className="h-full"
        slidesPerView={'auto'}
        slidesOffsetAfter={20}
        slidesOffsetBefore={20}
      >
        {categories?.map(
          (picture, index) =>
            picture.images[0] && (
              <SwiperSlide
                key={index}
                onClick={() => setCategoryIndex(index)}
                className={`max-w-32 bg-zinc-800 overflow-hidden border-2 rounded-xl ${
                  categoryIndex === index
                    ? 'border-white'
                    : 'border-transparent'
                }`}
              >
                <Image
                  fill
                  alt="hotel-view"
                  src={picture.images[0]}
                  className="object-cover"
                />
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
