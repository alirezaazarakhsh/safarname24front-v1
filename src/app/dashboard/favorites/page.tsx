// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Collection from '@/components/dashboard/favorites/collection';
import Filter from '@/components/dashboard/favorites/filter';
import { ReactNode, useState } from 'react';

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
  // Defining states of component
  const [deleteState, setDeleteState] = useState<boolean>(false);

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]'>
      <Filter deleteState={deleteState} setDeleteState={setDeleteState} />
      <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 gap-[24px]'>
        {collections.map((item, index) => (
          <Collection isDeletingByUser={deleteState} key={index} data={item} />
        ))}
      </div>
    </main>
  );
}
