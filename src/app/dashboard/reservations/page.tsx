// Importing part
import AllFactorsTable from '@/components/dashboard/reservation/allFactorsTable';
import Filter from '@/components/dashboard/reservation/filter';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

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
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      <Filter
        className={cn(data.length === 0 ? 'lg:block hidden' : '')}
        dataNotEmpty={data.length !== 0}
      />
      <AllFactorsTable data={data} />
    </main>
  );
}
