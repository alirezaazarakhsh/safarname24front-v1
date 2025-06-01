'use client';

import Link from 'next/link';
import { useUserAccountContext } from '@/context/UserAccountContext';

// --------------------------------------------

export default function RulesAndRegulation() {
  const { toggle } = useUserAccountContext();

  return (
    <div className="text-zinc-700 text-cs08 font-bold mb-3 flex gap-1 md:mt-auto md:items-center">
      <span>ورود شما به منزله موافقت با</span>
      <Link
        href={'/rules'}
        className="text-cs-red hover:underline"
        onClick={toggle}
      >
        قوانین و مقررات
      </Link>
      <span>است .</span>
    </div>
  );
}
