// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { SearchFinancialDashboardPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import IconInput from '../ui/iconInput';

// Creating and exporting Search component/section of customer club list page as default
export default function Search({
  onChange,
}: SearchFinancialDashboardPropsType): ReactNode {
  // Defining states of component
  const [val, setVal] = useState<string>('');

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange && onChange(val), [val]);

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-3 lg:w-auto w-full lg:px-0 px-[24px]">
      <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
        باشگاه مشتریان - لیست جایزه های دریافتی
      </span>
      <IconInput
        wholeClassName="lg:bg-white bg-gray-100 lg:hover:bg-white hover:bg-gray-100 lg:w-auto w-full"
        icon="SearchStatus"
        className="lg:h-10 h-[45px] lg:w-[200px] w-full"
        placeholder="جستجو مسافر، هتل"
        onChange={({ target: { value } }) => setVal(value)}
      />
    </div>
  );
}
