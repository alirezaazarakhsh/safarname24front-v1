// Importing part
import Filter from '@/components/dashboard/home/filter';
import LatestReservationsTable from '@/components/dashboard/home/latestReservationsTable';
import LatestTicketsTable from '@/components/dashboard/home/latestTicketsTable';
import UserStatus from '@/components/dashboard/home/userStatus';
import Page from '@/components/dashboard/page';
import { ReactNode } from 'react';

// Creating and exporting Dashboard page ("/") as default
export default function Dashboard(): ReactNode {
  // Returning JSX
  return (
    <Page className="lg:p-5 lg:pb-5 p-[24px] pb-[100px]">
      <Filter className="lg:mb-5 mb-[16px]" />
      <UserStatus className="lg:mb-5 mb-[25px]" />
      <LatestTicketsTable className="lg:mb-5 mb-[25px]" />
      <LatestReservationsTable />
    </Page>
  );
}
