'use client';

import { axiosInstance } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

import { CollectionListItem } from './CollectionListItem';
import { CollectionListLoading } from './CollectionListLoading';

type Collection = {
  id: number;
  name: string;
  thumbnail: string;
  item_count: number;
};

type ApiResponse = { data: Collection[] };

type Props = {
  hotelId?: number;
  closeCollectionList: () => void;
};

// -----------------------------

export function CollectionList(props: Props) {
  const { closeCollectionList, hotelId } = props;

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-favorite-collections'],
    queryFn: () => axiosInstance('/favorite/website/collections/'),
  });

  return (
    <div className="mr-6 ml-4 space-y-4 gap-4 custom-scrollbar overflow-auto md:max-h-56">
      {status === 'pending' ? (
        <CollectionListLoading />
      ) : (
        data?.data.map((collection) => (
          <CollectionListItem
            {...collection}
            hotelId={hotelId}
            key={collection.id}
            closeCollectionList={closeCollectionList}
          />
        ))
      )}
    </div>
  );
}
