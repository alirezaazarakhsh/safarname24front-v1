import Image from 'next/image';
import { numberSeparation } from '@/utils';

import { AmazingHotel as Hotel } from '@/types/landing';
import FavoriteButton from '../Favorite-hotel/FavoriteButton';
import Link from 'next/link';

type Props = {
  hotel: Hotel;
  isSpecialOffer?: boolean;
};

// -------------------------------------

export default function MHotelCard(props: Props) {
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
    <div
      className={`bg-white overflow-hidden rounded-xl ${isSpecialOffer ? '' : 'shadow-light'}`}
    >
      {/* Image | Discount-Percentage | Favorite-Status */}
      <div className="relative bg-zinc-100 h-44 m-3 overflow-hidden rounded-[11px]">
        <Link href={'/best-hotels/hotel'}>
          {image && (
            <Image
              src={image}
              width={500}
              height={300}
              alt="hotel-image"
              className="full-size object-cover"
            />
          )}
        </Link>

        <FavoriteButton />
        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-3 right-3 h-9 px-2.5 bg-cs-red text-white text-cs08 font-bold pt-0.5 flex-center gap-0.5 rounded-lg">
            <span>%</span>
            <span>{discountPercentage}</span>
          </div>
        )}
      </div>

      {/* HotelName | Province | City | Stars | Score | Address */}
      <div className="relative text-zinc-800 text-cs08 font-bold px-5 pt-1 mt-4 grid gap-2">
        <Link
          href={'/best-hotels/hotel'}
          className={`${isSpecialOffer || (numberOfComment ?? 0) > 0 ? 'w-[66%]' : 'w-full'}`}
        >
          <h3 className="text-cs09 font-extrabold mb-1 flex items-center gap-1 overflow-hidden">
            <span>هتل</span>
            <span
              className={`truncate ${isSpecialOffer || (numberOfComment ?? 0) > 0 ? '' : 'w-2/3'}`}
            >
              {hotelName}
            </span>
          </h3>
        </Link>

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

        {isSpecialOffer && (
          <div className="absolute top-0 left-3 bg-cs-blue/10 text-cs-blue text-cs07 px-4 py-2 rounded-lg">
            پیشنهاد ویژه
          </div>
        )}

        {(numberOfComment ?? 0) > 0 && (
          <div className="absolute top-0 left-3 bg-emerald-500/10 text-emerald-600 text-cs07 px-4 py-2 flex-center gap-1 rounded-lg">
            <span>{numberOfComment}</span>
            <span>دیدگاه</span>
          </div>
        )}
      </div>

      {/* H-Separator */}
      <div className="h-[2px] mt-4 custom-horizontal-dashed-line" />

      {/* NumberOfNights | DiscountedPrice | TotalPrice */}
      <div
        className={`relative text-zinc-800 font-bold p-5 flex-between items-center ${isSpecialOffer ? 'pt-9' : ''} ${!isSpecialOffer && discountedPrice > 0 ? 'pt-9 md:pt-5' : ''}`}
      >
        <div className="text-cs08 flex items-center gap-1">
          <span>قیمت برای</span>
          <span>{numberOfNights}</span>
          <span>شب اقامت :</span>
        </div>

        {isSpecialOffer && (
          <span className="absolute top-3 left-5 text-zinc-500 text-cs08 line-through">
            {numberSeparation(discountedPrice)}
          </span>
        )}

        {!isSpecialOffer && discountedPrice > 0 && (
          <span className="absolute top-3 left-5 text-zinc-500 text-cs08 line-through md:hidden">
            {numberSeparation(discountedPrice)}
          </span>
        )}

        <div className="text-cs85 font-extrabold flex items-center gap-1">
          <span>{numberSeparation(totalPrice)}</span>
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
}
