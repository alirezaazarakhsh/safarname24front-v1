import {
  Stepper,
  Description,
  HotelPicture,
  PaymentInvoice,
  WalletBallance,
  ReservationForm,
  ApplyDiscountCode,
  ReservationDetails,
} from '@/components/landing/modules/payment';

// ------------------------------

export default function Payment() {
  return (
    <div className="mt-12">
      <div className="space-y-6 lg:hidden">
        {/* <HotelPicture />
        <ReservationDetails />
        <WalletBallance /> */}
        <ReservationForm />
        {/* <ApplyDiscountCode />
        <PaymentInvoice />
        <Description /> */}
      </div>

      {/* === Large-Screen */}
      <div className="hidden space-y-8 lg:block">
        <Stepper />

        <div className="grid grid-cols-[1fr_2.8fr] gap-x-6">
          {/* --- Right-Column */}
          <div className="space-y-5">
            {/* <HotelPicture />
            <WalletBallance /> */}
            <ApplyDiscountCode />
            {/* <PaymentInvoice /> */}
          </div>

          {/* --- Left-Column */}
          <div className="space-y-5">
            {/* <ReservationDetails /> */}
            <ReservationForm />
            {/* <Description /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
