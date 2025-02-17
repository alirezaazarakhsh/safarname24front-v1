// Importing part
import { ICCharSuccess } from "@/components/icons/ICChartSuccess";
import { ICCup } from "@/components/icons/ICCup";
import { ICHoriz3Dots } from "@/components/icons/ICHoriz3Dots";
import { ICSMSTracking } from "@/components/icons/ICSMSTracking";
import { ICVerify } from "@/components/icons/ICVerify";
import { UserStatusComponentPropsType } from "@/types/dashboard/component";
import { cn } from "@/utils/utils";
import { ReactNode } from "react";
import { numberSeparation } from "@/utils";

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
    <div className={cn("grid grid-cols-4 gap-8", className)}>
      <div className="bg-white border border-black/10 rounded-lg px-3 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center justify-center gap-3 w-[calc(100%-16px)]">
          <div className="w-8 h-8 rounded-md aspect-square flex items-center justify-center bg-gray-100 shrink-0">
            <ICCharSuccess className="w-4 h-4 text-black" />
          </div>
          <div className="overflow-hidden w-full">
            <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
              تعداد رزرو های موفق من
            </span>
            <span className="text-cs75 font-medium text-black truncate block text-right">
              {`${numberSeparation(data.successfullReservationCount)} رزرو`}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <ICHoriz3Dots className="text-gray-200 w-4 h-4" />
        </div>
      </div>
      <div className="bg-white border border-black/10 rounded-lg px-3 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center justify-center gap-3 w-[calc(100%-16px)]">
          <div className="w-8 h-8 rounded-md aspect-square flex items-center justify-center bg-gray-100 shrink-0">
            <ICSMSTracking className="w-4 h-4 text-black" />
          </div>
          <div className="overflow-hidden w-full">
            <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
              مجموع تیکت های من
            </span>
            <span className="text-cs75 font-medium text-black truncate block text-right">
              {`${numberSeparation(data.ticketsCount)} تیکت`}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <ICHoriz3Dots className="text-gray-200 w-4 h-4" />
        </div>
      </div>
      <div className="bg-white border border-black/10 rounded-lg px-3 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center justify-center gap-3 w-[calc(100%-16px)]">
          <div className="w-8 h-8 rounded-md aspect-square flex items-center justify-center bg-gray-100 shrink-0">
            <ICCup className="w-4 h-4 text-black" />
          </div>
          <div className="overflow-hidden w-full">
            <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
              امتیاز باشگاه مشتری من
            </span>
            <span className="text-cs75 font-medium text-black truncate block text-right">
              {`${numberSeparation(data.customerClubScore)} امتیاز`}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <ICHoriz3Dots className="text-gray-200 w-4 h-4" />
        </div>
      </div>
      <div className="bg-white border border-black/10 rounded-lg px-3 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center justify-center gap-3 w-[calc(100%-16px)]">
          <div className="w-8 h-8 rounded-md aspect-square flex items-center justify-center bg-gray-100 shrink-0">
            <ICVerify className="w-4 h-4 text-black" />
          </div>
          <div className="overflow-hidden w-full">
            <span className="text-cs75 font-medium text-black truncate block text-right mb-1">
              تعداد رزرو های موفق من
            </span>
            <span className="text-cs75 font-medium text-black truncate block text-right">
              {`${numberSeparation(data.totalSuccesfullTransaction)} تومان`}
            </span>
          </div>
        </div>
        <div className="shrink-0">
          <ICHoriz3Dots className="text-gray-200 w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
