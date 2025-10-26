import {
  Description,
  PaymentInvoice,
  WalletWithdraw,
  ReservationInfo,
  ApplyDiscountCode,
  CheckReservationInfo,
} from '@/components/landing/modules/payment/organisms';

import { SecondStepSubmitButton as SubmitButton } from '@/components/landing/modules/payment/molecules/submit-buttons';

// ------------------------------

export default function WatcherInfo() {
  return (
    <>
      {/* === Small-Screen */}
      <div className="space-y-6 lg:hidden"></div>

      {/* === Large-Screen */}
      <div className="hidden grid-cols-[1fr_2.8fr] gap-x-6 overflow-hidden lg:grid">
        {/* --- Right-Column */}
        <div className="space-y-6"></div>

        {/* --- Left-Column */}
        <div className="space-y-6"></div>
      </div>
    </>
  );
}
