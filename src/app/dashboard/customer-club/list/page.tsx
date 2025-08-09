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
    url: `/crm/room-discount-codes//profile/customer-club/my-prizes/?p=${paginationNumber + 1}`,
    queryKey: ['my-prizes'],
  });

  // Using useEffect to make useApiQuery Fetch again while pagination number changes
  useEffect(() => {
    async function handleRefetch() {
      await getData.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  const dataToRender = getData.data
    ? filterVal === ''
      ? getData.data.results
      : getData.data.results.filter((item) =>
          [
            item.prize.title,
            item.prize.discount_code,
            item.prize.expired_date,
          ].some((field) => field?.toLowerCase().includes(filterVal)),
        )
    : [];

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      {getData.isLoading ? (
        <>
          <Filter onChange={() => {}} loading />
          <CustomerClubListTable loading data={[]} />
        </>
      ) : getData.isError ? (
        <ErrorTable />
      ) : !getData.isError && getData.data ? (
        getData.data.count === 0 ? (
          <EmptyTable
            title="لیست جوایز خالی میباشد!"
            description="لطفا بعدا به این صفحه سر بزنید."
          />
        ) : (
          <>
            <Filter onChange={(val) => setFilterVal(val)} />
            {dataToRender.length === 0 ? (
              <EmptyTable
                title="لیست جوایز خالی میباشد!"
                description="لطفا بعدا به این صفحه سر بزنید."
              />
            ) : (
              <CustomerClubListTable
                activeIndex={paginationNumber}
                setActiveIndex={setPaginationNumber}
                paginationCount={getData.data.count}
                data={dataToRender}
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
