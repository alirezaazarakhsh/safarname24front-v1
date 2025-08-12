import React from 'react';
import { City, Hotel } from '@/types/landing';
import CityOrHotelItem from './CityOrHotelItem';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  isPending: boolean;
  cities?: Array<City>;
  hotels?: Array<Hotel>;
  handleClose: () => void;
};

// ----------------------------

export function CityOrHotelList(props: Props) {
  const { cities, hotels, isPending, handleClose } = props;

  return (
    <div className="mt-4 overflow-auto custom-scrollbar lg:h-[20rem]">
      {isPending ? (
        <div className="px-4 grid gap-3">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="h-6 flex-between">
                <Skeleton className="w-1/2" />
                <Skeleton className="w-20" />
              </div>
            ))}
        </div>
      ) : (
        <>
          {cities?.length ? (
            <div className="pl-4">
              <div className="text-zinc-500 text-cs08 font-semibold mb-1.5 pr-4">
                شهر
              </div>

              {cities.map((city, index) => (
                <CityOrHotelItem
                  key={index}
                  type="city"
                  info={{
                    city: city.name,
                    province: city.province.name,
                    residence: city.hotels_number,
                  }}
                  handleClose={handleClose}
                />
              ))}
            </div>
          ) : null}

          {hotels?.length ? (
            <div className="pl-4 mt-2">
              <div className="text-cs08 font-semibold mb-2 pr-4">هتل ها</div>

              {hotels.map((hotel, index) => (
                <CityOrHotelItem
                  key={index}
                  type="hotel"
                  info={{
                    slug: hotel.slug,
                    hotel: hotel.name,
                    star: hotel.stars,
                    city: hotel.city.name,
                  }}
                  handleClose={handleClose}
                />
              ))}
            </div>
          ) : null}

          {!cities?.length && !hotels?.length ? (
            <div className="text-cs08 text-center text-gray-500 font-medium mt-2">
              متاسفانه نتیجه ای یافت نشد !
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
