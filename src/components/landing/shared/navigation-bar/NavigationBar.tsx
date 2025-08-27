'use client';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Profile2User } from 'iconsax-react';
import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';
import { useMediaQuery } from '@/hooks';
import UserFavorites from '../auth/UserFavorites';
import NavigationBarItem from './NavigationBarItem';
import { useUserAccountContext } from '@/context/UserAccountContext';

// ---------------------------------------

export function NavigationBar() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean | null>(null);

  const { toggle } = useUserAccountContext();
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Check if user is logged in
  useEffect(() => {
    const cookie = Cookies.get('auth');
    setUserIsLoggedIn(!!cookie);
  }, []);

  // Hide/show navigation bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      direction === 'down' ? setShowNav(false) : setShowNav(true);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (isDesktop) return null;

  return (
    <>
      <AnimatePresence>
        {showNav && (
          <motion.nav
            key="navigation-bar"
            animate={{ transform: 'translateY(0)' }}
            exit={{ transform: 'translateY(100%)' }}
            initial={{ transform: 'translateY(100%)' }}
            className={`fixed z-30 bottom-0 inset-x-0 bg-white h-[4.4rem] px-4 flex-between items-center overflow-hidden border-t shadow-[0_0_1.5rem_rgba(0,0,0,0.1)] md:flex-center md:gap-8 lg:hidden`}
          >
            <NavigationBarItem title="خانه" href="/" icon={'Home2'} />

            <NavigationBarItem
              icon={'Book'}
              title="مجله گردشگری"
              href="/blog"
            />

            <NavigationBarItem
              icon={'Flash'}
              href="/best-hotels"
              title="بهترین هتل ها"
            />

            <UserFavorites />

            {/* User-Profile | User-Account Triggers */}
            {userIsLoggedIn !== null && userIsLoggedIn ? (
              <Link
                href={'/dashboard/profile'}
                className="flex flex-col items-center gap-1.5"
              >
                <Profile2User size={18} color="#71717a" />
                <span className="text-zinc-500 text-[clamp(0.65rem,3vw,0.75rem)] font-bold">
                  پروفایل کاربری
                </span>
              </Link>
            ) : (
              <button
                className="flex flex-col items-center gap-1.5"
                onClick={() => toggle()}
              >
                <Profile2User size={18} color="#71717a" />
                <span className="text-zinc-500 text-[clamp(0.65rem,3vw,0.75rem)] font-bold">
                  حساب کاربری
                </span>
              </button>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
