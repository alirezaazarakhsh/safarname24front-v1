'use client';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useRef } from 'react';
import Image from 'next/image';
import { TopBarConfig } from '../../shared';
import { ICCommentStar } from '@/components/icons';
import { HomeCustomerReview } from '@/types';


type Props = {
  reviews: HomeCustomerReview[];
};

// ------------------------------------------------

export function CustomerReviews(props: Props) {
  const { reviews } = props;
  const swiperRef = useRef<SwiperType>(null);

  function exportBasedOnImport(rate: number, type: 'color' | 'text' | 'colorText') {
    if (type === 'color') {
      return rate > 3 ? '#22c55e' : rate <= 3 && rate > 1.5 ? '#f97316' : '#ef4444';
    } else if (type === 'text') {
      return rate > 3 ? 'پیشنهاد میکنم' : rate <= 3 && rate > 1.5 ? 'قابل قبول' : 'پیشنهاد نمیکنم';
    } else return rate > 3 ? 'text-green-600' : rate <= 3 && rate > 1.5 ? 'text-orange-600' : 'text-red-600';
  }

  return (
    <div className='-ml-5 lg:ml-0'>
      <TopBarConfig
        title='نظرات مشتریان'
        subtitle='نظرات محبت آمیز مشتری های سفرنامه'
        backBtnFunc={() => swiperRef.current?.slidePrev()}
        nextBtnFunc={() => swiperRef.current?.slideNext()}
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto' },
          1280: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className='customerReviews-swiper'
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className='max-w-72 select-none xl:max-w-full'>
            <div className='bg-white p-5 rounded-xl'>
              <div className='h-12 flex gap-3'>
                {/* Image */}
                <div className='relative bg-zinc-100 w-12 overflow-hidden rounded-lg'>
                  {review.image && (
                    <Image
                      src={review.image}
                      alt='customer-avatar'
                      width={100}
                      height={100}
                      className='full-size object-cover'
                    />
                  )}
                </div>

                {/* Full-Name | Vote-Type */}
                <div className='flex flex-col justify-center gap-1'>
                  <span className='max-w-28 text-zinc-800 text-cs08 font-bold truncate'>{review.fullname}</span>
                  <span className={`text-cs75 font-semibold ${exportBasedOnImport(review.rate, 'colorText')}`}>
                    {exportBasedOnImport(review.rate, 'text')}
                  </span>
                </div>

                {/* Rating */}
                <div className='w-11 mr-auto'>
                  <CircularProgressbar
                    value={review.rate}
                    maxValue={5}
                    text={`${review.rate}`}
                    strokeWidth={9}
                    styles={buildStyles({
                      textSize: '24px',
                      textColor: `${exportBasedOnImport(review.rate, 'color')}`,
                      trailColor: '#f4f4f5',
                      pathColor: `${exportBasedOnImport(review.rate, 'color')}`,
                    })}
                    className='font-extrabold'
                  />
                </div>
              </div>

              {/* Separator */}
              <div className='bg-zinc-200 h-[1px] my-5 rounded'></div>

              {/* Description */}
              <p className='text-zinc-500 text-cs75 text-justify font-medium line-clamp-6'>{review.desc}</p>

              {/* Stars */}
              <div className='relative w-max mt-6 mb-2 mx-auto flex-center gap-1.5'>
                {/* All-Stars */}
                {[1, 2, 3, 4, 5].map((_) => (
                  <ICCommentStar key={_} className='w-5 h-5 opacity-20' />
                ))}

                {/* Rate-Stars */}
                <div className='absolute left-0 flex gap-1.5'>
                  {Array.from({ length: Math.floor(review.rate) }, (_, i) => i).map((_) => (
                    <ICCommentStar key={_} className='w-5 h-5' />
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
