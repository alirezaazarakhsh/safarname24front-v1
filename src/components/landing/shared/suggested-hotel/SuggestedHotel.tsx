///
import Link from 'next/link';
import Image from 'next/image';

import { numberSeparation } from '@/utils';
import { SuggestedHotel as Hotel } from '@/types';
import DiscountPercentage from './DiscountPercentage';
import { DynamicSuggestedHotelTimer } from './SuggestedHotelTimer';
import FavoriteButton from '../../modules/best-hotels/molecules/Favorite-hotel/FavoriteButton';

type Props = {
  hotel: Hotel;
  showTimer?: boolean;
  showDiscount?: boolean;
  showLike?: boolean;
};

// -----------------------------------------------

export function SuggestedHotel(props: Props) {
  const {
    hotel: {
      image,
      discountPercentage,
      timer,
      hotelName,
      province,
      city,
      stars,
      rating,
      price,
    },
    showTimer = true,
    showLike = true,
    showDiscount = true,
  } = props;

  return (
    <div className='bg-white p-2 rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)]'>
      {/* Image | Discount-Percentage | Timer */}
      <div className='relative bg-zinc-100 h-44 overflow-hidden rounded-cs-10'>
        {image && (
          <Image
            src={image}
            alt='hotel'
            width={300}
            height={300}
            className='full-size object-cover'
          />
        )}

        {showLike && <FavoriteButton />}

        {showDiscount && (
          <DiscountPercentage discountPercentage={discountPercentage} />
        )}

        {showTimer && <DynamicSuggestedHotelTimer timer={timer} />}
      </div>

      {/* Hotel-Information */}
      <div className='text-zinc-800 text-cs08 font-bold p-1.5 pb-1 mt-2.5 flex flex-col gap-2'>
        {/* Hotel-Name */}
        <h3 className='text-cs09 mb-1 font-extrabold flex items-center gap-1'>
          <span>هتل</span>
          <span>{hotelName}</span>
        </h3>

        {/* Province | City | Stars */}
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <span>استان</span>

            <div className='flex-center gap-0.5'>
              <span>{province}</span>
              <span>,</span>
              <span>{city}</span>
            </div>
          </div>

          <div className='bg-zinc-500 w-[2px] h-3 rounded'></div>

          <div className='flex items-center gap-1'>
            <span>{stars}</span>
            <span>ستاره</span>
          </div>
        </div>

        {/* Hotel-Rating */}
        <div className='flex-between items-center'>
          <span>امتیاز هتل :</span>

          <div className='font-bold flex items-center gap-1'>
            <span>{rating}</span>
            <span>امتیاز</span>
          </div>
        </div>

        {/* Hotel-Price */}
        <div className='flex-between items-center'>
          <span>شروع قیمت اتاق :</span>

          <div className='font-bold flex items-center gap-1'>
            <span>{numberSeparation(price)}</span>
            <span>تومان</span>
          </div>
        </div>

        {/* Hotel-Reservation */}
        <Link
          href={'/best-hotels/hotel'}
          className='bg-zinc-100 text-zinc-600 h-10 mt-2 flex-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-[#252525] hover:text-zinc-100'
        >
          مشاهده رزرو هتل
        </Link>
      </div>
    </div>
  );
}
