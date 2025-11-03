import 'swiper/css';
import 'swiper/css/pagination';
import '@/styles/swiper-pagination.css';

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  isLoading: boolean;
  pictures: string[];
};

// --------------------------------

export default function SSPictures(props: Props) {
  const { pictures, isLoading } = props;

  return (
    <div className="h-52 xl:hidden">
      {isLoading ? (
        <Skeleton className="h-52 xl:hidden rounded-2xl" />
      ) : (
        <Swiper
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              pagination: { enabled: true },
            },
            640: {
              slidesPerView: 2,
              pagination: { enabled: false },
            },
            1024: { slidesPerView: 3 },
          }}
          className="swiper-pagination-dynamic-custom"
        >
          {pictures?.map(
            (picture, index) =>
              picture && (
                <SwiperSlide
                  key={picture + index}
                  className="bg-zinc-200 select-none rounded-2xl overflow-hidden"
                >
                  <Image
                    fill
                    src={picture}
                    alt="hotel-picture"
                    className="object-cover"
                  />
                </SwiperSlide>
              ),
          )}
        </Swiper>
      )}
    </div>
  );
}
