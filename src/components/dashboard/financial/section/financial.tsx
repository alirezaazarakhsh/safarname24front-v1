// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import Introduction from '@/components/dashboard/financial/introduction';
import { FinancialSectionComponentPropsType } from '@/types/dashboard/component';
import CustomCharge from '../customCharge';
import Invoice from '../invoice';
import Link from 'next/link';
import useUserWalletBalance from '@/hooks/dashboard/useUserWalletBalance';
import { useMediaQuery } from '@/hooks';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETWalletPacks } from '@/types/dashboard/api/get';
import { Skeleton } from '@/components/ui/skeleton';

// Defining fake data for rendering selected price to be dynamic
const selectedPriceData: number[] = [1000000, 2000000, 5000000, 10000000];

// Creating and exporting Financial section component as default
export default function Financial({
  className,
}: FinancialSectionComponentPropsType): ReactNode {
  // Defining hooks of component
  const [priceType, setPriceType] = useState<'dynamic' | 'static'>('static');
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined,
  );
  const [dynamicPrice, setDynamicPrice] = useState<number | undefined>(
    undefined,
  );

  // Using useEffect to set and reset selectedPrice state
  useEffect(() => {
    priceType === 'static'
      ? setSelectedPrice(1000000)
      : setSelectedPrice(undefined);
  }, [priceType]);

  // Defining hooks
  const wallet = useUserWalletBalance();

  // Fetching data
  const walletPacks = useApiQuery<GETWalletPacks>({
    url: '/finance/wallet/packs/',
    queryKey: ['wallet-packs'],
    options: {
      staleTime: Infinity,
    },
  });

  // Returning JSX
  return (
    <section className={className}>
      <div className="grid lg:grid-cols-4 lg:gap-5 gap-[16px] lg:px-0 px-[24px] lg:mb-5 mb-[24px]">
        <Introduction
          value={priceType}
          onValueChange={setPriceType}
          className='lg:col-span-3'
        />
        <div>
          <IconedPrice
            icon="Wallet"
            title="موجودی شما"
            price={wallet.balance}
            className="lg:mb-0 mb-[16px]"
          />
          <p className="lg:hidden block text-cs65 font-semibold text-black leading-[22px]">
            توضیحات شارژ کیف پول : مشتری گرامی لطفا از بین دو روش انتخابی شارژ
            موجودی خود یکی را انتخاب نمایید تا بخش مدنظر فعال شود.
          </p>
        </div>
      </div>
      {walletPacks.isLoading ? (
        <div className="lg:grid grid-cols-4 hidden gap-5 mb-5">
          {[...new Array(4)].map((_, index) => (
            <Skeleton className="h-[74px]" key={index} />
          ))}
        </div>
      ) : !walletPacks.isLoading && !walletPacks.isError && walletPacks.data ? (
        <div className="lg:grid grid-cols-4 hidden gap-5 mb-5">
          {Object.values(walletPacks.data[0])
            .map((str) => parseFloat(str))
            .map((item, index) => (
              <IconedPrice
                key={index}
                icon="DollarSquare"
                title="مبلغ انتخابی"
                price={item}
                selected={selectedPrice === item}
                disabled={priceType === 'dynamic'}
                onClick={() => {
                  selectedPrice === item
                    ? setSelectedPrice(undefined)
                    : setSelectedPrice(item);
                }}
              />
            ))}
          {!isMobile &&
            [...new Array(4 - selectedPriceData.length)].map((_, index) => (
              <div
                key={index}
                className="bg-white lg:h-auto h-[64px] lg:rounded-[10px] rounded-[12px] border lg:px-3 lg:py-4 px-[16px] py-[16px] border-black/10"
              />
            ))}
        </div>
      ) : (
        false
      )}
      <div className="grid lg:grid-cols-5 lg:gap-5 gap-0">
        <div className="lg:hidden flex flex-col gap-[16px] border-y-[1.5px] border-y-black/10 lg:px-0 px-[24px] py-[24px]">
          <IconedPrice
            icon="DollarSquare"
            title="مبلغ انتخابی"
            price={1000000}
            selected={selectedPrice === 1000000}
            disabled={priceType === 'dynamic'}
            className="h-[83px]"
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
            className="h-[83px]"
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
            className="h-[83px]"
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
            className="h-[83px]"
            selected={selectedPrice === 10000000}
            disabled={priceType === 'dynamic'}
            onClick={() => {
              selectedPrice === 10000000
                ? setSelectedPrice(undefined)
                : setSelectedPrice(10000000);
            }}
          />
        </div>
        <div className="grid lg:grid-cols-3 lg:col-span-5 grid-cols-1 lg:gap-5 gap-[16px] lg:bg-transparent bg-white">
          <CustomCharge
            disabled={priceType === 'static'}
            onSubmit={(value) => setDynamicPrice(value)}
          />
          <div className="lg:p-0 p-[24px] border-t-[1.5px] lg:border-transparent border-black/10">
            <Link
              href="/dashboard/financial/factors"
              className="rounded-[12px] border border-black/10 p-[14px] lg:hidden flex items-center justify-between gap-3 mb-[16px]"
            >
              <span className="truncate text-[12px] font-semibold text-black block text-right">
                مشاهده لیست تمام تراکنش ها
              </span>
              <div className="h-[34px] w-[80px] shrink-0 bg-gray-100 flex items-center justify-center rounded-[6px]">
                <span className="text-[10px] font-semibold text-black">
                  مشاهده
                </span>
              </div>
            </Link>
            <Invoice
              value={
                priceType === 'static' ? selectedPrice || 0 : dynamicPrice || 0
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
