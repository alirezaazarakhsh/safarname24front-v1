// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { SubscriptionTypeComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import starsBg from '../../../../public/image/subscriptionStars.png';
import Tooltip from '../ui/tooltip';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETUserLevelItem, GETUserLevels } from '@/types/dashboard/api/get';
import Loading from '../ui/loading';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Creating and exporting SubscriptionType component as default
export default function SubscriptionType({
  className,
}: SubscriptionTypeComponentPropsType): ReactNode {
  // Defining hooks
  const [userLevel, setUserLevel] = useState<GETUserLevelItem>();
  const { level_name } = useUserInfo();
  const { isLoading, data, isError } = useApiQuery<GETUserLevels>({
    url: '/config/user-levels/',
    queryKey: ['user-levels'],
    options: {
      staleTime: Infinity,
    },
  });

  // Using useEffect to set level of user
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const levelObj = data.data.find((item) => item.title === level_name);
      setUserLevel(levelObj);
    }
  }, [isLoading]);

  // Conditional rendering
  if (isLoading) {
    return (
      <div
        className={cn(
          'lg:rounded-[10px] rounded-[14px] bg-gradient-to-tr to-[#282828] from-[#282828] lg:p-4 p-[14px] flex items-center justify-start gap-3 text-white overflow-hidden relative group transition-all duration-500 opacity-50 cursor-not-allowed',
          className,
        )}
      >
        <Image
          alt="عکس ستاره ها"
          src={starsBg.src}
          width={340}
          height={180}
          className="absolute top-0 left-0 w-full object-cover scale-105 h-full pointer-events-none"
        />
        <div className="border-2 border-current lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] aspect-square shrink-0 flex items-center justify-center lg:rounded-md rounded-[8px]">
          <Loading className="bg-white" />
        </div>
        <div className="w-full overflow-hidden">
          <span className="font-semibold lg:text-cs08 text-[12px] text-current block text-right truncate lg:mb-2 mb-[4px]">
            سطح کاربری شما
          </span>
          <span className="lg:font-semibold font-bold lg:text-cs08 text-[14px] text-current block text-right truncate">
            در حال دریافت اطلاعات ...
          </span>
        </div>
      </div>
    );
  } else if (isError) {
    return (
      <div
        className={cn(
          'lg:rounded-lg rounded-[12px] bg-gradient-to-tr bg-[#282828] to-cs-red/20 from-cs-red  lg:p-4 p-[14px] flex items-center justify-start gap-3 text-white overflow-hidden relative',
          className,
        )}
      >
        <Image
          alt="عکس ستاره ها"
          src={starsBg.src}
          width={340}
          height={180}
          className="absolute top-0 left-0 w-full object-cover scale-105 h-full pointer-events-none"
        />
        <div className="border-2 border-current lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] aspect-square shrink-0 flex items-center justify-center lg:rounded-md rounded-[8px]">
          <IconsaxIcons
            name="Alarm"
            color="white"
            className="lg:w-[20px] lg:h-[20px] w-[27px] h-[27px]"
          />
        </div>
        <div className="w-full overflow-hidden">
          <span className="font-semibold lg:text-cs08 text-[12px] text-current block text-right truncate lg:mb-2 mb-[4px]">
            سطح کاربری شما
          </span>
          <span className="lg:font-semibold font-bold lg:text-cs08 text-[14px] text-current block text-right truncate">
            مشکلی در دریافت اطلاعات درخ داد !
          </span>
        </div>
      </div>
    );
  } else if (data && !isError && !isLoading) {
    return (
      <Tooltip content="* با ارتقای خرید سطح کاربری خود را افزایش دهید تا در تخفیفات اتاق بهترین خرید داشته باشید برای اطلاعات بیشتر به صفحه قوانین و مقررات مراجعه نمایید.">
        <div
          style={{
            background: `linear-gradient(to top right,#282828, ${userLevel?.color})`,
          }}
          className={cn(
            'lg:rounded-lg rounded-[12px]  lg:p-4 p-[14px] flex items-center justify-start gap-3 text-white overflow-hidden relative',
            className,
          )}
        >
          <Image
            alt="عکس ستاره ها"
            src={starsBg.src}
            width={340}
            height={180}
            className="absolute top-0 left-0 w-full object-cover scale-105 h-full pointer-events-none"
          />
          <div className="border-2 border-current lg:w-[50px] lg:h-[50px] w-[45px] h-[45px] aspect-square shrink-0 flex items-center justify-center lg:rounded-md rounded-[8px] relative overflow-hidden">
            <Image
              alt={userLevel?.icon.title || ''}
              src={userLevel?.icon.url || ''}
              width={30}
              height={30}
              className="size-[30px]"
            />
          </div>
          <div className="w-full overflow-hidden">
            <span className="font-semibold lg:text-cs08 text-[12px] text-current block text-right truncate lg:mb-2 mb-[4px]">
              سطح کاربری شما
            </span>
            <span className="lg:font-semibold font-bold lg:text-cs08 text-[14px] text-current block text-right truncate">
              {userLevel?.title || '-'}
            </span>
          </div>
        </div>
      </Tooltip>
    );
  }
}
