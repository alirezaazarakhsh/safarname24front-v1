// Forcing next.js to render this component as client side component
'use client';

// Importing part
import ErrorTable from '@/components/dashboard/api/errorTable';
import Filter from '@/components/dashboard/passengers/filter';
import PassengersTable from '@/components/dashboard/passengers/table';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETPasssengers } from '@/types/dashboard/api/get';
import { ReactNode, useState } from 'react';

// Creating and exporting passengers page as default
export default function PassengersPage(): ReactNode {
  // Defining states of component
  const [filter, setFilter] = useState<string>('');

  // Fetching the data
  const getData = useApiQuery<GETPasssengers>({
    url: '/profile/passengers/',
    queryKey: ['passengers', 'list'],
    options: {
      staleTime: 30000, // 30 Sec
    },
  });

  // Returning JSX
  return (
    <main className='lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white'>
      {!getData.isLoading && getData.isError ? (
        <ErrorTable refetch={() => getData.refetch()} />
      ) : (
        <>
          <Filter
            onChange={(val) => setFilter(val)}
            loading={getData.isLoading}
            dataNotEmpty={
              getData.data ? getData.data.results.length !== 0 : false
            }
          />
          <PassengersTable
            loading={getData.isLoading}
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
                      ].some((field) => field?.toLowerCase().includes(filter)),
                    )
                : []
            }
          />
        </>
      )}
    </main>
  );
}
