// Importing part
import { ICCharSuccess } from '@/components/icons/ICChartSuccess';
import { ICCup } from '@/components/icons/ICCup';
import { ICSMSTracking } from '@/components/icons/ICSMSTracking';
import { ICVerify } from '@/components/icons/ICVerify';
import { UserStatusComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import UserStatusInfo from './userStatusInfo';

// Defining some fake data to render
const data = {
  successfullReservationCount: 50,
  ticketsCount: 110,
  customerClubScore: 4652,
  totalSuccesfullTransaction: 8000000,
};

// Creating and exporting UserStatus component as default
export default function UserStatus({
  className,
}: UserStatusComponentPropsType): ReactNode {
  // Returning JSx
  return (
    <div className={className}>
        <div className='lg:grid hidden grid-cols-4 gap-8'>
<UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICCharSuccess className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'تعداد رزرو های موفق من',
          value: {
            count: 0,
            unit: 'رزرو',
          },
          barMode: {
            unit: 'رزرو موفق',
            value: [],
          },
        }}
      />
      <UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICSMSTracking className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'مجموع تیکت های من',
          value: {
            count: data.ticketsCount,
            unit: 'تیکت',
          },
          barMode: {
            unit: 'تیکت',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
      <UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICCup className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'امتیاز باشگاه مشتری من',
          value: {
            count: data.customerClubScore,
            unit: 'امتیاز',
          },
          barMode: {
            unit: 'امتیاز',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
      <UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICVerify className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'مبلغ کل خرید موفق آمیز',
          value: {
            count: data.totalSuccesfullTransaction,
            unit: 'تومان',
          },
          barMode: {
            unit: 'تومان',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
        </div>
      <div className='lg:hidden grid grid-cols-1 gap-[12px]'>
<UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICCup className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'امتیاز باشگاه مشتری من',
          value: {
            count: data.customerClubScore,
            unit: 'امتیاز',
          },
          barMode: {
            unit: 'امتیاز',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
<UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICVerify className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'مبلغ کل خرید موفق آمیز',
          value: {
            count: data.totalSuccesfullTransaction,
            unit: 'تومان',
          },
          barMode: {
            unit: 'تومان',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
<UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICSMSTracking className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'مجموع تیکت های من',
          value: {
            count: data.ticketsCount,
            unit: 'تیکت',
          },
          barMode: {
            unit: 'تیکت',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
<UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: (
            <ICCharSuccess className="lg:w-4 lg:h-4 w-[20px] h-[20px] text-black" />
          ),
          title: 'تعداد رزرو های موفق من',
          value: {
            count: 0,
            unit: 'رزرو',
          },
          barMode: {
            unit: 'رزرو موفق',
            value: [],
          },
        }}
      />  
        </div>

    </div>
  );
}
