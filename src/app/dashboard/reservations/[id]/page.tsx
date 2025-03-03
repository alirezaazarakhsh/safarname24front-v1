// Importing part
import { ReactNode } from 'react';
import Logo from '@/components/dashboard/ui/logo';
import HotelAcceptSection from '@/components/dashboard/reservationFactor/hotelAcceptSection';

// Creating and exporting single Reservation edit page as default
export default function SingleReservationPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[100px] flex flex-col lg:gap-5 gap-[25px]">
      <Logo />
      <HotelAcceptSection />
    </main>
  );
}
