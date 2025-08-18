// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { TicketsDateSepratorPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import moment from 'jalali-moment';

// Creating and exporting Tikcets DateSeprator component as default
export default function DateSeprator({
  className,
  date,
}: TicketsDateSepratorPropsType): ReactNode {
  // Defining variables
  const today = new Date().toISOString();

  // Returning JSX
  return (
    <div className={cn('flex items-center justify-center gap-5', className)}>
      <div className="flex-1 w-full h-[2px] bg-black/10" />
      <span className="text-cs65 font-medium text-black/50 text-center truncate block shrink">
        {`${date === today ? 'امروز ' : ''}${moment(date).locale('fa').format('dddd D MMMM، YYYY')}`}
      </span>
      <div className="flex-1 w-full h-[2px] bg-black/10" />
    </div>
  );
}
