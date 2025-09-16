// Forcing next.js to render this component as client side component
'use client';

// Importing part
import EmptyTable from '@/components/dashboard/api/emptyTable';
import ErrorTable from '@/components/dashboard/api/errorTable';
import Collection from '@/components/dashboard/favorites/collection';
import Filter from '@/components/dashboard/favorites/filter';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavorites } from '@/types/dashboard/api/get';
import { ReactNode, useState } from 'react';

// Defining code used for showing svg icon instead of image as placeholder in collection components
const emptyCollectionCode = 'EmptyCollectionImage';

// Creating and exporting Favorites page as default
export default function Favorites(): ReactNode {
  // Defining states of component
  const [deleteState, setDeleteState] = useState<boolean>(false);

  // Fetching the data
  const getData = useApiQuery<GETFavorites>({
    url: `/favorite/collections`,
    queryKey: ['favoritesCollection'],
    options: {
      staleTime: 30000, // 30 Sec
    },
  });

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-10 gap-[24px] lg:px-5 px-[24px]">
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
                  images: new Array(3).fill(emptyCollectionCode) as [
                    string,
                    string,
                    string,
                  ],
                }}
              />
            ))}
          </div>
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={getData.refetch} />
      ) : getData.data && getData.data.length === 0 ? (
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
      ) : getData.data && getData.data.length !== 0 ? (
        <>
          <Filter
            refetch={getData.refetch}
            deleteState={deleteState}
            setDeleteState={setDeleteState}
            listIsEmpty={false}
          />
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
            {getData.data.map((item, index) => (
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
                            emptyCollectionCode,
                          ]
                        : item.thumbnails.length === 1
                          ? [
                              item.thumbnails[0],
                              emptyCollectionCode,
                              emptyCollectionCode,
                            ]
                          : [
                              emptyCollectionCode,
                              emptyCollectionCode,
                              emptyCollectionCode,
                            ],
                  title: item.title,
                }}
              />
            ))}
          </div>
        </>
      ) : (
        false
      )}
    </main>
  );
}
