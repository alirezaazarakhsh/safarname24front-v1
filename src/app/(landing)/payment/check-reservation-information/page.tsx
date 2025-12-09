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

export default function CheckReservationInformation() {
  return (
    <>
      {/* === Small-Screen */}
      <div className="space-y-6 lg:hidden">
        <CheckReservationInfo />
        <ReservationInfo />
        <Description />
        <ApplyDiscountCode />
        <WalletWithdraw />
        <PaymentInvoice />
        <SubmitButton />
      </div>

      {/* === Large-Screen */}
      <div className="hidden grid-cols-[1fr_2.8fr] items-start gap-x-6 lg:grid">
        {/* --- Right-Column */}
        <div className="sticky top-[6.4rem] space-y-6">
          <CheckReservationInfo />
          <ApplyDiscountCode />
          <WalletWithdraw />
          <PaymentInvoice />
          <SubmitButton />
        </div>

        {/* --- Left-Column */}
        <div className="space-y-6">
          <ReservationInfo />
          <Description />
        </div>
      </div>
    </>
  );
}
