// Importing part
import ICUnion from '@/components/icons/ICUnion';
import { CreditCardComponentPropsType } from '@/types/dashboard/component';
import { numberSeparation } from '@/utils';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting CreditCard component as default
export default function CreditCard({
  name,
  number,
  shabaNumber,
  className,
}: CreditCardComponentPropsType): ReactNode {
  // Returning JSx
  return (
    <div
      dir="rtl"
      className={cn(
        'w-[250px] h-[125px] rounded-lg relative p-3 flex flex-col items-center justify-between gap-3 overflow-hidden bg-gradient-to-r from-black to-pink-600/70 bg-black',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 w-full">
        <ICUnion fill="white" />
        <span className="text-cs75 font-medium block text-left truncate text-white">
          {name}
        </span>
      </div>
      <div className="w-full">
        <span className="text-cs08 font-medium block text-left truncate text-white mb-2">
          IR {numberSeparation(shabaNumber, ' ', 4)}
        </span>
        <span className="text-cs75 font-medium block text-left truncate text-white">
          {numberSeparation(number, ' ', 4)}
        </span>
      </div>
    </div>
  );
}
