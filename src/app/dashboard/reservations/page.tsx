// Forcing next.js to render this component as client side component
'use client';

// Importing part
import EmptyTable from '@/components/dashboard/api/emptyTable';
import ErrorTable from '@/components/dashboard/api/errorTable';
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETReservation } from '@/types/dashboard/api/get';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
  // Defining hooks
  const [filterVal, setFilterVal] = useState<string>('');
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const data = useApiQuery<GETReservation>({
    url: `/hotel/reservation/user-reservations/?p=${paginationNumber + 1}`,
    queryKey: ['reservations'],
  });

  // Defining variables
  const filteredData = data.data
    ? filterVal === ''
      ? data.data.results
      : data.data.results.filter((item) =>
          [item.tracking_code, item.hotel_name].some((field) =>
            field?.toLowerCase().includes(filterVal),
          ),
        )
    : [];

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await data.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      {data.isLoading || data.isRefetching ? (
        <>
          <Filter loading dataNotEmpty />
          <AllFactorsTable data={[]} loading />
        </>
      ) : data.isError ? (
        <ErrorTable refetch={data.refetch} />
      ) : !data.isLoading && !data.isError && data.data ? (
        data.data.count === 0 ? (
          <>
            <Filter loading={false} dataNotEmpty={false} />
            <EmptyTable />
          </>
        ) : (
          <>
            <Filter
              onChange={(val) => setFilterVal(val)}
              dataNotEmpty
              filterValue={filterVal}
              loading={false}
            />
            {filteredData.length === 0 ? (
              <EmptyTable />
            ) : (
              <AllFactorsTable
                refetch={data.refetch}
                data={filteredData}
                loading={false}
                activeIndex={paginationNumber}
                paginationCount={data.data.count}
                setActiveIndex={setPaginationNumber}
              />
            )}
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
