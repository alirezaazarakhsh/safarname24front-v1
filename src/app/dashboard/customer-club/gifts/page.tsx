// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import SafarnameLogo from '../../../../public/image/logo/white.webp';
import moment from 'jalali-moment';
import Filter from '@/components/dashboard/customClub/filter';
import CustomersClubTable from '@/components/dashboard/customClub/table';
import DiscountCodeNumber from '@/components/dashboard/customClub/discountCodeNumber';
import useLocalStorage from '@/hooks/useLocalStorage';

// Defining fake data to render
const scores: {
  totalScores: number;
  data: {
    company: {
      name: string;
      persianName: string;
      logo: string;
    };
    title: string;
    score: number;
    id: number;
    status: 'used' | 'unused' | 'active' | 'deactive';
    discount: {
      code: string;
      price: number;
      endsAt: string;
    };
  }[];
} = {
  totalScores: 4698,
  data: [
    {
      company: {
        name: 'Hadish Mall Cinema',
        persianName: 'سینمایی هدیش مال',
        logo: SafarnameLogo.src,
      },
      id: 1,
      title: 'اتاق دوبلکس هتل اوین',
      score: 1365,
      status: 'used',
      discount: {
        code: 'FGA6J85JI2K9',
        price: 20000000,
        endsAt: moment().add(12, 'jDay').toISOString(),
      },
    },
    {
      company: {
        name: 'Hadish Mall Cinema',
        persianName: 'سینمایی هدیش مال',
        logo: SafarnameLogo.src,
      },
      title: 'اتاق دوبلکس هتل اوین',
      id: 1,
      score: 1365,
      status: 'unused',
      discount: {
        code: 'FGA6J85JI2K9',
        price: 20000000,
        endsAt: moment().add(12, 'jDay').toISOString(),
      },
    },
    {
      company: {
        name: 'Hadish Mall Cinema',
        persianName: 'سینمایی هدیش مال',
        logo: SafarnameLogo.src,
      },
      title: 'اتاق دوبلکس هتل اوین',
      id: 1,
      score: 1365,
      status: 'active',
      discount: {
        code: 'FGA6J85JI2K9',
        price: 20000000,
        endsAt: moment().add(12, 'jDay').toISOString(),
      },
    },
    {
      company: {
        name: 'Hadish Mall Cinema',
        persianName: 'سینمایی هدیش مال',
        logo: SafarnameLogo.src,
      },
      title: 'اتاق دوبلکس هتل اوین',
      id: 1,
      score: 1365,
      status: 'deactive',
      discount: {
        code: 'FGA6J85JI2K9',
        price: 20000000,
        endsAt: moment().subtract(12, 'jDay').toISOString(),
      },
    },
  ],
};

// Creating and exporting customer club page as default
export default function CustomerClubPage(): ReactNode {
  // Defining hooks
  const numberIsSavedForDiscount = useLocalStorage({
    value: 'discountNumber',
  });

  // Defining states of component
  const [giftsType, setGiftsType] = useState<'shoppingCentre' | 'hotel'>(
    'shoppingCentre',
  );

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px] lg:bg-transparent bg-white">
      {!numberIsSavedForDiscount.data && <DiscountCodeNumber />}
      <Filter
        onChange={(val) => setGiftsType(val)}
        totalScore={scores.totalScores}
      />
      <CustomersClubTable data={scores.data} />
    </main>
  );
}
