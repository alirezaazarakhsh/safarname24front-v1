'use client';

import {
  PaymentInvoiceProvider,
  PaymentLoadingProvider,
  ReservationStatusProvider,
} from '@/context';

import { Toaster } from 'sonner';
import { PropsWithChildren } from 'react';

import { payment } from './helpers/constant';
import { useSearchParams } from 'next/navigation';

export function ContextWrapper(props: PropsWithChildren) {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  return (
    <>
      <ReservationStatusProvider trackingCode={trackingCode}>
        <PaymentInvoiceProvider>
          <Toaster position="bottom-left" />
          <PaymentLoadingProvider>{props.children}</PaymentLoadingProvider>
        </PaymentInvoiceProvider>
      </ReservationStatusProvider>
    </>
  );
}
