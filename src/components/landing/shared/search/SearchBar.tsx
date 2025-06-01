'use client';

import { useState } from 'react';
import SearchBarTrigger from './SearchBarTrigger';
import SearchBarContent from './SearchBarContent';

type Props = {
  triggerType?: 'box' | 'none-box';
};

// -----------------------------------------------

export default function SearchBar(props: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <SearchBarTrigger setDialogOpen={() => setOpen(true)} />
      <SearchBarContent isOpen={isOpen} setDialogClose={() => setOpen(false)} />
    </>
  );
}
