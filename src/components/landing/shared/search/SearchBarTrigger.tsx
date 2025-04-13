'use client';

import { SearchStatus } from 'iconsax-react';

type Props = {
  type?: 'box' | 'none-box';
  setDialogOpen: () => void;
};

// -----------------------------------------------

export default function SearchBarTrigger(props: Props) {
  const { type = 'box', setDialogOpen } = props;

  return (
    <div
      className="bg-zinc-200/60 w-full h-12 flex items-center overflow-hidden select-none cursor-pointer rounded-lg"
      onClick={setDialogOpen}
    >
      <button className="w-14 flex-center">
        <SearchStatus size="20" color="#52525b" />
      </button>

      <span className="text-zinc-600 text-cs08 font-semibold">
        جستجو شهر, هتل ...
      </span>
    </div>
  );
}
