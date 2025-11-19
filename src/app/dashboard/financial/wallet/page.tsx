// Forcing next.js to render this component as client side component
'use client';

// Importing part
import Financial from '@/components/dashboard/financial/section/financial';
import { ReactNode } from 'react';

// Creating and exporting financial edit page as default
export default function FinancialPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <Financial />
    </main>
  );
}
