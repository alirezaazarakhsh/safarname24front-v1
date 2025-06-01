'use client';

import dynamic from 'next/dynamic';
import { Clock } from 'iconsax-react';
import Countdown from 'react-countdown';

export const DynamicSuggestedHotelTimer = dynamic(
  () =>
    import('./SuggestedHotelTimer').then(
      ({ SuggestedHotelTimer }) => SuggestedHotelTimer,
    ),
  { ssr: false },
);

type Props = {
  timer: string;
};

// -----------------------------------------

export function SuggestedHotelTimer(props: Props) {
  const { timer } = props;
  if (!timer || new Date().getTime() > new Date(timer).getTime()) return null;

  return (
    <div className="absolute bottom-2.5 left-2.5 w-max px-3 bg-white h-7 flex-center gap-2 rounded-md">
      <Countdown date={timer} renderer={CountDownRenderer} />
      <Clock size={16} color="#333" />
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
    <div className="text-zinc-800 text-cs75 font-extrabold mt-0.5 flex-center gap-1">
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

  return <span className="w-4 text-center">{paddedNumber(value)}</span>;
};
