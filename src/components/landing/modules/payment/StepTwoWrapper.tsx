'use client';

import { payment } from './helpers/constant';
import { useSearchParams } from 'next/navigation';
import { ReservationStatusProvider } from '@/context';

type Props = {
  children: Readonly<React.ReactNode>;
};

// ------------------------------

export default function StepTwoWrapper(props: Props) {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  return (
    <ReservationStatusProvider trackingCode={trackingCode}>
      {props.children}
    </ReservationStatusProvider>
  );
}
