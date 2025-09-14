'use client';

import Image from 'next/image';
import { Gallery } from 'iconsax-react';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { generalInstance } from '@/utils/services';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = { data: { main_image: string } };

// ------------------------------

export function HotelPicture() {
  const searchParams = useSearchParams();
  const hotelSlug = searchParams.get('hotel');

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['hotel-images'],
    queryFn: () => generalInstance(`/hotel/hotels/${hotelSlug}/images`),
  });

  const hotelMainImage = data?.data?.main_image;

  return (
    <div className="min-h-60 overflow-hidden rounded-xl">
      {status === 'pending' ? (
        <Skeleton className="full-size" />
      ) : status === 'error' ? (
        <div className="bg-zinc-200/50 full-size flex-center">
          <Gallery size={80} color="#d4d4d8" />
        </div>
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
