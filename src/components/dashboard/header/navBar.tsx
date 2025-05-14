// Forcing next.js to render this component as client side componentw-[125px]
'use client';

// Importing part
import * as DropDown from '@/components/ui/dropdown-menu';
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
import useWindowSize from '@/hooks/useWindowSize';

// Defining some data to render
const data: {
  icon: ReactNode;
  label: string;
  href: `/dashboard/${string}` | '/dashboard';
  dropdown?: {
    label: string;
    href: `/dashboard/${string}`;
  }[];
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
    href: '/dashboard/financial/wallet',
    dropdown: [
      {
        label: 'شارژ کیف پول',
        href: '/dashboard/financial/wallet',
      },
      {
        label: 'کارت به کارت',
        href: '/dashboard/financial/cart-to-cart',
      },
      {
        label: 'برداشت وجه',
        href: '/dashboard/financial/take-out',
      },
      {
        label: 'فاکتور ها',
        href: '/dashboard/financial/factors',
      },
    ],
  },
  {
    icon: <ICCrown className="w-[19px] h-[19px] text-current shrink-0" />,
    label: 'باشگاه مشتریان',
    href: '/dashboard/customer-club/gifts',
    dropdown: [
      {
        label: 'جوایز هتل، مرکز خرید',
        href: '/dashboard/customer-club/gifts',
      },
      {
        label: 'لیست جایزه های دریافتی',
        href: '/dashboard/customer-club/list',
      },
    ],
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
  const windowSize = useWindowSize();
  const [openedDropDownIndex, setOpenedDropDownIndex] = useState<
    number | undefined
  >(undefined);
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
    const parentIndex = data.findIndex((item) => {
      if (item.href === pathname) return true;
      else if (item.dropdown) {
        return item.dropdown.some((drop) => drop.href === pathname);
      } else {
        return false;
      }
    });
    setActiveLinkIndex(parentIndex);
  }, [pathname]);

  // Calling `calculateIndicatorStyles` function while activeLinkIndex or width of page changes
  useEffect(() => calculateIndicatorStyles(), [activeLinkIndex, windowSize]);

  // Fixed initial rendering of indicator styles
  useEffect(() => {
    requestAnimationFrame(() => {
      calculateIndicatorStyles();
    });
  }, []);

  // Returning JSX
  return (
    <nav className="border-b-[1.5px] border-b-black/10 bg-white lg:block hidden">
      <div
        ref={itemsParentRef}
        className="max-w-screen-template mx-auto flex items-center justify-start overflow-auto scrollbar-hide relative px-5 gap-5"
      >
        {data.map((item, index) =>
          !item.dropdown ? (
            <Link
              key={index}
              data-active={
                activeLinkIndex !== -1
                  ? activeLinkIndex === index
                  : pathname.startsWith(item.href)
              }
              className="dashboard-nav-item shrink-0 w-auto px-3 flex h-[50px] items-center justify-center gap-2 transition-all duration-500 data-[active='false']:text-gray-400 data-[active='true']:text-black"
              href={item.href}
            >
              {item.icon}
              <span className="block truncate text-right text-cs75 font-medium">
                {item.label}
              </span>
            </Link>
          ) : (
            <DropDown.DropdownMenu
              modal={false}
              open={index === openedDropDownIndex}
              key={index}
            >
              <DropDown.DropdownMenuTrigger
                className="dashboard-nav-item"
                data-active={activeLinkIndex === index}
                asChild
                onMouseLeave={() => setOpenedDropDownIndex(undefined)}
                onMouseEnter={() => setOpenedDropDownIndex(index)}
                onMouseMove={() => setOpenedDropDownIndex(index)}
              >
                <Link
                  key={index}
                  data-active={activeLinkIndex === index}
                  className="h-[50px] shrink-0 outline-none w-auto px-3 flex items-center justify-center gap-2 transition-all duration-500 data-[active='false']:text-gray-400 data-[active='true']:text-black"
                  href={item.href}
                >
                  {item.icon}
                  <span className="block truncate text-right text-cs75 font-medium">
                    {item.label}
                  </span>
                  <ICChevronBottom className="w-3 h-3 text-current shrink-0" />
                </Link>
              </DropDown.DropdownMenuTrigger>
              <DropDown.DropdownMenuContent
                align="end"
                className="w-[200px]"
                sideOffset={0}
                onMouseLeave={() => setOpenedDropDownIndex(undefined)}
                onMouseEnter={() => setOpenedDropDownIndex(index)}
                onMouseMove={() => setOpenedDropDownIndex(index)}
              >
                {item.dropdown.map((innerItem, innerIndex) => (
                  <div key={innerIndex}>
                    <DropDown.DropdownMenuItem
                      asChild
                      className="p-3 bg-white transition-all duration-500 text-gray-600 hover:bg-cs-red/10 hover:text-cs-red block w-full cursor-pointer"
                    >
                      <Link href={innerItem.href}>
                        <span className="text-cs08 font-normal text-current text-right truncate block">
                          {innerItem.label}
                        </span>
                      </Link>
                    </DropDown.DropdownMenuItem>
                    {innerIndex + 1 !== item.dropdown?.length && (
                      <DropDown.DropdownMenuSeparator className="mx-3" />
                    )}
                  </div>
                ))}
              </DropDown.DropdownMenuContent>
            </DropDown.DropdownMenu>
          ),
        )}
        <div
          className="absolute h-[1.5px] rounded-[45rem] top-[98%] right-0 bg-cs-red transition-all duration-500 ease-in-out pointer-events-none"
          style={{ right: indicatorStyles.right, width: indicatorStyles.width }}
        />
      </div>
    </nav>
  );
}
