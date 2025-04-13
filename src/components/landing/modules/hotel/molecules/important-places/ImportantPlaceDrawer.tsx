import Image from 'next/image';
import { ImportantPlaceMap } from './ImportantPlaceMap';
import { ICCarInRoad, ICUser } from '@/components/icons';

import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

type Props = {
  importantPlace: {
    title: string;
    image: string;
    distances: { byCar: number; onFoot: number; totalDistance: number };
    geolocation: { lat: number; lng: number };
  };
};

// -----------------------------------------

export default function ImportantPlaceDrawer(props: Props) {
  const {
    importantPlace: { title, image, distances, geolocation },
  } = props;

  return (
    <Drawer>
      <DrawerTrigger className='bg-[#4B5BCE]/10 text-[#4B5BCE] text-cs75 font-semibold h-9 px-4 rounded-lg'>
        اطلاعات بیشتر
      </DrawerTrigger>

      <DrawerContent className='text-cs08 font-semibold'>
        <DrawerTitle className='hidden'></DrawerTitle>
        <DrawerDescription className='hidden'></DrawerDescription>

        {/* Image */}
        <div className='h-56 overflow-hidden rounded-xl'>
          <Image src={image} alt='place-view' width={500} height={400} className='full-size object-cover' />
        </div>

        {/* Title */}
        <span className='text-zinc-800 text-cs85 font-extrabold mt-6 mb-4'>{title}</span>

        {/* Distance => by-car | on-foot */}
        <div className='text-zinc-700 flex-between'>
          <div className='flex-center gap-2'>
            <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
              <ICCarInRoad />
            </div>

            <div className='flex-center gap-1'>
              <span>ماشین</span>
              <span>:</span>
              <span>{distances.byCar}</span>
              <span>دقیقه</span>
            </div>
          </div>

          <div className='flex-center gap-2'>
            <div className='w-9 h-9 flex-center border-2 border-zinc-200 rounded-md'>
              <ICUser className='w-5 h-5' />
            </div>

            <div className='flex-center gap-1'>
              <span>پیاده روی</span>
              <span>:</span>
              <span>{distances.onFoot}</span>
              <span>دقیقه</span>
            </div>
          </div>
        </div>

        {/* Total-Distance | Map */}
        <div className='h-10 text-zinc-700 mt-5 flex gap-3'>
          <div className='bg-cs-blue text-zinc-100 w-2/3 flex-center gap-1 rounded-lg'>
            <span>مسافت کلی</span>
            <span>:</span>
            <span>{distances.byCar}</span>
            <span>کیلومتر</span>
          </div>

          <ImportantPlaceMap geoLocation={geolocation} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
