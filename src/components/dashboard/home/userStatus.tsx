// Importing part
import { ICCharSuccess } from '@/components/icons/ICChartSuccess';
import { ICCup } from '@/components/icons/ICCup';
import { ICSMSTracking } from '@/components/icons/ICSMSTracking';
import { ICVerify } from '@/components/icons/ICVerify';
import { UserStatusComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
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
    <div
      className={cn(
        'lg:grid lg:overflow-visible overflow-auto scrollbar-hide grid-cols-4 lg:gap-8 gap-4 flex',
        className,
      )}
    >
      <UserStatusInfo
        className="lg:shrink shrink-0"
        data={{
          icon: <ICCharSuccess className="w-4 h-4 text-black" />,
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
          icon: <ICSMSTracking className="w-4 h-4 text-black" />,
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
          icon: <ICCup className="w-4 h-4 text-black" />,
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
          icon: <ICVerify className="w-4 h-4 text-black" />,
          title: 'تعداد رزرو های موفق من',
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
  );
}
