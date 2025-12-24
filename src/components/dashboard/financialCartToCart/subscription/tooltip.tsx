// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { numberSeparation } from '@/utils';
import moment from 'jalali-moment';
import { ReactNode } from 'react';
import { TooltipProps } from 'recharts';

// Defining type of data
interface DataItem {
  date: string;
  total: number;
}

// Creating and exporting Tooltip component as default
export default function Tooltip({
  active,
  payload,
}: TooltipProps<number, string>): ReactNode {
  if (active && payload && payload.length) {
    const item = payload[0].payload as DataItem;

    return (
      <div className="bg-white rounded-md border border-black/10 py-2 px-3">
        <span className="truncate block text-right font-medium text-cs65 mb-1">
          {`${numberSeparation(item.total)} تومان`}
        </span>
        <span className="truncate block text-right font-nortmal text-black/50 text-cs06">
          {`در تاریخ : ${moment(item.date).locale("fa").format("jDD jMMMM jYYYY")}`}
        </span>
      </div>
    );
  }

  return null;
}
