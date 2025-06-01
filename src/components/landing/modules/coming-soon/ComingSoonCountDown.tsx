'use client';

import Countdown from 'react-countdown';

type Props = {
  date?: string | number | Date | undefined;
};

// --------------------------------

export function ComingSoonCountDown(props: Props) {
  return (
    <Countdown date={props.date ?? '2025-05-13'} renderer={CountDownRenderer} />
  );
}

// ================== Internal-Components

type CountDownRendererProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const CountDownRenderer = (props: CountDownRendererProps) => {
  const { days, hours, minutes, seconds } = props;

  return (
    <div className="w-full h-32 max-w-[38rem] grid grid-cols-4 gap-3 lg:h-36 lg:gap-6">
      <CountDownItem number={days} type="days" />
      <CountDownItem number={hours} type="hrs" />
      <CountDownItem number={minutes} type="mins" />
      <CountDownItem number={seconds} type="sec" />
    </div>
  );
};

type CountDownItemProps = {
  number: number;
  type: 'days' | 'hrs' | 'mins' | 'sec';
};

const CountDownItem = (props: CountDownItemProps) => {
  const { number, type } = props;
  const padNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="relative bg-white/20 text-white capitalize flex flex-col items-center justify-center gap-2 backdrop-blur-lg overflow-hidden rounded-xl lg:rounded-2xl">
      <span className="text-[clamp(1.4rem,2vw,1.5rem)] font-semibold">
        {padNumber(number)}
      </span>

      <div className="bg-white/50 w-1/2 h-[0.1rem] rounded"></div>

      <span className="text-[clamp(1rem,2vw,1.1rem)] font-medium inline-block mt-1">
        {type}
      </span>

      <div className="absolute inset-6 -z-10 bg-white/20 blur-xl rounded-xl lg:inset-8"></div>
    </div>
  );
};
