'use client';

import { useQuery } from '@tanstack/react-query';

type ReservationStatus = {
  timer: number | null;
  capacity_status: 'pending' | 'confirmed' | 'rejected' | 'initial';
};

export function useReservationStatus(trackingCode: string | null) {
  const {
    data: reservation = { capacity_status: 'initial', timer: null },
    status,
  } = useQuery<ReservationStatus>({
    queryKey: ['reservation-status', trackingCode],
    queryFn: async () => ({ capacity_status: 'initial', timer: null }),
  });

  return {
    queryStatus: status,
    timer: reservation.timer,
    status: reservation.capacity_status,
  };
}
