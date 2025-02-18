// Importing part
import { ICCharSuccess } from '@/components/icons/ICChartSuccess';
import { ICCup } from '@/components/icons/ICCup';
import { ICHoriz3Dots } from '@/components/icons/ICHoriz3Dots';
import { ICSMSTracking } from '@/components/icons/ICSMSTracking';
import { ICVerify } from '@/components/icons/ICVerify';
import { UserStatusComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';
import { numberSeparation } from '@/utils';
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
    <div className={cn('grid grid-cols-4 gap-8', className)}>
      <UserStatusInfo
        data={{
          icon: <ICCharSuccess className="w-4 h-4 text-black" />,
          title: 'تعداد رزرو های موفق من',
          value: {
            count: data.successfullReservationCount,
            unit: 'رزرو',
          },
          barMode: {
            unit: 'رزرو موفق',
            value: [
              { date: new Date().toISOString(), value: 12 },
              { date: new Date().toISOString(), value: 12 },
            ],
          },
        }}
      />
      <UserStatusInfo
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
