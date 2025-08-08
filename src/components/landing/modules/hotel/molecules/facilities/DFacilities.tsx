import 'swiper/css';
import '@/styles/swiper.css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { TickSquare } from 'iconsax-react';

import SwitchCase from './molecules/SwitchCase';
import Navigation from './molecules/Navigation';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

type Data = {
  name: string;
  facilities: Facility[];
  room_facilities: Facility[];
};

type Props = { facilities?: Data };
type FacilitiesType = 'hotel' | 'room';
type Facility = { title: string; icon: { link: string } };
type ChunkArrayProps = { array?: Facility[]; chunkSize?: number };

// ------------------------------

export function DFacilities(props: Props) {
  const { facilities } = props;

  const swiperRef = useRef<SwiperType>(null);
  const [facilitiesType, setFacilitiesType] = useState<FacilitiesType>('hotel');

  const handleSetFacilitiesType = (type: FacilitiesType) => {
    setFacilitiesType(type);
  };

  // === Making chunked array, by custom-size
  function chunkArray(props: ChunkArrayProps) {
    const { array, chunkSize = 18 } = props;
    if (!array) return;
    const result = [];

    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }

    return result;
  }

  const facilitiesList = chunkArray({ array: facilities?.facilities });
  const roomFacilitiesList = chunkArray({ array: facilities?.room_facilities });

  const finalList =
    facilitiesType === 'hotel' ? facilitiesList : roomFacilitiesList;

  return (
    <div className="hidden md:block">
      <div className="absolute top-0 left-0 z-10">
        <SwitchCase
          facilitiesType={facilitiesType}
          setFacilitiesType={handleSetFacilitiesType}
        />
      </div>

      <div className="relative bg-white h-56 p-5 flex border-2 overflow-hidden rounded-2xl lg:h-48">
        {/* === Content */}
        <Swiper
          spaceBetween={15}
          slidesPerView={1}
          direction="vertical"
          modules={[Pagination]}
          pagination={{
            enabled: true,
            clickable: true,
            dynamicBullets: true,
          }}
          className="facilities-swiper w-full"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {finalList?.map((item, index) => (
            <SwiperSlide key={index} className="overflow-hidden select-none">
              <div className="w-[calc(100%-3rem)] h-full grid grid-cols-4 grid-rows-3 gap-4 lg:grid-cols-5 xl:grid-cols-6">
                {item.map((item, index) => (
                  <div key={index} className="flex items-center gap-2.5">
                    {item?.icon?.link ? (
                      <Image
                        alt="icon"
                        width={24}
                        height={24}
                        src={item?.icon?.link}
                      />
                    ) : (
                      <TickSquare size={22} color="#444" />
                    )}

                    <span className="text-zinc-700 text-cs08 font-bold flex-1 truncate">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {Number(finalList?.length) > 1 && (
          <Navigation
            slidePrev={() => swiperRef.current?.slidePrev()}
            slideNext={() => swiperRef.current?.slideNext()}
          />
        )}
      </div>
    </div>
  );
}
