// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Search from '@/components/dashboard/financialFactors/search';
import { ReactNode, useState } from 'react';

// Defining fake data to render for now
const factorsData: {
  type: 'cashOut' | 'cartToCart' | 'add';
  amount: number;
  createdAt: string;
  status: 'successfull' | 'unsuccessfull';
  id: number;
}[] = [
  {
    id: 1,
    type: 'cashOut',
    amount: 2000000,
    createdAt: new Date().toISOString(),
    status: 'successfull',
  },
  {
    id: 2,
    type: 'cartToCart',
    amount: 14300000,
    createdAt: new Date().toISOString(),
    status: 'successfull',
  },
  {
    id: 3,
    type: 'add',
    amount: 6000000,
    createdAt: new Date().toISOString(),
    status: 'successfull',
  },
  {
    id: 4,
    type: 'cartToCart',
    amount: 6000000,
    createdAt: new Date().toISOString(),
    status: 'unsuccessfull',
  },
];

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): ReactNode {
  // Defining states of component
  const [searchVal, setSearchVal] = useState<string>('');

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <Search onChange={(val) => setSearchVal(val)} />
    </main>
  );
}
