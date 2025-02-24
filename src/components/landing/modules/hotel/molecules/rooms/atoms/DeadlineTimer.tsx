'use client';

import dynamic from 'next/dynamic';
import Countdown from 'react-countdown';

export const DeadlineTimer = dynamic(
  () => import('./DeadlineTimer').then((DeadlineTimer) => DeadlineTimer),
  { ssr: false },
);

type Props = {
  date?: string | number | Date | undefined;
};

// -------------------------------------------

export default function ClientDeadlineTimer(props: Props) {
  return (
    <Countdown date={props.date ?? '2025-03-13'} renderer={DeadlineRenderer} />
  );
}

// -------------------------------------------

type DeadlineRendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DeadlineRenderer = (props: DeadlineRendererProps) => {
  const { days, hours, minutes, seconds } = props;

  return (
    <div dir="ltr" className="grid grid-cols-4 gap-3">
      <DeadlineItem number={days} type="days" />
      <DeadlineItem number={hours} type="hrs" />
      <DeadlineItem number={minutes} type="mins" />
      <DeadlineItem number={seconds} type="sec" />
    </div>
  );
};

//  -------------------------------------------

type DeadlineItemProps = {
  number: number;
  type: 'days' | 'hrs' | 'mins' | 'sec';
};

const DeadlineItem = (props: DeadlineItemProps) => {
  const { number, type } = props;
  const padNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div
      className={`text-cs08 font-bold flex-center rounded-md lg:text-cs75 lg:aspect-square ${type === 'days' ? 'bg-cs-red/10 text-cs-red border-2 border-dashed border-cs-red' : 'bg-zinc-100 text-zinc-800'}`}
    >
      <span>{padNumber(number)}</span>
    </div>
  );
};
