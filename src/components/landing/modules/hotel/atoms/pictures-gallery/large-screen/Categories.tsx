import 'swiper/css';

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
                className={`max-w-full`}
                onClick={() => setCategoryIndex(index)}
              >
                <div className="flex flex-col gap-2">
                  <div className="relative h-24 overflow-hidden rounded-xl">
                    <Image
                      fill
                      alt="hotel-view"
                      src={category.images[0]}
                      className="object-cover"
                    />

                    <div
                      data-active={categoryIndex === index}
                      className="absolute -inset-1 rounded-xl border-4 border-cs-red transition-all duration-200 data-[active=true]:inset-0"
                    />
                  </div>

                  <span className="text-cs08 font-bold text-zinc-800">
                    {category.title}
                  </span>
                </div>
              </SwiperSlide>
            ),
        )}
      </Swiper>
    </div>
  );
}
