import {
  useHotelOrCityContext,
  useHotelOrCityDispatch,
} from '@/context/HotelOrCityContext';

import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks';
import { Location } from 'iconsax-react';

type Hotel = {
  slug: string;
  star: number;
  city: string;
  hotel: string;
};

type City = {
  city: string;
  province: string;
  residence: number;
};

type Props = {
  handleClose: () => void;
} & ({ type: 'hotel'; info: Hotel } | { type: 'city'; info: City });

// -----------------------------------

export default function CityOrHotelItem(props: Props) {
  const { handleClose } = props;

  const dispatch = useHotelOrCityDispatch();
  const { value } = useHotelOrCityContext();
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  function handleClick() {
    if (isDesktop) handleClose();

    if (props.type === 'hotel') {
      dispatch({
        type: 'hotel',
        payload: {
          city: props.info.city,
          hotel: props.info.hotel,
          hotelSlug: props.info.slug,
        },
      });
    } else {
      dispatch({
        type: 'city',
        payload: {
          city: props.info.city,
          province: props.info.province,
        },
      });
    }
  }

  // === Auto-Dispatch (CONFIRM)
  useEffect(() => {
    if (isDesktop) dispatch({ type: 'confirmed-value' });
  }, [value, dispatch, isDesktop]);

  return (
    <div
      onClick={handleClick}
      data-active={
        props.type === 'hotel'
          ? props.info.slug === value.hotelSlug
          : props.info.province === value.province
      }
      className="text-zinc-600 text-cs08 font-bold h-10 px-4 flex items-center gap-2.5 group select-none cursor-pointer rounded-lg transition-colors data-[active='true']:bg-cs-blue/10 data-[active='true']:text-cs-blue lg:hover:bg-cs-blue/10 lg:hover:text-cs-blue lg:rounded-r-none"
    >
      <Location variant="Bold" size={20} color={`#444`} />

      <div className="flex-center gap-1">
        {props.type === 'hotel' ? (
          <>
            <span>هتل</span>
            <span>{props.info.hotel}</span>
            <span>-</span>
            <span>{props.info.city}</span>
          </>
        ) : (
          <>
            <span>{props.info.province}</span>
            <span>,</span>
            <span>{props.info.city}</span>
          </>
        )}
      </div>

      <div className="mr-auto flex-center gap-1">
        {props.type === 'hotel' ? (
          <>
            <span>{props.info.star}</span>
            <span>ستاره</span>
          </>
        ) : (
          <>
            <span>{props.info.residence}</span>
            <span>اقامتگاه</span>
          </>
        )}
      </div>
    </div>
  );
}
