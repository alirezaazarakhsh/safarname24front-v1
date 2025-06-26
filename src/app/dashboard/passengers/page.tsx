// Forcing next.js to render this component as client side component
'use client';

import EmptyTable from '@/components/dashboard/api/emptyTable';
// Importing part
import ErrorTable from '@/components/dashboard/api/errorTable';
import Filter from '@/components/dashboard/passengers/filter';
import PassengersTable from '@/components/dashboard/passengers/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETPasssengers } from '@/types/dashboard/api/get';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting passengers page as default
export default function PassengersPage(): ReactNode {
  // Defining states of component
  const [filter, setFilter] = useState<string>('');
  const [paginationNumber, setPaginationNumber] = useState<number>(0);

  // Fetching the data
  const getData = useApiQuery<GETPasssengers>({
    url: `/hotel/passengers?p=${paginationNumber + 1}`,
    queryKey: ['passengers', 'list'],
    options: {
      staleTime: 30000, // 30 Sec
    },
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
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      {getData.isLoading ? (
        <>
          <PassengersTable
            data={[]}
            loading
            paginationActiveIndex={paginationNumber}
            setPaginationActiveIndex={setPaginationNumber}
          />
          <Filter loading dataNotEmpty />
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : getData.data ? (
        getData.data?.count === 0 ? (
          <>
            <Filter refetch={getData.refetch} dataNotEmpty={false} />
            <EmptyTable
              title='لسیت مسافاران خالی میباشد!'
              description='لطفا از بالا مسافران خود را اضافه کنید'
            />
          </>
        ) : (
          <>
            <Filter
              onChange={(val) => setFilter(val)}
              loading={getData.isLoading || getData.isRefetching}
              refetch={getData.refetch}
              dataNotEmpty
            />
            <PassengersTable
              loading={getData.isLoading || getData.isRefetching}
              paginationCount={getData.data.count}
              paginationActiveIndex={paginationNumber}
              setPaginationActiveIndex={setPaginationNumber}
              data={
                getData.data
                  ? filter === ''
                    ? getData.data.results
                    : getData.data.results.filter((item) =>
                        [
                          item.first_name,
                          item.last_name,
                          item.national_code,
                          item.phone_number,
                        ].some((field) =>
                          field?.toLowerCase().includes(filter),
                        ),
                      )
                  : []
              }
            />
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
