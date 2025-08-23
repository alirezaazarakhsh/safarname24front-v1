'use client';

import {
  Star,
  PriceRange,
  ResidenceType,
  OtherFilters,
  HotelFacilities,
  RoomFacilities,
  ClearFilters,
} from './molecules/filters';

import { IoClose } from 'react-icons/io5';
import { Suspense, useEffect, useState } from 'react';
import { Filter, Building, Trash } from 'iconsax-react';

// ------------------------------

export function Filters() {
  return (
    <Suspense>
      {/* Small-Screen */}
      {/* <div className="lg:hidden">
        <div className="h-9 flex gap-3">
          <button
            className="bg-white px-4 flex-center gap-2 border rounded-full"
            onClick={() => setDialogOpen(true)}
          >
            <Filter size="17" color="#52525b" />
            <span className="text-zinc-600 text-cs75 font-bold pt-0.5">
              فیلتر ها
            </span>
          </button>

          <div className="bg-white px-4 flex-center gap-2 border rounded-full">
            <Building size="18" color="#52525b" />

            <div className="text-zinc-600 text-cs75 font-bold pt-0.5 flex-center gap-1">
              <span>نتایج :</span>
              <span>{123}</span>
              <span>هتل</span>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-y-0 z-40 w-full h-dvh bg-white transition-all duration-500 ease-in-out ${dialogIsOpen ? 'visible left-0' : 'invisible left-full'}`}
        >
          <div
            className={`h-full text-zinc-800 grid grid-rows-[4rem_1fr_5rem] transition-all duration-500 ease-in-out ${dialogIsOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="px-6 flex-between items-center border-b">
              <span className="text-cs09 font-bold">فیلتر مرتب سازی</span>

              <button onClick={() => setDialogOpen(false)}>
                <IoClose fill="#52525b" />
              </button>
            </div>

            <div className="px-6 py-4 divide-y overflow-auto last:divide-y-0">
              <HotelStar />
              <PriceRange />
              <ResidenceType />
              <OtherFilters />
              <FeaturesFilter />
            </div>

            <div className="bg-white text-cs85 font-semibold px-6 flex-between items-center border-t shadow-[0_-1rem_1.5rem_rgba(0,0,0,0.03)]">
              <button className="flex-center gap-2">
                <Trash size="18" color="#27272a" />
                <span className="text-zinc-800">حذف فیلتر ها</span>
              </button>

              <div className="bg-cs-blue/10 text-cs-blue font-semibold px-4 py-2 flex-center gap-1 rounded-lg">
                <span>135</span>
                <span>هتل یافت شد</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* === Large-Screen */}
      <div className="sticky top-28 h-fit bg-white text-zinc-800 hidden divide-y overflow-hidden rounded-2xl shadow-light lg:block">
        <div className="px-5 py-4 flex-between items-center">
          <span className="text-cs85 font-bold">فیلتر های جستجو</span>
          <ClearFilters />
        </div>

        <Star />
        <PriceRange />
        <ResidenceType />
        <OtherFilters />
        <HotelFacilities />
        <RoomFacilities />
      </div>
    </Suspense>
  );
}
