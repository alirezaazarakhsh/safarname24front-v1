// Forcing next.js to render this component as client side component
'use client';

import Filter from '@/components/dashboard/favorites/filter';
// Importing part
import { ReactNode } from 'react';

// Defining fake data for collection to render later
const collections: {
  id: number;
  images: [string, string, string];
}[] = [
  {
    id: 1,
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 2,
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 3,
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 4,
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 5,
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 6,
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
];

// Creating and exporting Favorites page as default
export default function Favorites(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]">
      <Filter />
    </main>
  );
}
