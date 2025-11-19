'use client';

import { useQuery } from '@tanstack/react-query';
import { useReservationWebSocket } from './useReservationWebSocket';

type ReservationStatus = {
  timer: number | null;
  capacity_status: 'pending' | 'confirmed' | 'rejected' | 'initial';
};

export function useReservationStatus(trackingCode: string | null) {
  useReservationWebSocket(trackingCode);

  const { data } = useQuery<ReservationStatus>({
    queryKey: ['reservation-status', trackingCode],
    initialData: { timer: null, capacity_status: 'initial' },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
  });

  return {
    status: data.capacity_status,
    timer: data.timer,
  };
}
