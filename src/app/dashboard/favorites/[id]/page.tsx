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
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import DeleteItemDialog from '@/components/dashboard/favoritesId/dialog/deleteItemDialog';

// Creating and exporting favorites (single one , with id) page as default
export default function FavoritesPage(): ReactNode {
  // Defining states of component
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [deleteDialogOpened, setDeleteDialogOpened] = useState<boolean>(false);
  const [deleteDialogId, setDeleteDialogId] = useState<number | undefined>(
    undefined,
  );
  const params = useParams();
  const id = params.id;
  const [savedType, setSavedType] = useState<'savedHotels' | 'savedBlogs'>(
    'savedHotels',
  );

  // Fetching the data
  const getData = useApiQuery<GETFavoritesSingle>({
    url: `/favorite/collections/${id}?p=${paginationNumber + 1}`,
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
      ? getData.data.results.items.filter((item) => item.type === 'hotel')
      : getData.data.results.items.filter((item) => item.type === 'article');

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]">
      {getData.isLoading || getData.isRefetching ? (
        <>
          <Filter loading favName="X" />
          <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
            {[...new Array(12)].map((_, index) => (
              <Skeleton key={index} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={getData.refetch} />
      ) : !getData.isError && !getData.isLoading && getData.data ? (
        getData.data.count === 0 ? (
          <EmptyTable
            className="lg:col-span-4 col-span-1 lg:bg-transparent border-none"
            title="هیچ آیتمی فعلا ندارید!"
            description="مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم."
          />
        ) : (
          <>
            <Filter
              favName={getData.data.results.title}
              loading={false}
              onChange={setSavedType}
            />
            {itemToRender.length === 0 ? (
              <EmptyTable
                className="lg:col-span-4 col-span-1"
                title="هیچ آیتمی فعلا ندارید!"
                description="مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم."
              />
            ) : (
              <>
                <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-[24px]">
                  {deleteDialogId && (
                    <DeleteItemDialog
                      isOpened={deleteDialogOpened}
                      id={deleteDialogId}
                      refetch={getData.refetch}
                      closeFn={() => {
                        setDeleteDialogOpened(false);
                        setDeleteDialogId(undefined);
                      }}
                    />
                  )}
                  {itemToRender.map((item, index) =>
                    savedType === 'savedHotels' && item.type === 'hotel' ? (
                      <div className="relative" key={index}>
                        <button
                          className="flex items-center justify-center backdrop-blur-xl size-[40px] rounded-lg absolute left-[18px] top-[18px] p-2 text-white z-10"
                          onClick={() => {
                            setDeleteDialogOpened(true);
                            setDeleteDialogId(item.actual_id);
                          }}
                        >
                          <IconsaxIcons
                            className="w-full aspect-square"
                            color="currentColor"
                            variant="Bold"
                            name="Heart"
                          />
                        </button>
                        <SuggestedHotel
                          showDiscount={true}
                          showTimer={false}
                          hotel={{
                            average_score: item.average_score
                              ? Number(item.average_score.toFixed(1))
                              : item.rating,
                            city: item.city,
                            discount_expiry: item.discount_date || '-',
                            discount_percentage: item.discount_percentage,
                            id: item.id,
                            main_image: item.main_image,
                            name: item.name,
                            original_total_price: item.price,
                            rating: item.rating,
                            slug: item.slug,
                            stars: item.stars,
                            total_price: item.price_after_discount,
                          }}
                        />
                      </div>
                    ) : savedType === 'savedBlogs' &&
                      item.type === 'article' ? (
                      <Blog
                        key={index}
                        desc={item.summary}
                        actualId={item.id}
                        onLikeClick={() => {
                          setDeleteDialogOpened(true);
                          setDeleteDialogId(item.actual_id);
                        }}
                        createdAt={item.published_date}
                        image={item.thumbnail}
                        title={item.title}
                      />
                    ) : (
                      false
                    ),
                  )}
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
            )}
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
