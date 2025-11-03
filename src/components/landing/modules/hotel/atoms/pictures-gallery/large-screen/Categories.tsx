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
    <div className="overflow-hidden">
      <Swiper
        spaceBetween={15}
        className="h-full"
        breakpoints={{
          0: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {categories?.map(
          (category, index) =>
            category.images[0] && (
              <SwiperSlide
                key={index}
                onClick={() => setCategoryIndex(index)}
                className={`max-w-full`}
              >
                <div className="flex flex-col gap-2">
                  <div
                    className={`relative h-24 bg-zinc-800 overflow-hidden border-2 rounded-xl ${
                      categoryIndex === index ? 'border-cs-red' : 'border-white'
                    }`}
                  >
                    <Image
                      fill
                      alt="hotel-view"
                      src={category.images[0]}
                      className="object-cover"
                    />
                  </div>

                  <div className="text-cs08 font-bold text-zinc-800">
                    {category.title}
                  </div>
                </div>
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
