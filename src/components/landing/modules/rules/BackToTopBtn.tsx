'use client';

import { ArrowRight2 } from 'iconsax-react';

// -----------------------------------------

export function BackToTopBtn() {
  return (
    <button
      className="bg-zinc-100 px-4 flex-center rounded-lg transition-colors duration-200 ease-in-out hover:bg-zinc-200/60"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowRight2 size={20} color="#52525b" className="-rotate-90" />
    </button>
  );
}
