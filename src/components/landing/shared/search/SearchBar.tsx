'use client';

import { useState } from 'react';
import SearchBarTrigger from './SearchBarTrigger';
import SearchBarContainer from './SearchBarContainer';

type Props = {
  triggerType?: 'box' | 'none-box';
};

// -----------------------------------------------

export default function SearchBar(props: Props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <SearchBarTrigger setDialogOpen={() => setOpen(true)} />
      <SearchBarContainer
        isOpen={isOpen}
        setDialogClose={() => setOpen(false)}
      />
    </>
  );
}
