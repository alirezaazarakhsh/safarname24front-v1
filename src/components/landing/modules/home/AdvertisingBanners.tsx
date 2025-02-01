import Image from 'next/image';

export function AdvertisingBanners() {
  return (
    <div className='h-60 hidden grid-cols-2 gap-8 xl:grid'>
      {/* Right-Banner */}
      <div className='relative'>
        <Image
          src={'/image/banner/red-star-banner.png'}
          alt='hotel-sale-banner'
          width={800}
          height={600}
          className='full-size object-contain'
        />

        <Image
          src={'/image/banner/graphical-suitcase.png'}
          alt='graphical-suitcase'
          width={400}
          height={400}
          className='absolute -top-4 -left-4 w-60 h-60'
        />
      </div>

      {/* Left-Banner */}
      <div className='relative'>
        <Image
          src={'/image/banner/blue-star-banner.png'}
          alt='hotel-sale-banner'
          width={800}
          height={600}
          className='full-size object-contain'
        />

        <Image
          src={'/image/banner/graphical-hotel.png'}
          alt='graphical-hotel'
          width={400}
          height={400}
          className='absolute top-4 -left-4 w-60 h-60'
        />
      </div>
    </div>
  );
}
