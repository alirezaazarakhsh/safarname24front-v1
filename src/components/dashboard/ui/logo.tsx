// Importing part
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../../../../public/image/logo/red-gray.png';
import { LogoComponentPropsType } from '@/types/dashboard/component';

// Creating and exporting Logo component as deafult
export default function Logo({
  onlyLogo = false,
}: LogoComponentPropsType): ReactNode {
  // Conditional rendering
  if (onlyLogo) {
    return (
      <Link href="/" className="shrink-0">
        <Image
          width={100}
          height={100}
          alt={'سفرنامه 24'}
          src={LogoImage.src}
          className="w-16"
        />
      </Link>
    );
  } else {
    return (
      <div className="flex items-center justify-start gap-2">
        <Link href="/" className="shrink-0">
          <Image
            width={100}
            height={100}
            alt={'سفرنامه 24'}
            src={LogoImage.src}
            className="w-16"
          />
        </Link>
        <div className="text-[#27272A ]">
          <span className="font-extrabold text-[13px] block truncate mb-0.5">
            سفرنامه 24
          </span>
          <span
            className="font-semibold text-[13px] block truncate font-inter"
            dir="ltr"
          >
            Agency Safarnameh 24 Hotel
          </span>
        </div>
      </div>
    );
  }
}
