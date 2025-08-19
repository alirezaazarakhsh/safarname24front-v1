import Image from 'next/image';
import { ArrowRight } from 'iconsax-react';
import { usePathname } from 'next/navigation';

import SubmitButton from './SubmitButton';
import NumberOfNights from './NumberOfNights';
import Passengers from './passengers/Passengers';

import DatePicker from './date-picker/MDatePicker';
import CityOrHotel from './city-hotel/CityOrHotel';

import { useMediaQuery } from '@/hooks';
import { Sheet, SheetTitle, SheetContent } from '@/components/ui/sheet';

type Props = {
  isOpen: boolean;
  setDialogClose: () => void;
};

// -----------------------------

export default function SearchBarContent(props: Props) {
  const { isOpen, setDialogClose } = props;

  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      {!isDesktop && (
        <Sheet open={isOpen}>
          <SheetContent
            side={'right'}
            aria-describedby={undefined}
            className="bg-[#f8f8f8] w-full h-dvh pt-6 flex flex-col gap-0 border-none"
          >
            {/* === Logo | Title | Close */}
            <div className="relative grid place-items-center">
              <div className="relative w-16 aspect-square">
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

              <button
                className="absolute top-0 right-0"
                onClick={setDialogClose}
              >
                <ArrowRight size={22} color="#444" />
              </button>
            </div>

            {/* === Setting */}
            <div className="mt-8 grid gap-4">
              {!pathname.startsWith('/best-hotels/') && <CityOrHotel />}
              <DatePicker />
              <Passengers />
              <NumberOfNights />
            </div>

            {/* === Submit */}
            <SubmitButton handleClose={setDialogClose} />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
