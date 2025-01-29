import Link from 'next/link';
import Image from 'next/image';
import { numberSeparation } from '@/utils';
import DiscountPercentage from './DiscountPercentage';
import { DynamicSuggestedHotelTimer } from './SuggestedHotelTimer';

type Props = {
  image: string;
  discountPercentage: number;
  timer: string;
  hotelName: string;
  province: string;
  city: string;
  stars: number;
  rating: number;
  price: number;
};

export function SuggestedHotel(props: Props) {
  const { image, discountPercentage, timer, hotelName, province, city, stars, rating, price } = props;

  return (
    <div className='bg-white p-2 rounded-xl'>
      {/* Image | Discount-Percentage | Timer */}
      <div className='relative bg-zinc-100 h-40 overflow-hidden rounded-cs-10'>
        <Image src={image} alt='hotel' width={300} height={300} className='full-size object-cover' />

        <DiscountPercentage discountPercentage={discountPercentage} />
        <DynamicSuggestedHotelTimer timer={timer} />
      </div>

      {/* Hotel-Information */}
      <div className='text-zinc-900 text-cs08 font-semibold p-1 mt-3 flex flex-col gap-2'>
        {/* Hotel-Name */}
        <h3 className='text-cs85 font-bold flex items-center gap-1'>
          <span>هتل</span>
          <span>{hotelName}</span>
        </h3>

        {/* Province | City | Stars */}
        <div className='flex items-center gap-2 mb-1'>
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
          href={''}
          className='bg-zinc-100 text-zinc-600 text-cs75 h-9 mt-2 flex-center rounded-cs-10 transition-colors duration-200 ease-in-out hover:bg-[#252525] hover:text-zinc-100'
        >
          مشاهده رزرو هتل
        </Link>
      </div>
    </div>
  );
}
