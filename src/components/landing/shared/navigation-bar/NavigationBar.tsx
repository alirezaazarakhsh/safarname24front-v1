'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { navigationBar } from '@/constants';

// ---------------------------------------

export default function NavigationBar() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Check if scroll is at-end
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      const condition = scrollTop + clientHeight >= scrollHeight - 10;
      condition ? setIsAtBottom(true) : setIsAtBottom(false);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-30 bottom-0 inset-x-0 bg-white h-[4.5rem] px-6 flex-between items-center border-t shadow-[0_0_2rem_rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out md:flex-center md:gap-8 lg:hidden ${
        isAtBottom ? '-bottom-20' : 'bottom-0'
      }`}
    >
      {navigationBar.map((nav) => (
        <Link key={nav.id} href={nav.href} className='flex flex-col items-center gap-1.5'>
          <span className=''>{nav.icon}</span>
          <span className='text-zinc-400 text-cs65 font-bold'>{nav.title}</span>
        </Link>
      ))}
    </nav>
  );
}
