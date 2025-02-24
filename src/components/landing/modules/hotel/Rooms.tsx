'use client';

import { useState } from 'react';
import { rooms } from '@/constants';
import NormalRoom from './molecules/rooms/NormalRoom';
import PackedRoom from './molecules/rooms/PackedRoom';

type RoomTypes = 'normal' | 'packed';

// ------------------------------------------

const sharedStyle =
  'w-1/2 flex-center rounded-md transition-colors duration-300 ease-in-out';

export function Rooms() {
  const [roomTypes, setRoomTypes] = useState<RoomTypes>('normal');
  const numberOfNights = 9;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Settings */}
      <div className="text-cs07 font-bold grid grid-cols-[1fr_5rem] items-end gap-4 lg:grid-cols-[1fr_16rem_5rem_8rem] xl:text-cs75">
        <div className="grid-cols-[2fr_0.8fr_1fr] gap-4 hidden lg:grid">
          <div className="space-y-3">
            <span>تاریخ ورود و خروج هتل</span>

            <div className="bg-zinc-200/50 text-zinc-700 h-12 px-4 flex items-center gap-1 rounded-lg">
              <span>2 شهریور ماه 1403</span>
              <span>-</span>
              <span>11 شهریور ماه 1403</span>
            </div>
          </div>

          <div className="space-y-3">
            <span>مدت شب اقامت</span>

            <div className="bg-zinc-200/50 text-zinc-700 h-12 px-4 flex items-center gap-1 rounded-lg">
              <span>9</span>
              <span>َشب</span>
            </div>
          </div>

          <div className="space-y-3">
            <span>مسافران</span>

            <div className="bg-zinc-200/50 text-zinc-700 h-12 px-4 flex items-center gap-1 rounded-lg">
              <span>2 بزرگسال</span>
              <span>,</span>
              <span>2 اتاق</span>
            </div>
          </div>
        </div>

        {/* Switch-Case */}
        <div className="relative top-0 left-0 z-10 bg-zinc-200/50 h-10 flex gap-2 overflow-hidden rounded-lg lg:h-12">
          <button
            className={`${sharedStyle} ${roomTypes === 'normal' ? 'text-white' : 'text-zinc-700'}`}
            onClick={() => setRoomTypes('normal')}
          >
            اتاق معمولی
          </button>

          <button
            className={`${sharedStyle} ${roomTypes === 'packed' ? 'text-white' : 'text-zinc-700'}`}
            onClick={() => setRoomTypes('packed')}
          >
            اتاق پک بندی
          </button>

          <div
            className={`absolute inset-y-0 -z-10 w-1/2 bg-[#4B5BCE] transition-all duration-300 ease-in-out rounded-lg ${
              roomTypes === 'normal' ? 'right-0' : 'right-1/2'
            }`}
          ></div>
        </div>

        {/* Switch-Case */}
        <div className="bg-cs-dark-blue text-zinc-100 h-10 flex-center gap-1 rounded-lg lg:h-12">
          <span>{24}</span>
          <span>اتاق</span>
        </div>

        {/* Search-Button */}
        <button className="bg-cs-red text-zinc-100 h-12 hidden rounded-lg lg:block">
          جستجو اتاق
        </button>
      </div>

      {/* Rooms-Area */}
      <div className="grid gap-6">
        {roomTypes === 'normal'
          ? rooms.normal?.map((room, index) => (
              <NormalRoom
                key={index}
                room={room}
                numberOfNights={numberOfNights}
              />
            ))
          : rooms.packed?.map((room, index) => (
              <PackedRoom
                key={index}
                room={room}
                numberOfNights={numberOfNights}
              />
            ))}
      </div>

      {/* See-More Button */}
      <div className="h-10 flex justify-center lg:justify-start">
        <button className="bg-zinc-200 text-zinc-800 text-cs08 font-semibold px-6 rounded-lg">
          مشاهده بیشتر
        </button>
      </div>
    </div>
  );
}
