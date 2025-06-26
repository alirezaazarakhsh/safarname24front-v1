// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Filter from '@/components/dashboard/favoritesId/filter';
import { ReactNode, useEffect, useState } from 'react';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavoritesSingle } from '@/types/dashboard/api/get';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';
import { useParams } from 'next/navigation';
import { SuggestedHotel } from '@/components/landing/shared';
import Blog from '@/components/dashboard/favoritesId/blog';
import { Skeleton } from '@/components/ui/skeleton';

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
    queryKey: ['favorites', 'list'],
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

  const itemToRender = !getData.data
    ? []
    : savedType === 'savedHotels'
      ? getData.data.results.favorites.filter((item) => item.type === 'hotel')
      : getData.data.results.favorites.filter(
          (item) => item.type === 'article',
        );

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]'>
      {getData.isLoading || getData.isRefetching ? (
        <>
          <Filter loading favName='X' />
          <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]'>
            {[...new Array(12)].map((_, index) => (
              <Skeleton key={index} className='h-[200px] rounded-lg' />
            ))}
          </div>
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : getData.data && getData.data.count === 0 ? (
        <EmptyTable
          className='lg:col-span-4 col-span-1'
          title='هیچ آیتمی فعلا ندارید!'
          description='مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم.'
        />
      ) : getData.data && getData.data.count !== 0 ? (
        itemToRender.length === 0 ? (
          <>
            <Filter
              favName={getData.data.results.title}
              loading={false}
              onChange={setSavedType}
            />
            <EmptyTable
              className='lg:col-span-4 col-span-1'
              title='هیچ آیتمی فعلا ندارید!'
              description='مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم.'
            />
          </>
        ) : (
          <>
            <Filter
              favName={getData.data.results.title}
              loading={false}
              onChange={setSavedType}
            />
            <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]'>
              {itemToRender.map((item, index) => (
                <>
                  {savedType === 'savedHotels' && item.type === 'hotel' ? (
                    <SuggestedHotel
                      key={index}
                      showLike
                      showDiscount={false}
                      showTimer={false}
                      hotel={{
                        city: item.item_data.city.name,
                        discountPercentage: 0,
                        hotelName: item.item_data.name,
                        id: item.id,
                        image: item.item_data.main_image,
                        price: item.item_data.min_price || 0,
                        province: item.item_data.city.province,
                        rating: item.item_data.rating,
                        stars: item.item_data.stars,
                        timer: '',
                      }}
                    />
                  ) : savedType === 'savedBlogs' && item.type === 'article' ? (
                    <Blog
                      desc={item.item_data.summary}
                      createdAt={item.item_data.published_date}
                      image={item.item_data.thumbnail}
                      title={item.item_data.title}
                      mostVisited={false}
                    />
                  ) : (
                    false
                  )}
                </>
              ))}
            </div>
            {getData.data.count > 18 && (
              <div className='flex items-center lg:justify-end justify-center'>
                <CustomPagination
                  count={getData.data.count}
                  activeIndex={paginationNumber}
                  setActiveIndex={setPaginationNumber}
                />
              </div>
            )}
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
