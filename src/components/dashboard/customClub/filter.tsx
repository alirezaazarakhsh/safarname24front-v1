// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { FilterCustomClubPageComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import ToggleButtons from '../ui/toggleButtons';

// Creating and exporting Filter component/section of Customers club page as default
export default function Filter({
  onChange,
  totalScore,
}: FilterCustomClubPageComponentPropsType): ReactNode {
  // Defining states of component
  const [val, setVal] = useState<'shoppingCentre' | 'hotel'>('shoppingCentre');

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange && onChange(val), [val]);

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-3 lg:w-auto w-full">
      <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
        باشگاه مشتریان - جوایز هتل
      </span>
      <div className={'flex items-center justify-end gap-3'}>
        <div className="flex items-center justify-center gap-2 bg-black rounded-lg px-4 h-[45px] text-white">
          <IconsaxIcons
            name="Crown1"
            className="w-5 h-5 shrink-0"
            color="currentColor"
          />
          <span className="text-cs07 font-bold text-current block text-right truncate w-full">
            جمع دریافتی : {totalScore} امتیاز
          </span>
        </div>
        <ToggleButtons
          buttons={['جوایز مرکز خرید', 'جوایز هتل']}
          className="h-[45px]"
          onChange={(index) => setVal(index === 0 ? 'shoppingCentre' : 'hotel')}
        />
      </div>
    </div>
  );
}
