import React from 'react';
import Link from 'next/link';
import { navigationBar } from '@/constants';

// ---------------------------------------

export default function NavigationBar() {
  return (
    <nav className='fixed z-30 bottom-0 inset-x-0 bg-white h-20 px-6 flex-between items-center border-t shadow-[0_0_2rem_rgba(0,0,0,0.1)] md:flex-center md:gap-8 lg:hidden'>
      {navigationBar.map((nav) => (
        <Link key={nav.id} href={nav.href} className='flex flex-col items-center gap-1.5'>
          <span className=''>{nav.icon}</span>
          <span className='text-zinc-400 text-cs07 font-bold'>{nav.title}</span>
        </Link>
      ))}
    </nav>
  );
}
