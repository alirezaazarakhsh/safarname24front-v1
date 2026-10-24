'use client';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import type { LucideIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ShieldCheck, Zap, Hotel, Headset } from 'lucide-react';

type Feature = {
  title: string;
  icon: LucideIcon;
  description: string;
};

const HOTEL_FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: 'تضمین بهترین قیمت',
    description:
      'رزرو اقامتگاه با مناسب‌ترین نرخ بازار؛ تضمین می‌کنیم ارزان‌تر از همه جا رزرو کنید.',
  },
  {
    icon: Zap,
    title: 'تأیید فوری، بدون معطلی',
    description:
      'بدون نیاز به تماس یا انتظار برای تأیید هتل؛ اتاق خود را در چند ثانیه نهایی تحویل بگیرید.',
  },
  {
    icon: Hotel,
    title: 'بزرگ‌ترین شبکه اقامتی',
    description:
      'دسترسی به بیش از ۲,۰۰۰ هتل لوکس، اقتصادی و سنتی در سراسر ایران با ارزیابی واقعی مسافران.',
  },
  {
    icon: Headset,
    title: 'همسفر شما تا پایان سفر',
    description:
      'تیم پشتیبانی اختصاصی ما در ۲۴ ساعت شبانه‌روز و ۷ روز هفته، قبل و حین اقامت همراه شماست.',
  },
];

// ------------------------------

export function Features() {
  return (
    <section className="-mx-4 xl:mx-0">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 'auto',
            slidesOffsetAfter: 20,
            slidesOffsetBefore: 20,
          },
          640: { slidesPerView: 'auto' },
          1280: {
            slidesPerView: 4,
            slidesOffsetAfter: 0,
            slidesOffsetBefore: 0,
          },
        }}

        spaceBetween={24}
        modules={[Pagination]}
        className="swiper-pagination-custom"
        pagination={{ clickable: true, dynamicBullets: true }}
      >
        {HOTEL_FEATURES.map((service, index) => (
          <SwiperSlide
            key={index}
            className="h-auto! max-w-80 select-none xl:max-w-full"
          >
            <div className="bg-card h-full rounded-2xl border p-5">
              <service.icon className="size-13 rounded-xl bg-red-500/10 p-3 text-red-500" />

              <span className="text-09 mt-5 mb-2 inline-block font-bold">
                {service.title}
              </span>

              <p className="text-muted-foreground text-sm leading-6 font-semibold">
                {service.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
