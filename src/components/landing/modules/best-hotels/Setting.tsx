'use client';

import { useEffect, useState } from 'react';

import Passengers from '../../shared/search/passengers/Passengers';
import CityOrHotel from '../../shared/search/molecules/city-hotel/CityOrHotel';
import { DDatePicker } from '../../shared/search/date-picker';
import NumberOfNights from '../../shared/search/molecules/NumberOfNights';
import { Skeleton } from '@/components/ui/skeleton';

// -------------------------------------

export function Setting() {
  const [hasMounted, setHasMounted] = useState(false);

  // === Handle Mount-Step
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <div className="text-zinc-800 text-cs75 font-bold mb-12 hidden grid-cols-[1fr_9rem] items-end gap-20 lg:grid">
      <div className="grid grid-cols-[1.2fr_1.2fr_0.6fr_1fr] gap-4">
        {hasMounted ? (
          <>
            <CityOrHotel
              scrollBehavior
              sideOffset={15}
              scrollPosition={0}
              triggerType="else"
            />

            <DDatePicker
              scrollBehavior
              sideOffset={15}
              scrollPosition={0}
              triggerType="else"
            />

            <NumberOfNights type="else" />

            <Passengers
              scrollBehavior
              sideOffset={15}
              scrollPosition={0}
              triggerType="else"
            />
          </>
        ) : (
          <>
            {[1, 2, 3, 4].map((_) => (
              <div key={_} className="h-20 grid">
                <Skeleton className="w-1/2 h-4 rounded" />
                <Skeleton className="h-12 rounded-lg" />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Search-Button */}
      <button className="bg-cs-dark-blue text-zinc-100 h-12 hidden rounded-lg lg:block">
        جستجو هتل
      </button>
    </div>
  );
}
