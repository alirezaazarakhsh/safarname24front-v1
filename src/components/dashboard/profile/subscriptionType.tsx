// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { SubscriptionTypeComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import Image from 'next/image';
import starsBg from '../../../../public/image/subscriptionStars.png';
import Tooltip from '../ui/tooltip';

// Creating and exporting SubscriptionType component as default
export default function SubscriptionType({
  type,
  className,
}: SubscriptionTypeComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <Tooltip
      content='* با ارتقای خرید سطح کاربری خود را افزایش دهید تا در تخفیفات
اتاق بهترین خرید داشته باشید برای اطلاعات بیشتر به صفحه قوانین و مقررات مراجعه نمایید.'
    >
      <div
        className={cn(
          'lg:rounded-lg rounded-[12px] bg-gradient-to-tr from-[#282828] lg:px-3 lg:py-4 px-[16px] py-[16px] flex items-center justify-start gap-3 text-white overflow-hidden relative',
          type === 'premium' ? 'to-[#E4BF45]' : 'to-[#616161]',
          className,
        )}
      >
        <Image
          alt='عکس ستاره ها'
          src={starsBg.src}
          width={340}
          height={180}
          className='absolute top-0 left-0 w-full object-cover scale-105 h-full pointer-events-none'
        />
        <div className='border-2 border-current w-[50px] h-[50px] aspect-square shrink-0 flex items-center justify-center rounded-md'>
          <IconsaxIcons
            name='Rank'
            className='w-[20px] h-[20px]'
            color='currentColor'
          />
        </div>
        <div className='w-full overflow-hidden'>
          <span className='font-semibold text-cs08 text-current block text-right truncate mb-2'>
            سطح کاربری شما
          </span>
          <span className='font-semibold text-cs08 text-current block text-right truncate'>
            {type === 'premium' ? 'پریمیوم' : 'نقره ای'}
          </span>
        </div>
      </div>
    </Tooltip>
  );
}
