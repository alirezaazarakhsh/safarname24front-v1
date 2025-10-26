// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import Filter from '@/components/dashboard/customClub/filter';
import CustomersClubTable from '@/components/dashboard/customClub/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import ErrorTable from '@/components/dashboard/api/errorTable';
import {
  GETCustomerClubRoomList,
  GETCustomerClubShoppingCentreList,
} from '@/types/dashboard/api/get';
import RoomTable from '@/components/dashboard/customClub/roomTable';

// Creating and exporting customer club page as default
export default function CustomerClubPage(): ReactNode {
  // Defining hooks
  const [paginationNumber, setPaginationNumber] = useState<number>(0);
  const [roomsPaginationNumber, setRoomsPaginationNumber] = useState<number>(0);
  const [giftsType, setGiftsType] = useState<'shoppingCentre' | 'hotel'>(
    'shoppingCentre',
  );

  // Fetching the data
  const shoppingCentresFetch = useApiQuery<GETCustomerClubShoppingCentreList>({
    url: `/crm/shopping-discount-codes?p=${paginationNumber + 1}`,
    queryKey: ['shopping-centre-gifts'],
    options: {
      enabled: giftsType === 'shoppingCentre',
    },
  });

  const roomsFetch = useApiQuery<GETCustomerClubRoomList>({
    url: `/crm/room-discount-codes?p=${roomsPaginationNumber + 1}`,
    queryKey: ['room-gifts'],
    options: {
      enabled: giftsType === 'hotel',
    },
  });

  useEffect(() => {
    async function handleRefetch() {
      await shoppingCentresFetch.refetch();
    }

    handleRefetch();
  }, [paginationNumber]);

  useEffect(() => {
    async function handleRefetch() {
      await roomsFetch.refetch();
    }

    handleRefetch();
  }, [roomsPaginationNumber]);

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      <Filter
        loading={shoppingCentresFetch.isLoading}
        onChange={setGiftsType}
      />
      {giftsType === 'shoppingCentre' ? (
        <>
          {shoppingCentresFetch.isLoading ||
          shoppingCentresFetch.isRefetching ? (
            <CustomersClubTable
              paginationActiveIndex={0}
              setPaginationActiveIndex={() => {}}
              loading
            />
          ) : shoppingCentresFetch.error ? (
            <ErrorTable refetch={() => shoppingCentresFetch.refetch()} />
          ) : (
            !shoppingCentresFetch.isError &&
            shoppingCentresFetch.data && (
              <CustomersClubTable
                refetch={shoppingCentresFetch.refetch}
                paginationActiveIndex={paginationNumber}
                setPaginationActiveIndex={setPaginationNumber}
                data={shoppingCentresFetch.data.results}
              />
            )
          )}
        </>
      ) : (
        <>
          {roomsFetch.isLoading || roomsFetch.isRefetching ? (
            <RoomTable
              paginationActiveIndex={0}
              setPaginationActiveIndex={() => {}}
              loading
            />
          ) : roomsFetch.error ? (
            <ErrorTable refetch={() => shoppingCentresFetch.refetch()} />
          ) : !roomsFetch.isError && roomsFetch.data ? (
            <RoomTable
              refetch={roomsFetch.refetch}
              paginationActiveIndex={roomsPaginationNumber}
              setPaginationActiveIndex={setRoomsPaginationNumber}
              data={roomsFetch.data.results}
            />
          ) : (
            false
          )}
        </>
      )}
    </main>
  );
}
