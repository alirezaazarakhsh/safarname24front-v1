'use client';

import { ArrowRight, SearchStatus } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
  setDialogOpen: () => void;
};

// --------------------------------------

export default function SearchBarTrigger(props: Props) {
  const { setDialogOpen } = props;

  const router = useRouter();
  const pathname = usePathname();

  const searchedValue = true;
  const isBestHotel = /^\/best-hotels\/.+/.test(pathname);

  return (
    <>
      {!isBestHotel ? (
        !searchedValue ? (
          <div
            onClick={setDialogOpen}
            className="bg-zinc-200/60 w-full h-12 px-5 flex items-center gap-4 overflow-hidden select-none cursor-pointer rounded-lg"
          >
            <SearchStatus size="20" color="#52525b" />
            <span className="text-zinc-600 text-cs08 font-semibold">
              جستجو شهر, هتل ...
            </span>
          </div>
        ) : (
          <div
            onClick={setDialogOpen}
            className="bg-zinc-200/60 w-full h-[3.6rem] px-5 flex items-center justify-between gap-4 overflow-hidden select-none cursor-pointer rounded-lg"
          >
            <div className="font-semibold flex flex-col gap-1">
              <span className="text-cs08">هتل های تهران</span>

              <div className="flex items-center gap-0.5 text-zinc-600 text-[clamp(0.65rem,3vw,0.7rem)]">
                <span>12 شهریور تا 20 شهریور</span>
                <span>,</span>
                <span>8 شب اقامت</span>
                <span>,</span>
                <span>1 بزرگسال</span>
                <span>,</span>
                <span>1 اتاق</span>
              </div>
            </div>

            <SearchStatus size="20" color="#444" />
          </div>
        )
      ) : (
        <div className="w-full flex items-center gap-4 overflow-hidden select-none rounded-lg">
          <button onClick={() => router.back()}>
            <ArrowRight size={20} color="#444" />
          </button>

          <div className="font-semibold flex flex-col gap-1.5">
            <div className="text-[clamp(0.7rem,3vw,0.8rem)] flex items-center gap-1">
              <span>2 شهریور ماه 1403</span>
              <span>-</span>
              <span>6 شهریور ماه 1403</span>
            </div>

            <div className="flex items-center gap-0.5 text-zinc-600 text-[clamp(0.7rem,3vw,0.8rem)]">
              <span>8 شب اقامت</span>
              <span>,</span>
              <span>1 بزرگسال</span>
              <span>,</span>
              <span>1 اتاق</span>
            </div>
          </div>

          <button
            onClick={setDialogOpen}
            className="bg-zinc-200/60 w-10 h-10 p-2.5 mr-auto flex-center cursor-pointer rounded-lg"
          >
            <SearchStatus size={20} color="#444" />
          </button>
        </div>
      )}
    </>
  );
}
