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
import { IoClose } from 'react-icons/io5';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

type Props = {
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
    map.setView([lat, lng], 17);
  }, [lat, lng, map]);

  return null;
}

// ---------------------------------

export function ImportantPlaceMap(props: Props) {
  const {
    geoLocation: { lat, lng },
  } = props;

  return (
    <Dialog>
      <DialogTrigger className="bg-zinc-100 text-zinc-800 text-cs08 font-semibold w-1/3 bottom-4 left-4 backdrop-blur-lg rounded-lg lg:absolute lg:w-max lg:h-9 lg:text-cs75 lg:font-bold lg:px-5">
        <span className="lg:hidden">نقشه آدرس</span>
        <span className="hidden lg:block">مشاهده نقشه آدرس</span>
      </DialogTrigger>

      <DialogContent className="max-w-[36rem] w-5/6 p-0 gap-0">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        <div className="relative bg-zinc-200 aspect-square overflow-hidden rounded-2xl">
          <DialogClose className="absolute z-20 top-3 right-3 w-8 h-8 bg-white flex-center rounded-lg md:top-4 md:right-4">
            <IoClose />
          </DialogClose>

          <MapContainer
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
