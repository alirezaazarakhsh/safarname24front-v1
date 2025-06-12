'use client';

import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { IoClose } from 'react-icons/io5';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

import { generalInstance } from '@/utils/services';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type Data = {
  latitude: string;
  longitude: string;
};

type ApiResponse = {
  data: Data;
};

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// ------------------------------

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 16);
  }, [lat, lng, map]);

  return null;
}

// ------------------------------

export function Location() {
  const { data, isSuccess } = useQuery<ApiResponse>({
    queryKey: ['config-location'],
    queryFn: () => generalInstance('/config/location'),
  });

  const latitude = data?.data.latitude;
  const longitude = data?.data.longitude;

  const lat = latitude ? Number(latitude) : null;
  const lng = longitude ? Number(longitude) : null;

  return (
    <>
      <div className="flex items-center gap-3.5">
        <div className="bg-zinc-100 w-12 h-12 flex-center rounded-lg">
          <IconsaxIcons name="Location" size={22} />
        </div>

        <div className="text-cs85 font-bold flex flex-col gap-1">
          <span>موقعیت هتل :</span>

          <Dialog>
            <DialogTrigger className="text-blue-500 text-right underline">
              مشاهده
            </DialogTrigger>

            <DialogContent className="w-[85%] p-0 aspect-square overflow-hidden">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>

              <DialogClose className="absolute top-4 right-4 bg-white flex-center w-8 h-8 rounded-md">
                <IoClose />
              </DialogClose>

              <MapContainer
                zoom={16}
                center={[0, 0]}
                scrollWheelZoom={true}
                className="full-size -z-10"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {isSuccess && lat !== null && lng !== null && (
                  <>
                    <Marker position={[lat, lng]} />
                    <RecenterMap lat={lat} lng={lng} />
                  </>
                )}
              </MapContainer>

              <div className="absolute inset-x-4 bottom-5 bg-white p-4 rounded-xl">
                <div className="flex items-center gap-2">
                  <IconsaxIcons name="Location" size={18} />
                  <span className="text-cs85 font-bold">هتل اسپیناس پالاس</span>
                </div>

                <p className="text-zinc-600 text-cs08 font-semibold mt-1">
                  تهران، جردن نرسیده به بانک پارسیان، نبش کوچه رضایی پلاک 20
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
}
