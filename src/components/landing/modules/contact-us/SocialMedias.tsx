'use client';

import 'swiper/css';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TopBarConfig } from '../../shared';
import SocialMedia from './molecules/SocialMedia';

export const ContactUsMap = dynamic(
  () =>
    import('./molecules/ContactUsMap').then(({ ContactUsMap }) => ContactUsMap),
  {
    ssr: false,
  },
);

type Props = {
  src: {
    icon: React.ReactNode;
    title: string;
    link: string;
    href: string;
  }[];
};

// ---------------------------------------

export function SocialMedias(props: Props) {
  const { src } = props;

  return (
    <div>
      <TopBarConfig
        subtitle="ما را در شبکه های اجتماعی دنبال کنید"
        title={{ type: 'single', text: 'شبکه های اجتماعی' }}
      />

      <div className="gap-12 grid-cols-2 xl:grid">
        {/* Social-Media (Small-Device) */}
        <div className="-ml-5 xl:ml-0 xl:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={'auto'}
            slidesOffsetAfter={22}
          >
            {src?.map((item, index) => (
              <SwiperSlide key={index} className="max-w-60 pb-4 select-none">
                <SocialMedia media={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Social-Media (Large-Device) */}
        <div className="hidden grid-cols-2 gap-6 xl:grid">
          {src?.map((item, index) => <SocialMedia key={index} media={item} />)}
        </div>

        {/* Map */}
        <div className="bg-zinc-200 h-64 mt-8 overflow-hidden rounded-2xl xl:h-auto xl:mt-0">
          <ContactUsMap lat={50} lng={20} />
        </div>
      </div>
    </div>
  );
}
