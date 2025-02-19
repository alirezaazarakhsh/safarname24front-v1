// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ICCategory } from '@/components/icons/ICCategory';
import { ICChevronBottom } from '@/components/icons/ICChevronBottom';
import { ICCrown } from '@/components/icons/ICCrown';
import { ICDocumentText } from '@/components/icons/ICDocumentText';
import { ICMessageText } from '@/components/icons/ICMessageText';
import { ICProfile2User } from '@/components/icons/ICProfile2User';
import { ICSave2 } from '@/components/icons/ICSave2';
import { ICWallet } from '@/components/icons/ICWallet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

// Defining some data to render
const data: {
  icon: ReactNode;
  label: string;
  hasChevronIcon?: boolean; // TODO: Change later if the items with chevron are dropdowns or not because its not in figma design right now
  href: `/dashboard/${string}` | '/dashboard';
}[] = [
  {
    icon: <ICCategory className="w-4 h-4 text-current shrink-0" />,
    label: 'داشبورد',
    href: '/dashboard',
  },
  {
    icon: <ICDocumentText className="w-4 h-4 text-current shrink-0" />,
    label: 'لیست رزرو من',
    href: '/dashboard/reservations',
  },
  {
    icon: <ICWallet className="w-4 h-4 text-current shrink-0" />,
    label: 'بخش مالی',
    href: '/dashboard/financial',
    hasChevronIcon: true,
  },
  {
    icon: <ICCrown className="w-4 h-4 text-current shrink-0" />,
    label: 'باشگاه مشتریان',
    href: '/dashboard/customer-club',
  },
  {
    icon: <ICMessageText className="w-4 h-4 text-current shrink-0" />,
    label: 'مدیریت تیکت ها',
    href: '/dashboard/tickets',
  },
  {
    icon: <ICSave2 className="w-4 h-4 text-current shrink-0" />,
    label: 'علاقه مندی های من',
    href: '/dashboard/favorites',
  },
  {
    icon: <ICProfile2User className="w-4 h-4 text-current shrink-0" />,
    label: 'مسافران من',
    href: '/dashboard/passangers',
  },
];

// Creating and exporting NavBar component of header as default
export default function NavBar(): ReactNode {
  // Defining hooks
  const pathname = usePathname();
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(0);

  // Using useEffect to set active link index
  useEffect(() => {
    const findedItem = data.find((item) => item.href === pathname);
    const indexOfFindedItem = findedItem ? data.indexOf(findedItem) : 0;

    setActiveLinkIndex(indexOfFindedItem);
  }, [pathname]);

  // Defining some variables
  const width = 125;

  // Returning JSX
  return (
    <nav className="border-b border-b-black/20 bg-white lg:block hidden">
      <div className="max-w-screen-template mx-auto flex items-center justify-start overflow-auto scrollbar-hide relative py-4 px-5 gap-5">
        {data.map((item, index) => (
          <Link
            key={index}
            style={{ width }}
            data-active={activeLinkIndex === index}
            className="shrink-0 w-[125px] px-3 flex items-center justify-center gap-2 transition-all duration-500 data-[active='false']:text-gray-400 data-[active='true']:text-black"
            href={item.href}
          >
            {item.icon}
            <span className="block truncate text-right text-cs85 font-normal">
              {item.label}
            </span>
            {item.hasChevronIcon && (
              <ICChevronBottom className="w-4 h-4 text-current shrink-0" />
            )}
          </Link>
        ))}
        <div
          className="absolute h-[1px] rounded-[45rem] top-[98%] right-0 bg-cs-red transition-all duration-500"
          style={{
            transform: `translateX(-${activeLinkIndex * (width + 20) + 20}px)`,
            width,
          }}
        />
      </div>
    </nav>
  );
}
