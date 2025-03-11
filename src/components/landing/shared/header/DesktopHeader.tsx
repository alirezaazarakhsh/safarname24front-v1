import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

import NavLink from './NavLink';
import UserAccount from '../auth/UserAccount';
import UserProfile from '../auth/UserProfile';
import { navLinks } from '@/constants/landing';
import UserFavorites from '../auth/UserFavorites';
import { useMediaQuery, useScrollPosition } from '@/hooks';
import DUserProfileTrigger from '../auth/molecules/user-profile/DUserProfileTrigger';

type Props = {
  logo: string;
  title: string;
  subtitle: string;
  userFullName: string;
};

// --------------------------------------------

export default function DesktopHeader(props: Props) {
  const { logo, title, subtitle, userFullName } = props;

  const userIsLoggedIn = Cookies.get('AUTH');

  const pathname = usePathname();
  const scrollPosition = useScrollPosition();
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <>
      <div
        className={`fixed top-0 inset-x-0 z-20 bg-[#f8f8f8] h-20 hidden transition-all duration-500 ease-in-out lg:block ${
          scrollPosition > 0 || pathname !== '/'
            ? 'shadow-[0_0_2rem_rgba(0,0,0,0.1)]'
            : ''
        }`}
      ></div>

      <header className="sticky top-0 z-30 max-w-screen-template h-20 mx-auto hidden lg:flex-center">
        <section className="w-full font-bold mx-5 flex-between items-center gap-4">
          {/* Logo | Title | Subtitle */}
          <Link href={'/'} className="flex items-center gap-3">
            <div className="bg-cs-red w-[3.2rem] h-[3.2rem] p-1.5 flex-center overflow-hidden rounded-cs-10">
              {logo && (
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-full aspect-auto"
                />
              )}
            </div>

            <div className="max-w-48 text-zinc-800 text-cs75 space-y-0.5 xl:text-cs08">
              <h1 className="font-extrabold truncate">{title}</h1>
              <h2 className="font-inter font-semibold capitalize truncate">
                {subtitle}
              </h2>
            </div>
          </Link>

          {/* Nav-Links */}
          <nav className="flex-center">
            {navLinks?.map((nav, index) => (
              <NavLink key={index} href={nav.href}>
                {nav.title}
              </NavLink>
            ))}
          </nav>

          <div className="h-10 text-zinc-800 text-cs07 flex gap-2 xl:gap-3">
            <UserFavorites />

            {/* UserProfile | UserAccount (Based-On Auth) */}
            {userIsLoggedIn ? (
              <UserProfile userFullName={userFullName} />
            ) : (
              <UserAccount isOpen={isOpen} setOpen={setIsOpen} />
            )}

            {/* UserProfileTrigger (Large-Screen) */}
            {!isDesktop && userIsLoggedIn ? (
              <DUserProfileTrigger fullname={userFullName} />
            ) : null}
          </div>
        </section>
      </header>
    </>
  );
}
