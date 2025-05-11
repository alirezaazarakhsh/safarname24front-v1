import { useEffect } from 'react';
import { Location } from 'iconsax-react';

import { useMediaQuery } from '@/hooks';
import { useSearchContext, useSearchDispatch } from '@/context/SearchContext';

type City = {
  id: number;
  slug: string;
  city: string;
  province: string;
  residence: number;
};

type Hotel = {
  slug: string;
  star: number;
  city: string;
  hotel: string;
};

type Props = (City | Hotel) & { handleClose: () => void };

// -----------------------------------

export default function CityOrHotelItem(props: Props) {
  const { handleClose, ...item } = props;

  const dispatch = useSearchDispatch();
  const { cityOrHotel } = useSearchContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // === Check City-or-Hotel
  const isHotel = (item: City | Hotel): item is Hotel => {
    return (item as Hotel).hotel !== undefined;
  };

  // === Handle Select City-Or-Hotel
  function handleClick() {
    if (isDesktop) handleClose();

    isHotel(item)
      ? dispatch({
          type: 'CITY_OR_HOTEL',
          payload: {
            city: item.city,
            hotel: item.hotel,
            actionType: 'HOTEL',
            hotelSlug: item.slug,
          },
        })
      : dispatch({
          type: 'CITY_OR_HOTEL',
          payload: {
            city: item.city,
            cityID: item.id,
            actionType: 'CITY',
            citySlug: item.slug,
            province: item.province,
          },
        });
  }

  // === Auto-Dispatch (CONFIRM)
  useEffect(() => {
    if (isDesktop) {
      dispatch({
        type: 'CITY_OR_HOTEL',
        payload: { actionType: 'CONFIRMED-CITY-OR-HOTEL' },
      });
    }
  }, [cityOrHotel.values, dispatch, isDesktop]);

  return (
    <div
      onClick={handleClick}
      data-active={
        isHotel(item)
          ? item.slug === cityOrHotel.values.hotelSlug
          : item.id === cityOrHotel.values.cityID
      }
      className="text-zinc-600 text-cs08 font-bold h-10 pr-6 pl-4 flex items-center gap-2.5 group select-none cursor-pointer rounded-l-lg transition-colors data-[active='true']:bg-cs-blue/10 data-[active='true']:text-cs-blue lg:hover:bg-cs-blue/10 lg:hover:text-cs-blue"
    >
      <Location variant="Bold" size={20} color={`#444`} />

      <div className="flex-center gap-1">
        {isHotel(item) ? (
          <>
            <span>هتل</span>
            <span>{item.hotel}</span>
            <span>-</span>
            <span>{item.city}</span>
          </>
        ) : (
          <>
            <span>{item.province}</span>
            <span>,</span>
            <span>{item.city}</span>
          </>
        )}
      </div>

      <div className="mr-auto flex-center gap-1">
        {isHotel(item) ? (
          <>
            <span>{item.star}</span>
            <span>ستاره</span>
          </>
        ) : (
          <>
            <span>{item.residence}</span>
            <span>اقامتگاه</span>
          </>
        )}
      </div>
    </div>
  );
}
