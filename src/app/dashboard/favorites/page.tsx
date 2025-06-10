// Forcing next.js to render this component as client side component
'use client';

import EmptyTable from '@/components/dashboard/api/emptyTable';
import ErrorTable from '@/components/dashboard/api/errorTable';
// Importing part
import Collection from '@/components/dashboard/favorites/collection';
import Filter from '@/components/dashboard/favorites/filter';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavorites } from '@/types/dashboard/api/get';
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
  const [paginationNumber, setPaginationNumber] = useState<number>(0);

  // Fetching the data
  const getData = useApiQuery<GETFavorites>({
    url: `/profile/favorite-collections?p=${paginationNumber + 1}`,
    queryKey: ['favorites', 'collections'],
    options: {
      staleTime: 30000, // 30 Sec
    },
  });

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]'>
      {!getData.isLoading && getData.isError ? (
        <ErrorTable />
      ) : (
        <>
          <Filter
            loading={getData.isLoading}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
          />
          <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]'>
            {getData.data && getData.data.results.length !== 0 ? (
              getData.data.results.map((item, index) => (
                <Collection
                  loading={getData.isLoading}
                  isDeletingByUser={deleteState}
                  key={index}
                  data={collections[index]}
                />
              ))
            ) : (
              <EmptyTable />
            )}
          </div>
          <div className='flex items-center lg:justify-end justify-center'>
            <CustomPagination
              loading={getData.isLoading}
              count={getData.data ? getData.data.count : 12}
              activeIndex={paginationNumber}
              setActiveIndex={setPaginationNumber}
            />
          </div>
        </>
      )}
    </main>
  );
}
