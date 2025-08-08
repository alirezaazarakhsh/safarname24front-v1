'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = { data: { main_image: string } };

// ------------------------------

export function HotelPicture() {
  const hotelSlug = 'parsianazadi';
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-images'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/images`),
  });

  const hotelMainImage = data?.data?.main_image;

  return (
    <div className="h-60 overflow-hidden border rounded-xl lg:h-64">
      {status === 'pending' ? (
        <Skeleton className="full-size" />
      ) : status === 'error' ? (
        <div className="bg-zinc-200/70 full-size" />
      ) : (
        hotelMainImage && (
          <Image
            alt="hotel"
            width={600}
            height={400}
            src={hotelMainImage}
            className="full-size object-cover"
          />
        )
      )}
    </div>
  );
}
