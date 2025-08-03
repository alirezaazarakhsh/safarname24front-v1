import {
  Stepper,
  DiscountCode,
  PaymentInvoice,
  WalletBallance,
  ApplyDiscountCode,
  ReservationDetails,
} from '@/components/landing/modules/payment';

// ------------------------------

export default function page() {
  return (
    <div className="mt-12 flex flex-col gap-8">
      {/* <Stepper />
      <DiscountCode />
      <ReservationDetails /> */}
      {/* <WalletBallance /> */}
      {/* <ApplyDiscountCode /> */}
      <PaymentInvoice />
    </div>
  );
}
