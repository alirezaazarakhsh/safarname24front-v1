'use client';

import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Heart } from 'iconsax-react';
import { usePathname, useRouter } from 'next/navigation';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

import AuthGuardReaction from './AuthGuardReaction';

// --------------------------------------------

export default function UserFavorites() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === '/dashboard/favorites';
  const [guardIsOpen, setGuardIsOpen] = useState(false);

  function handleClick() {
    const userIsLoggedIn = Cookies.get('AUTH');
    if (!userIsLoggedIn) setGuardIsOpen(true);
    else router.push('/dashboard/favorites');
  }

  return (
    <>
      {/* Small-Device */}
      <button
        className="flex flex-col items-center gap-2 overflow-hidden lg:hidden"
        onClick={handleClick}
      >
        <IconsaxIcons
          size={20}
          name={'Heart'}
          variant={isActive ? 'Bold' : 'Outline'}
          color={isActive ? '#27272a' : '#71717a'}
          className="transition-colors duration-300 ease-in-out"
        />

        <span
          className={clsx(
            'text-zinc-500 text-[clamp(0.7rem,2.5vw,0.8rem)] font-bold transition-colors duration-300 ease-in-out',
            isActive && 'text-zinc-800',
          )}
        >
          علاقه مندی ها
        </span>
      </button>

      {/* ---------------------------- */}

      {/* Large-Device */}
      <button
        className="bg-zinc-200/50 px-4 hidden gap-2 rounded-lg transition-colors duration-300 ease-in-out hover:bg-zinc-200/80 lg:flex-center"
        onClick={handleClick}
      >
        <Heart size={19} variant="Bold" color="#60606a" />
        <span className="hidden xl:block">مورد علاقه ها</span>
      </button>

      <AuthGuardReaction isOpen={guardIsOpen} setOpen={setGuardIsOpen} />
    </>
  );
}
