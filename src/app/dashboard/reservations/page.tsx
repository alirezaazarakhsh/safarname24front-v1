// Importing part
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { ReactNode } from 'react';

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
    // Returning JSX
    return (
        <main className="lg:p-5 lg:pb-5 p-[24px] pb-[100px] flex flex-col lg:gap-5 gap-[25px]">
            <Filter />
            <AllFactorsTable />
        </main>
    );
}
