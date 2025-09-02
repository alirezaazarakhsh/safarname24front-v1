'use client';

import Link from 'next/link';
import { cn } from '@/utils/utils';

import { DynamicTopBarTimer } from './TopBarTimer';
import TopBarSwiperNavigation from './TopBarSwiperNavigation';

type commonProps = {
  subtitle?: string;
  maxLength?: number;
  className?: string;
  arraylength?: number;
  viewAllHref?: string;
  timerDeadline?: string;
  prevClickFunc?: () => void;
  nextClickFunc?: () => void;
};

type Props =
  | (commonProps & { title: { type: 'single'; text: string } })
  | (commonProps & {
      title: { type: 'double'; first: string; second: string };
    });

// -----------------------------------------------

export function TopBarConfig(props: Props) {
  const {
    subtitle,
    className,
    viewAllHref,
    arraylength,
    maxLength = 4,
    prevClickFunc,
    nextClickFunc,
    timerDeadline,
  } = props;

  return (
    <div
      className={cn('mb-4 ml-5 flex-between items-center lg:ml-0', className)}
    >
      {/* Title | Subtitle */}
      <div className="space-y-1.5">
        <h6 className="text-[clamp(0.85rem,2vw,0.9rem)] font-extrabold lg:text-cs95">
          {props.title.type === 'single' ? (
            <span className="text-zinc-800">{props.title.text}</span>
          ) : (
            <>
              <span className="text-zic-800">{props.title.first}</span>
              <span className="inline-block w-1"></span>
              <span className="text-cs-red">{props.title.second}</span>
            </>
          )}
        </h6>

        {subtitle && (
          <p className="text-zinc-500 text-cs08 font-semibold hidden lg:block">
            {subtitle}
          </p>
        )}
      </div>

      {/* Timer | See-All Link | Back-Next Button */}
      <div className="h-10 flex gap-5">
        {timerDeadline && <DynamicTopBarTimer timer={timerDeadline} />}

        {(viewAllHref || prevClickFunc || nextClickFunc) && (
          <div className="hidden gap-3 xl:flex">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className="bg-zinc-200/50 text-zinc-800 text-cs75 font-bold px-6 flex-center rounded-[7px] transition-colors duration-200 ease-in-out hover:bg-zinc-200/70"
              >
                مشاهده همه
              </Link>
            )}

            {arraylength && maxLength && arraylength > maxLength ? (
              <TopBarSwiperNavigation
                prevClickFunc={prevClickFunc}
                nextClickFunc={nextClickFunc}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
