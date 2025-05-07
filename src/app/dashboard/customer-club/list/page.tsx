// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Filter from '@/components/dashboard/customerClubList/filter';
import CustomerClubListTable from '@/components/dashboard/CustomerClubList/table';

// Defining fake data to render
const list: {
  title: string;
  createdAt: string;
  price: number;
  score: number;
}[] = [
  {
    title: 'هتل اسپیناس پالاس تهران - اتاق تویین نرمال',
    createdAt: new Date().toISOString(),
    price: 2000000,
    score: 1365,
  },
  {
    title: 'هتل اسپیناس پالاس تهران - اتاق تویین نرمال',
    createdAt: new Date().toISOString(),
    price: 2000000,
    score: 1365,
  },
  {
    title: 'هتل اسپیناس پالاس تهران - اتاق تویین نرمال',
    createdAt: new Date().toISOString(),
    price: 2000000,
    score: 1365,
  },
  {
    title: 'هتل اسپیناس پالاس تهران - اتاق تویین نرمال',
    createdAt: new Date().toISOString(),
    price: 2000000,
    score: 1365,
  },
  {
    title: 'هتل اسپیناس پالاس تهران - اتاق تویین نرمال',
    createdAt: new Date().toISOString(),
    price: 2000000,
    score: 1365,
  },
];

// Creating and exporting customer club list page as default
export default function CustomerClubList(): ReactNode {
  // Defining states of component
  const [filterVal, setFilterVal] = useState<string>('');

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      <Filter onChange={(val) => setFilterVal(val)} />
      <CustomerClubListTable data={list} />
    </main>
  );
}
