// Forcing next.js to render this component as client side component
'use client';

// Importing part
import ErrorTable from '@/components/dashboard/api/errorTable';
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETReservation } from '@/types/dashboard/api/get';
import { ReactNode, useEffect, useState } from 'react';

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
  // Defining states of component
  const [filterVal, setFilterVal] = useState<string>('');
  const [filtredData, setFiltredData] = useState<GETReservation>([]);

  // Fetching the data
  const getData = useApiQuery<GETReservation>({
    url: '/hotel/reservations/',
    queryKey: ['reservations', 'hotels', 'reserved-hotels'],
  });

  // Using useEffect to filter data object while filterVal changes
  useEffect(() => {
    if (!getData.isLoading && !getData.isError && getData.data) {
      if (filterVal === '') {
        setFiltredData(getData.data);
      } else {
        const filtredObj = getData.data.filter((item) => {
          const combinedStrings = item.passengers.join(' ').toLowerCase(); // In case of being english
          return combinedStrings.includes(filterVal.toLowerCase());
        });

        setFiltredData(filtredObj);
      }
    }
  }, [filterVal, getData]);

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      {getData.isError && !getData.isLoading ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : (
        <>
          {
            <Filter
              onChange={(val) => setFilterVal(val)}
              dataNotEmpty={false}
              loading={getData.isLoading}
            />
          }
          <AllFactorsTable data={filtredData} loading={getData.isLoading} />
        </>
      )}
    </main>
  );
}
