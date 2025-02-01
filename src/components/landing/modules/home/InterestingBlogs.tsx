'use client';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { TopBarConfig } from '../../shared';

type Props = {
  blogs: { id: number; image: string; mostVisited: boolean; title: string; desc: string; date: string }[];
};

export function InterestingBlogs(props: Props) {
  const { blogs } = props;
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className='-ml-5 lg:ml-0'>
      <TopBarConfig
        title='بلاگ های جذاب'
        subtitle='بلاگ های محبوب و جذاب سفرنامه حتما بخون!'
        seeAllHref='/'
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
        className='interestingBlogs-swiper'
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id} className='max-w-72 select-none xl:max-w-full'>
            <div className='bg-white p-2 rounded-xl'>
              {/* Image */}
              <div className='relative bg-zinc-100 h-40 overflow-hidden rounded-cs-10'>
                <Image src={blog.image} alt='hotel' width={300} height={300} className='full-size object-cover' />

                {blog.mostVisited && (
                  <div className='absolute top-2.5 right-2.5 h-7 px-2 bg-[#4B5BCE] text-zinc-100 text-cs07 font-medium flex-center rounded-md'>
                    پر بازدید !
                  </div>
                )}
              </div>

              {/* Blog-Information */}
              <div className='text-zinc-900 font-semibold p-1 mt-3 flex flex-col gap-2'>
                {/* Blog-Title */}
                <h4 className='text-cs08 font-bold truncate'>{blog.title}</h4>

                {/* Blog-Description */}
                <p className='text-zinc-500 text-cs75 text-justify font-semibold line-clamp-5 overflow-hidden'>
                  {blog.desc}
                </p>

                {/* Read-More | Date */}
                <div className='h-9 text-cs75 mt-2 flex-between items-center'>
                  <Link
                    href={''}
                    className='h-full bg-zinc-100 px-4 flex-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-[#252525] hover:text-zinc-100'
                  >
                    مطالعه بیشتر
                  </Link>

                  <span className='tracking-wider'>{blog.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
