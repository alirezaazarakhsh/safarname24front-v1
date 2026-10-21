import Link from 'next/link';
import Image from 'next/image';

import { routes } from '@/config/routes';
// import logo2 from '@/assets/images/logo/white.webp';
import logo from '@/assets/images/logo/red.png';

// ------------------------------

export default function Brand() {
  return (
    <Link href={routes.home} className="flex items-center gap-2.5">
      <Image src={logo} alt="logo" className="w-14" />

      <h1 className="font-brand text-[1.6rem]">سفرنامه 24</h1>
    </Link>
  );
}
