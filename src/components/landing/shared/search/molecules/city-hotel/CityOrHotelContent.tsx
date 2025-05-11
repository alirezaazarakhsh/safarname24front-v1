import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useEffect, useMemo } from 'react';
import { ArrowRight, SearchStatus } from 'iconsax-react';

import { useDebounce } from '@/hooks';
import { search } from '@/constants/landing';
import CityOrHotelItem from './CityOrHotelItem';
import { useSearchContext, useSearchDispatch } from '@/context/SearchContext';

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

// -----------------------------------

export default function CityOrHotelContent(props: Props) {
  const { handleClose } = props;

  const {
    cityOrHotel: { inputValue },
  } = useSearchContext();

  const dispatch = useSearchDispatch();
  const debouncedInputValue = useDebounce(inputValue, 500);

  // === Filtered Data-List
  const filteredList = useMemo(() => {
    if (debouncedInputValue.trim() === '') return search.city;

    return [
      ...search.city.filter(
        (item) =>
          item.city.includes(debouncedInputValue) ||
          item.province.includes(debouncedInputValue),
      ),
      ...search.hotel.filter(
        (item) =>
          item.hotel.includes(debouncedInputValue) ||
          item.city.includes(debouncedInputValue),
      ),
    ];
  }, [debouncedInputValue]);

  // Test
  useEffect(() => {
    if (debouncedInputValue) {
      console.log('ارسال درخواست برای:', debouncedInputValue);
    }
  }, [debouncedInputValue]);

  // === Handle InputValue-Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CITY_OR_HOTEL',
      payload: { actionType: 'INPUT-VALUE', value: e.target.value },
    });
  };

  // === Handle ResetInputValue (Clear)
  const handleClearInput = () => {
    dispatch({
      type: 'CITY_OR_HOTEL',
      payload: { actionType: 'CLEAR-INPUT-VALUE' },
    });
  };

  return (
    <>
      {/* === Logo | Title | Close */}
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
      <div className="relative bg-zinc-200/40 h-11 mt-8 flex overflow-hidden rounded-cs-10 lg:h-10 lg:mt-0">
        <button className="w-[3.3rem] pr-0.5 flex-center">
          <SearchStatus size={16} color="#666" />
        </button>

        <input
          type="text"
          value={inputValue}
          placeholder="جستجو شهر, هتل ..."
          onChange={handleInputChange}
          className="bg-transparent text-zinc-600 text-cs08 font-semibold pl-16 flex-1 placeholder:text-zinc-500 placeholder:font-semibold"
        />

        <button
          onClick={handleClearInput}
          className={`absolute inset-y-0 w-12 flex-center transition-all duration-300 ease-in-out ${inputValue ? 'opacity-100 left-0' : 'opacity-0 -left-full'}`}
        >
          <IoClose size={16} color="#888" />
        </button>
      </div>

      <div className="text-cs09 font-bold mt-6 mb-2.5 inline-block lg:text-cs85">
        شهر یا هتل های پرطرفدار
      </div>

      {/* === City-Hotel Items */}
      <div className="overflow-auto -mr-6 -ml-3 pl-3 mb-6 custom-scrollbar lg:h-[20rem] lg:-ml-1 lg:-mr-7">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <CityOrHotelItem {...item} key={index} handleClose={handleClose} />
          ))
        ) : (
          <div className="text-cs08 text-center text-gray-500 font-medium mt-4">
            نتیجه ای یافت نشد !
          </div>
        )}
      </div>

      {/* === Submit */}
      <button
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
      </button>
    </>
  );
}
