// Forcing next.js to render this component as client side component
'use client';

// Importing part
import EmptyTable from '@/components/dashboard/api/emptyTable';
import ErrorTable from '@/components/dashboard/api/errorTable';
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETReservation } from '@/types/dashboard/api/get';
import { ReactNode, useState } from 'react';

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
  // Defining hooks
  const [filterVal, setFilterVal] = useState<string>('');
  const data = useApiQuery<GETReservation>({
    url: '/hotel/reservation/user-reservations/',
    queryKey: ['reservations'],
  });

  // Defining variables
  const filteredData = data.data
    ? filterVal === ''
      ? data.data.reservations
      : data.data.reservations.filter((item) =>
          [item.tracking_code, item.hotel_name].some((field) =>
            field?.toLowerCase().includes(filterVal),
          ),
        )
    : [];

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      {data.isLoading ? (
        <>
          <Filter loading dataNotEmpty />
          <AllFactorsTable data={[]} loading />
        </>
      ) : data.isError ? (
        <ErrorTable refetch={data.refetch} />
      ) : !data.isLoading && !data.isError && data.data ? (
        data.data.reservations.length === 0 ? (
          <>
            <Filter loading={false} dataNotEmpty={false} />
            <EmptyTable />
          </>
        ) : (
          <>
            <Filter
              onChange={(val) => setFilterVal(val)}
              dataNotEmpty
              loading={false}
            />
            {filteredData.length === 0 ? (
              <EmptyTable />
            ) : (
              <AllFactorsTable data={filteredData} loading={false} />
            )}
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
