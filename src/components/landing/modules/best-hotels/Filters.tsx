'use client';

import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Filter, Building, Trash } from 'iconsax-react';

import HotelStar from './molecules/filters/HotelStar';
import PriceRange from './molecules/filters/PriceRange';
import OtherFilters from './molecules/filters/OtherFilters';
import ResidenceType from './molecules/filters/ResidenceType';
import FeaturesFilter from './molecules/filters/FeaturesFilter';

type Props = {};

// -------------------------------------

export function Filters(props: Props) {
  const {} = props;
  const [dialogIsOpen, setDialogOpen] = useState(false);

  // Control Body-Overflow
  useEffect(() => {
    dialogIsOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dialogIsOpen]);

  return (
    <>
      {/* Small-Screen */}
      <div className="lg:hidden">
        {/* Dialog-Trigger | Number-Of-Hotels */}
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

        {/* Dialog-Container */}
        <div
          className={`fixed inset-y-0 z-40 w-full h-dvh bg-white transition-all duration-500 ease-in-out ${dialogIsOpen ? 'visible left-0' : 'invisible left-full'}`}
        >
          {/* Dialog-Content */}
          <div
            className={`h-full text-zinc-800 grid grid-rows-[4rem_1fr_5rem] transition-all duration-500 ease-in-out ${dialogIsOpen ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Sort-Filters | Close-Dialog */}
            <div className="px-6 flex-between items-center border-b">
              <span className="text-cs09 font-bold">فیلتر مرتب سازی</span>

              <button onClick={() => setDialogOpen(false)}>
                <IoClose fill="#52525b" />
              </button>
            </div>

            {/* All-Filters */}
            <div className="px-6 py-4 divide-y overflow-auto last:divide-y-0">
              <HotelStar />
              <PriceRange />
              <ResidenceType />
              <OtherFilters />
              <FeaturesFilter />
            </div>

            {/* Remove-Filters | Number-Of-Hotels */}
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
      </div>

      {/* Large-Screen */}
      <div className="sticky top-32 h-fit bg-white text-zinc-800 hidden divide-y overflow-hidden rounded-2xl shadow-light lg:block">
        {/* Sort-Filters */}
        <div className="px-5 py-4 flex-between items-center">
          <span className="text-cs85 font-bold">فیلتر مرتب سازی</span>

          <div className="bg-cs-red/10 text-cs-red text-cs75 font-bold px-3 py-2 flex items-center gap-1 rounded-lg">
            <span>نتایج :</span>
            <span>{123}</span>
            <span>هتل</span>
          </div>
        </div>

        <HotelStar />
        <PriceRange />
        <ResidenceType />
        <OtherFilters />
        <FeaturesFilter />
      </div>
    </>
  );
}
