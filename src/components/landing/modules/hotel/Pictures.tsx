'use client';

import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import DImageGallery from './molecules/DImageGallery';

type Props = {
  pictures: string[];
  gallery: { title: string; pictures: string[] }[];
};

// -----------------------------------------

export function Pictures(props: Props) {
  const { pictures, gallery } = props;

  return (
    <div>
      {/* Small-Device */}
      <div className='bg-white p-2 rounded-xl xl:hidden'>
        <div className='overflow-hidden rounded-xl'>
          <Swiper
            spaceBetween={20}
            modules={[Pagination]}
            pagination={{ dynamicBullets: true }}
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
            className='hotelPictures-swiper'
          >
            {pictures?.map((picture, index) => (
              <SwiperSlide key={index} className='select-none'>
                <div className='bg-zinc-100 h-48 overflow-hidden rounded-xl'>
                  <Image src={picture} alt='hotel-view' width={500} height={400} className='full-size object-cover' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Large-Device */}
      <div className='hidden grid-cols-[1.2fr_1fr] gap-6 xl:grid'>
        {/* Minor-Images */}
        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          {pictures.slice(1).map((picture, index) => (
            <div key={index} className='bg-zinc-200 h-40 overflow-hidden rounded-xl'>
              <Image src={picture} alt='hotel-view' width={500} height={400} className='full-size object-cover' />
            </div>
          ))}
        </div>

        {/* Main-Image */}
        <div className='relative bg-zinc-200 overflow-hidden rounded-xl'>
          <Image src={pictures[0]} alt='hotel-view' width={600} height={400} className='full-size object-cover' />

          <DImageGallery gallery={gallery} />
        </div>
      </div>
    </div>
  );
}
