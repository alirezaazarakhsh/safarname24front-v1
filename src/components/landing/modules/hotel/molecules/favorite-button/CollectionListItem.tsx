import Image from 'next/image';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';

import useCallReactions from './helpers/useCallReactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Gallery } from 'iconsax-react';

type Props = {
  id: number;
  name: string;
  hotelId?: number;
  thumbnail: string;
  item_count: number;
  closeCollectionList: () => void;
};

// -----------------------------

export function CollectionListItem(props: Props) {
  const {
    name,
    hotelId,
    thumbnail,
    item_count,
    id: collectionId,
    closeCollectionList,
  } = props;

  const queryClient = useQueryClient();
  const callReactions = useCallReactions();

  const { mutate, status } = useMutation({
    mutationFn: () => {
      return axiosInstance.post(`favorite/collections/${collectionId}/items/`, {
        id: hotelId,
        type: 'hotel',
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['hotel-favorite-status'] });
      closeCollectionList();
      callReactions({ type: 'success', context: 'favorite-saved' });
    },
    onError: () => {
      callReactions({ type: 'error', context: 'favorite-saved' });
    },
  });

  return (
    <button onClick={() => mutate()} className="h-16 flex gap-4">
      <div className="relative bg-zinc-100 w-16 aspect-square flex-center overflow-hidden rounded-cs-10">
        {thumbnail ? (
          <Image
            fill
            src={thumbnail}
            alt="collection-cover"
            className="full-size object-cover"
          />
        ) : (
          <Gallery size={28} className="stroke-zinc-300" />
        )}
      </div>

      <div className="text-cs85 font-semibold flex flex-col items-start justify-center gap-2">
        <span className="max-w-48 text-zinc-800 font-bold truncate">
          {name}
        </span>
        {item_count ? (
          <div className="text-zinc-500 text-cs08 flex gap-1">
            <span>{item_count}</span>
            <span>مورد</span>
          </div>
        ) : (
          <span className="text-zinc-500 text-cs08">لیست خالی میباشد</span>
        )}
      </div>

      <div
        className={`fixed inset-0 z-30 bg-black/10 flex-center transition-all ${status === 'pending' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <span className={loader.dots} style={{ scale: '1.2' }} />
      </div>
    </button>
  );
}
