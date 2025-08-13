// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Filter from '@/components/dashboard/CustomerClubList/filter';
import CustomerClubListTable from '@/components/dashboard/CustomerClubList/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';
import { GETCustomerClubList } from '@/types/dashboard/api/get';

// Creating and exporting customer club list page as default
export default function CustomerClubList(): ReactNode {
  // Defining states of component
  const [filterVal, setFilterVal] = useState<string>('');
  const [paginationNumber, setPaginationNumber] = useState<number>(0);

  // Fetching the data
  const getData = useApiQuery<GETCustomerClubList>({
    url: `/crm/discount-activations/?p=${paginationNumber + 1}`,
    queryKey: ['my-prizes'],
  });

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await getData.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  const filteredData = getData.data
    ? filterVal === ''
      ? getData.data.results
      : getData.data.results.filter((item) =>
          [
            item.related_info.shopping_center_name,
            item.related_info.room_name,
          ].some((field) => field?.toLowerCase().includes(filterVal)),
        )
    : [];

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      {getData.isLoading ? (
        <>
          <Filter onChange={() => {}} loading />
          <CustomerClubListTable data={[]} loading />
        </>
      ) : getData.isError ? (
        <ErrorTable />
      ) : getData.data && getData.data.count === 0 ? (
        <>
          <Filter onChange={(val) => setFilterVal(val)} />
          <EmptyTable
            title="لسیت مسافاران خالی میباشد!"
            description="لطفا از بالا مسافران خود را اضافه کنید"
          />
        </>
      ) : (
        <>
          <Filter onChange={(val) => setFilterVal(val)} />
          {filteredData.length === 0 ? (
            <EmptyTable
              title="لسیت مسافاران خالی میباشد!"
              description="لطفا از بالا مسافران خود را اضافه کنید"
            />
          ) : (
            <CustomerClubListTable
              activeIndex={paginationNumber}
              paginationCount={getData.data?.count}
              setActiveIndex={setPaginationNumber}
              data={filteredData}
            />
          )}
        </>
      )}
    </main>
  );
}
