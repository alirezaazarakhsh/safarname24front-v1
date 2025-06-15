// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Filter from '@/components/dashboard/CustomerClubList/filter';
import CustomerClubListTable from '@/components/dashboard/CustomerClubList/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETCustomerClubList } from '@/types/dashboard/api/get';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';

// Creating and exporting customer club list page as default
export default function CustomerClubList(): ReactNode {
  // Defining states of component
  const [filterVal, setFilterVal] = useState<string>('');
  const [paginationNumber, setPaginationNumber] = useState<number>(0);

  // Fetching the data
  const getData = useApiQuery<GETCustomerClubList>({
    url: `/profile/customer-club/prizes/?p=${paginationNumber + 1}`,
    queryKey: ['prize', 'customerClub'],
  });

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await getData.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white'>
      {getData.isLoading ? (
        <>
          <Filter onChange={(val) => setFilterVal(val)} loading />
          <CustomerClubListTable loading data={[]} />
        </>
      ) : getData.isError ? (
        <ErrorTable />
      ) : !getData.isError && getData.data ? (
        getData.data.count === 0 ? (
          <EmptyTable />
        ) : (
          <>
            <Filter onChange={(val) => setFilterVal(val)} />
            <CustomerClubListTable
              activeIndex={paginationNumber}
              setActiveIndex={setPaginationNumber}
              paginationCount={getData.data.count}
              data={getData.data.results}
            />
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
