'use client';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks';
import { TopBarConfig } from '../../shared';

type Props = {
  story: string;
  imageUrl: string;
  information: { title: string; subtitle: string }[];
};

// -----------------------------------------------

export function OurStory(props: Props) {
  const { story, imageUrl, information } = props;
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'درباره ما' }}
        subtitle="داستان آژانس سفرنامه 24 از کجا شروع شد ؟"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:grid-flow-col-dense">
        {/* Story */}
        <div className="bg-white px-3 py-6 space-y-3 border-2 border-zinc-200 rounded-xl lg:order-2 lg:py-8 lg:space-y-3">
          <h2 className="text-zinc-800 text-base font-extrabold px-4 lg:text-xl">
            داستان سفرنامه 24
          </h2>

          <p
            dir={isDesktop ? 'rtl' : 'ltr'}
            className="h-72 text-zinc-600 text-cs08/[1.4rem] text-justify font-semibold px-4 overflow-auto custom-scrollbar lg:h-[26rem]"
          >
            {story}
          </p>
        </div>

        {/* Image | Information */}
        <div className="flex flex-col gap-8 lg:order-1">
          <div className="bg-zinc-200 h-64 overflow-hidden rounded-xl lg:h-72">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="our-story"
                width={400}
                height={200}
                className="full-size object-cover"
              />
            )}
          </div>

          <div className="bg-white p-4 grid gap-3 border-2 border-zinc-200 rounded-xl lg:grid-cols-2 lg:flex-1">
            {information?.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-100 h-[5.4rem] px-5 flex flex-col justify-center gap-1.5 rounded-cs-10 lg:h-auto"
              >
                <span className="text-zinc-800 font-extrabold">
                  {item.title}
                </span>
                <span className="text-zinc-600 text-cs08 font-semibold">
                  {item.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
