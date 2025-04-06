import Link from 'next/link';
import Image from 'next/image';

import { numberSeparation } from '@/utils';
import { AmazingHotel as Hotel } from '@/types/landing';
import FavoriteButton from '../Favorite-hotel/FavoriteButton';

type Props = {
  hotel: Hotel;
  isSpecialOffer?: boolean;
};

// -------------------------------------

export default function DHotelCard(props: Props) {
  const {
    hotel: {
      image,
      hotelName,
      province,
      city,
      stars,
      score,
      address,
      numberOfNights,
      numberOfComment,
      discountPercentage,
      discountedPrice,
      totalPrice,
    },
    isSpecialOffer = true,
  } = props;

  return (
    <div className="bg-white grid grid-cols-[1fr_2px_15rem] overflow-hidden rounded-2xl shadow-light">
      <div className="p-4 grid grid-cols-[16rem_1fr] gap-5">
        {/* Image | Favorite-Status */}
        <div className="relative bg-zinc-100 h-44 overflow-hidden rounded-xl">
          <FavoriteButton />
          {image && (
            <Image
              src={image}
              width={500}
              height={400}
              alt="hotel-image"
              className="full-size object-cover"
            />
          )}
        </div>

        {/* HotelName | Province | City | Stars | Score | Address | NumberOfNights */}
        <div className="text-zinc-800 text-cs08 font-bold pt-2 flex flex-col gap-2 overflow-hidden">
          <h3 className="text-cs95 font-extrabold mb-1 flex items-center gap-1 overflow-hidden">
            <span>هتل</span>
            <span className="truncate">{hotelName}</span>
          </h3>

          <div className="truncate flex items-center gap-1">
            <span>استان</span>
            <span className="truncate">{province}</span>
            <span>,</span>
            <span className="truncate">{city}</span>
            <span className="mx-0.5">|</span>
            <span>{stars}</span>
            <span>ستاره</span>
          </div>

          <div className="flex items-center gap-1">
            <span>{score}</span>
            <span>امتیاز کاربران</span>
          </div>

          <p className="truncate">{address}</p>

          <div className="bg-zinc-100 text-cs75 w-max px-4 py-2 mt-auto flex items-center gap-1 rounded-lg">
            <span>{numberOfNights}</span>
            <span>شب اقامت</span>
          </div>
        </div>
      </div>

      {/* V-Separator */}
      <div className="custom-vertical-dashed-line"></div>

      {/* DiscountPercentage | DiscountedPrice | TotalPrice */}
      <div className="text-zinc-800 text-cs08 font-bold p-5 flex flex-col gap-3">
        <div className="flex-between">
          {isSpecialOffer && (
            <div className="bg-cs-blue/10 text-cs-blue text-cs75 px-3 py-2 flex flex-col gap-0.5 items-center rounded-lg">
              <span>پیشنهاد</span>
              <span>ویژه</span>
            </div>
          )}

          {(numberOfComment ?? 0) > 0 && (
            <div className="h-9 bg-emerald-500/10 text-emerald-600 text-cs07 px-4 flex-center gap-1 rounded-lg">
              <span>{numberOfComment}</span>
              <span>دیدگاه</span>
            </div>
          )}

          {discountPercentage > 0 && (
            <div className="h-9 bg-cs-red/10 text-cs-red text-cs75 font-extrabold px-4 pt-1 mr-auto flex-center gap-0.5 border-2 border-cs-red border-dashed rounded-lg">
              <span>%</span>
              <span>{discountPercentage}</span>
              <span className="mr-0.5">تخفیف</span>
            </div>
          )}
        </div>

        <div className="relative mt-auto flex-between items-center">
          {discountedPrice > 0 && (
            <span className="absolute -top-6 left-0 text-zinc-500/80 line-through">
              {numberSeparation(discountedPrice)}
            </span>
          )}

          {discountedPrice ? <span>قیمت کل :</span> : <span>شروع قیمت :</span>}

          <div className="text-cs85 font-extrabold flex items-center gap-1">
            <span>{numberSeparation(totalPrice)}</span>
            <span>تومان</span>
          </div>
        </div>

        <Link
          href={''}
          className="bg-cs-dark-blue text-white text-cs75 font-semibold h-10 flex-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-cs-dark-blue/95"
        >
          مشاهده اتاق ها
        </Link>
      </div>
    </div>
  );
}
