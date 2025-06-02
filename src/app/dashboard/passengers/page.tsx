// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Filter from '@/components/dashboard/passengers/filter';
import PassengersTable from '@/components/dashboard/passengers/table';
import { ReactNode, useState } from 'react';

// Defining some fake data to render later in table
const passengers: {
  name: {
    firstName: string;
    lastName: string;
  };
  tell: string;
  id: number;
  meliCodeOrPassportNumber: string;
}[] = [
  {
    id: 1,
    name: { firstName: 'علی', lastName: 'محمدی' },
    tell: '09121234567',
    meliCodeOrPassportNumber: '0083456791',
  },
  {
    id: 2,
    name: { firstName: 'نگار', lastName: 'کریمی' },
    tell: '09351234567',
    meliCodeOrPassportNumber: '0074561238',
  },
  {
    id: 3,
    name: { firstName: 'حسین', lastName: 'جعفری' },
    tell: '09193456789',
    meliCodeOrPassportNumber: 'N1234567890',
  },
  {
    id: 4,
    name: { firstName: 'مینا', lastName: 'شریفی' },
    tell: '09221234567',
    meliCodeOrPassportNumber: '0056789123',
  },
  {
    id: 5,
    name: { firstName: 'سعید', lastName: 'رضایی' },
    tell: '09127894561',
    meliCodeOrPassportNumber: 'P9876543210',
  },
  {
    id: 6,
    name: { firstName: 'الهام', lastName: 'فلاح' },
    tell: '09332104567',
    meliCodeOrPassportNumber: '0034217896',
  },
  {
    id: 7,
    name: { firstName: 'مجتبی', lastName: 'کریمی' },
    tell: '09912345678',
    meliCodeOrPassportNumber: '0067894321',
  },
  {
    id: 8,
    name: { firstName: 'سارا', lastName: 'قاسمی' },
    tell: '09124445566',
    meliCodeOrPassportNumber: 'L9087654321',
  },
  {
    id: 9,
    name: { firstName: 'رضا', lastName: 'امینی' },
    tell: '09364443322',
    meliCodeOrPassportNumber: '0023345678',
  },
  {
    id: 10,
    name: { firstName: 'مریم', lastName: 'باقری' },
    tell: '09101112233',
    meliCodeOrPassportNumber: 'Q1239874560',
  },
];

// Creating and exporting passengers page as default
export default function PassengersPage(): ReactNode {
  // Defining states of component
  const [filter, setFilter] = useState<string>('');

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[25px] lg:bg-transparent bg-white">
      <Filter
        dataNotEmpty={passengers.length !== 0}
        onChange={(val) => setFilter(val)}
      />
      <PassengersTable data={passengers} />
    </main>
  );
}
