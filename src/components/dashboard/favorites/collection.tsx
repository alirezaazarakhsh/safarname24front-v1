// Importing part
import { CollectionComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Creating and exporting Collection componenet as default
export default function Collection({
  id,
  images,
  title,
}: CollectionComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <Link href={`/dashboard/favorites/${id}`} className="block">
      <div className="grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-2">
        <Image
          width={500}
          height={500}
          alt={'عکس شماره 1 مجموعه'}
          src={images[0]}
          className="rounded-md object-cover  row-span-2 w-full h-full"
        />
        <Image
          width={500}
          height={500}
          alt={'عکس شماره 2 مجموعه'}
          src={images[1]}
          className="rounded-md object-cover w-full h-full"
        />
        <Image
          width={500}
          height={500}
          alt={'عکس شماره 3 مجموعه'}
          src={images[2]}
          className="rounded-md object-cover w-full h-full"
        />
      </div>
      <span className="font-semibold truncate block text-right text-black text-cs08">
        {title}
      </span>
    </Link>
  );
}
