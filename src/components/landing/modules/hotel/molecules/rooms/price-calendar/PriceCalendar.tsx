import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

import { Room } from '@/types/landing';
import CalendarCard from './CalendarCard';
import { numberSeparation } from '@/utils';
import { number } from 'framer-motion';

type Props = {
  info: {
    roomName: string;
    capacity: number;
    totalPrice: number;
    numberOfNights: number;
    priceCalendar: Room['price_calendar'];
  };
};

// --------------------------------

export default function PriceCalendar(props: Props) {
  const {
    info: { priceCalendar, numberOfNights, capacity, roomName, totalPrice },
  } = props;

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

          <div className="grid text-cs85 font-bold">
            <span>سفرنامه 24</span>
            <span className="capitalize">safarname 24 agency hotel</span>
          </div>

          <SheetClose className="mr-auto">
            <IoClose size={20} color="#444" />
          </SheetClose>
        </div>

        {/* === Room-Name */}
        <div className="text-cs85 flex items-center gap-1 font-bold pt-3 pb-4 border-b border-dashed border-zinc-300">
          <span>اتاق</span>
          <span>{capacity}</span>
          <span>نفره</span>
          <span>{roomName}</span>
        </div>

        {/* === Calendar */}
        <div className="mt-2 space-y-5 overflow-auto">
          {priceCalendar?.map((card, index) => (
            <CalendarCard key={index} info={card} />
          ))}
        </div>

        {/* === Total-Price & Submit-Button */}
        <div className="flex flex-col gap-5 pt-5 border-t">
          <div className="text-cs85 flex-between items-center font-semibold border-zinc-200">
            <div className="flex items-center gap-1">
              <span>مجموع قیمت</span>
              <span>{numberOfNights}</span>
              <span>شب</span>
              <span>اقامت :</span>
            </div>

            <div className="flex-center gap-1">
              <span>{numberSeparation(totalPrice)}</span>
              <span>تومان</span>
            </div>
          </div>

          <button className="bg-cs-blue h-11 text-white text-cs85 font-semibold rounded-cs-10">
            <span>تایید رزرو اتاق</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
