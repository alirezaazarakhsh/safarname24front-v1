'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
// import { ComingSoonCountDown } from './ComingSoonCountDown';

export const DynamicComingSoonCountDown = dynamic(
  () =>
    import('./ComingSoonCountDown').then(
      ({ ComingSoonCountDown }) => ComingSoonCountDown,
    ),
  { ssr: false },
);

type Props = {
  date?: string | number | Date | undefined;
};

// --------------------------------------

export function ComingSoon(props: Props) {
  return (
    <div
      dir="ltr"
      className="relative min-h-dvh text-white text-center font-medium font-inter px-6 py-8 flex flex-col items-center justify-between"
    >
      <Image
        width={1000}
        height={1000}
        alt="coming-soon"
        src={'/image/background/coming-soon.png'}
        className="absolute inset-0 -z-10 full-size object-cover"
      />

      <div className="grid place-items-center gap-2">
        <div className="w-28 mb-1">
          <Image
            alt="logo"
            width={200}
            height={200}
            src={'/image/logo/white.webp'}
            className="full-size object-contain"
          />
        </div>

        <h1 className="text-lg font-bold uppercase tracking-[0.2rem]">
          safarname 24
        </h1>
        <span className="text-cs08 -mt-1">coming soon ...</span>
      </div>

      <DynamicComingSoonCountDown date={props.date} />
      <p className="text-cs08">
        © Copyrights Safarname24 | All Rights Reserved
      </p>
    </div>
  );
}
