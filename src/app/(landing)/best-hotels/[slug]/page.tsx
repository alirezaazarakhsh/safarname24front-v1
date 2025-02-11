import { imageGallery } from '@/constants';
import { Pictures } from '@/components/landing/modules/hotel';

const pictures = [
  '/image/hotel/hotel-1.png',
  '/image/hotel/hotel-2.png',
  '/image/hotel/hotel-3.png',
  '/image/hotel/hotel-4.png',
  '/image/hotel/hotel-1.png',
];

export default function Hotel() {
  return (
    <>
      <Pictures pictures={pictures} gallery={imageGallery} />
    </>
  );
}
