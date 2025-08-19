'use client';

import { useState } from 'react';
import SearchBarTrigger from './SearchBarTrigger';
import SearchBarContent from './SearchBarContent';

// -----------------------------------------------

export default function SearchBar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <SearchBarTrigger setDialogOpen={() => setOpen(true)} />
      <SearchBarContent isOpen={isOpen} setDialogClose={() => setOpen(false)} />
    </>
  );
}
