'use client';

import {
  Description,
  PaymentInvoice,
  ReservationForm,
} from '@/components/landing/modules/payment/organisms';

import { useEffect } from 'react';
import { useMediaQuery } from '@/hooks';
import { FirstStepSubmitButton as SubmitButton } from '@/components/landing/modules/payment/molecules/submit-buttons';

// ------------------------------

export function CompletePassengersInformationWrapper() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // === Scroll To Top On Mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* === Small-Screen */}
      <div className="space-y-6 lg:hidden">
        {!isDesktop && <ReservationForm />}
        <Description />
        <PaymentInvoice />
        <SubmitButton />
      </div>

      {/* === Large-Screen */}
      <div className="hidden grid-cols-[1fr_2.8fr] gap-x-6 overflow-hidden lg:grid">
        {/* --- Right-Column */}
        <div className="space-y-6">
          <Description />
          <PaymentInvoice />
          <SubmitButton />
        </div>

        {/* --- Left-Column */}
        <div>{isDesktop && <ReservationForm />}</div>
      </div>
    </>
  );
}
