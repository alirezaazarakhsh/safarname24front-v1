// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Filter from '@/components/dashboard/favoritesId/filter';
import { SuggestedHotel as Hotel } from '@/types';
import { ReactNode, useEffect, useState } from 'react';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import { SuggestedHotel } from '@/components/landing/shared';
import { BlogComponentPropsType } from '@/types/dashboard/component';
import Blog from '@/components/dashboard/favoritesId/blog';
import FavItem from '@/components/dashboard/favoritesId/item';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETFavoritesSingle } from '@/types/dashboard/api/get';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';
import { useParams } from 'next/navigation';

// defining some fake data to render later in page
const blogs: BlogComponentPropsType[] = [
  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },
  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },

  {
    image: '/image/hotel/hotel-1.png',
    mostVisited: true,
    title: '۱۰ مقصد برتر گردشگری در ایران',
    desc: 'در این مقاله با محبوب‌ترین مقاصد گردشگری ایران آشنا می‌شویم که هر مسافری باید حداقل یک‌بار از آن‌ها بازدید کند.',
    createdAt: '2025-05-10T14:30:00Z',
  },
];

const hotels: Hotel[] = [
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
  {
    image: '/image/hotel/hotel-1.png',
    hotelName: 'هتل اسپیناس پالاس',
    province: 'تهران',
    city: 'تهران',
    stars: 5,
    discountPercentage: 20,
    price: 3000000,
    id: 1,
    timer: '10:00:00',
    rating: 4.8,
  },
];

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
            favName={getData.data?.results.title || 'نامعلوم'}
            onChange={(val) => setSavedType(val)}
            loading={getData.isLoading || getData.isRefetching}
          />
          <div className='grid lg:grid-cols-4 grid-cols-1 lg:gap-4 gap-[24px]'>
            {getData.isLoading ? (
              [...new Array(12)].map((_, index) => (
                <FavItem
                  refetch={getData.refetch}
                  key={index}
                  loading
                  data={{
                    id: 0,
                    title: 'X',
                  }}
                />
              ))
            ) : getData.data && getData.data.count !== 0 ? (
              getData.data.results.favorites.map((item, index) => (
                <FavItem
                  refetch={getData.refetch}
                  key={item.id || index}
                  loading={getData.isLoading || getData.isRefetching}
                  data={{
                    id: item.id,
                    title: item.title,
                  }}
                />
              ))
            ) : (
              <EmptyTable
                className='lg:col-span-4 col-span-1'
                title='هیچ آیتمی فعلا ندارید!'
                description='مشتری گرامی، برای ثبت آیتم می‌توانید از وبسایت اقدام نمایید. از همراهی شما متشکریم.'
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
