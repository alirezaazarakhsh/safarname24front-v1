import {
  Description,
  PaymentInvoice,
  ReservationInfo,
  ApplyDiscountCode,
  CheckReservationInfo,
} from '@/components/landing/modules/payment/organisms';

// ------------------------------

export default function CheckRoomsCapacity() {
  return (
    <>
      {/* === Small-Screen */}
      <div className="space-y-6 lg:hidden">
        <CheckReservationInfo />
        <ReservationInfo />
        <Description />
        <ApplyDiscountCode />
        <PaymentInvoice />
      </div>

      {/* === Large-Screen */}
      <div className="hidden grid-cols-[1fr_2.8fr] gap-x-6 overflow-hidden lg:grid">
        {/* --- Right-Column */}
        <div className="space-y-6">
          <CheckReservationInfo />
          <ApplyDiscountCode />
          <PaymentInvoice />
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
