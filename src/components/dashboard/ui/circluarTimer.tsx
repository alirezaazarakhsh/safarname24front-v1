// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CircluarTimerComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

// Creating and exporting CircluarTimer component as default
export default function CircluarTimer({
  duration, // In Seconds
  className,
}: CircluarTimerComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'overflow-hidden aspect-square shrink-0 w-[40px] h-[40px]',
        className,
      )}
    >
      <CountdownCircleTimer
        isPlaying
        size={40}
        duration={duration}
        colors={'#F30F26'}
        strokeWidth={3}
        trailColor="#EFEFEF"
      >
        {({ remainingTime }) => (
          <span className="text-cs07 font-bold text-cs-red">
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
