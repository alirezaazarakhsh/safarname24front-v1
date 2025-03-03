'use client';

import ReactPaginate from 'react-paginate';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

type Props = {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

// -------------------------------------

export function Pagination(props: Props) {
  const { currentPage, setCurrentPage } = props;

  return (
    <ReactPaginate
      pageCount={6}
      containerClassName="hidden mt-16 justify-end gap-3 xl:flex"
      activeClassName="bg-[#333] text-white"
      pageClassName="w-10 h-10 flex-center cursor-pointer border overflow-hidden rounded-lg"
      pageLinkClassName="full-size text-[0.9rem] font-semibold pt-1 flex-center"
      disabledClassName="opacity-50"
      onPageChange={(currentPage) => setCurrentPage(currentPage.selected)}
      previousLabel={
        <button className="bg-zinc-200/60 w-10 h-10 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200">
          <SlArrowRight size={14} />
        </button>
      }
      nextLabel={
        <button className="bg-zinc-200/60 w-10 h-10 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200">
          <SlArrowLeft size={14} />
        </button>
      }
    />
  );
}
