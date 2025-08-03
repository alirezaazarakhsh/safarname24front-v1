import {
  Sheet,
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
  SheetContent,
  SheetDescription,
} from '@/components/ui/sheet';

import { useMediaQuery } from '@/hooks';
import SwitchCase from './molecules/SwitchCase';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, TickSquare } from 'iconsax-react';

type Data = {
  name: string;
  facilities: { title: string }[];
  room_facilities: { title: string }[];
};

type FacilitiesType = 'hotel' | 'room';

type Props = {
  facilities?: Data;
};

// ---------------------------------------

export default function MFacilities(props: Props) {
  const { facilities } = props;
  const [facilitiesType, setFacilitiesType] = useState<FacilitiesType>('hotel');

  const handleSetFacilitiesType = (type: FacilitiesType) => {
    setFacilitiesType(type);
  };

  const finalList =
    facilitiesType === 'hotel'
      ? facilities?.facilities
      : facilities?.room_facilities;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop) return null;

  return (
    <div className="bg-white border-2 border-zinc-200 rounded-xl">
      {/* === First 5 items */}
      <div className="p-5 grid gap-3">
        {facilities?.facilities.slice(0, 5).map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <TickSquare size={22} color="#444" />
            <span className="text-zinc-700 text-cs85 font-bold">
              {item.title}
            </span>
          </div>
        ))}
      </div>

      <Sheet>
        <SheetTrigger className="w-full h-12 px-5 flex items-center gap-2 border-t-2">
          <span className="text-[#4B5BCE] text-cs08 font-semibold">
            مشاهده امکانات بیشتر
          </span>
          <ArrowLeft size={20} color="#4B5BCE" />
        </SheetTrigger>

        <SheetContent className="w-full p-0 grid grid-rows-[4rem_2.5rem_1fr] gap-6">
          <SheetHeader className="bg-white px-5 text-cs85 flex-row items-center gap-1 border-b shadow-[0_0_2rem_rgba(0,0,0,0.06)]">
            <SheetTitle className="hidden"></SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>

            <SheetClose className="w-5 h-5 flex-center ml-2">
              <ArrowRight size={20} color="#555" />
            </SheetClose>

            <span className="font-bold">امکانات و ویژگی ها</span>
          </SheetHeader>

          <div className="px-5">
            <SwitchCase
              facilitiesType={facilitiesType}
              setFacilitiesType={handleSetFacilitiesType}
            />
          </div>

          <div className="px-5 pb-8 mt-2 columns-2 gap-4 space-y-4">
            {finalList?.map((item, index) => (
              <div
                key={index}
                className="break-inside-avoid h-fit flex items-center gap-3"
              >
                <TickSquare size={20} color="#444" />
                <span className="text-zinc-700 text-cs08 font-bold">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
