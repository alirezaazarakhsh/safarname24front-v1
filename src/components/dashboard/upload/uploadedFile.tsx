// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Button } from '@/components/ui/button';
import { UploadedFileComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import toast from '../ui/customSonner/toast';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Skeleton } from '@/components/ui/skeleton';
import useApiMutation from '@/hooks/dashboard/useApiMutation';

// Creating and exporting UploadedFile component as default
export default function UploadedFile({
  data,
  isLastItem = false,
  index,
  isLoading = false,
  onDelete,
  fetchURL,
  refetch,
}: UploadedFileComponentPropsType): ReactNode {
  // Fetching api
  const removeUploadedFile = useApiMutation({
    method: 'delete',
    url: `${fetchURL}${data?.id}/` || '/',
    options: {
      onSuccess: () => {
        refetch && refetch();
        toast({
          title: 'فایل پاک شد!',
          description: `فایل شماره ${index + 1} شما با موفقیت پاک شد.`,
          theme: 'green',
        });
      },
      onError: () =>
        toast({
          title: 'خطایی به وجود امد!',
          description: 'در حذف فایل مشکلی به وجود امد!',
          theme: 'theme',
        }),
    },
  });

  // Returning JSX
  return (
    <div className={isLastItem ? 'pt-3' : 'py-3 border-b border-b-gray-400'}>
      <div className='flex items-center justify-between gap-3 mb-3'>
        {isLoading || removeUploadedFile.isPending ? (
          <Skeleton className='w-full h-[30px] rounded-cs-10' />
        ) : (
          <span className='text-cs07 font-normal text-black truncate block w-full overflow-hidden text-right'>
            {`${index + 1} فایل شماره`}
          </span>
        )}
        <div className='flex items-center justify-between gap-3'>
          {isLoading || removeUploadedFile.isPending ? (
            <>
              <Skeleton className='h-[30px] w-[30px] rounded-cs-10' />
              <Skeleton className='h-[30px] w-[60px] rounded-cs-10 shrink-0' />
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  onDelete ? onDelete() : removeUploadedFile.mutate({});
                }}
                className={
                  'transition-all duration-500 rounded-md gap-2 flex items-center justify-center p-3 text-cs-red bg-cs-red/10 hover:bg-cs-red/20 shrink-0 h-[30px] w-[30px]'
                }
              >
                <IconsaxIcons
                  name={'Trash'}
                  color='currentColor'
                  className='w-[10px] h-[10px]'
                />
              </Button>
              <Button className='bg-gray-100 rounded-md flex items-center justify-center hover:bg-gray-50 shrink-0 h-[30px]'>
                <span className='font-normal text-black/60 truncate block w-full text-center text-cs07'>
                  مشاهده فایل
                </span>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className='flex items-center justify-between gap-3 mb-2'>
        <span className='font-normal text-black/60 truncate block w-full text-right text-cs07'>
          اسم فایل :
        </span>
        {isLoading || removeUploadedFile.isPending ? (
          <Skeleton className='h-[30px] w-[100px] rounded-cs-10 shrink-0' />
        ) : (
          <span className='font-normal text-black truncate block w-full text-left text-cs07'>
            {data && data.name}
          </span>
        )}
      </div>
      <div className='flex items-center justify-between gap-3'>
        <span className='font-normal text-black/60 truncate block w-full text-right text-cs07'>
          حجم فایل آپلودی :
        </span>
        {isLoading || removeUploadedFile.isPending ? (
          <Skeleton className='h-[30px] w-[100px] rounded-cs-10 shrink-0' />
        ) : (
          <span className='font-normal text-black truncate block w-full text-left text-cs07'>
            {data && data.size ? `${data.size / (1024 * 1024)} MB` : 'N/A'}
          </span>
        )}
      </div>
    </div>
  );
}
