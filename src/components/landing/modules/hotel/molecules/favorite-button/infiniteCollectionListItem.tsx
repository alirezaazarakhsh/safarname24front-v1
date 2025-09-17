// import { axiosInstance } from '@/utils/axios';
// import { useMutation } from '@tanstack/react-query';
// import Image from 'next/image';

// type Props = {
//   id: number;
//   title: string;
//   isLast: boolean;
//   hotelId?: number;
//   thumbnails: string[];
//   lastItemRef: (node: HTMLButtonElement | null) => void;
// };

// // -----------------------------

// export function infiniteCollectionListItem(props: Props) {
//   const { id, isLast, lastItemRef, thumbnails, title, hotelId } = props;

//   console.log(id);
//   console.log(hotelId);

//   const { mutate, status } = useMutation({
//     mutationFn: () => {
//       return axiosInstance.post(`favorite/collections/${id}/items`, {
//         hotelId,
//         type: 'hotel',
//       });
//     },
//     onSuccess: (response) => {
//       console.log(response);
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });

//   return (
//     <button
//       onClick={() => mutate()}
//       className="h-14 flex gap-4"
//       ref={isLast ? lastItemRef : null}
//     >
//       <div className="relative bg-zinc-100 w-14 aspect-square overflow-hidden rounded-cs-10">
//         {thumbnails.length > 0 && (
//           <Image
//             fill
//             src={thumbnails[0]}
//             alt="collection-cover"
//             className="full-size object-cover"
//           />
//         )}
//       </div>

//       <div className="text-cs85 font-semibold flex flex-col items-start justify-center gap-2">
//         <span className="text-zinc-800">{title}</span>
//         {thumbnails.length ? (
//           <div className="text-zinc-500 text-cs08 flex gap-1">
//             <span>{thumbnails.length}</span>
//             <span>مورد</span>
//           </div>
//         ) : (
//           <span className="text-zinc-500 text-cs08">لیست خالی میباشد</span>
//         )}
//       </div>
//     </button>
//   );
// }
