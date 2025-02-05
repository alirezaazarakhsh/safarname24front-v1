'use client';
import { ICArrowCircleUp } from '@/components/icons';

// -----------------------------------------

export default function BackToTopBtn() {
  return (
    <button
      className='bg-zinc-100 w-max text-zinc-800 text-cs08 font-semibold px-3 flex-center gap-2 rounded-cs-10 transition-colors duration-200 ease-in-out hover:bg-zinc-200/70'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <span className='lg:hidden xl:block'>برو به بالا</span>
      <ICArrowCircleUp />
    </button>
  );
}
