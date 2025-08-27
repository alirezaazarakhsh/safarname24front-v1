import { Pagination } from './Pagination';
import { TopBarConfig } from '../../shared';

import { Skeleton } from '@/components/ui/skeleton';
import { Hotel } from '@/types/landing/best-hotels';

import HotelNotFound from './molecules/hotel-not-found';
import { DHotelCard, MHotelCard } from './molecules/hotel-card';

type Props = {
  city?: string;
  data?: Hotel[];
  totalPages?: number;
  status: 'error' | 'success' | 'pending';
};

// ------------------------------

export function HotelListContent(props: Props) {
  const { data, status, city, totalPages } = props;

  if (status !== 'pending' && (!data || !data?.length)) {
    return (
      <>
        <TopBarConfig
          className="mb-3"
          title={{
            type: 'single',
            text: `هتل های شهر ${city ? city : 'های مختلف ایران'}`,
          }}
        />

        <HotelNotFound />
      </>
    );
  }

  return (
    <div>
      <TopBarConfig
        className="mb-3"
        title={{
          type: 'single',
          text: `هتل های شهر ${city ? city : 'های مختلف ایران'}`,
        }}
      />

      {/* === Small-Screen */}
      <div className="grid gap-6 md:grid-cols-2 xl:hidden">
        {status === 'pending'
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[23.5rem] rounded-xl" />
              ))
          : data?.map((hotel, index) => <MHotelCard key={index} {...hotel} />)}
      </div>

      {/* === Large-Screen */}
      <div className="hidden gap-8 xl:grid">
        {status === 'pending'
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-[23.5rem] rounded-xl" />
              ))
          : data?.map((hotel, index) => <DHotelCard key={index} {...hotel} />)}
      </div>

      <Pagination pageCount={totalPages} />
    </div>
  );
}
