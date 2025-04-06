'use client';

import { TopBarConfig } from '../../shared';
import { AmazingHotel as Hotel } from '@/types/landing';

import MHotelCard from './molecules/hotel-card/MHotelCard';
import DHotelCard from './molecules/hotel-card/DHotelCard';

type Props = {
  suggestedHotels: Array<Hotel>;
};

// -------------------------------------

export function SuggestedHotels(props: Props) {
  const { suggestedHotels } = props;

  if (!suggestedHotels?.length) return null;

  return (
    <div>
      <TopBarConfig
        subtitle="هتل های محبوب و خوش قیمت سفرنامه رو از دست نده !"
        title={{ type: 'single', text: 'هتل های پیشنهادی سفرنامه' }}
      />

      {/* Small-Screen */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:hidden">
        {suggestedHotels?.map((hotel, index) => (
          <MHotelCard key={index} hotel={hotel} isSpecialOffer={false} />
        ))}
      </div>

      {/* Large-Screen */}
      <div className="hidden gap-8 xl:grid">
        {suggestedHotels?.map((hotel, index) => (
          <DHotelCard key={index} hotel={hotel} isSpecialOffer={false} />
        ))}
      </div>
    </div>
  );
}
