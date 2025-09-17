'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
import { generalInstance, isEmptyOrInvalid } from '@/utils/services';

type Data = {
  value: string;
  icon: { link: string };
  show_in_footer: boolean;
};

type ApiResponse = { data: Data[] };

// ------------------------------

export default function CommunicationWays() {
  const { data, status } = useQuery<ApiResponse>({
    queryKey: ['contact-info'],
    queryFn: () => generalInstance('/config/contact-info'),
  });

  if (isEmptyOrInvalid({ data, status })) return null;

  return (
    <div className="w-full flex flex-col gap-y-3 lg:gap-y-2">
      <h4 className="w-full text-zinc-800 text-cs75 font-bold lg:text-cs08 lg:mb-2">
        راه ارتباطی با ما :
      </h4>

      {status === 'pending' ? (
        <div className="grid gap-3">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>
      ) : (
        data?.data
          .filter((item) => item.show_in_footer)
          .map((item, index) => (
            <CommunicationWay key={index} icon={item.icon} type="phone">
              {item.value}
            </CommunicationWay>
          ))
      )}
    </div>
  );
}

// ----------------------------------------

type CommunicationWayProps = {
  icon: { link: string };
  children: React.ReactNode;
  type: 'phone' | 'email' | 'address';
};

function CommunicationWay(props: CommunicationWayProps) {
  const { icon, children, type } = props;

  return (
    <div className="bg-zinc-100 w-full h-14 p-2.5 flex items-center gap-3 rounded-cs-10">
      <div className="bg-zinc-200 w-10 aspect-square flex-center rounded-lg">
        {icon.link && (
          <Image alt="icon" width={20} height={20} src={icon.link} />
        )}
      </div>

      <div
        dir={type === 'phone' ? 'ltr' : 'rtl'}
        className={`text-zinc-800 text-cs75 font-semibold flex-1 truncate ${type === 'address' ? '' : 'font-inter'} ${
          type === 'phone' ? 'text-right' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}
