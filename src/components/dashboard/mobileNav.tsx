// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import IconsaxIcons from '../icons/iconsaxIcons';
import { IconsName } from '@/types';

// Defining data to render in navigation bar
const data: {
  icon: IconsName;
  title: string;
  href: `/${string}` | '/';
}[] = [
  {
    icon: 'Home2',
    title: 'خانه',
    href: '/dashboard',
  },
  {
    icon: 'Heart',
    title: 'علاقه مندی ها',
    href: '/dashboard/favorites',
  },
  {
    icon: 'Flash',
    title: 'بهترین هتل ها',
    href: '/best-hotels',
  },
  {
    icon: 'Messages3',
    title: 'چت تایم ',
    href: '/dashboard/tickets',
  },
  {
    icon: 'Profile2User',
    title: 'پروفایل کاربری',
    href: '/dashboard/profile',
  },
];

// Creating and exporting MobileNav component as defualt
export default function MobileNav(): ReactNode {
  // Defining hooks
  const pathname = usePathname();

  // Returning JSX
  return (
    <nav className="bg-white border-t border-t-black/20 py-[12px] px-[24px] lg:hidden fixed bottom-0 left-0 w-full z-40 shadow-[0px_-40px_50px_-12px_rgba(0,_0,_0,_0.2)] grid grid-cols-[25px_25px_25px_25px_25px] items-center justify-between gap-[15px]">
      {data.map((item, index) => (
        <Link
          key={index}
          data-active={pathname === item.href}
          className="flex flex-col items-center justify-center gap-[5px] data-[active='false']:text-gray-400 data-[active='true']:text-black shrink"
          href={item.href}
        >
          <IconsaxIcons
            name={item.icon}
            className="w-[17px] h-[17px]"
            color="currentColor"
            variant={pathname === item.href ? 'Bold' : 'Outline'}
          />
          <span className="block w-full truncate text-center text-[10px] font-semibold text-current">
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}
