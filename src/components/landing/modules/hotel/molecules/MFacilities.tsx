'use client';

import { useMediaQuery } from '@/hooks';
import { ArrowLeft, ArrowRight, TickSquare } from 'iconsax-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type Props = {
  hotelName: string;
  facilities: {
    all: { welfare: string[]; room: string[] };
    main: string[];
    categorized: { title: string; items: string[] }[];
  };
};

// ---------------------------------------

export default function MFacilities(props: Props) {
  const { facilities, hotelName } = props;

  const isDesktop = useMediaQuery('(min-width: 768px)');
  if (isDesktop) return null;

  return (
    <div className="bg-white border-2 border-zinc-200 rounded-xl lg:hidden">
      {/* Main-Content */}
      <div className="p-5 grid gap-3 md:grid-cols-2">
        {facilities.main?.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <TickSquare size={20} color="#444" />
            <span className="text-zinc-700 text-cs08 font-bold">{item}</span>
          </div>
        ))}
      </div>

      {/* Full-Content */}
      <Dialog>
        <DialogTrigger className="w-full h-12 px-5 flex items-center gap-2 border-t-2">
          <span className="text-[#4B5BCE] text-cs75 font-semibold">
            مشاهده امکانات بیشتر
          </span>
          <ArrowLeft size={20} color="#4B5BCE" />
        </DialogTrigger>

        <DialogContent className="max-w-full full-size px-6 pt-28 pb-12 rounded-none data-[state=open]:duration-500 data-[state=closed]:duration-500">
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>

          <div className="pl-6 flex flex-col gap-8 overflow-auto custom-scrollbar">
            {/* Navbar */}
            <div className="fixed top-0 inset-x-0 bg-white h-20 px-6 text-cs08 flex items-center gap-1 shadow-[0_0_1.5rem_rgba(0,0,0,0.05)]">
              <DialogClose className="w-5 h-5 flex-center ml-3">
                <ArrowRight size={20} color="#4B5BCE" />
              </DialogClose>

              <span className="font-bold">امکانات و ویژگی ها</span>
              {hotelName && (
                <span className="text-zinc-500 font-semibold">
                  ({hotelName})
                </span>
              )}
            </div>

            {/* Main-Content */}
            <div className="bg-zinc-100/80 p-5 grid gap-3 rounded-xl">
              {facilities.main?.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <TickSquare size={20} color="#444" />
                  <span className="text-zinc-600 text-cs08 font-bold">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Categorized-Content */}
            <div className="grid gap-10 rounded-xl">
              {facilities.categorized?.map((item, index) => (
                <div key={index}>
                  <div className="text-cs08 font-bold pb-3 mb-4 border-b">
                    {item.title}
                  </div>

                  <div className="grid gap-3">
                    {item.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <TickSquare size={20} color="#444" />
                        <span className="text-zinc-600 text-cs75 font-bold">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
