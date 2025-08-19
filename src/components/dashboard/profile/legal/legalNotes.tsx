// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Skeleton } from '@/components/ui/skeleton';
import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { GETLegalNotes } from '@/types/dashboard/api/get';
import { LegalNotesProfileComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

// Creating and exporting LegalNotes component as default
export default function LegalNotes({
  className,
}: LegalNotesProfileComponentPropsType): ReactNode {
  // Fetching the data
  const getData = useApiQuery<GETLegalNotes>({
    url: '/config/legal-profile-rules/',
    queryKey: ['legal-notes'],
  });

  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white border border-black/10 lg:rounded-lg  rounded-[14px] overflow-hidden lg:pr-3 lg:py-4 px-[14px] py-[14px] flex flex-col',
        getData.isError || getData.isLoading ? 'lg:h-[500px]' : '',
        className,
      )}
    >
      <span className="lg:text-cs75 text-[14px] font-semibold text-black truncate block text-right mb-3 shrink-0">
        توضیحات مهم برای ارسال مدارک شرکت :
      </span>
      <div className="h-full custom-scrollbar overflow-auto pl-3">
        {getData.isLoading ? (
          <Skeleton className="w-full h-[200px]" />
        ) : getData.isError ? (
          <p className="text-center block font-bold text-cs75 text-black">
            مشکلی در دریافت اطلاعات به وجود امد
          </p>
        ) : getData.data && !getData.isLoading && !getData.isError ? (
          <p className="text-right text-black/50 lg:text-cs75 text-[12px] lg:font-semibold font-bold leading-6">
            {getData.data.description}
          </p>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
