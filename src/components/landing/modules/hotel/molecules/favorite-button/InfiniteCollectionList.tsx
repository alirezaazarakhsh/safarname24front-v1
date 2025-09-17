// 'use client';

// import { useRef, useCallback } from 'react';
// import { axiosInstance } from '@/utils/axios';
// import { useInfiniteQuery } from '@tanstack/react-query';

// import { CollectionListItem } from './CollectionListItem';
// import { CollectionListLoading } from './CollectionListLoading';

// type ApiResponse = {
//   data: {
//     count: number;
//     next: string | null;
//     results: Collection[];
//     previous: string | null;
//   };
// };

// type Props = { hotelId?: number };
// type Collection = { id: number; thumbnails: string[]; title: string };

// // -----------------------------

// export function InfiniteCollectionList(props: Props) {
//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
//     useInfiniteQuery<ApiResponse>({
//       queryKey: ['hotel-favorite-collections'],
//       queryFn: ({ pageParam = 1 }) =>
//         axiosInstance({
//           url: `/favorite/collections/?page=${pageParam}`,
//         }),
//       getNextPageParam: (lastPage) => {
//         if (lastPage.data.next) {
//           const match = lastPage.data.next.match(/page=(\d+)/);
//           return match ? match[1] : undefined;
//         }

//         return undefined;
//       },
//       initialPageParam: 1,
//     });

//   const observerRef = useRef<IntersectionObserver | null>(null);
//   const lastItemRef = useCallback(
//     (node: HTMLButtonElement | null) => {
//       if (isFetchingNextPage) return;
//       if (observerRef.current) observerRef.current.disconnect();

//       observerRef.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasNextPage) {
//           fetchNextPage();
//         }
//       });

//       if (node) observerRef.current.observe(node);
//     },
//     [fetchNextPage, hasNextPage, isFetchingNextPage],
//   );

//   return (
//     <div className="mr-6 ml-4 space-y-4 gap-4 custom-scrollbar overflow-auto md:max-h-52">
//       {status === 'pending' ? (
//         <CollectionListLoading />
//       ) : !data?.pages[0].data.count ? (
//         <p className="text-zinc-500 text-cs08 font-medium">
//           لیست علاقه مندی ها خالی میباشد
//         </p>
//       ) : (
//         data?.pages.map((page) =>
//           page.data.results.map((item, idx) => {
//             const isLast =
//               idx === page.data.results.length - 1 &&
//               data.pages.indexOf(page) === data.pages.length - 1;

//             return (
//               <CollectionListItem
//                 {...item}
//                 key={item.id}
//                 isLast={isLast}
//                 hotelId={props.hotelId}
//                 lastItemRef={lastItemRef}
//               />
//             );
//           }),
//         )
//       )}

//       {isFetchingNextPage && <CollectionListLoading />}
//     </div>
//   );
// }
