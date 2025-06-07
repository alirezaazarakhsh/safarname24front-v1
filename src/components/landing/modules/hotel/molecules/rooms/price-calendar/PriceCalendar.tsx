import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';

import Image from 'next/image';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

import CalendarCard from './CalendarCard';
import { hotel } from '@/constants/landing';
import { NumberOfRooms } from './NumberOfRooms';

type Props = {};

// --------------------------------

export default function PriceCalendar(props: Props) {
  const {} = props;

  const MAX_NUMBER_OF_ROOM = 5;
  const [numberOfRooms, setRooms] = useState(1);

  function handleChangeNumberOfRooms(type: 'inc' | 'dec') {
    if (type === 'inc') {
      if (numberOfRooms < MAX_NUMBER_OF_ROOM)
        setRooms((prevValue) => prevValue + 1);
    }
    // -----
    else {
      if (numberOfRooms > 1) setRooms((prevValue) => prevValue - 1);
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="bg-cs-blue/10 text-cs-blue h-11 rounded-lg md:h-10">
        مشاهده تقویم قیمتی
      </SheetTrigger>

      <SheetContent
        side={'right'}
        aria-describedby={undefined}
        className="w-full grid grid-rows-[auto_auto_1fr_auto] border-none md:w-[30rem]"
      >
        <SheetTitle className="hidden"></SheetTitle>

        {/* === Logo & Title & Close */}
        <div className="flex gap-3">
          <div className="w-14">
            <Image
              alt="logo"
              width={100}
              height={100}
              src={'/image/logo/red.png'}
              className="full-size object-cover"
            />
          </div>

          <div className="grid text-cs08 font-bold md:text-cs85">
            <span>سفرنامه 24</span>
            <span className="capitalize">safarname 24 agency hotel</span>
          </div>

          <SheetClose className="mr-auto">
            <IoClose size={20} color="#444" />
          </SheetClose>
        </div>

        {/* === Room-Name */}
        <span className="text-cs85 font-bold py-3 border-b border-dashed border-zinc-300">
          اتاق دو تخته اسپشیال کینگ
        </span>

        {/* === Calendar */}
        <div className="mt-2 space-y-4 overflow-auto">
          {hotel.priceCalendar?.map((card, index) => (
            <CalendarCard key={index} info={card} />
          ))}
        </div>

        {/* === Number-Of-Rooms & Submit-Button */}
        <div className="flex flex-col gap-4 md:flex-row-reverse md:items-center md:justify-between md:gap-12 md:pt-4 md:border-t">
          <div className="pt-4 border-t border-zinc-200 md:pt-0 md:border-none">
            <NumberOfRooms
              numberOfRooms={numberOfRooms}
              changeNumberOfRooms={handleChangeNumberOfRooms}
            />
          </div>

          <button className="bg-cs-blue h-12 text-white text-cs85 font-semibold rounded-cs-10 md:flex-1">
            <span>تایید رزرو اتاق</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
