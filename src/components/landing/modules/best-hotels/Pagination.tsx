'use client';

import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

// -------------------------------------

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Setting Current-Page at URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (currentPage + 1).toString());
    router.push(`/best-hotels/?${params.toString()}`, { scroll: false });
  }, [currentPage, pathname, router]);

  return (
    <ReactPaginate
      pageCount={20}
      containerClassName="flex flex-wrap mt-14 justify-center gap-x-2 gap-y-4 xl:justify-end"
      activeClassName="bg-[#333] text-white"
      pageClassName="w-9 h-9 flex-center cursor-pointer border overflow-hidden rounded-lg"
      pageLinkClassName="full-size text-[0.8rem] font-semibold pt-1 flex-center"
      disabledClassName="opacity-50"
      onPageChange={(currentPage) => setCurrentPage(currentPage.selected)}
      previousLabel={
        <button className="bg-zinc-200/40 w-9 h-9 ml-2 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200">
          <SlArrowRight size={12} />
        </button>
      }
      nextLabel={
        <button className="bg-zinc-200/40 w-9 h-9 mr-2 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200">
          <SlArrowLeft size={12} />
        </button>
      }
    />
  );
}
