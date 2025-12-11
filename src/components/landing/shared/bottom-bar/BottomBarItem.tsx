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

// -----------------------------

export function BottomBarItem(props: Props) {
  const { title, icon, href } = props;

  const pathname = usePathname();
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 overflow-hidden"
    >
      <IconsaxIcons
        size={18}
        name={icon}
        variant={isActive ? 'Bold' : 'Outline'}
        color={isActive ? '#27272a' : '#71717a'}
      />

      <span
        className={clsx(
          'text-[clamp(0.65rem,3vw,0.75rem)] font-bold text-zinc-500',
          isActive && 'text-zinc-800',
        )}
      >
        {title}
      </span>
    </Link>
  );
}
