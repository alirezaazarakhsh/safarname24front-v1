'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type Props = {
  logo: string;
  title: string;
  subtitle: string;
};

// --------------------------------------------

export default function MobileHeader(props: Props) {
  const { logo, title, subtitle } = props;

  const pathname = usePathname();
  const noDisplayCondition =
    /^\/best-hotels\/.+/.test(pathname) ||
    pathname === '/about-us' ||
    pathname === '/contact-us';

  if (noDisplayCondition) return null;

  return (
    <header className="pt-6 mx-5 lg:hidden">
      {/* Logo | Titles */}
      <div className="flex items-center gap-3">
        <Link
          href={'/'}
          className="w-16 h-16 flex-center overflow-hidden rounded-lg"
        >
          {logo && (
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-full aspect-auto"
            />
          )}
        </Link>

        <div className="text-cs85 text-zinc-800 space-y-0.5">
          <h1 className="font-extrabold">{title}</h1>
          <h2 className="font-inter font-bold capitalize">{subtitle}</h2>
        </div>
      </div>
    </header>
  );
}
