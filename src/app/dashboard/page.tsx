// Importing part
import Filter from '@/components/dashboard/home/filter';
import LatestReservationsTable from '@/components/dashboard/home/latestReservationsTable';
import LatestTicketsTable from '@/components/dashboard/home/latestTicketsTable';
import UserStatus from '@/components/dashboard/home/userStatus';
import { ReactNode } from 'react';

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
    // Returning JSX
    return (
        <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px]">
            <Filter />
            <UserStatus />
            <LatestTicketsTable />
            <LatestReservationsTable />
        </main>
    );
}
