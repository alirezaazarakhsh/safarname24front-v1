// Forcing next.js to render this component as client side component
'use client';

import Collection from '@/components/dashboard/favorites/collection';
// Importing part
import Filter from '@/components/dashboard/favorites/filter';
import { CollectionComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Defining fake data for collection to render later
const collections: CollectionComponentPropsType[] = [
  {
    id: 1,
    title: 'لیست هتل های مورد پسندم',
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 2,
    title: 'لیست هتل های مورد پسندم',
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 3,
    title: 'لیست هتل های مورد پسندم',
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 4,
    title: 'لیست هتل های مورد پسندم',
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 5,
    title: 'لیست هتل های مورد پسندم',
    images: [
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
      '/image/hotel/hotel-1.png',
    ],
  },
  {
    id: 6,
    title: 'لیست هتل های مورد پسندم',
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
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-[24px]">
        {collections.map((item, index) => (
          <Collection key={index} {...item} />
        ))}
      </div>
    </main>
  );
}
