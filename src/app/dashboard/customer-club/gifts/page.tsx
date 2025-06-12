// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Filter from '@/components/dashboard/customClub/filter';
import CustomersClubTable from '@/components/dashboard/customClub/table';
import DiscountCodeNumber from '@/components/dashboard/customClub/discountCodeNumber';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETCustomerClubList } from '@/types/dashboard/api/get';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';

// Creating and exporting customer club page as default
export default function CustomerClubPage(): ReactNode {
  // Defining hooks
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const numberIsSavedForDiscount = useLocalStorage({
    value: 'discountNumber',
  });

  const [giftsType, setGiftsType] = useState<'shoppingCentre' | 'hotel'>(
    'shoppingCentre',
  );

  // Fetching the data
  const getData = useApiQuery<GETCustomerClubList>({
    url: `/profile/customer-club/my-prizes/?p=${paginationNumber + 1}`,
    queryKey: ['myPrizes', 'prize', 'customerClub'],
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
      {!numberIsSavedForDiscount.data && <DiscountCodeNumber />}
      {getData.isLoading ? (
        <>
          <Filter totalScore={0} loading />
          <CustomersClubTable
            loading
            paginationActiveIndex={paginationNumber}
            setPaginationActiveIndex={setPaginationNumber}
          />
        </>
      ) : getData.isError ? (
        <ErrorTable />
      ) : !getData.isError && getData.data ? (
        getData.data.count === 0 ? (
          <EmptyTable />
        ) : (
          <>
            <Filter onChange={setGiftsType} totalScore={0} />
            <CustomersClubTable
              paginationCount={getData.data.count}
              paginationActiveIndex={paginationNumber}
              setPaginationActiveIndex={setPaginationNumber}
              data={[
                {
                  created: new Date().toISOString(),
                  prize: {
                    discount_code: '1111111',
                    discount_price: '2222222',
                    expired_date: new Date().toISOString(),
                    title: 'HJIOHIHIHI',
                  },
                },
              ]}
            />
          </>
        )
      ) : (
        false
      )}
    </main>
  );
}
