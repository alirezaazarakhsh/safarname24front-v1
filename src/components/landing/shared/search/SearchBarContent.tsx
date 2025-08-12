import Image from 'next/image';
import { ArrowRight } from 'iconsax-react';
import { useEffect, useMemo, useState } from 'react';

import { useMediaQuery } from '@/hooks';
import { Sheet, SheetTitle, SheetContent } from '@/components/ui/sheet';

import DatePicker from './date-picker/MDatePicker';
import NumberOfNights from './NumberOfNights';
import Passengers from './passengers/Passengers';
import CityOrHotel from './city-hotel/CityOrHotel';

type Props = {
  isOpen: boolean;
  setDialogClose: () => void;
};

// -----------------------------------

export default function SearchBarContent(props: Props) {
  const { isOpen, setDialogClose } = props;

  const [error, setError] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <Sheet open={isOpen}>
      <SheetContent
        side={'right'}
        aria-describedby={undefined}
        className="bg-[#f8f8f8] w-full h-dvh pt-8 flex flex-col gap-0 border-none"
      >
        {/* === Logo | Title | Close */}
        <div className="relative grid place-items-center">
          <div className="relative w-[4.5rem] h-[4.5rem]">
            <Image
              fill
              alt="logo"
              sizes="100%"
              className="object-contain"
              src="/image/logo/red-gray.png"
            />
          </div>

          <SheetTitle className="text-[clamp(0.95rem,3vw,1rem)] font-inter font-bold capitalize">
            safarname 24 hotel
          </SheetTitle>

          <button className="absolute top-0 right-0" onClick={setDialogClose}>
            <ArrowRight size={22} color="#444" />
          </button>
        </div>

        {/* === Setting */}
        <div className="mt-8 grid gap-4">
          <CityOrHotel />
          <DatePicker />
          <Passengers />
          <NumberOfNights />
        </div>

        {/* === Submit */}
        <button
          className={`bg-cs-dark-blue text-white text-cs85 font-semibold h-12 mt-auto rounded-cs-10 transition-colors duration-200 ease-in-out ${error ? 'bg-cs-red' : 'bg-cs-dark-blue'}`}
        >
          {error ? (
            <span>اطلاعات پر نشده است !</span>
          ) : (
            <span>جستجو شهر یا هتل</span>
          )}
        </button>
      </SheetContent>
    </Sheet>
  );
}
