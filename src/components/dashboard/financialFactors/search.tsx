// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { SearchFinancialDashboardPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import IconInput from '../ui/iconInput';

// Creating and exporting Search component/section of financial factors page as default
export default function Search({
  onChange,
}: SearchFinancialDashboardPropsType): ReactNode {
  // Returning JSX
  return (
    <div className='flex items-center justify-between gap-3 lg:w-auto w-full'>
      <span className='lg:block hidden truncate text-right w-full font-bold text-cs85 text-black'>
        لیست فاکتور های واریز و برداشت وجه
      </span>
      <IconInput
        wholeClassName='lg:bg-white bg-gray-100 lg:hover:bg-white hover:bg-gray-100 lg:w-auto w-full'
        icon='SearchStatus'
        className='lg:h-10 h-[45px] lg:w-[200px] w-full'
        placeholder='جست و جوی فاکتور ها'
        onChange={({ currentTarget: { value } }) => onChange?.(value)}
      />
    </div>
  );
}
