// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { CartBalanceComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';
import { numberSeparation } from '@/utils';
import { cn } from '@/utils/utils';
import { useMediaQuery } from '@/hooks';
import useUserWalletBalance from '@/hooks/dashboard/useUserWalletBalance';

// Creating and exporting CartBalance component as deafult
export default function CartBalance({
  className,
  hasMobileView = false,
}: CartBalanceComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const wallet = useUserWalletBalance();

  // Conditional rendering
  if (!hasMobileView) {
    return (
      <div
        className={cn(
          'p-[20px] bg-white border border-black/10 rounded-[14px]',
          className,
        )}
      >
        <div className='mb-[20px] pb-[20px] border-b border-b-black/10 flex items-center justify-between gap-3'>
          <div className='flex items-center justify-start gap-[10px] w-full overflow-hidden text-black'>
            <IconsaxIcons
              name='Wallet'
              className='w-[20px] h-[20px] shrink-0 text-current'
            />
            <span className='text-[12px] truncate block w-full text-right font-semibold text-current'>
              موجودی شما :
            </span>
          </div>
          {wallet.balance !== 0 ? (
            <p className='shrink-0 text-black'>
              <span className='text-[12px] font-semibold'>
                {`${numberSeparation(wallet.balance)} `}
              </span>
              <span className='text-[12px] font-semibold'>تومان</span>
            </p>
          ) : (
            <p className='shrink-0 text-black text-[16px] font-bold'>
              حساب شما خالی میباشد!
            </p>
          )}
        </div>
        <Link
          href='/dashboard/charge'
          className='flex justify-start items-center gap-[10px] text-blue-500 w-full'
        >
          <span className='block trucate text-current text-[10px] font-semibold'>
            افزایش موجودی کیف پول
          </span>
          <ICArrowFlashRight className='text-current stroke-current w-[15px] h-[15px] shrink-0 rotate-180' />
        </Link>
      </div>
    );
  } else {
    if (isMobile) {
      return (
        <div
          className={cn(
            'p-[20px] bg-white border border-black/10 rounded-[14px]',
            className,
          )}
        >
          <div className='mb-[20px] pb-[20px] border-b border-b-black/10 flex items-center justify-between gap-3'>
            <div className='flex items-center justify-start gap-[10px] w-full overflow-hidden text-black'>
              <IconsaxIcons
                name='Wallet'
                className='w-[20px] h-[20px] shrink-0 text-current'
              />
              <span className='text-[12px] truncate block w-full text-right font-semibold text-current'>
                موجودی شما :
              </span>
            </div>
            {wallet.balance !== 0 ? (
              <p className='shrink-0 text-black'>
                <span className='text-[16px] font-bold'>{`${numberSeparation(wallet.balance)} `}</span>
                <span className='text-[12px] font-semibold'>تومان</span>
              </p>
            ) : (
              <p className='shrink-0 text-black text-[16px] font-bold'>
                حساب شما خالی میباشد!
              </p>
            )}
          </div>
          <Link
            href='/dashboard/charge'
            className='flex justify-start items-center gap-[10px] text-blue-500 w-full'
          >
            <span className='block trucate text-current text-[10px] font-semibold'>
              افزایش موجودی کیف پول
            </span>
            <ICArrowFlashRight className='text-current stroke-current w-[15px] h-[15px] shrink-0 rotate-180' />
          </Link>
        </div>
      );
    } else {
      return (
        <div
          className={cn(
            'bg-white lg:h-auto h-[64px] lg:rounded-lg rounded-[12px] border border-black/10 lg:px-3 lg:py-4 px-[16px] py-[16px] flex items-center justify-between gap-3',
            className,
          )}
        >
          <div className='flex items-center justify-start gap-3 overflow-hidden'>
            <div className='flex items-center justify-center w-[50px] h-[50px] border border-black/10 shrink-0 rounded-md'>
              <IconsaxIcons
                name='Wallet'
                className='w-[20px] h-[20px] shrink-0 text-current'
              />
            </div>
            <div className='w-full overflow-hidden'>
              <span className='font-semibold text-cs08 text-black block text-right truncate mb-2'>
                موجودی شما
              </span>
              <span className='font-semibold text-cs08 text-black block text-right truncate'>
                {wallet.balance === 0
                  ? 'حساب شما خالی میباشد!'
                  : `${numberSeparation(wallet.balance)} تومان`}
              </span>
            </div>
          </div>
          <Link
            href='/dashboard/financial/wallet'
            className='px-3 bg-blue-50 text-blue-500 h-[35px] rounded-[6px] flex items-center justify-center shrink-0'
          >
            <span className='text-[10px] font-bold text-current'>
              افزایش کیف پول
            </span>
          </Link>
        </div>
      );
    }
  }
}
