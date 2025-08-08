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
import { Map } from 'iconsax-react';

import { IoClose } from 'react-icons/io5';
import { ICLocation } from '@/components/icons';

import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type Props = {
  hotelInfo: {
    city?: string;
    address?: string;
    hotelName?: string;
  };
  geoLocation: { lat?: number; lng?: number };
};
  
// ---------------------------------

//* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 16);
  }, [lat, lng, map]);

  return null;
}

// ---------------------------------

export function HotelMap(props: Props) {
  const {
    hotelInfo: { hotelName, city, address },
    geoLocation: { lat, lng },
  } = props;

  return (
    <Dialog>
      <DialogTrigger className="top-5 left-5 w-full h-10 px-4 mt-6 flex-center self-start gap-2 border border-zinc-200 rounded-lg md:absolute md:w-max md:mt-0 hover:bg-zinc-100/20">
        <Map size={20} color="#555" />

        <span className="text-zinc-700 font-bold">ورود به نقشه</span>
      </DialogTrigger>

      <DialogContent className="max-w-[30rem] w-5/6 p-0 gap-0">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        <div className="relative bg-zinc-200 aspect-square overflow-hidden rounded-2xl">
          <DialogClose className="absolute z-20 top-3 right-3 w-8 h-8 bg-white flex-center rounded-lg md:top-4 md:right-4">
            <IoClose className="text-zinc-700" />
          </DialogClose>

          <MapContainer
            zoom={16}
            center={[0, 0]}
            scrollWheelZoom={true}
            className="full-size z-10"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {lat && lng && (
              <>
                <Marker position={[lat, lng]} />
                <RecenterMap lat={lat} lng={lng} />
              </>
            )}
          </MapContainer>

          <div className="absolute z-20 bottom-0 inset-x-0 bg-white p-3.5 space-y-1.5 border-t-2 md:space-y-2 md:p-5">
            <div className="flex items-center gap-1.5">
              <ICLocation />

              <div className="text-zinc-700 text-cs08 font-extrabold flex-center gap-1">
                <span>هتل</span>
                <span>{hotelName}</span>
                <span>{city}</span>
              </div>
            </div>

            <p className="text-zinc-500 text-cs07 font-semibold">{address}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
