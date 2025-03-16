// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Financial from '@/components/dashboard/financial/section/financial';
import TransactionsTable from '@/components/dashboard/financial/section/transactionsTable';
import { ReactNode } from 'react';

// Defining fake data to render
const transactions: {
  codePeigiri: string;
  price: number;
  createdAt: string;
  bank: string;
  status: 'successfull' | 'unsucessfull';
}[] = [
  {
    codePeigiri: '1648952156',
    price: 21000000,
    createdAt: new Date().toISOString(),
    bank: 'نقل و انتقال از بانک پارسیان',
    status: 'successfull',
  },
  {
    codePeigiri: '1648952156',
    price: 1000000,
    createdAt: new Date().toISOString(),
    bank: 'نقل و انتقال از بانک انصار',
    status: 'unsucessfull',
  },
  {
    codePeigiri: '1648952156',
    price: 5000000,
    createdAt: new Date().toISOString(),
    bank: 'نقل و انتقال از بانک پاسارگاد',
    status: 'successfull',
  },
];

// Creating and exporting financial edit page as default
export default function FinancialPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <Financial />
      <TransactionsTable data={transactions} />
    </main>
  );
}
