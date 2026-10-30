'use client';

import { DestinationState } from '../../model/types';

import { DestinationSearchWrapper } from './destination-search-wrapper';
import DestinationSearchTrigger from '../molecules/destination-search-trigger';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  destination: DestinationState | null;
  onDestinationChange: (destination: DestinationState | null) => void;
};

// ------------------------------

export default function DestinationSearch(props: Props) {
  const { destination, onDestinationChange, open, onOpenChange } = props;
  const handleOpenDestinationSearch = () => onOpenChange(true);

  return (
    <>
      <DestinationSearchTrigger
        destination={destination}
        handleOpenDestinationSearch={handleOpenDestinationSearch}
      />

      <DestinationSearchWrapper
        open={open}
        onOpenChange={onOpenChange}

        destination={destination}
        onDestinationChange={onDestinationChange}
      />
    </>
  );
}
