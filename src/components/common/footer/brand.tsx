import Link from 'next/link';
import Image from 'next/image';

import { content } from '@/lib/constants/footer';

// ------------------------------

export function Brand() {
  const { description, logo, subtitle, title } = content.hero;

  return (
    <div className="space-y-5">
      <Link href={'/'} className="flex w-fit items-center gap-4">
        <Image src={logo} alt="logo" className="w-18" />

        <div className="text-foreground grid space-y-0.5 capitalize">
          <span className="font-brand text-2xl">{title}</span>
          <span className="font-secondary text-sm font-semibold">
            {subtitle}
          </span>
        </div>
      </Link>

      <p className="text-muted-foreground text-sm leading-7 font-medium">
        {description}
      </p>
    </div>
  );
}
