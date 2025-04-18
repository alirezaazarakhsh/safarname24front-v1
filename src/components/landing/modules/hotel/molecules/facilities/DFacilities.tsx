'use client';

import { useState } from 'react';
import { TickSquare } from 'iconsax-react';
import { ICArrowLeft } from '@/components/icons';

type FacilitiesType = 'welfare' | 'room';

type Props = {
  facilities: {
    all: { welfare: string[]; room: string[] };
    main: string[];
    categorized: { title: string; items: string[] }[];
  };
};

// ---------------------------------------

const sharedStyle =
  'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

export default function DFacilities(props: Props) {
  const { facilities } = props;

  const [facilitiesType, setFacilitiesType] =
    useState<FacilitiesType>('welfare');

  return (
    <div className="hidden md:block">
      {/* Switch-Case */}
      <div className="absolute top-0 left-0 z-10 bg-zinc-200/60 w-80 h-10 text-cs75 font-bold flex gap-2 overflow-hidden rounded-lg">
        <button
          className={`${sharedStyle} ${facilitiesType === 'welfare' ? 'text-white' : 'text-zinc-700'}`}
          onClick={() => setFacilitiesType('welfare')}
        >
          امکانات رفاهی و تفریحی
        </button>

        <button
          className={`${sharedStyle} ${facilitiesType === 'room' ? 'text-white' : 'text-zinc-700'}`}
          onClick={() => setFacilitiesType('room')}
        >
          امکانات داخل اتاق
        </button>

        <div
          className={`absolute inset-y-0 -z-10 w-1/2 bg-[#4B5BCE] transition-all duration-300 ease-in-out rounded-lg ${
            facilitiesType === 'welfare' ? 'right-0' : 'right-1/2'
          }`}
        ></div>
      </div>

      {/* Content | Pagination  */}
      <div className="bg-white p-6 flex gap-4 border-2 border-zinc-200 rounded-2xl">
        <div className="flex-1 grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {facilities.all[facilitiesType]?.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <TickSquare size={20} color="#444" />

              <span className="text-zinc-700 text-cs08 font-bold flex-1 truncate">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="w-8 flex flex-col">
          <button className="bg-zinc-100 w-8 h-8 flex-center rounded-md">
            <ICArrowLeft className="rotate-90" />
          </button>

          <button className="bg-zinc-100 w-8 h-8 mt-auto flex-center rounded-md">
            <ICArrowLeft className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
