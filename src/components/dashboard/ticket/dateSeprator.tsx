// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { TicketsDateSepratorPropsType } from '@/types/dashboard/component';
import { cn, isColorDark } from '@/utils/utils';
import { ReactNode } from 'react';
import moment from 'jalali-moment';
import useLocalStorageState from 'use-local-storage-state';

// Creating and exporting Tikcets DateSeprator component as default
export default function DateSeprator({
  className,
  date,
}: TicketsDateSepratorPropsType): ReactNode {
  // Defining variables
  const today = new Date().toISOString();
  const [walpaper] = useLocalStorageState<string>('ticketWalpaper');

  // Returning JSX
  return (
    <div
      style={{ color: isColorDark(walpaper) ? '#ffffff' : '#000000' }}
      className={cn('flex items-center justify-center gap-5', className)}
    >
      <div className="flex-1 w-full h-[2px] bg-current" />
      <span className="text-cs65 font-medium text-current text-center truncate block shrink">
        {`${date === today ? 'امروز ' : ''}${moment(date).locale('fa').format('dddd D MMMM، YYYY')}`}
      </span>
      <div className="flex-1 w-full h-[2px] bg-current" />
    </div>
  );
}
