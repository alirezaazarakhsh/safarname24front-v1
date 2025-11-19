import {
  Stepper,
  HotelPicture,
  ReservationDetails,
} from '@/components/landing/modules/payment/organisms';

import { Suspense } from 'react';
import { ContextWrapper } from '@/components/landing/modules/payment/ContextWrapper';

type Props = { children: Readonly<React.ReactNode> };

// ------------------------------

export default function PaymentLayout(props: Props) {
  return (
    <div className="mt-6 space-y-6 lg:mt-10">
      <Suspense>
        <ContextWrapper>
          <div className="grid gap-6 overflow-hidden lg:grid-cols-[1fr_2.8fr]">
            <Stepper />
            <HotelPicture />
            <ReservationDetails />
          </div>

          {props.children}
        </ContextWrapper>
      </Suspense>
    </div>
  );
}
