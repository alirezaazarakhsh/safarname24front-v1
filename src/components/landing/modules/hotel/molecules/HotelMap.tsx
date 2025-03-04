'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ICLocation } from '@/components/icons';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { IoClose } from 'react-icons/io5';

type Props = {
  hotelInfo: {
    hotelName: string;
    city: string;
    address: string;
  };
  geoLocation: { lat: number; lng: number };
};

// ---------------------------------------

//* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

export function HotelMap(props: Props) {
  const {
    hotelInfo: { hotelName, city, address },
    geoLocation: { lat, lng },
  } = props;

  return (
    <Dialog>
      <DialogTrigger className='top-4 left-4 w-full h-10 px-4 mt-6 flex-center self-start gap-2 border-2 border-zinc-200 rounded-lg md:absolute md:w-max md:mt-0'>
        <svg
          width='18'
          height='17'
          className='w-5 h-5'
          viewBox='0 0 18 17'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.9354 14.9671C14.7937 14.9671 14.6591 14.9105 14.56 14.8113L10.0408 10.2921C9.83536 10.0867 9.83536 9.74671 10.0408 9.5413L15.5162 4.06588C15.6508 3.9313 15.8562 3.88171 16.0404 3.9313C16.2245 3.98796 16.3662 4.13672 16.4087 4.32088C16.5433 4.92297 16.6141 5.59588 16.6141 6.37504V10.625C16.6141 12.5871 16.2033 13.9117 15.3108 14.8113C15.2116 14.9105 15.0629 14.9317 14.9354 14.9671ZM11.167 9.91671L14.8929 13.6425C15.3391 12.9555 15.5516 11.978 15.5516 10.625V6.37504C15.5516 6.08463 15.5445 5.81547 15.5233 5.56047L11.167 9.91671Z'
            fill='#2B2B2B'
          />
          <path
            d='M4.94059 15.9233C4.89809 15.9233 4.86269 15.9162 4.82019 15.9091C2.4756 15.3708 1.38477 13.692 1.38477 10.625V6.37496C1.38477 2.52871 3.0281 0.885376 6.87435 0.885376H11.1243C14.1914 0.885376 15.8702 1.97621 16.4085 4.3208C16.451 4.49788 16.3944 4.68913 16.2669 4.81663L5.31601 15.7675C5.21684 15.8666 5.08226 15.9233 4.94059 15.9233ZM6.87435 1.94788C3.60893 1.94788 2.44727 3.10954 2.44727 6.37496V10.625C2.44727 13.0829 3.12727 14.3154 4.77769 14.8041L15.2964 4.28538C14.8148 2.63496 13.5752 1.95496 11.1173 1.95496H6.87435V1.94788Z'
            fill='#2B2B2B'
          />
          <path
            d='M11.1258 16.1146H6.87575C6.09659 16.1146 5.43076 16.0509 4.82159 15.9092C4.63034 15.8667 4.48158 15.725 4.43199 15.5409C4.37533 15.3567 4.432 15.1584 4.56658 15.0167L10.042 9.54127C10.2474 9.33585 10.5874 9.33585 10.7928 9.54127L15.312 14.0604C15.4112 14.1596 15.4678 14.2942 15.4678 14.4359C15.4678 14.5775 15.4112 14.7121 15.312 14.8113C14.4124 15.7038 13.0878 16.1146 11.1258 16.1146ZM6.06117 15.0238C6.31617 15.045 6.58534 15.0521 6.87575 15.0521H11.1258C12.4858 15.0521 13.4562 14.8396 14.1433 14.3934L10.4174 10.6675L6.06117 15.0238Z'
            fill='#2B2B2B'
          />
          <path
            d='M6.96073 9.42787C6.51448 9.42787 6.06822 9.26495 5.71406 8.93203C4.58781 7.86245 4.13449 6.68662 4.40366 5.53912C4.67283 4.36329 5.6999 3.56995 6.96073 3.56995C8.22156 3.56995 9.24866 4.36329 9.51783 5.53912C9.77991 6.69371 9.32656 7.86245 8.20031 8.93203C7.85323 9.25787 7.40698 9.42787 6.96073 9.42787ZM5.43782 5.77286C5.21115 6.7362 5.86281 7.60037 6.45073 8.15995C6.74115 8.4362 7.1874 8.4362 7.47073 8.15995C8.05157 7.60745 8.70323 6.74328 8.48364 5.77286C8.29239 4.92995 7.54156 4.62537 6.96073 4.62537C6.3799 4.62537 5.63615 4.92995 5.43782 5.77286Z'
            fill='#2B2B2B'
          />
          <path
            d='M6.98177 6.72209C6.59219 6.72209 6.27344 6.40334 6.27344 6.01375C6.27344 5.62417 6.5851 5.30542 6.98177 5.30542H6.98886C7.37844 5.30542 7.69719 5.62417 7.69719 6.01375C7.69719 6.40334 7.37135 6.72209 6.98177 6.72209Z'
            fill='#2B2B2B'
          />
        </svg>

        <span className='text-zinc-700 font-bold'>ورود به نقشه</span>
      </DialogTrigger>

      <DialogContent className='max-w-[30rem] w-5/6 p-0 gap-0'>
        <DialogTitle className='hidden'></DialogTitle>
        <DialogDescription className='hidden'></DialogDescription>

        <div className='relative bg-zinc-200 aspect-square overflow-hidden rounded-2xl'>
          <DialogClose className='absolute z-20 top-3 right-3 w-8 h-8 bg-white flex-center rounded-lg md:top-4 md:right-4'>
            <IoClose className='text-zinc-700' />
          </DialogClose>

          <MapContainer className='full-size z-10' center={[lat ?? 0, lng ?? 0]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={[lat ?? 0, lng ?? 0]}></Marker>
          </MapContainer>

          <div className='absolute z-20 bottom-0 inset-x-0 bg-white p-3.5 space-y-1.5 border-t-2 md:space-y-2 md:p-5'>
            <div className='flex items-center gap-1.5'>
              <ICLocation />

              <div className='text-zinc-700 text-cs08 font-extrabold flex-center gap-1'>
                <span>هتل</span>
                <span>{hotelName}</span>
                <span>{city}</span>
              </div>
            </div>

            <p className='text-zinc-500 text-cs07 font-semibold'>{address}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
