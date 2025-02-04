'use client';

import { navLinks } from '@/constants';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  return (
    <>
      {/* Small-Device */}
      <header className='text-cs08 font-bold pt-8 mx-5 flex flex-col gap-4 xl:hidden'>
        {/* Logo | Titles */}
        <div className='flex items-center gap-3'>
          <Link href={'/'} className='bg-cs-red w-12 h-12 overflow-hidden rounded-lg'>
            <Image
              src={'/image/logo/logo-white.png'}
              alt='logo'
              width={100}
              height={100}
              className='full-size object-cover scale-125'
            />
          </Link>

          <div className='text-zinc-800 space-y-0.5'>
            <h1 className='font-extrabold'>سفرنامه 24</h1>
            <h2 className='font-inter font-semibold capitalize'>agency safarname 24 hotel</h2>
          </div>
        </div>

        <div className='bg-zinc-200/50 h-10 flex overflow-hidden rounded-lg'>
          <button className='w-12 flex-center'>
            <svg
              width='20'
              height='20'
              className='w-4 h-4'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.1665 17.2917C4.68317 17.2917 1.0415 13.65 1.0415 9.16669C1.0415 4.68335 4.68317 1.04169 9.1665 1.04169C9.50817 1.04169 9.7915 1.32502 9.7915 1.66669C9.7915 2.00835 9.50817 2.29169 9.1665 2.29169C5.37484 2.29169 2.2915 5.37502 2.2915 9.16669C2.2915 12.9584 5.37484 16.0417 9.1665 16.0417C12.9582 16.0417 16.0415 12.9584 16.0415 9.16669C16.0415 8.82502 16.3248 8.54169 16.6665 8.54169C17.0082 8.54169 17.2915 8.82502 17.2915 9.16669C17.2915 13.65 13.6498 17.2917 9.1665 17.2917Z'
                fill='#5D5D5D'
              />
              <path
                d='M16.6665 4.79169H11.6665C11.3248 4.79169 11.0415 4.50835 11.0415 4.16669C11.0415 3.82502 11.3248 3.54169 11.6665 3.54169H16.6665C17.0082 3.54169 17.2915 3.82502 17.2915 4.16669C17.2915 4.50835 17.0082 4.79169 16.6665 4.79169Z'
                fill='#5D5D5D'
              />
              <path
                d='M14.1665 7.29169H11.6665C11.3248 7.29169 11.0415 7.00835 11.0415 6.66669C11.0415 6.32502 11.3248 6.04169 11.6665 6.04169H14.1665C14.5082 6.04169 14.7915 6.32502 14.7915 6.66669C14.7915 7.00835 14.5082 7.29169 14.1665 7.29169Z'
                fill='#5D5D5D'
              />
              <path
                d='M16.8001 18.9917C16.7334 18.9917 16.6667 18.9833 16.6084 18.975C16.2167 18.925 15.5084 18.6583 15.1084 17.4667C14.9001 16.8417 14.9751 16.2167 15.3167 15.7417C15.6584 15.2667 16.2334 15 16.8917 15C17.7417 15 18.4084 15.325 18.7084 15.9C19.0084 16.475 18.9251 17.2083 18.4501 17.9167C17.8584 18.8083 17.2167 18.9917 16.8001 18.9917ZM16.3001 17.075C16.4417 17.5083 16.6417 17.725 16.7751 17.7417C16.9084 17.7583 17.1584 17.6 17.4167 17.225C17.6584 16.8667 17.6751 16.6083 17.6167 16.4917C17.5584 16.375 17.3251 16.25 16.8917 16.25C16.6334 16.25 16.4417 16.3333 16.3334 16.475C16.2334 16.6167 16.2167 16.8333 16.3001 17.075Z'
                fill='#5D5D5D'
              />
            </svg>
          </button>

          <input
            type='text'
            placeholder='جستجو شهر, هتل ...'
            className='flex-1 bg-transparent text-zinc-800 text-cs07 placeholder:text-zinc-500 pl-4'
          />
        </div>
      </header>

      {/* Large-Device */}
      <header className='h-24 text-cs08 font-bold mx-5 hidden items-center gap-4 xl:flex-between'>
        {/* Logo | Titles */}
        <div className='flex items-center gap-3'>
          <Link href={'/'} className='bg-cs-red w-12 h-12 overflow-hidden rounded-lg'>
            <Image
              src={'/image/logo/logo-white.png'}
              alt='logo'
              width={100}
              height={100}
              className='full-size object-cover scale-125'
            />
          </Link>

          <div className='text-zinc-800 space-y-0.5'>
            <h1 className='font-extrabold'>سفرنامه 24</h1>
            <h2 className='font-inter font-semibold capitalize'>agency safarname 24 hotel</h2>
          </div>
        </div>

        {/* Nav-Links */}
        <nav className='flex-center'>
          {navLinks.map((nav, index) => (
            <NavLink key={index} href={nav.href}>
              {nav.title}
            </NavLink>
          ))}
        </nav>

        <div className='h-10 text-zinc-800 text-cs07 flex gap-3'>
          <button className='bg-zinc-200/50 px-4 flex-center gap-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/80'>
            <svg
              width='24'
              height='24'
              className='w-5 h-5'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16.44 3.10001C14.63 3.10001 13.01 3.98001 12 5.33001C10.99 3.98001 9.37 3.10001 7.56 3.10001C4.49 3.10001 2 5.60001 2 8.69001C2 9.88001 2.19 10.98 2.52 12C4.1 17 8.97 19.99 11.38 20.81C11.72 20.93 12.28 20.93 12.62 20.81C15.03 19.99 19.9 17 21.48 12C21.81 10.98 22 9.88001 22 8.69001C22 5.60001 19.51 3.10001 16.44 3.10001Z'
                fill='#52525b'
              />
            </svg>

            <span>مورد علاقه ها</span>
          </button>

          <button className='bg-zinc-200/50 px-4 flex-center gap-2 rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/80'>
            <svg
              width='24'
              height='24'
              className='w-[1.1rem] h-[1.1rem]'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9.15957 11.62C9.12957 11.62 9.10957 11.62 9.07957 11.62C9.02957 11.61 8.95957 11.61 8.89957 11.62C5.99957 11.53 3.80957 9.25 3.80957 6.44C3.80957 3.58 6.13957 1.25 8.99957 1.25C11.8596 1.25 14.1896 3.58 14.1896 6.44C14.1796 9.25 11.9796 11.53 9.18957 11.62C9.17957 11.62 9.16957 11.62 9.15957 11.62ZM8.99957 2.75C6.96957 2.75 5.30957 4.41 5.30957 6.44C5.30957 8.44 6.86957 10.05 8.85957 10.12C8.91957 10.11 9.04957 10.11 9.17957 10.12C11.1396 10.03 12.6796 8.42 12.6896 6.44C12.6896 4.41 11.0296 2.75 8.99957 2.75Z'
                fill='#292D32'
              />
              <path
                d='M16.5396 11.75C16.5096 11.75 16.4796 11.75 16.4496 11.74C16.0396 11.78 15.6196 11.49 15.5796 11.08C15.5396 10.67 15.7896 10.3 16.1996 10.25C16.3196 10.24 16.4496 10.24 16.5596 10.24C18.0196 10.16 19.1596 8.96 19.1596 7.49C19.1596 5.97 17.9296 4.74 16.4096 4.74C15.9996 4.75 15.6596 4.41 15.6596 4C15.6596 3.59 15.9996 3.25 16.4096 3.25C18.7496 3.25 20.6596 5.16 20.6596 7.5C20.6596 9.8 18.8596 11.66 16.5696 11.75C16.5596 11.75 16.5496 11.75 16.5396 11.75Z'
                fill='#292D32'
              />
              <path
                d='M9.16961 22.55C7.20961 22.55 5.23961 22.05 3.74961 21.05C2.35961 20.13 1.59961 18.87 1.59961 17.5C1.59961 16.13 2.35961 14.86 3.74961 13.93C6.74961 11.94 11.6096 11.94 14.5896 13.93C15.9696 14.85 16.7396 16.11 16.7396 17.48C16.7396 18.85 15.9796 20.12 14.5896 21.05C13.0896 22.05 11.1296 22.55 9.16961 22.55ZM4.57961 15.19C3.61961 15.83 3.09961 16.65 3.09961 17.51C3.09961 18.36 3.62961 19.18 4.57961 19.81C7.06961 21.48 11.2696 21.48 13.7596 19.81C14.7196 19.17 15.2396 18.35 15.2396 17.49C15.2396 16.64 14.7096 15.82 13.7596 15.19C11.2696 13.53 7.06961 13.53 4.57961 15.19Z'
                fill='#292D32'
              />
              <path
                d='M18.3396 20.75C17.9896 20.75 17.6796 20.51 17.6096 20.15C17.5296 19.74 17.7896 19.35 18.1896 19.26C18.8196 19.13 19.3996 18.88 19.8496 18.53C20.4196 18.1 20.7296 17.56 20.7296 16.99C20.7296 16.42 20.4196 15.88 19.8596 15.46C19.4196 15.12 18.8696 14.88 18.2196 14.73C17.8196 14.64 17.5596 14.24 17.6496 13.83C17.7396 13.43 18.1396 13.17 18.5496 13.26C19.4096 13.45 20.1596 13.79 20.7696 14.26C21.6996 14.96 22.2296 15.95 22.2296 16.99C22.2296 18.03 21.6896 19.02 20.7596 19.73C20.1396 20.21 19.3596 20.56 18.4996 20.73C18.4396 20.75 18.3896 20.75 18.3396 20.75Z'
                fill='#292D32'
              />
            </svg>

            <span>حساب کاربری</span>
          </button>
        </div>
      </header>
    </>
  );
}

// --------------------------------------

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = (props: NavLinkProps) => {
  const { href, children } = props;

  const pathname = usePathname();
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href);

  return (
    <Link href={href} className={clsx('nav-link', { active: isActive })}>
      {children}
    </Link>
  );
};
