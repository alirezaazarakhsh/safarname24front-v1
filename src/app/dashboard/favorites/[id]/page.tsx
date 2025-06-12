// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Filter from '@/components/dashboard/favoritesId/filter';
import { ReactNode, useEffect, useState } from 'react';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import FavItem from '@/components/dashboard/favoritesId/item';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavoritesSingle } from '@/types/dashboard/api/get';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';
import { useParams } from 'next/navigation';

// Creating and exporting favorites (single one , with id) page as default
export default function FavoritesPage(): ReactNode {
  // Defining states of component
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const params = useParams();
  const id = params.id;
  const [savedType, setSavedType] = useState<'savedHotels' | 'savedBlogs'>(
    'savedHotels',
  );

  // Fetching the data
  const getData = useApiQuery<GETFavoritesSingle>({
    url: `/profile/favorite-collections/${id}?p=${paginationNumber + 1}`,
    queryKey: ['favorites', 'collections'],
    options: {
      staleTime: 30000, // 30 Sec
      enabled: !!id,
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
      {(getData.isLoading && !getData.data) || getData.isRefetching ? (
        <>
          <Filter loading favName='X' />
          <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]'>
            {[...new Array(12)].map((_, index) => (
              <FavItem
                loading
                key={index}
                refetch={getData.refetch}
                data={{
                  id: index,
                  title: 'TITLE',
                }}
              />
            ))}
          </div>
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : getData.data?.count === 0 ? (
        <EmptyTable
          className='lg:col-span-4 col-span-1'
          title='هیچ آیتمی فعلا ندارید!'
          description='مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم.'
        />
      ) : (
        <>
          <Filter
            favName={getData.data?.results.title || 'نامعلوم'}
            onChange={(val) => setSavedType(val)}
          />
          <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]'>
            {Array.isArray(getData.data?.results?.favorites) &&
              getData.data?.results.favorites.map((item, index) => (
                <FavItem
                  loading
                  key={index}
                  refetch={getData.refetch}
                  data={{
                    id: item.id,
                    title: item.title,
                  }}
                />
              ))}
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
