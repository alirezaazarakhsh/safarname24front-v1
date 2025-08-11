// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Filter from '@/components/dashboard/customClub/filter';
import CustomersClubTable from '@/components/dashboard/customClub/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import ErrorTable from '@/components/dashboard/api/errorTable';
import EmptyTable from '@/components/dashboard/api/emptyTable';
import {
  GETCustomerClubRoomList,
  GETCustomerClubShoppingCentreList,
} from '@/types/dashboard/api/get';
import RoomTable from '@/components/dashboard/customClub/roomTable';

// Creating and exporting customer club page as default
export default function CustomerClubPage(): ReactNode {
  // Defining hooks
  const [giftsType, setGiftsType] = useState<'shoppingCentre' | 'hotel'>(
    'shoppingCentre',
  );

  // Fetching the data
  const shoppingCentresFetch = useApiQuery<GETCustomerClubShoppingCentreList>({
    url: `/crm/shopping-discount-codes`,
    queryKey: ['shopping-centre-gifts'],
    options: {
      enabled: giftsType === 'shoppingCentre',
    },
  });

  const roomsFetch = useApiQuery<GETCustomerClubRoomList>({
    url: `/crm/room-discount-codes`,
    queryKey: ['room-gifts'],
    options: {
      enabled: giftsType === 'hotel',
    },
  });

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      <Filter
        loading={shoppingCentresFetch.isLoading}
        onChange={setGiftsType}
      />
      {giftsType === 'shoppingCentre' ? (
        <>
          {shoppingCentresFetch.isLoading ? (
            <CustomersClubTable loading />
          ) : shoppingCentresFetch.error ? (
            <ErrorTable />
          ) : !shoppingCentresFetch.isError && shoppingCentresFetch.data ? (
            <>
              {shoppingCentresFetch.data.length === 0 ? (
                <EmptyTable />
              ) : (
                <CustomersClubTable data={shoppingCentresFetch.data} />
              )}
            </>
          ) : (
            false
          )}
        </>
      ) : (
        <>
          {roomsFetch.isLoading ? (
            <RoomTable loading />
          ) : roomsFetch.error ? (
            <ErrorTable />
          ) : !roomsFetch.isError && roomsFetch.data ? (
            <>
              {roomsFetch.data.length === 0 ? (
                <EmptyTable />
              ) : (
                <RoomTable data={roomsFetch.data} />
              )}
            </>
          ) : (
            false
          )}
        </>
      )}
    </main>
  );
}
