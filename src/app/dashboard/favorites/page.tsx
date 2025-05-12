// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Filter from '@/components/dashboard/favorites/filter';
import { SuggestedHotel as Hotel } from '@/types';
import { ReactNode, useState } from 'react';
import CustomPagination from '@/components/dashboard/ui/customPagination';
import { SuggestedHotel } from '@/components/landing/shared';
import { BlogComponentPropsType } from '@/types/dashboard/component';
import Blog from '@/components/dashboard/favorites/blog';

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

// Creating and exporting favorites page as default
export default function FavoritesPage(): ReactNode {
  // Defining states of component
  const [savedType, setSavedType] = useState<'savedHotels' | 'savedBlogs'>(
    'savedHotels',
  );

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:px-5 px-[24px]">
      <Filter onChange={(val) => setSavedType(val)} />
      <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-[24px]">
        {savedType === 'savedHotels'
          ? hotels.map((item, index) => (
              <SuggestedHotel
                hotel={item}
                showLike
                key={index}
                showTimer={false}
              />
            ))
          : blogs.map((item, index) => <Blog key={index} {...item} />)}
      </div>
      <div className="flex items-center lg:justify-end justify-center">
        <CustomPagination count={12} />
      </div>
    </main>
  );
}
