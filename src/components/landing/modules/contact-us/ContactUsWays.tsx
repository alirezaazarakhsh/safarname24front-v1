'use client';

import { IconsName } from '@/types';
import { useRouter } from 'next/navigation';
import { TopBarConfig } from '../../shared';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  src: {
    href: string;
    title: string;
    detail: string;
    subtitle: string;
    detailType: string;
    icon: IconsName;
  }[];
};

// ---------------------------------------

export function ContactUsWays(props: Props) {
  const { src } = props;
  const router = useRouter();

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'تماس با ما' }}
        subtitle="راه های ارتباطی با آژانس سفرنامه 24"
      />

      <div className="grid gap-5 md:grid-cols-2 lg:gap-6 xl:grid-cols-4">
        {src?.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 flex gap-4 border-2 border-zinc-100 rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] xl:flex-col"
          >
            {/* Icon */}
            <div className="w-10 h-10 flex-center border border-zinc-200 rounded-md">
              <IconsaxIcons name={item.icon} size={20} />
            </div>

            {/* {/* Title | Subtitle | Detail */}
            <div className="text-zinc-800 font-bold flex flex-col flex-1 gap-3">
              <div className="text-cs85 font-extrabold line-clamp-1">
                {item.title}
              </div>

              <div className="text-zinc-500 text-cs75 line-clamp-1">
                {item.subtitle}
              </div>

              <div
                dir={item.detailType === 'number' ? 'ltr' : ''}
                className={`text-cs08 mt-auto ${
                  item.detailType === 'number'
                    ? 'text-right'
                    : item.detailType === 'email'
                      ? 'font-inter'
                      : 'underline font-inter capitalize cursor-pointer'
                }`}
                onClick={() =>
                  item.detailType === 'link' && router.push(item.href)
                }
              >
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
