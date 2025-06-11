// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { motion } from 'framer-motion';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { FavItemComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import DeleteItemDialog from './dialog/deleteItemDialog';

// Creating and exporting FavItem componenet as default
export default function FavItem({
  isDeletingByUser,
  data: { id, title },
  loading = false,
  refetch,
}: FavItemComponentPropsType): ReactNode {
  // Defining states of component
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  // Conditional rendering
  if (loading) {
    return (
      <div>
        <Skeleton className='rounded-md object-cover w-full h-[200px] mb-2' />
        <Skeleton className='w-full rounded-[8px] h-[20px]' />
      </div>
    );
  } else {
    return (
      <>
        <DeleteItemDialog
          id={id}
          refetch={refetch}
          isOpened={dialogOpened}
          closeFn={() => setDialogOpened(false)}
        />
        <div className='block relative'>
          <Image
            width={500}
            height={500}
            alt={'عکس شماره 1 مجموعه'}
            src={'/image/hotel/hotel-1.png'}
            className='rounded-md object-cover w-full h-[200px] mb-2'
          />
          <div className='flex items-center justify-between gap-3'>
            <span className='font-semibold truncate block text-right text-black text-cs08'>
              {title}
            </span>
            <button
              className='shrink-0 text-cs-red'
              onClick={() => setDialogOpened(true)}
            >
              <IconsaxIcons
                className='w-[20px] h-[20px]'
                name='Trash'
                color='currentColor'
              />
            </button>
          </div>
        </div>
      </>
    );
  }
}
