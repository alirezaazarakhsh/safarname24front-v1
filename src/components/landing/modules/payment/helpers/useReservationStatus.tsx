'use client';

import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type ReservationStatus = {
  timer: number | null;
  capacity_status: 'pending' | 'confirmed' | 'rejected' | 'initial';
};

// ------------------------------

export function useReservationStatus(trackingCode: string | null) {
  const queryClient = useQueryClient();

  // === React Query state
  const {
    data: reservation = { capacity_status: 'initial', timer: null },
    status,
  } = useQuery<ReservationStatus>({
    queryKey: ['reservation-status', trackingCode],
    queryFn: async () => ({ capacity_status: 'initial', timer: null }),
  });

  // 🎯 WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(`wss://cps.safarnameh24.com/ws/${trackingCode}/`);
    // ws.onopen = () => console.log('✅ WebSocket connected');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ReservationStatus;

        queryClient.setQueryData<ReservationStatus>(
          ['reservation-status', trackingCode],
          data,
        );
      } catch (err) {
        console.error('Error parsing WebSocket data:', err);
      }
    };

    // ws.onclose = () => console.log('❌ WebSocket disconnected');
    return () => ws.close();
  }, [trackingCode, queryClient]);

  return {
    queryStatus: status,
    timer: reservation.timer,
    status: reservation.capacity_status,
  };
}
