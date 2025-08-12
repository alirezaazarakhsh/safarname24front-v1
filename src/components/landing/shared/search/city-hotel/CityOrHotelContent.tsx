import {
  useHotelOrCityContext,
  useHotelOrCityDispatch,
} from '@/context/HotelOrCityContext';

import Image from 'next/image';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, SearchStatus } from 'iconsax-react';

import { useDebounce } from '@/hooks';
import { City, Hotel } from '@/types/landing';
import { generalInstance } from '@/utils/services';
import { CityOrHotelList } from './CityOrHotelList';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

type ApiResponse = {
  data: {
    cities: Array<City>;
    hotels: Array<Hotel>;
  };
};

// ----------------------------

export default function CityOrHotelContent(props: Props) {
  const { handleClose } = props;

  const searchParams = useSearchParams();
  const dispatch = useHotelOrCityDispatch();
  const { value, confirmedValue, inputValue } = useHotelOrCityContext();
  const debouncedInputValue = useDebounce(inputValue, 500);



  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['search-hotel-city', debouncedInputValue],
    queryFn: () =>
      generalInstance(
        `/hotel/hotels/search/hotel-city/?query=${debouncedInputValue}`,
      ),
  });

  const handleClearInput = () => dispatch({ type: 'clear-input-value' });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'input-value', payload: e.target.value });
  };

  return (
    <>
      {/* === Logo - Title - Close */}
      <div className="relative grid place-items-center lg:hidden">
        <div className="relative w-[4.5rem] h-[4.5rem]">
          <Image
            fill
            alt="logo"
            sizes="100%"
            src="/image/logo/red.png"
            className="object-contain"
          />
        </div>

        <span className="text-[clamp(0.95rem,3vw,1rem)] font-inter font-bold capitalize">
          safarname 24 hotel
        </span>

        <button className="absolute top-0 right-0" onClick={handleClose}>
          <ArrowRight size={22} color="#444" />
        </button>
      </div>

      {/* === Search-Input */}
      <div className="relative bg-zinc-100 h-11 mt-8 flex overflow-hidden rounded-cs-10 lg:h-10 lg:mt-4 lg:mx-4">
        <button className="w-[3rem] pr-0.5 flex-center">
          <SearchStatus size={16} color="#666" />
        </button>

        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="جستجو شهر یا هتل ..."
          className="bg-transparent text-zinc-600 text-cs08 font-semibold pl-16 flex-1 placeholder:text-zinc-500 placeholder:font-semibold"
        />

        <button
          onClick={handleClearInput}
          className={`absolute inset-y-0 w-12 flex-center transition-all duration-300 ease-in-out ${inputValue ? 'opacity-100 left-0' : 'opacity-0 -left-full'}`}
        >
          <IoClose size={16} color="#888" />
        </button>
      </div>

      <CityOrHotelList
        handleClose={handleClose}
        cities={data?.data.cities}
        hotels={data?.data.hotels}
        isPending={status === 'pending'}
      />

      {/* === Submit */}
      {/* <button
  onClick={() => {
    handleClose();
    dispatch({
      type: 'CITY_OR_HOTEL',
      payload: { actionType: 'CONFIRMED-CITY-OR-HOTEL' },
      });
      }}
      className={`bg-cs-dark-blue text-white text-cs85 font-semibold h-11 mt-auto rounded-cs-10 lg:hidden`}
      >
        ثبت و ادامه فرآیند
      </button> */}
    </>
  );
}
