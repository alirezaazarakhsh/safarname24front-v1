'use client';

import dynamic from 'next/dynamic';
import Countdown from 'react-countdown';
import { ICClock } from '@/components/icons';

export const DynamicSuggestedHotelTimer = dynamic(
  () => import('./SuggestedHotelTimer').then(({ SuggestedHotelTimer }) => SuggestedHotelTimer),
  { ssr: false }
);

type Props = {
  timer: string;
};

// -----------------------------------------

export function SuggestedHotelTimer(props: Props) {
  const { timer } = props;
  if (!timer || new Date().getTime() > new Date(timer).getTime()) return null;

  return (
    <div className='absolute bottom-2 left-2 w-max px-3 bg-white h-7 flex-center gap-2 rounded-lg'>
      <Countdown date={timer} renderer={CountDownRenderer} />
      <ICClock className='w-4 h-4' />
    </div>
  );
}

// -----------------------------------------

type CountDownRendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountDownRenderer = (props: CountDownRendererProps) => {
  const { days, hours, minutes, seconds } = props;

  return (
    <div className='text-zinc-800 text-cs65 font-extrabold mt-1 flex-center gap-0.5'>
      <CountDownItem value={seconds} />
      <span>:</span>
      <CountDownItem value={minutes} />
      <span>:</span>
      <CountDownItem value={hours} />
      <span>:</span>
      <CountDownItem value={days} />
    </div>
  );
};

// -----------------------------------------

const CountDownItem = ({ value }: { value: number }) => {
  const paddedNumber = (num: number) => String(num).padStart(2, '0');

  return <span className='w-4 text-center'>{paddedNumber(value)}</span>;
};
