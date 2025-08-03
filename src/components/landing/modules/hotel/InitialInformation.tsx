'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

import { ICApartment, ICClock, ICLocation } from '@/components/icons';

export const HotelMap = dynamic(
  () => import('./molecules/HotelMap').then(({ HotelMap }) => HotelMap),
  {
    ssr: false,
    loading: () => (
      <button className="top-4 left-4 w-full h-10 px-4 mt-6 flex-center self-start gap-2 border-2 border-zinc-200 rounded-lg md:absolute md:w-max md:mt-0"></button>
    ),
  },
);

type Data = {
  name: string;
  city_name: string;
  stars: number;
  address: string;
  latitude: number;
  longitude: number;
  rooms_count: number;
  logo_preview: string;
  floors_count: number;
  check_in_time: string;
  check_out_time: string;
};

type ApiResponse = {
  data: Data;
};

type Props = {
  hotelSlug: string;
};

// -----------------------------------------

export function InitialInformation(props: Props) {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-information'],
    queryFn: () =>
      generalInstance(`/hotel/hotels/${props.hotelSlug}/introduction`),
  });

  if (status !== 'pending' && (!data || !data?.data)) return null;

  return (
    <>
      {status === 'pending' ? (
        <Skeleton className="h-72" />
      ) : (
        <div className="relative h-auto bg-white text-[clamp(0.75rem,2vw,0.8rem)] p-5 overflow-hidden border-2 border-zinc-200 rounded-xl md:text-cs75">
          {/* Logo | HotelName | City | Stars */}
          <div className="flex items-center gap-4">
            <div className="w-[clamp(4.5rem,3vw,5rem)] aspect-square overflow-hidden border-2 p-1 border-zinc-200 rounded-lg">
              {data?.data.logo_preview && (
                <Image
                  src={data?.data.logo_preview}
                  width={100}
                  height={100}
                  alt="hotel-logo"
                  className="full-size object-cover"
                />
              )}
            </div>

            <div className="space-y-1 flex-1">
              <div className="text-zinc-800 text-[clamp(0.8rem,2vw,0.85rem)] font-extrabold flex items-center gap-1 overflow-hidden">
                <span>هتل</span>
                <span className="max-w-40 truncate lg:max-w-32 xl:max-w-52">
                  {data?.data.name}
                </span>
                <span>{data?.data.city_name}</span>
              </div>

              <div className="font-bold flex items-center gap-1">
                <span>{data?.data.stars}</span>
                <span>ستاره</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="text-zinc-600 font-bold flex items-center gap-3 mt-6 mb-4">
            <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
              <ICLocation />
            </div>

            <div className="flex-1 flex items-center gap-1 overflow-hidden">
              <span>آدرس</span>
              <span className="mx-0.5">:</span>
              <span className="truncate">{data?.data.address}</span>
            </div>
          </div>

          {/* NumberOfRooms | NumberOfFloors | EntryTime | ExitTime */}
          <div className="text-zinc-600 font-bold grid gap-3 md:grid-cols-2 md:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
                <ICApartment />
              </div>

              <div className="flex-center gap-1">
                <span>تعداد اتاق</span>
                <span className="mx-0.5">:</span>
                <span>{data?.data.rooms_count}</span>
                <span>اتاق</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
                <ICApartment type={2} />
              </div>

              <div className="flex-center gap-1">
                <span>تعداد طبقات</span>
                <span className="mx-0.5">:</span>
                <span>{data?.data.floors_count}</span>
                <span>طبقه</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
                <ICClock className="w-5 h-5" />
              </div>

              <div className="flex-center gap-1">
                <span>ساعت ورود</span>
                <span className="mx-0.5">:</span>
                <span>{data?.data.check_in_time}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex-center border-2 border-zinc-200 rounded-md">
                <ICClock className="w-5 h-5" />
              </div>

              <div className="flex-center gap-1">
                <span>ساعت خروج</span>
                <span className="mx-0.5">:</span>
                <span>{data?.data.check_out_time}</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <HotelMap
            hotelInfo={{
              city: data?.data.city_name,
              hotelName: data?.data.name,
              address: data?.data.address,
            }}
            geoLocation={{
              lat: data?.data.latitude,
              lng: data?.data.longitude,
            }}
          />
        </div>
      )}
    </>
  );
}
