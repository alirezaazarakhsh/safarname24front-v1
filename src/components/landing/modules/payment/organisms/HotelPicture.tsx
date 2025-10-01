'use client';

import Image from 'next/image';
import { Gallery } from 'iconsax-react';

import { payment } from '../helpers/constant';
import { axiosInstance } from '@/utils/axios';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

type ApiResponse = { data: { hotel_image: string } };

// ------------------------------

export function HotelPicture() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['reservation-hotel-image'],
    queryFn: () =>
      axiosInstance(`/hotel/reservation/hotel-slug/${trackingCode}/`),
  });

  const hotelImage = data?.data?.hotel_image;

  return (
    <div className="min-h-60 max-h-80 overflow-hidden rounded-xl">
      {status === 'pending' ? (
        <Skeleton className="full-size" />
      ) : status === 'error' ? (
        <div className="bg-zinc-200/50 full-size flex-center">
          <Gallery size={80} color="#d4d4d8" />
        </div>
      ) : (
        hotelImage && (
          <Image
            alt="hotel"
            width={600}
            height={400}
            src={hotelImage}
            className="full-size object-cover"
          />
        )
      )}
    </div>
  );
}
