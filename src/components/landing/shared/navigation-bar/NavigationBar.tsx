'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { navigationBar } from '@/constants';
import UserProfile from '../auth/UserProfile';
import UserAccount from '../auth/UserAccount';
import AuthGuardReaction from '../auth/AuthGuardReaction';

// ---------------------------------------

export function NavigationBar() {
  const userIsLoggedIn = true;

  const [open, setOpen] = useState(false);
  const [authReactionIsOpen, setAuthReactionOpen] = useState(false);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');

  // Check Scroll-Position (End)
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollHeight = document.documentElement.scrollHeight;
  //     const clientHeight = document.documentElement.clientHeight;
  //     const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  //     const condition = scrollTop + clientHeight >= scrollHeight - 10;
  //     condition ? setIsAtBottom(true) : setIsAtBottom(false);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  // Check Scroll-Direction
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;

  //     if (currentScrollTop > lastScrollTop) {
  //       setScrollDirection('down');
  //     } else {
  //       setScrollDirection('up');
  //     }

  //     setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollTop]);

  return (
    <nav
      className={`fixed z-30 inset-x-0 bg-white h-[4.5rem] px-6 flex-between items-center border-t shadow-[0_0_2rem_rgba(0,0,0,0.1)] transition-all duration-500 delay-100 ease-in-out md:flex-center md:gap-8 lg:hidden ${
        isAtBottom || scrollDirection === 'down' ? '-bottom-20' : 'bottom-0'
      }`}
    >
      {/* {navigationBar.map((nav) => (
        <Link
          key={nav.id}
          href={nav.href}
          className="flex flex-col items-center gap-1.5"
        >
          <span className="">{nav.icon}</span>
          <span className="text-zinc-400 text-cs65 font-bold">{nav.title}</span>
        </Link>
      ))} */}

      <button onClick={() => setAuthReactionOpen(true)}>Click</button>

      <AuthGuardReaction
        isOpen={authReactionIsOpen}
        setOpen={setAuthReactionOpen}
      />

      {userIsLoggedIn ? (
        <UserProfile userFullName="علیرضا آذرخش" />
      ) : (
        <UserAccount isOpen={open} setOpen={setOpen} />
      )}
    </nav>
  );
}
