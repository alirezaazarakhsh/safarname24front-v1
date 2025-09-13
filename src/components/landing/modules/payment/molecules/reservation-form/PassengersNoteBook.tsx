import {
  Sheet,
  SheetTitle,
  SheetClose,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

import { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { filterPassengers } from '../../utils';

import { Person } from '../../helpers/type';
import { payment } from '../../helpers/constant';
import { NoteBookItem } from '../../atoms/reservation-form';

type Props = {
  idx: number;
  fillPassenger: (idx: number, passengerData: Person) => void;
};

// ------------------------------

export function PassengersNoteBook(props: Props) {
  const { idx, fillPassenger } = props;

  const [sheetIsOpen, setSheetOpen] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');

  const handleCloseSheet = () => setSheetOpen(false);
  const passengerList = filterPassengers({
    passengers: payment.passengersNoteBook,
    searchedValue,
  });

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger
            type="button"
            className="bg-cs-blue/5 text-cs-blue text-cs08 font-semibold flex-1 flex-center gap-2 border border-cs-blue/10 rounded-lg"
          >
            <FaUserFriends color="#4b5bce" size={20} />
            <span>دفترچه مسافران</span>
          </SheetTrigger>
        </TooltipTrigger>

        <TooltipContent>انتخاب از دفترچه مسافران</TooltipContent>
      </Tooltip>

      <SheetContent className="w-full grid grid-rows-[auto_auto_1fr] sm:w-[24rem]">
        {/* === Header */}
        <SheetHeader className="space-y-0 flex-row items-center gap-3">
          <div className="w-16">
            <Image
              alt="logo"
              width={60}
              height={60}
              className="full-size"
              src={'/image/logo/red.png'}
            />
          </div>

          <div className="flex flex-col items-start">
            <SheetTitle className="text-[0.9rem]/5">سفرنامه 24</SheetTitle>

            <SheetDescription className="text-zinc-800 text-[0.8rem]/5 font-inter font-semibold capitalize">
              agency safarnameh 24
            </SheetDescription>
          </div>

          <SheetClose className="bg-zinc-100 p-1.5 mr-auto rounded-md">
            <IoClose color="#666" size={18} />
          </SheetClose>
        </SheetHeader>

        {/* === Title | Search */}
        <div className="font-semibold py-4 border-b grid gap-4">
          <input
            type="text"
            value={searchedValue}
            placeholder="جستجوی مسافر ..."
            onChange={(e) => setSearchedValue(e.target.value)}
            className="h-11 text-zinc-700 text-cs08 px-4 border rounded-lg placeholder:font-medium"
          />

          <span className="text-zinc-600 text-cs85">لیست مسافران :</span>
        </div>

        {/* === List */}
        <div className="-mx-6 px-6 divide-y divide-dashed overflow-auto custom-scrollbar">
          {passengerList.map((passenger, index) => (
            <NoteBookItem
              idx={idx}
              key={index}
              passenger={passenger}
              fillPassenger={fillPassenger}
              handleCloseSheet={handleCloseSheet}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
