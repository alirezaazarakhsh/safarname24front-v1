'use client';

import { useMemo } from 'react';
import { ArrowRight, SearchStatus } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';

import { useDatePickerContext } from '@/context';
import { Skeleton } from '@/components/ui/skeleton';
import persianCalendar from 'react-date-object/calendars/persian';
import persianLanguage from 'react-date-object/locales/persian_fa';

type Props = {
  setDialogOpen: () => void;
};

// --------------------------------

export default function SearchBarTrigger(props: Props) {
  const { setDialogOpen } = props;

  const router = useRouter();
  const pathname = usePathname();
  const { confirmedValue } = useDatePickerContext();

  const numberOfNights = useMemo(() => {
    const confirmedCheck = confirmedValue?.[0] && confirmedValue?.[1];
    if (!confirmedCheck) return 0;

    return (confirmedValue[1].unix - confirmedValue[0].unix) / 86400;
  }, [confirmedValue]);

  const calendarDetail = useMemo(() => {
    const formattedCalendar = [
      confirmedValue?.[0].convert(persianCalendar, persianLanguage),
      confirmedValue?.[1].convert(persianCalendar, persianLanguage),
    ];

    if (formattedCalendar?.[0] && formattedCalendar?.[1]) {
      return {
        startDate: {
          day: formattedCalendar?.[0].day,
          year: formattedCalendar?.[0].year,
          month: formattedCalendar?.[0].month.name,
        },
        endDate: {
          day: formattedCalendar?.[1].day,
          year: formattedCalendar?.[1].year,
          month: formattedCalendar?.[1].month.name,
        },
      };
    }
  }, [confirmedValue]);

  const searchedValue = true;
  const isBestHotel = /^\/best-hotels\/.+/.test(pathname);

  return (
    <>
      {!isBestHotel ? (
        ''
      ) : (
        // !searchedValue ? (
        //   <div
        //     onClick={setDialogOpen}
        //     className="bg-zinc-200/60 w-full h-12 px-5 flex items-center gap-4 overflow-hidden select-none cursor-pointer rounded-lg"
        //   >
        //     <SearchStatus size="20" color="#52525b" />
        //     <span className="text-zinc-600 text-cs08 font-semibold">
        //       جستجو شهر, هتل ...
        //     </span>
        //   </div>
        // ) : (
        //   <div
        //     onClick={setDialogOpen}
        //     className="bg-zinc-200/60 w-full h-[3.6rem] px-5 flex items-center justify-between gap-4 overflow-hidden select-none cursor-pointer rounded-lg"
        //   >
        //     <div className="font-semibold flex flex-col gap-1">
        //       <span className="text-cs08">هتل های تهران</span>

        //       <div className="flex items-center gap-0.5 text-zinc-600 text-[clamp(0.65rem,3vw,0.7rem)]">
        //         <span>12 شهریور تا 20 شهریور</span>
        //         <span>,</span>
        //         <span>8 شب اقامت</span>
        //         <span>,</span>
        //         <span>1 بزرگسال</span>
        //         <span>,</span>
        //         <span>1 اتاق</span>
        //       </div>
        //     </div>

        //     <SearchStatus size="20" color="#444" />
        //   </div>
        // )
        <div className="w-full flex items-center gap-4 overflow-hidden select-none rounded-lg">
          <button onClick={() => router.back()}>
            <ArrowRight size={20} color="#444" />
          </button>

          <div className="font-semibold flex flex-col gap-1">
            {!confirmedValue?.[0] ? (
              <div className="grid gap-2 pt-0.5">
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-40 h-4" />
              </div>
            ) : (
              <>
                <div className="text-[clamp(0.7rem,3vw,0.8rem)] flex items-center gap-1">
                  <span>{calendarDetail?.startDate.day}</span>
                  <span>{calendarDetail?.startDate.month}</span>
                  <span>{calendarDetail?.startDate.year}</span>
                  <span className="mx-0.5">-</span>
                  <span>{calendarDetail?.endDate.day}</span>
                  <span>{calendarDetail?.endDate.month}</span>
                  <span>{calendarDetail?.endDate.year}</span>
                </div>

                <div className="flex items-center gap-1 text-zinc-600 text-[clamp(0.7rem,3vw,0.8rem)]">
                  <span>{numberOfNights} شب اقامت</span>
                  <span>,</span>
                  <span>1 بزرگسال</span>
                  <span>,</span>
                  <span>1 اتاق</span>
                </div>
              </>
            )}
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
