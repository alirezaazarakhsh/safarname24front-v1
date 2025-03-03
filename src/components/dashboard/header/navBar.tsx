// Forcing next.js to render this component as client side componentw-[125px]
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
import { ReactNode, useEffect, useRef, useState } from 'react';

// Defining some data to render
const data: {
  icon: ReactNode;
  label: string;
  hasChevronIcon?: boolean; // TODO: Change later if the items with chevron are dropdowns or not because its not in figma design right now
  href: `/dashboard/${string}` | '/dashboard';
}[] = [
  {
    icon: <ICCategory className="w-[19px] h-[19px] text-current shrink-0" />,
    label: 'داشبورد',
    href: '/dashboard',
  },
  {
    icon: (
      <ICDocumentText className="w-[19px] h-[19px] text-current shrink-0" />
    ),
    label: 'لیست رزرو من',
    href: '/dashboard/reservations',
  },
  {
    icon: <ICWallet className="w-[19px] h-[19px] text-current shrink-0" />,
    label: 'بخش مالی',
    href: '/dashboard/financial',
    hasChevronIcon: true,
  },
  {
    icon: <ICCrown className="w-[19px] h-[19px] text-current shrink-0" />,
    label: 'باشگاه مشتریان',
    href: '/dashboard/customer-club',
  },
  {
    icon: <ICMessageText className="w-[19px] h-[19px] text-current shrink-0" />,
    label: 'مدیریت تیکت ها',
    href: '/dashboard/tickets',
  },
  {
    icon: <ICSave2 className="w-[19px] h-[19px] text-current shrink-0" />,
    label: 'علاقه مندی های من',
    href: '/dashboard/favorites',
  },
  {
    icon: (
      <ICProfile2User className="w-[19px] h-[19px] text-current shrink-0" />
    ),
    label: 'مسافران من',
    href: '/dashboard/passengers',
  },
];

// Creating and exporting NavBar component of header as default
export default function NavBar(): ReactNode {
  // Defining hooks
  const pathname = usePathname();
  const [activeLinkIndex, setActiveLinkIndex] = useState<number>(0);
  const itemsParentRef = useRef<null | HTMLDivElement>(null);
  const [indicatorStyles, setIndicatorStyles] = useState<{
    right: number;
    width: number;
  }>({
    right: 0,
    width: 0,
  });

  // Defining a function to calculate styles of indicator
  function calculateIndicatorStyles() {
    const activeElement = document.querySelector(
      ".dashboard-nav-item[data-active='true']",
    ) as HTMLAnchorElement;
    const itemsParentElement = itemsParentRef.current;

    if (activeElement && itemsParentElement) {
      const { width } = getComputedStyle(activeElement);
      const indexOfPxInWidth = width.indexOf('px');
      const slicedWidthNum = Number(width.slice(0, indexOfPxInWidth));
      const right =
        itemsParentElement.offsetWidth -
        (activeElement.offsetLeft + activeElement.offsetWidth);

      setIndicatorStyles({ width: slicedWidthNum, right });
    }
  }

  // Using useEffect to set active link index
  useEffect(() => {
    const objToSet = data.find((item) => item.href.includes(pathname));
    const objIndexInData = objToSet ? data.indexOf(objToSet) : 1;

    setActiveLinkIndex(objIndexInData);
  }, [pathname]);

  // Calling `calculateIndicatorStyles` function while activeLinkIndex or width of page changes
  useEffect(
    () => calculateIndicatorStyles(),
    [activeLinkIndex, window.innerWidth],
  );

  // Returning JSX
  return (
    <nav className="border-b-[1.5px] border-b-black/10 bg-white lg:block hidden">
      <div
        ref={itemsParentRef}
        className="max-w-screen-template mx-auto flex items-center justify-start overflow-auto scrollbar-hide relative py-4 px-5 gap-5"
      >
        {data.map((item, index) => (
          <Link
            key={index}
            data-active={activeLinkIndex === index}
            className="dashboard-nav-item shrink-0 w-auto px-3 flex items-center justify-center gap-2 transition-all duration-500 data-[active='false']:text-gray-400 data-[active='true']:text-black"
            href={item.href}
          >
            {item.icon}
            <span className="block truncate text-right text-cs75 font-medium">
              {item.label}
            </span>
            {item.hasChevronIcon && (
              <ICChevronBottom className="w-3 h-3 text-current shrink-0" />
            )}
          </Link>
        ))}
        <div
          className="absolute h-[1.5px] rounded-[45rem] top-[98%] right-0 bg-cs-red transition-all duration-500 ease-in-out"
          style={{ right: indicatorStyles.right, width: indicatorStyles.width }}
        />
      </div>
    </nav>
  );
}
