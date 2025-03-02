// Importing part
import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoImage from '../../../../public/image/logo/white.webp';
import { ICNotificationStatus } from '@/components/icons/ICNotifcationStatus';
import ProfileDropdown from './profileDropdown';
import { ICLogOut } from '@/components/icons/ICLogOut';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';

// Creating and exporting TopSide component of header as default
export default function TopSide(): ReactNode {
  // Returning JSX
  return (
    <div className="bg-transparent transition-all duration-500 border-b-[1.5px] border-b-black/10 ">
      <div className="p-5 max-w-screen-template mx-auto lg:flex hidden items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Link
            href="/"
            className="flex w-12 h-12 bg-cs-red rounded-lg overflow-hidden shrink-0"
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
            <span className="font-bold text-cs75 text-black block truncate mb-1">
              سفرنامه 24
            </span>
            <span className="font-bold text-cs75 text-black block truncate">
              Agency Safarnameh 24
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button className="aspect-square w-12 h-12 bg-cs-red/10 transition-all duration-500 hover:bg-cs-red/20 text-cs-red rounded-lg flex items-center justify-center">
            <ICLogOut className="w-5 h-5 text-current" />
          </button>
          <Link
            href="/dashboard/notifications"
            className="flex h-12 px-4 bg-gray-100 transition-all duration-500 hover:bg-gray-200 text-gray-700 items-center justify-center gap-2 rounded-lg relative"
          >
            <div className="absolute top-0 left-0 bg-cs-red w-2 h-2 z-10 rounded-full -translate-y-[50%] -translate-x-[50%]" />
            <div className="absolute top-[-4px] left-[-4px] bg-cs-red/40 duration-1000 delay-1000 animate-ping z-0 origin-center w-2 h-2 rounded-full" />
            <ICNotificationStatus className="w-5 h-5 text-current shrink-0" />
            <span className="font-medium text-cs08 text-current block truncate w-full">
              اعلان ها
            </span>
          </Link>
          <ProfileDropdown />
        </div>
      </div>
      <div className="lg:hidden block py-[16px] px-[24px]">
        <Link
          href={'/dashboard'}
          className="flex items-center justify-start gap-[10px] w-full overflow-hidden"
        >
          <ICArrowFlashRight className="w-[24px] h-[24px] aspect-square shrink-0" />
          <span className="block truncate text-black text-[14px] font-bold w-full text-right">
            داشبورد سفرنامه
          </span>
        </Link>
      </div>
    </div>
  );
}
