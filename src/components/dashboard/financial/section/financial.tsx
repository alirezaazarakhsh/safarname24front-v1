// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import Introduction from '@/components/dashboard/financial/introduction';
import { FinancialSectionComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';

// Creating and exporting Financial section component as default
export default function Financial({
  className,
}: FinancialSectionComponentPropsType): ReactNode {
  // Defining states of component
  const [selectedPrice, setSelectedPrice] = useState<number>(1000000);

  // Returning JSX
  return (
    <section className={cn('grid grid-cols-4 gap-5', className)}>
      <Introduction />
      <IconedPrice icon="Wallet" title="موجودی شما" price={112459000} />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={1000000}
        selected={selectedPrice === 1000000}
        onClick={() => setSelectedPrice(1000000)}
      />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={2000000}
        selected={selectedPrice === 2000000}
        onClick={() => setSelectedPrice(2000000)}
      />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={5000000}
        selected={selectedPrice === 5000000}
        onClick={() => setSelectedPrice(5000000)}
      />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={10000000}
        selected={selectedPrice === 10000000}
        onClick={() => setSelectedPrice(10000000)}
      />
    </section>
  );
}
