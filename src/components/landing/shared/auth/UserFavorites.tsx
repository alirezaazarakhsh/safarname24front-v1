'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { Heart } from 'iconsax-react';
import { useCheckAuth } from '@/hooks';

import AuthGuardReaction from './AuthGuardReaction';
import { usePathname, useRouter } from 'next/navigation';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// --------------------------------------------

export default function UserFavorites() {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useCheckAuth();
  const isActive = pathname === '/dashboard/favorites';
  const [guardIsOpen, setGuardIsOpen] = useState(false);

  function handleClick() {
    if (!isAuthenticated) setGuardIsOpen(true);
    else router.push('/dashboard/favorites');
  }

  return (
    <>
      {/* Small-Device */}
      <button
        className="flex flex-col items-center gap-1.5 overflow-hidden lg:hidden"
        onClick={handleClick}
      >
        <IconsaxIcons
          size={18}
          name={'Heart'}
          variant={isActive ? 'Bold' : 'Outline'}
          color={isActive ? '#27272a' : '#71717a'}
          className="transition-colors duration-300 ease-in-out"
        />

        <span
          className={clsx(
            'text-[clamp(0.65rem,3vw,0.75rem)] font-bold text-zinc-500 transition-colors duration-300 ease-in-out',
            isActive && 'text-zinc-800',
          )}
        >
          علاقه مندی ها
        </span>
      </button>

      {/* ---------------------------- */}

      {/* Large-Device */}
      <button
        className="lg:flex-center hidden gap-2 rounded-lg bg-zinc-200/50 px-4 transition-colors duration-300 ease-in-out hover:bg-zinc-200/80"
        onClick={handleClick}
      >
        <Heart size={19} variant="Bold" color="#60606a" />
        <span className="hidden xl:block">مورد علاقه ها</span>
      </button>

      <AuthGuardReaction isOpen={guardIsOpen} setOpen={setGuardIsOpen} />
    </>
  );
}
