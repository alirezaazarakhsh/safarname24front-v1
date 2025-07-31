'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay, Navigation } from 'swiper/modules';

import Link from 'next/link';
import { useRef } from 'react';
import Image from 'next/image';
import { home } from '@/constants/landing';
import { TopBarConfig } from '../../shared';

// -----------------------------------------------

export function InterestingBlogs() {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className="-ml-5 -mb-4 lg:ml-0">
      <TopBarConfig
        viewAllHref="/tourism-magazine"
        title={{ type: 'single', text: 'بلاگ های جذاب' }}
        prevClickFunc={() => swiperRef.current?.slidePrev()}
        nextClickFunc={() => swiperRef.current?.slideNext()}
        subtitle="بلاگ های محبوب و جذاب سفرنامه رو حتما بخون !"
      />

      <Swiper
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 'auto', slidesOffsetAfter: 22 },
          1280: { slidesPerView: 4, slidesOffsetAfter: 0 },
        }}
        speed={500}
        autoplay={{
          delay: 4000,
          pauseOnMouseEnter: true,
        }}
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {home.interestingBLogs.map((blog) => (
          <SwiperSlide
            key={blog.id}
            className="max-w-72 pb-4 select-none xl:max-w-full"
          >
            <div className="bg-white h-full p-2.5 rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)]">
              {/* Image */}
              <div className="relative bg-zinc-100 h-44 overflow-hidden rounded-cs-10">
                {blog.image && (
                  <Image
                    width={300}
                    height={300}
                    alt="blog-post"
                    src={blog.image}
                    className="full-size object-cover"
                  />
                )}

                {blog.mostVisited && (
                  <div className="absolute top-2.5 right-2.5 h-7 px-2.5 bg-[#4B5BCE] text-zinc-100 text-cs07 font-medium flex-center rounded-md">
                    پر بازدید !
                  </div>
                )}
              </div>

              {/* Blog-Information */}
              <div className="text-zinc-900 font-semibold px-1.5 py-1 mt-3 flex flex-col gap-2">
                {/* Blog-Title */}
                <h4 className="text-cs85 font-bold truncate">{blog.title}</h4>

                {/* Blog-Description */}
                <p className="h-[4.8rem] text-zinc-500 text-cs08/5 text-justify font-medium line-clamp-4 overflow-hidden">
                  {blog.desc}
                </p>

                {/* Read-More | Date */}
                <div className="h-9 text-cs75 mt-2 flex-between items-center">
                  <Link
                    href={''}
                    className="h-full bg-zinc-100 px-4 flex-center rounded-[7px] transition-colors duration-200 ease-in-out hover:bg-[#252525] hover:text-zinc-100"
                  >
                    مطالعه بیشتر
                  </Link>

                  <span className="tracking-wider">{blog.date}</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
