// Importing part
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Defining some dummy data to render
const data: {
  id: number;
  code: string;
  hotel: string;
  enterAt: string;
  exitAt: string | null;
  passengers: string;
  financialStatus: 'payed' | 'cancled' | 'pending';
}[] = [];

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      <Filter
        className={cn(data.length === 0 ? 'lg:block hidden' : '')}
        dataNotEmpty={data.length !== 0}
      />
      <AllFactorsTable data={data} />
    </main>
  );
}
