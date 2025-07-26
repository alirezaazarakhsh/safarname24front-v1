import { useEffect, useState } from 'react';

import NumberOfNights from '@/components/landing/shared/search/molecules/NumberOfNights';
import Passengers from '@/components/landing/shared/search/molecules/passengers/Passengers';
import CityOrHotel from '@/components/landing/shared/search/molecules/city-hotel/CityOrHotel';
import {DDatePicker} from '@/components/landing/shared/search/date-picker/DDatePicker';

// -----------------------------------

export default function SearchAndFilter() {
  const [hasMounted, setHasMounted] = useState(false);

  // === Handle Mount-Step
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="absolute z-10 bottom-6 inset-x-6 bg-[--clr-main-light] h-32 px-8 flex items-center gap-6 rounded-2xl xl:bottom-10 xl:inset-x-24 xl:gap-8">
      <CityOrHotel
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <DDatePicker
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <NumberOfNights type="home" />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <Passengers
        scrollBehavior
        sideOffset={50}
        alignOffset={-30}
        triggerType="home"
        scrollPosition={300}
      />

      <button className="bg-cs-red text-zinc-100 text-cs08 font-bold px-12 py-4 mr-auto rounded-cs-10">
        جستجو
      </button>
    </div>
  );
}
