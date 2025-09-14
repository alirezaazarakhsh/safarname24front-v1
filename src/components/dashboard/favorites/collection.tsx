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
import { cn } from '@/utils/utils';
import EditCollectionNameDialog from './dialog/editCollectionNameDialog';

// Defining code used for showing svg icon instead of image as placeholder in collection components
const emptyCollectionCode = 'EmptyCollectionImage';

// Creating and exporting Collection componenet as default
export default function Collection({
  isDeletingByUser,
  data: { id, images, title },
  loading = false,
  refetch,
}: CollectionComponentPropsType): ReactNode {
  // Defining hooks
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const [editDialogOpened, setEditDialogOpened] = useState<boolean>(false);

  // Returning JSX
  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-4">
          <Skeleton className="rounded-md object-cover col-span-1 row-span-2 w-full h-full" />
          <Skeleton className="rounded-md object-cover col-span-1 row-span-1 w-full h-full" />
          <Skeleton className="rounded-md object-cover col-span-1 row-span-1 w-full h-full" />
        </div>
        <Skeleton className="w-full rounded-[8px] h-[20px]" />
      </div>
    );
  } else {
    return (
      <>
        <EditCollectionNameDialog
          id={id}
          refetch={refetch}
          isOpened={editDialogOpened}
          closeFn={() => setEditDialogOpened(false)}
          infos={[title]}
        />
        <DeleteCollectionDialog
          id={id}
          refetch={refetch}
          isOpened={dialogOpened}
          closeFn={() => setDialogOpened(false)}
        />
        <div className="block relative">
          <motion.button
            className="w-[40px] h-[40px] flex items-center justify-center rounded-md bg-cs-red text-white absolute -right-[20px] -top-[20px]"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            onClick={() => setDialogOpened(true)}
            whileHover={{
              background: '#FF4558',
            }}
            animate={{
              opacity: isDeletingByUser ? 1 : 0,
              scale: isDeletingByUser ? 1 : 0.8,
            }}
          >
            <IconsaxIcons
              name="Trash"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          </motion.button>
          <Link
            href={`/dashboard/favorites/${id}`}
            className="grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] aria-disabled:pointer-events-none"
          >
            {images.map((item, index) =>
              item === emptyCollectionCode ? (
                <div
                  key={index}
                  className={cn(
                    'rounded-md overflow-hidden w-full h-full bg-[#ededed] flex items-center justify-center',
                    index === 0 && 'row-span-2',
                  )}
                >
                  <div
                    className={
                      index === 0
                        ? 'border-2 border-[#b9b9b9] rounded-lg p-1'
                        : ''
                    }
                  >
                    <IconsaxIcons
                      className="size-[30px]"
                      color="#b9b9b9"
                      name="Image"
                    />
                  </div>
                </div>
              ) : (
                <Image
                  key={index}
                  width={500}
                  height={500}
                  alt={'عکس شماره 1 مجموعه'}
                  src={item}
                  className={cn(
                    'rounded-md object-cover w-full h-full',
                    index === 0 && 'row-span-2',
                  )}
                />
              ),
            )}
          </Link>
          <button
            className="flex items-center justify-start gap-3 pt-3 mt-1 w-full text-cs-red"
            onClick={() => setEditDialogOpened(true)}
          >
            <span className="text-black font-semibold text-right text-[13px] truncate">
              {title}
            </span>
            <IconsaxIcons
              name="Edit2"
              color="currentColor"
              className="size-4 shrink-0"
            />
          </button>
        </div>
      </>
    );
  }
}
