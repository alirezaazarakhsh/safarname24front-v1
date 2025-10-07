import {
  SheetClose,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from '@/components/ui/sheet';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

// ------------------------------

export function PassengersNotebookHeader() {
  return (
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
  );
}
