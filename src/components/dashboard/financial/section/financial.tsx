// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import Introduction from '@/components/dashboard/financial/introduction';
import { FinancialSectionComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import CheckboxItem from '../checkboxItem';
import SwitchItem from '../switchItem';
import CustomCharge from '../customCharge';
import Invoice from '../invoice';

// Creating and exporting Financial section component as default
export default function Financial({
  className,
}: FinancialSectionComponentPropsType): ReactNode {
  // Defining states of component
  const [priceType, setPriceType] = useState<'dynamic' | 'static'>('static');
  const [automaticDownload, setAutomaticDownload] = useState<boolean>(false);

  const [dynamicPrice, setDynamicPrice] = useState<number | undefined>(
    undefined,
  );
  const [selectedPrice, setSelectedPrice] = useState<
    1000000 | 2000000 | 5000000 | 10000000 | undefined
  >(undefined);

  // Using useEffect to set and reset selectedPrice state
  useEffect(() => {
    priceType === 'static'
      ? setSelectedPrice(1000000)
      : setSelectedPrice(undefined);
  }, [priceType]);

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
        disabled={priceType === 'dynamic'}
        onClick={() => {
          selectedPrice === 1000000
            ? setSelectedPrice(undefined)
            : setSelectedPrice(1000000);
        }}
      />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={2000000}
        selected={selectedPrice === 2000000}
        disabled={priceType === 'dynamic'}
        onClick={() => {
          selectedPrice === 2000000
            ? setSelectedPrice(undefined)
            : setSelectedPrice(2000000);
        }}
      />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={5000000}
        selected={selectedPrice === 5000000}
        disabled={priceType === 'dynamic'}
        onClick={() => {
          selectedPrice === 5000000
            ? setSelectedPrice(undefined)
            : setSelectedPrice(5000000);
        }}
      />
      <IconedPrice
        icon="DollarSquare"
        title="مبلغ انتخابی"
        price={10000000}
        selected={selectedPrice === 10000000}
        disabled={priceType === 'dynamic'}
        onClick={() => {
          selectedPrice === 10000000
            ? setSelectedPrice(undefined)
            : setSelectedPrice(10000000);
        }}
      />
      <div className="flex flex-col gap-5">
        <CheckboxItem
          title="مبلغ انتخابی"
          onClick={() => setPriceType('static')}
          checked={priceType === 'static'}
        />
        <CheckboxItem
          title="مبلغ دستی اضافه"
          onClick={() => setPriceType('dynamic')}
          checked={priceType === 'dynamic'}
        />
        <SwitchItem
          title="فعالسازی اتومات دانلود فاکتور"
          onClick={() => setAutomaticDownload((prev) => !prev)}
          isOn={automaticDownload}
        />
      </div>
      <CustomCharge
        disabled={priceType === 'static'}
        onSubmit={(value) => setDynamicPrice(value)}
      />
      <Invoice
        value={priceType === 'static' ? selectedPrice || 0 : dynamicPrice || 0}
      />
    </section>
  );
}
