// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import { CardShowCasePropsType } from '@/types/dashboard/component';
import { cn, getRandomTailwind500Color } from '@/utils/utils';
import { JSX, useState } from 'react';
import BankIcon from '../ui/bankIcon';
import { numberSeparation } from '@/utils';

// Creating and exporting CardShowCase component as default
export default function CardShowCase({
  className,
  data,
}: CardShowCasePropsType): JSX.Element {
  // Defining variables
  const [randomColor] = useState(getRandomTailwind500Color());

  // Returning JSX
  return (
    <div
      dir="ltr"
      className={cn(
        'rounded-xl p-4 text-white flex flex-col items-center justify-between gap-3',
        className,
      )}
      style={{
        background: randomColor,
        backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0, 0.5) , ${randomColor})`,
      }}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <span className="text-left truncate block flex-1 text-white font-semibold text-cs75">
          {data ? data.bankName : 'Safarname 24'}
        </span>
        <BankIcon
          name={data ? data?.bankIcon : 'unknown'}
          className="size-7 shrink-0"
          color="currentColor"
        />
      </div>
      <div className="w-full">
        <span className="text-left truncate block text-white font-semibold text-cs75 mb-2 font-inter">
          {data
            ? `IR ${numberSeparation(data.iban, ' ', 4)}`
            : `IR ${numberSeparation('000000000000000000000000', ' ', 4)}`}
        </span>
        <span className="text-left truncate block text-white font-medium text-cs07 font-inter">
          {data
            ? numberSeparation(data.number, ' ', 4)
            : numberSeparation('0000000000000000', ' ', 4)}
        </span>
      </div>
    </div>
  );
}
