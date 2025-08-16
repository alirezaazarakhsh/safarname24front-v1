// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { FilterCustomClubPageComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import ToggleButtons from '../ui/toggleButtons';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { numberSeparation } from '@/utils';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETUserPoints } from '@/types/dashboard/api/get';

// Creating and exporting Filter component/section of Customers club page as default
export default function Filter({
  onChange,
  loading = false,
}: FilterCustomClubPageComponentPropsType): ReactNode {
  // Defining states of component
  const [val, setVal] = useState<'shoppingCentre' | 'hotel'>('shoppingCentre');

  // Fetching data of users current points
  const getData = useApiQuery<GETUserPoints>({
    url: '/crm/customer-club/points/',
    queryKey: ['user-points'],
    options: {
      enabled: !loading,
      staleTime: 5000,
    },
  });

  // Using useEffect to refetch data when value of filter changes
  useEffect(() => {
    getData.refetch();
  }, [val]);

  // Using useEffect to attach onChange prop to component
  useEffect(() => onChange && onChange(val), [val, onChange]);

  // Returning JSX
  return (
    <div className="flex items-center justify-between gap-3 lg:w-auto w-full lg:px-0 px-[24px]">
      <span className="lg:block hidden truncate text-right w-full font-bold text-cs85 text-black">
        باشگاه مشتریان - جوایز هتل
      </span>
      <div
        className={
          'lg:flex grid items-center justify-end lg:gap-3 gap-[12px] grid-cols-3 lg:w-auto w-full'
        }
      >
        <Link
          href="/dashboard/customer-club/list"
          className="lg:hidden flex items-center justify-center bg-gray-100 rounded-[6px] px-2 h-[40px] text-black"
        >
          <span className="text-[10px] font-semibold text-current block text-center truncate w-full">
            لیست جایزه های دریافتی
          </span>
        </Link>
        {loading || getData.isLoading ? (
          <>
            <Skeleton className="lg:h-[45px] h-[40px] lg:w-[200px] w-auto col-span-2 lg:rounded-lg rounded-[6px]" />
            <Skeleton className="lg:h-[45px] h-[40px] lg:w-[250px] w-full col-span-3 lg:rounded-lg rounded-[6px]" />
          </>
        ) : (
          <>
            <div className="flex items-center justify-center lg:gap-2 gap-[12px] bg-black lg:rounded-lg rounded-[6px] lg:px-4 px-2 lg:h-[45px] h-[40px] text-white col-span-2">
              <IconsaxIcons
                name="Crown1"
                className="lg:w-5 lg:h-5 w-[19px] h-[19px] shrink-0"
                color="currentColor"
              />
              <span className="lg:text-cs07 text-[10px] lg:font-bold font-semibold text-current block text-right truncate">
                {!getData.isLoading && !getData.isError && getData.data
                  ? `جمع دریافتی : ${numberSeparation(getData.data.points)} امتیاز`
                  : 'مشکلی در دریافت اطلاعات به وجود امد !'}
              </span>
            </div>
            <ToggleButtons
              buttons={['جوایز مرکز خرید', 'جوایز هتل']}
              className="lg:h-[45px] h-[40px] lg:bg-white bg-gray-100 col-span-3"
              onChange={(index) =>
                setVal(index === 0 ? 'shoppingCentre' : 'hotel')
              }
              width="lg:w-[250px] w-full"
            />
          </>
        )}
      </div>
    </div>
  );
}
