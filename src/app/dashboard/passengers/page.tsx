// Forcing next.js to render this component as client side component
'use client';

// Importing part
import EmptyTable from '@/components/dashboard/api/emptyTable';
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

  // Defining variables
  const phoneNumbers = getData.data?.results
    .map((item) => item.phone_number)
    .filter((num): num is string => typeof num === 'string')
    .reduce((acc: string[], num) => {
      const count = acc.filter((n) => n === num).length;
      if (count < 2) acc.push(num);
      return acc;
    }, []);

  const dataToRender = getData.data
    ? filter === ''
      ? getData.data.results
      : getData.data.results.filter((item) =>
        [
          item.first_name,
          item.last_name,
          item.identification_code,
          item.phone_number,
        ].some((field) => field?.toLowerCase().includes(filter)),
      )
    : [];

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      {getData.isLoading || getData.isRefetching ? (
        <>
          <Filter phoneNumbers={[]} loading dataNotEmpty />
          <PassengersTable
            data={[]}
            loading
            paginationActiveIndex={paginationNumber}
            setPaginationActiveIndex={setPaginationNumber}
          />
        </>
      ) : getData.isError ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : getData.data ? (
        getData.data.count === 0 || dataToRender.length === 0 ? (
          <>
            <Filter
              phoneNumbers={[]}
              refetch={getData.refetch}
              dataNotEmpty={getData.data.count !== 0}
              onChange={(val) => setFilter(val)}
            />
            <EmptyTable
              title="لسیت مسافاران خالی میباشد!"
              description="لطفا از بالا مسافران خود را اضافه کنید"
            />
          </>
        ) : (
          <>
            <Filter
              phoneNumbers={phoneNumbers || []}
              onChange={(val) => setFilter(val)}
              refetch={getData.refetch}
              dataNotEmpty
            />
            <PassengersTable
              paginationCount={getData.data.count}
              paginationActiveIndex={paginationNumber}
              setPaginationActiveIndex={setPaginationNumber}
              refetch={getData.refetch}
              data={dataToRender}
            />
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
