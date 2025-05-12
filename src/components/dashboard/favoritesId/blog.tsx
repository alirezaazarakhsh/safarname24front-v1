// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { BlogComponentPropsType } from '@/types/dashboard/component';
import { cn } from '@/utils/utils';
import moment from 'jalali-moment';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

// Creating and exporting Blog component as default
export default function Blog({
  createdAt,
  desc,
  image,
  title,
  className,
  mostVisited,
}: BlogComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div className={cn('bg-white p-2 rounded-xl', className)}>
      <div className="relative bg-zinc-100 h-40 overflow-hidden rounded-cs-10">
        <Image
          src={image}
          alt="hotel"
          width={300}
          height={300}
          className="full-size object-cover"
        />
        {mostVisited && (
          <div className="absolute top-2.5 right-2.5 h-7 px-2 bg-[#4B5BCE] text-zinc-100 text-cs07 font-medium flex-center rounded-md">
            پر بازدید !
          </div>
        )}
      </div>
      <div className="text-zinc-900 font-semibold p-1 mt-3 flex flex-col gap-2">
        <h4 className="text-cs08 font-bold truncate">{title}</h4>
        <p className="text-zinc-500 text-cs75 text-justify font-semibold line-clamp-5 overflow-hidden">
          {desc}
        </p>
        <div className="h-9 text-cs75 mt-2 flex-between items-center">
          <Link
            href={''}
            className="h-full bg-zinc-100 px-4 flex-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-[#252525] hover:text-zinc-100"
          >
            مطالعه بیشتر
          </Link>
          <span className="tracking-wider">
            {moment(createdAt).locale('fa').format('jYYYY/jMM/jDD')}
          </span>
        </div>
      </div>
    </div>
  );
}
