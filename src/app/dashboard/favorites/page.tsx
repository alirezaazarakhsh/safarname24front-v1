// Forcing next.js to render this component as client side component
'use client';

// Importing part
import EmptyTable from '@/components/dashboard/api/emptyTable';
import ErrorTable from '@/components/dashboard/api/errorTable';
import Collection from '@/components/dashboard/favorites/collection';
import Filter from '@/components/dashboard/favorites/filter';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavorites } from '@/types/dashboard/api/get';
import { ReactNode, useEffect, useState } from 'react';

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

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await getData.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]'>
      {!getData.isLoading && getData.isError ? (
        <ErrorTable />
      ) : (
        <>
          <Filter
            refetch={getData.refetch}
            loading={getData.isLoading || getData.isRefetching}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
            listIsEmpty={getData.data?.results.length === 0}
          />
          <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]'>
            {getData.data && getData.data.results.length !== 0 ? (
              getData.data.results.map((item, index) => (
                <Collection
                  refetch={getData.refetch}
                  loading={getData.isLoading || getData.isRefetching}
                  isDeletingByUser={deleteState}
                  key={index}
                  data={{
                    id: item.id,
                    images: [
                      '/image/hotel/hotel-1.png',
                      '/image/hotel/hotel-1.png',
                      '/image/hotel/hotel-1.png',
                    ],
                    title: item.title,
                  }}
                />
              ))
            ) : (
              <EmptyTable
                className='lg:col-span-4 col-span-1'
                title='هیچ علاقه مندی فعلا ندارید!'
                description='مشتری گرامی برای ثبت  علاقه مندی میتوانید از وبسایت اقدام نمایید از همراهی شما متشکریم.'
              />
            )}
          </div>
          <div className='flex items-center lg:justify-end justify-center'>
            <CustomPagination
              loading={getData.isLoading || getData.isRefetching}
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
