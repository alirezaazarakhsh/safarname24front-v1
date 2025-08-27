// Importing part
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../../../../public/image/logo/white.webp';
import { LogoComponentPropsType } from '@/types/dashboard/component';

// Creating and exporting Logo component as deafult
export default function Logo({
  onlyLogo = false,
}: LogoComponentPropsType): ReactNode {
  // Conditional rendering
  if (onlyLogo) {
    return (
      <Link
        href="/"
        className="flex w-12 h-12 bg-cs-red rounded-lg overflow-hidden shrink-0 p-2"
      >
        <Image
          width={100}
          height={100}
          alt={'سفرنامه 24'}
          src={LogoImage.src}
          className="aspect-square object-cover w-full h-full"
        />
      </Link>
    );
  } else {
    return (
      <div className="flex items-center justify-start gap-2">
        <Link
          href="/"
          className="flex w-12 h-12 bg-cs-red rounded-lg overflow-hidden shrink-0 p-2"
        >
          <Image
            width={100}
            height={100}
            alt={'سفرنامه 24'}
            src={LogoImage.src}
            className="aspect-square object-cover w-full h-full"
          />
        </Link>
        <div>
          <span className="font-extrabold text-cs08 text-black block truncate mb-0.5">
            سفرنامه 24
          </span>
          <span
            className="font-semibold text-cs08 text-black block truncate"
            dir="ltr"
          >
            Agency Safarnameh <span className="text-num-en">24</span>
          </span>
        </div>
      </div>
    );
  }
}
