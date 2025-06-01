import Image from 'next/image';
import { numberSeparation } from '@/utils';
import { ICStar } from '@/components/icons';
import { BestSellingHotel as Hotel } from '@/types';

type Props = {
  hotel: Hotel;
};

// -----------------------------------------------

export default function BestSellingHotelA(props: Props) {
  const {
    hotel: {
      hotelName,
      image,
      province,
      city,
      stars,
      rating,
      numberOfReservations,
      price,
    },
  } = props;

  return (
    <div className="relative bg-white p-3 flex gap-4 rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] xl:py-4">
      {/* Image */}
      <div className="bg-zinc-100 w-32 h-40 overflow-hidden rounded-cs-10 xl:h-32 xl:rounded-xl">
        {image && (
          <Image
            src={image}
            width={300}
            height={300}
            alt={'hotel-picture'}
            className="full-size object-cover"
          />
        )}
      </div>

      {/* Hotel-Details */}
      <div className="text-zinc-800 text-cs08 font-bold pl-1.5 py-2 flex-1 flex flex-col gap-2 overflow-hidden xl:pt-3 xl:pb-0 xl:pl-2">
        {/* Hotel-Name */}
        <h3 className="text-cs09 font-extrabold flex items-center gap-1">
          <span>هتل</span>
          <span className="truncate flex-1 xl:max-w-40">{hotelName}</span>
        </h3>

        {/* Province | City | Stars */}
        <div className="text-zinc-500 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span>استان</span>

            <div className="flex-center gap-0.5">
              <span className="max-w-20 truncate">{province}</span>
              <span>,</span>
              <span className="max-w-12 truncate xl:max-w-16">{city}</span>
            </div>
          </div>

          <div className="bg-zinc-300 w-[2px] h-3 rounded"></div>

          <div className="flex items-center gap-1">
            <span>{stars}</span>
            <span>ستاره</span>
          </div>
        </div>

        {/* Hotel-Rating (Small-Device) */}
        <div className="w-max h-7 bg-[#4B5BCE]/20 text-[#4B5BCE] text-cs75 px-3 mt-1 mb-2 flex items-center gap-1.5 rounded-md xl:hidden">
          <ICStar className="w-3.5 h-3.5" fill="#4B5BCE" />
          <span className="font-bold pt-0.5">{rating}</span>
        </div>

        {/* Hotel-Price */}
        <div className="relative flex-between items-center gap-2 mt-auto">
          <div className="absolute -top-6 left-0 text-cs07 text-zinc-500 font-bold flex-center gap-1">
            <span>بیش از</span>
            <span>{numberOfReservations}</span>
            <span>رزرو</span>
          </div>

          <span>شروع قیمت اتاق :</span>

          <div className="text-cs85 font-extrabold flex items-center gap-1">
            <span>{numberSeparation(price)}</span>
            <span>تومان</span>
          </div>
        </div>
      </div>

      {/* Hotel-Rating (Large-Device) */}
      <div className="absolute top-0 left-5 w-9 h-12 bg-[#4B5BCE] text-zinc-100 text-cs07 place-items-center hidden rounded-b-full xl:grid">
        <span className="font-bold">{rating}</span>
        <ICStar className="w-3.5 h-3.5 -mt-3.5" fill="#f4f4f5" />
      </div>
    </div>
  );
}
