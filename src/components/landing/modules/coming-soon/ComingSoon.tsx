import Image from 'next/image';
import { ComingSoonCountDown } from './ComingSoonCountDown';

type Props = {
  date?: string | number | Date | undefined;
};

// --------------------------------------

export default function ComingSoon(props: Props) {
  return (
    <div
      dir='ltr'
      className='relative min-h-dvh text-white text-center font-medium font-inter px-6 py-8 flex flex-col items-center justify-between'
    >
      <Image
        src={'/image/background/coming-soon.png'}
        alt='coming-soon'
        width={1000}
        height={1000}
        className='absolute inset-0 -z-10 full-size object-cover'
      />

      <div className='grid place-items-center gap-2'>
        <div className='w-20 h-20'>
          <Image
            src={'/image/logo/logo-white.png'}
            alt='logo'
            width={200}
            height={200}
            className='full-size object-cover scale-150'
          />
        </div>

        <h1 className='text-lg font-bold uppercase tracking-[0.2rem]'>safarname 24</h1>
        <span className='text-cs08 -mt-1'>coming soon ...</span>
      </div>

      <ComingSoonCountDown date={props.date} />
      <p className='text-cs08'>© Copyrights Safarname24 | All Rights Reserved</p>
    </div>
  );
}
