import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { DestinationState } from '../../model/types';
import { useDestinationSearch } from '../../model/use-destination-search';
import { SearchInput } from '../molecules/search-input';
import { DestinationList } from '../molecules/destination-list';
import { ClearSelectionButton } from '../molecules/clear-selection-button';
import { ConfirmButton } from '../molecules/confirm-button';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  destination: DestinationState | null;
  onDestinationChange: (destination: DestinationState | null) => void;
};

// ------------------------------

export default function DestinationSearchDialog(props: Props) {
  const { onOpenChange, open, destination, onDestinationChange } = props;

  const {
    searchTerm,
    setSearchTerm,
    tempSelected,
    inputRef,
    cities,
    hotels,
    handleClearInput,
    handleSelectItem,
    handleClearSelection,
    handleConfirm,
    displayItems,
    isSearching,
  } = useDestinationSearch({
    value: destination,
    onChange: onDestinationChange,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={'h-auto gap-0 overflow-hidden rounded-3xl p-0'}
      >
        <DialogHeader className="p-6">
          <DialogTitle className={'hidden'}></DialogTitle>
          <DialogDescription className={'hidden'}></DialogDescription>

          <SearchInput
            value={searchTerm}
            inputRef={inputRef}
            onChange={setSearchTerm}
            onClear={handleClearInput}
          />
        </DialogHeader>

        <DestinationList
          items={displayItems}
          isSearching={isSearching}
          selectedItem={tempSelected}
          onSelect={handleSelectItem}
        />

        {/* <div className="flex items-center justify-between border-t p-6">
          <ConfirmButton
            onClick={() => {
              handleConfirm();
              onOpenChange(false);
            }}
            disabled={!tempSelected}
          />

          <ClearSelectionButton
            disabled={!tempSelected}
            onClick={handleClearSelection}
          />
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
