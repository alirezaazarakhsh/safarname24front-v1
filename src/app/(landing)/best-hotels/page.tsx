'use client';

import { useState } from 'react';

import {
  Filters,
  AmazingHotels,
  SuggestedHotels,
  Pagination,
} from '@/components/landing/modules/best-hotels';
import { bestHotelsPage } from '@/constants';

// -------------------------------------

export default function BestHotels() {
  const [currentPage, setCurrentPage] = useState(0);

  function handleSetCurrentPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <div className="grid gap-10 xl:grid-cols-[20rem_1fr]">
        <Filters />

        <div className="space-y-20 overflow-hidden">
          <AmazingHotels amazingHotels={bestHotelsPage.amazingHotels} />
          <SuggestedHotels suggestedHotels={bestHotelsPage.suggestedHotels} />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
      />
    </div>
  );
}
