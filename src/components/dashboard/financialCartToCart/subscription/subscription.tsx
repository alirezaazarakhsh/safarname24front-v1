// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { ReactNode, useState } from 'react';
import moment from 'jalali-moment';
import { numberSeparation } from '@/utils';
import SubscriptionChart from './subscriptionChart';
import { SubscriptionComponentPropsType } from '@/types/dashboard/component';
import { ICChartDown } from '@/components/icons/ICChartDown';
import { cn } from '@/utils/utils';
import { isNearISO } from '@/utils/date';
import RenewSubscriptionDialog from '../dialog/renewSubscription';
import Tooltip from '../../ui/tooltip';
import SubscriptionDetailsDialog from '../dialog/subscriptionDetailDialog';

// Creating and exporting Subscription component as default
export default function Subscription({
  subscription,
  className,
}: SubscriptionComponentPropsType): ReactNode {
  // Defining hooks
  const [renewalDialogOpened, setRenewalDialogOpened] = useState<boolean>(false);
  const [detailsDialogOpened, setDetailsDialogOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg rounded-[14px] overflow-hidden flex flex-col justify-between items-center',
        className,
      )}
    >
      <SubscriptionDetailsDialog
        open={detailsDialogOpened}
        onOpenChange={setDetailsDialogOpened}
      />
      <div className="lg:p-4 p-[14px] flex items-center justify-between border-b border-b-black/10 gap-3 shrink-0 w-full">
        <div className='flex items-center justify-start gap-3 flex-1 overflow-hidden'>
          <div className="shrink-0 size-[45px] rounded-md flex items-center justify-center border border-black/10 text-black">
            <IconsaxIcons
              name="Flash"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          </div>
          <div className="overflow-hidden w-full">
            <span className="lg:text-cs75 text-[12px] font-semibold text-black truncate block text-right mb-1">
              اشتراک
            </span>
            <p className="text-right truncate text-black/50 lg:text-cs75 text-[10px] lg:font-semibold font-bold">
              کد تخفیف کارت اشتراکی سفرنامه 24
            </p>
          </div>
          {
            subscription && isNearISO(subscription.endsAt) && (
              <>
                <RenewSubscriptionDialog open={renewalDialogOpened} onOpenChange={setRenewalDialogOpened} />
                <Tooltip content='تمدید اشتراک'>
                  <button onClick={() => setRenewalDialogOpened(true)} className="size-[45px] shrink-0 flex items-center justify-center rounded-md text-white  transition-all duration-500 bg-black">
                    <IconsaxIcons
                      name="Repeat"
                      className="w-[20px] h-[20px]"
                      color="currentColor"
                    />
                  </button>
                </Tooltip>
              </>
            )
          }
        </div>
      </div>
      <div className="flex lg:flex-row flex-col items-center gap-3 w-full h-full lg:p-4 p-[14px] overflow-auto scrollbar-hide">
        {subscription?.chart ? (
          <div className="lg:w-[125px] w-full lg:h-full h-[145px] bg-gray-100 border-[1.5px] border-black/10 lg:rounded-lg rounded-[10px] shrink-0 overflow-auto scrollbar-hide flex items-end justify-start">
            <SubscriptionChart chart={subscription.chart} />
          </div>
        ) : (
          <div className="lg:w-[125px] w-full lg:h-full h-[145px] bg-gray-100 border-[1.5px] border-black/10 lg:rounded-lg rounded-[10px] shrink-0 overflow-auto scrollbar-hide flex items-center flex-col justify-center">
            <ICChartDown
              className="lg:w-[60px] w-[40px] aspect-square block lg:mb-3 mb-2"
              fill="currentColor"
            />
            <span className="lg:text-cs75 text-[14px] block text-center mx-auto truncate font-normal text-current">
              مبلغ چارت نامعلوم
            </span>
          </div>
        )}
        <div className="w-full h-full flex flex-col justify-center lg:gap-5 gap-[10px] items-start">
          <span className="block text-right font-semibold text-black lg:text-cs75 text-[10px] truncate w-full">
            کارت اشتراک ندارید!
          </span>
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="block text-right font-medium text-black lg:text-cs07 text-[10px] truncate">
              تاریخ انقضا :
            </span>
            <span className="block text-left font-medium text-black lg:text-cs07 text-[10px] truncate">
              {subscription
                ? moment(subscription.endsAt).format('jYYYY/jMM/jDD')
                : 'نامعلوم'}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 w-full">
            <span className="block text-right font-medium text-black lg:text-cs07 text-[10px] truncate">
              نوع :
            </span>
            <span className="block text-left font-medium text-black lg:text-cs07 text-[10px] truncate">
              {subscription
                ? subscription.type === "free" ? "ارتقاء" : "خریداری شده"
                : 'نامعلوم'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 w-full">
            <span className="block text-right font-medium text-black lg:text-cs07 text-[10px] truncate">
              مبلغ اشتراک :
            </span>
            <span className="block text-left font-medium text-black lg:text-cs07 text-[10px] truncate">
              {subscription
                ? `${numberSeparation(subscription.price)} تومان`
                : 'نامعلوم'}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4 shrink-0 w-full">
        <button className="bg-black rounded-lg items-center justify-center flex text-white w-full px-3 h-[40px] text-cs07 font-semibold" onClick={() => setDetailsDialogOpened(true)}>
          جزییات استفاده کارت اشتراکی
        </button>
      </div>
    </div>
  );
}
