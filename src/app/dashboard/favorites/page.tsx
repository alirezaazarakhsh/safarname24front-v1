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
    url: `/favorite/collections?p=${paginationNumber + 1}`,
    queryKey: ['favoritesCollection'],
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
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]">
      {getData.isLoading || getData.isRefetching ? (
        <>
          <Filter
            loading
            deleteState={false}
            setDeleteState={setDeleteState}
            listIsEmpty={false}
          />
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
            {[...new Array(12)].map((_, index) => (
              <Collection
                loading
                isDeletingByUser={deleteState}
                key={index}
                refetch={getData.refetch}
                data={{
                  id: index,
                  title: 'TITLE',
                  images: [
                    '/image/hotel/hotel-1.png',
                    '/image/hotel/hotel-1.png',
                    '/image/hotel/hotel-1.png',
                  ],
                }}
              />
            ))}
            <div className="flex items-center lg:justify-end justify-center">
              <CustomPagination count={18} loading />
            </div>
          </div>
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={getData.refetch} />
      ) : getData.data && getData.data.count === 0 ? (
        <>
          <Filter
            deleteState={deleteState}
            setDeleteState={setDeleteState}
            listIsEmpty
            refetch={getData.refetch}
          />
          <EmptyTable
            className="lg:col-span-4 col-span-1 lg:bg-transparent border-none"
            title="هیچ علاقه مندی فعلا ندارید!"
            description="مشتری گرامی برای ثبت  علاقه مندی میتوانید از وبسایت اقدام نمایید از همراهی شما متشکریم."
          />
        </>
      ) : getData.data && getData.data.count !== 0 ? (
        <>
          <Filter
            refetch={getData.refetch}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
            listIsEmpty={false}
          />
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
            {getData.data.results.map((item, index) => (
              <Collection
                refetch={getData.refetch}
                isDeletingByUser={deleteState}
                key={index}
                data={{
                  id: item.id,
                  images:
                    item.thumbnails.length === 3
                      ? item.thumbnails
                      : item.thumbnails.length === 2
                        ? [
                            item.thumbnails[0],
                            item.thumbnails[1],
                            '/image/dashboardFavorites/empty-favorite.jpg',
                          ]
                        : item.thumbnails.length === 1
                          ? [
                              item.thumbnails[0],
                              '/image/dashboardFavorites/empty-favorite.jpg',
                              '/image/dashboardFavorites/empty-favorite.jpg',
                            ]
                          : [
                              '/image/dashboardFavorites/empty-favorite.jpg',
                              '/image/dashboardFavorites/empty-favorite.jpg',
                              '/image/dashboardFavorites/empty-favorite.jpg',
                            ],
                  title: item.title,
                }}
              />
            ))}
          </div>
          {getData.data.count > 18 && (
            <div className="flex items-center lg:justify-end justify-center">
              <CustomPagination
                count={getData.data.count}
                activeIndex={paginationNumber}
                setActiveIndex={setPaginationNumber}
              />
            </div>
          )}
        </>
      ) : (
        false
      )}
    </main>
  );
}
