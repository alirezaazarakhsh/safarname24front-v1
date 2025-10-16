import {
  Description,
  PaymentInvoice,
  WalletWithdraw,
  ReservationInfo,
  ApplyDiscountCode,
  CheckReservationInfo,
} from '@/components/landing/modules/payment/organisms';

import StepTwoWrapper from '@/components/landing/modules/payment/StepTwoWrapper';

// ------------------------------

export default function CheckReservationInformation() {
  return (
    <StepTwoWrapper>
      {/* === Small-Screen */}
      <div className="space-y-6 lg:hidden">
        <CheckReservationInfo />
        <ReservationInfo />
        <Description />
        <ApplyDiscountCode />
        <WalletWithdraw />
        <PaymentInvoice />
      </div>

      {/* === Large-Screen */}
      <div className="hidden grid-cols-[1fr_2.8fr] gap-x-6 overflow-hidden lg:grid">
        {/* --- Right-Column */}
        <div className="space-y-6">
          <CheckReservationInfo />
          <ApplyDiscountCode />
          <WalletWithdraw />
          <PaymentInvoice />
        </div>

        {/* --- Left-Column */}
        <div className="space-y-6">
          <ReservationInfo />
          <Description />
        </div>
      </div>
    </StepTwoWrapper>
  );
}
