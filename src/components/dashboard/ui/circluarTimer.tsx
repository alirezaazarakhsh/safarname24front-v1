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
  theme = 'theme',
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
        colors={theme === 'theme' ? '#F30F26' : '#22c55e'}
        strokeWidth={3}
        trailColor="#EFEFEF"
      >
        {({ remainingTime }) => (
          <span
            className={cn(
              'text-cs07 font-bold',
              theme === 'theme' ? 'text-cs-red' : 'text-green-500',
            )}
          >
            {remainingTime}
          </span>
        )}
      </CountdownCircleTimer>
    </div>
  );
}
