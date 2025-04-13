'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { IconsName } from '@/types';
import { usePathname } from 'next/navigation';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

type Props = {
  href: string;
  title: string;
  icon: IconsName;
};

// ---------------------------------------

export default function NavigationBarItem(props: Props) {
  const { title, icon, href } = props;

  const pathname = usePathname();
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 overflow-hidden"
    >
      <IconsaxIcons
        size={20}
        name={icon}
        variant={isActive ? 'Bold' : 'Outline'}
        color={isActive ? '#27272a' : '#71717a'}
        className="transition-colors duration-300 ease-in-out"
      />

      <span
        className={clsx(
          'text-zinc-500 text-[clamp(0.65rem,3vw,0.8rem)] font-bold transition-colors duration-300 ease-in-out',
          isActive && 'text-zinc-800',
        )}
      >
        {title}
      </span>
    </Link>
  );
}
