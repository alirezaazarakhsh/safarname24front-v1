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
      containerClassName="hidden mt-16 justify-end gap-2 xl:flex"
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
