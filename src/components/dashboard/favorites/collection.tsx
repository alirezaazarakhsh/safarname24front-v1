// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { motion } from 'framer-motion';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { CollectionComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import DeleteCollectionDialog from './dialog/deleteCollectionDialog';
import { Skeleton } from '@/components/ui/skeleton';

// Creating and exporting Collection componenet as default
export default function Collection({
  isDeletingByUser,
  data: { id, images, title },
  loading = false,
  refetch,
}: CollectionComponentPropsType): ReactNode {
  // Defining states of component
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);

  // Conditional rendering
  if (loading) {
    return (
      <div>
        <div className='grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-2'>
          <Skeleton className='rounded-md object-cover col-span-1 row-span-2 w-full h-full' />
          <Skeleton className='rounded-md object-cover col-span-1 row-span-1 w-full h-full' />
          <Skeleton className='rounded-md object-cover col-span-1 row-span-1 w-full h-full' />
        </div>
        <Skeleton className='w-full rounded=[8px] h-[20px]' />
      </div>
    );
  } else {
    return (
      <>
        <DeleteCollectionDialog
          id={id}
          refetch={refetch}
          isOpened={dialogOpened}
          closeFn={() => setDialogOpened(false)}
        />
        <div className='block relative'>
          <motion.button
            disabled={!isDeletingByUser}
            className='w-[40px] h-[40px] flex items-center justify-center rounded-md bg-cs-red text-white transition-all duration-500 absolute -right-[20px] -top-[20px]'
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onClick={() => setDialogOpened(true)}
            animate={{
              opacity: isDeletingByUser ? 1 : 0,
              scale: isDeletingByUser ? 1 : 0.8,
            }}
          >
            <IconsaxIcons
              name='Trash'
              className='w-[20px] h-[20px]'
              color='currentColor'
            />
          </motion.button>
          <Link
            href={`/dashboard/favorites/${id}`}
            className='grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-2'
          >
            <Image
              width={500}
              height={500}
              alt={'عکس شماره 1 مجموعه'}
              src={images[0]}
              className='rounded-md object-cover  row-span-2 w-full h-full'
            />
            <Image
              width={500}
              height={500}
              alt={'عکس شماره 2 مجموعه'}
              src={images[1]}
              className='rounded-md object-cover w-full h-full'
            />
            <Image
              width={500}
              height={500}
              alt={'عکس شماره 3 مجموعه'}
              src={images[2]}
              className='rounded-md object-cover w-full h-full'
            />
          </Link>
          <Link
            href={`/dashboard/favorites/${id}`}
            className='font-semibold truncate block text-right text-black text-cs08'
          >
            {title}
          </Link>
        </div>
      </>
    );
  }
}
