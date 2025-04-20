// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { numberSeparation } from '@/utils';
import { ReactNode } from 'react';
import { TooltipProps } from 'recharts';

// Defining type of data
interface DataItem {
  month: string;
  price: number;
}

// Creating and exporting Tooltip component as default
export default function Tooltip({
  active,
  payload,
}: TooltipProps<number, string>): ReactNode {
  if (active && payload && payload.length) {
    const item = payload[0].payload as DataItem;

    return (
      <div className="bg-white rounded-md border border-black/10 p-2">
        <span className="truncate block text-right font-semibold text-cs65 mb-1">
          {`${numberSeparation(item.price)} تومان`}
        </span>
        <span className="truncate block text-right font-nortmal text-black/50 text-xs">
          {`در تاریخ : ${item.month}`}
        </span>
      </div>
    );
  }

  return null;
}
