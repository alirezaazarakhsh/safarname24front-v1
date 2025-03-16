// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import Introduction from '@/components/dashboard/financial/introduction';
import { FinancialSectionComponentPropsType } from '@/types/dashboard/component';
import CheckboxItem from '../checkboxItem';
import SwitchItem from '../switchItem';
import CustomCharge from '../customCharge';
import Invoice from '../invoice';
import PaymentErrorDialog from '../dialog/paymentErrorDialog';
import PaymentSuccessDialog from '../dialog/paymentSuccesfullDialog';
import PaymantCancledDialog from '../dialog/paymentCancledDialog';
import { cn } from '@/utils/utils';

// Creating and exporting Financial section component as default
export default function Financial({
  className,
}: FinancialSectionComponentPropsType): ReactNode {
  // Defining states of component
  const [priceType, setPriceType] = useState<'dynamic' | 'static'>('static');
  const [automaticDownload, setAutomaticDownload] = useState<boolean>(false);

  const [paymantCancledDialogOpened, setPaymantCancledDialogOpened] =
    useState<boolean>(false);
  const [paymantSuccessDialogOpened, setPaymantSuccessDialogOpened] =
    useState<boolean>(false);
  const [paymantErrorDialogOpened, setPaymantErrorDialogOpened] =
    useState<boolean>(false);

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
    <section className={cn('flex flex-col lg:gap-5 gap-[16px]', className)}>
      <PaymantCancledDialog
        isOpened={paymantCancledDialogOpened}
        closeFn={() => setPaymantCancledDialogOpened(false)}
      />
      <PaymentSuccessDialog
        isOpened={paymantSuccessDialogOpened}
        closeFn={() => setPaymantSuccessDialogOpened(false)}
      />
      <PaymentErrorDialog
        isOpened={paymantErrorDialogOpened}
        closeFn={() => setPaymantErrorDialogOpened(false)}
      />
      <div className="grid lg:grid-cols-4 lg:gap-5 gap-[16px]">
        <Introduction />
        <div>
          <IconedPrice
            icon="Wallet"
            title="موجودی شما"
            price={112459000}
            className="lg:mb-0 mb-[16px]"
          />
          <p className="lg:hidden block text-cs65 font-semibold text-black leading-[22px]">
            توضیحات شارژ کیف پول : مشتری گرامی لطفا از بین دو روش انتخابی شارژ
            موجودی خود یکی را انتخاب نمایید تا بخش مدنظر فعال شود.
          </p>
        </div>
      </div>
      <div className="lg:grid grid-cols-4 hidden gap-5">
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
      </div>
      <div className="grid lg:grid-cols-4 lg:gap-5 gap-[16px]">
        <div className="flex flex-col lg:gap-5 gap-[16px]">
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
        <div className="lg:hidden flex flex-col gap-[16px]">
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
        </div>

        <CustomCharge
          disabled={priceType === 'static'}
          onSubmit={(value) => setDynamicPrice(value)}
        />
        <Invoice
          value={
            priceType === 'static' ? selectedPrice || 0 : dynamicPrice || 0
          }
        />
      </div>
    </section>
  );
}
