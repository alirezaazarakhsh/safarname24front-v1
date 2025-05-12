// Forcing next.js to render this component as client side component
'use client';

import Filter from '@/components/dashboard/favorites/filter';
import Image from 'next/image';
import Link from 'next/link';
// Importing part
import { ReactNode } from 'react';

// Defining fake data for collection to render later
const collections: {
  id: number;
  title: string;
  images: [string, string, string];
}[] = [
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
          <Link
            href={`/dashboard/favorites/${item.id}`}
            key={index}
            className="block"
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-2">
              <Image
                width={500}
                height={500}
                alt={'عکس شماره 1 مجموعه'}
                src={item.images[0]}
                className="rounded-md object-cover  row-span-2 w-full h-full"
              />
              <Image
                width={500}
                height={500}
                alt={'عکس شماره 2 مجموعه'}
                src={item.images[1]}
                className="rounded-md object-cover w-full h-full"
              />
              <Image
                width={500}
                height={500}
                alt={'عکس شماره 3 مجموعه'}
                src={item.images[2]}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <span className="font-semibold truncate block text-right text-black text-cs07">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
