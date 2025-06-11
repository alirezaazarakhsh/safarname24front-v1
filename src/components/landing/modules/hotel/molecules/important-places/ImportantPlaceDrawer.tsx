import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer';

import Image from 'next/image';
import dynamic from 'next/dynamic';

import { Data } from '../../ImportantPlaces';
import { ICCarInRoad, ICUser } from '@/components/icons';

export const ImportantPlaceMap = dynamic(
  () =>
    import('./ImportantPlaceMap').then(
      ({ ImportantPlaceMap }) => ImportantPlaceMap,
    ),
  {
    ssr: false,
  },
);

// -----------------------------------------

export default function ImportantPlaceDrawer(props: Data) {
  const {
    image,
    title,
    latitude,
    distance,
    longitude,
    driving_time,
    walking_time,
  } = props;

  return (
    <Drawer>
      <DrawerTrigger className="bg-[#4B5BCE]/10 text-[#4B5BCE] text-cs75 font-semibold h-9 px-4 rounded-lg">
        اطلاعات بیشتر
      </DrawerTrigger>

      <DrawerContent className="text-[clamp(0.75rem,3vw,0.85rem)] font-semibold">
        <DrawerTitle className="hidden"></DrawerTitle>
        <DrawerDescription className="hidden"></DrawerDescription>

        {/* Image */}
        <div className="h-56 overflow-hidden rounded-xl">
          {image && (
            <Image
              src={image}
              width={500}
              height={400}
              alt="place-view"
              className="full-size object-cover"
            />
          )}
        </div>

        {/* Title */}
        <span className="text-zinc-800 text-[clamp(0.8rem,3vw,0.85rem)] font-extrabold mt-6 mb-4">
          {title}
        </span>

        {/* Distance => by-car | on-foot */}
        <div className="text-zinc-700 flex-between">
          <div className="flex-center gap-2">
            <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
              <ICCarInRoad />
            </div>

            <div className="flex-center gap-1">
              <span>ماشین</span>
              <span>:</span>
              <span>{driving_time}</span>
              <span>دقیقه</span>
            </div>
          </div>

          <div className="flex-center gap-2">
            <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
              <ICUser className="w-5 h-5" />
            </div>

            <div className="flex-center gap-1">
              <span>پیاده روی</span>
              <span>:</span>
              <span>{walking_time}</span>
              <span>دقیقه</span>
            </div>
          </div>
        </div>

        {/* Total-Distance | Map */}
        <div className="h-10 text-zinc-700 mt-4 flex gap-3">
          <div className="bg-cs-blue text-zinc-100 w-2/3 flex-center gap-1 rounded-lg">
            <span>مسافت کلی</span>
            <span>:</span>
            <span>{distance}</span>
            <span>کیلومتر</span>
          </div>

          <ImportantPlaceMap
            geoLocation={{ lat: Number(latitude), lng: Number(longitude) }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
