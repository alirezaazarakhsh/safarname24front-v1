'use client';

import { useRouter } from 'next/navigation';
import { TopBarConfig } from '../../shared';

type Props = {
  src: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    detail: string;
    href: string;
    detailType: string;
  }[];
};

// ---------------------------------------

export function ContactUsWays(props: Props) {
  const { src } = props;
  const router = useRouter();

  return (
    <div>
      <TopBarConfig title='تماس با ما' subtitle='راه های ارتباطی با آژانس سفرنامه 24' />

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {src.map((item, index) => (
          <div key={index} className='bg-white p-5 flex gap-4 border-2 border-zinc-100 rounded-xl xl:flex-col'>
            {/* Icon */}
            <div className='w-10 h-10 flex-center border border-zinc-200 rounded-md'>{item.icon}</div>

            {/* {/* Title | Subtitle | Detail */}
            <div className='text-zinc-800 text-cs08 font-bold flex flex-col flex-1 gap-3'>
              <div className='font-extrabold'>{item.title}</div>
              <div className='text-zinc-500 text-cs07'>{item.subtitle}</div>

              <div
                dir={item.detailType === 'number' ? 'ltr' : ''}
                className={`mt-auto ${
                  item.detailType === 'number'
                    ? 'text-right'
                    : item.detailType === 'email'
                    ? 'font-inter'
                    : 'underline font-inter capitalize cursor-pointer'
                }`}
                onClick={() => item.detailType === 'link' && router.push(item.href)}
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
