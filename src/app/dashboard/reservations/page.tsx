// Forcing next.js to render this component as client side component
'use client';

import ErrorTable from '@/components/dashboard/api/errorTable';
// Importing part
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETReservation } from '@/types/dashboard/api/get';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';

// Defining some dummy data to render
const data: {
  id: number;
  code: string;
  hotel: string;
  enterAt: string;
  exitAt: string | null;
  passengers: string;
  financialStatus: 'payed' | 'cancled' | 'pending';
}[] = [
    {
      id: 1,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'payed',
    },
    {
      id: 2,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: null,
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'payed',
    },
    {
      id: 3,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'cancled',
    },
    {
      id: 4,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'payed',
    },
    {
      id: 5,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'pending',
    },
    {
      id: 1,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'payed',
    },
    {
      id: 2,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: null,
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'payed',
    },
    {
      id: 3,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'cancled',
    },
    {
      id: 4,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'payed',
    },
    {
      id: 5,
      code: 'ZMA45362',
      hotel: 'اسپیناس پالاس تهران',
      enterAt: new Date().toISOString(),
      exitAt: new Date().toISOString(),
      passengers: 'محمد مهدی تاشا',
      financialStatus: 'pending',
    },
  ];

// Creating and exporting Reservations page as default
export default function ReservationsPage(): ReactNode {
  // Defining states of component
  const [filterVal, setFilterVal] = useState<string>('');
  const [filtredData, setFiltredData] = useState<typeof data>(data);

  // Fetching the data
  const getData = useApiQuery<GETReservation>({
    url: '/hotel/reservations/',
    queryKey: ['reservations', 'hotels', 'reserved-hotels'],
  });

  // Using useEffect to filter data object while filterVal changes
  useEffect(() => {
    if (filterVal === '') {
      setFiltredData(data);
    } else {
      const filtredObj = data.filter((item) => {
        const combinedStrings =
          `${item.passengers} ${item.hotel}`.toLowerCase(); // In case of being english
        return combinedStrings.includes(filterVal.toLowerCase());
      });

      setFiltredData(filtredObj);
    }
  }, [filterVal]);

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      {getData.isError && !getData.isLoading ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : (
        <>
          <Filter
            onChange={(val) => setFilterVal(val)}
            className={cn(data.length === 0 ? 'lg:block hidden' : '')}
            dataNotEmpty={data.length !== 0}
            loading={getData.isLoading}
          />
          <AllFactorsTable data={filtredData} loading={getData.isLoading} />
        </>
      )}
    </main>
  );
}
