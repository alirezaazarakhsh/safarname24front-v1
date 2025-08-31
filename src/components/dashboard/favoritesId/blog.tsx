// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconsaxIcons from '@/components/icons/iconsaxIcons';
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
  actualId,
  onLikeClick,
}: BlogComponentPropsType): ReactNode {
  // Returning JSX
  return (
    <div
      className={cn(
        'bg-white shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)] p-2 rounded-xl',
        className,
      )}
    >
      <div className="relative bg-zinc-100 h-44 overflow-hidden rounded-cs-10">
        <button
          className="flex items-center justify-center backdrop-blur-xl size-[40px] rounded-lg absolute left-2.5 top-2.5 p-2 text-white z-10"
          onClick={onLikeClick}
        >
          <IconsaxIcons
            className="w-full aspect-square"
            color="currentColor"
            variant="Bold"
            name="Heart"
          />
        </button>
        <Image
          src={image}
          alt="hotel"
          width={300}
          height={300}
          className="full-size object-cover"
        />
      </div>
      <div className="p-1.5 pb-1 mt-2.5 flex flex-col gap-2">
        <h3 className="text-cs09 mb-1 font-extrabold flex items-center gap-1 text-zinc-800">
          {title}
        </h3>
        <p className="text-zinc-500 text-cs75 text-justify font-semibold line-clamp-4 leading-6 overflow-hidden">
          {desc}
        </p>
        <div className="h-9 text-cs75 mt-2 flex-between items-center">
          <Link
            href={`/blogs/${actualId}`}
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
