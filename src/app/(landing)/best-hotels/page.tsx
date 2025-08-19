import {
  Filters,
  Setting,
  Pagination,
  AmazingHotels,
  SuggestedHotels,
} from '@/components/landing/modules/best-hotels';

import { bestHotels } from '@/constants/landing';
import StickyArea from '@/components/landing/shared/StickyArea';

// -------------------------------------

export default function BestHotels() {
  const { amazingHotels, suggestedHotels } = bestHotels;

  return (
    <>
      <div className="mt-2">
        <StickyArea
          childrenStatus={{ static: true, fixed: true }}
          searchbarStatus={{ static: true, fixed: true }}
        >
          <Filters />
        </StickyArea>
      </div>

      <div className="mt-4 lg:mt-12">
        <Setting />

        <div className="grid gap-10 lg:grid-cols-[20rem_1fr]">
          <div className="hidden lg:block">
            <Filters />
          </div>

          <div className="space-y-14 overflow-hidden lg:space-y-20">
            <AmazingHotels amazingHotels={amazingHotels} />
            {/* <SuggestedHotels suggestedHotels={suggestedHotels} /> */}
          </div>
        </div>

        {/* <Pagination /> */}
      </div>
    </>
  );
}
