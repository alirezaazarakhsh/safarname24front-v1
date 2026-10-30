import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

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

export default function DestinationSearchDrawer(props: Props) {
  const { onOpenChange, open, destination, onDestinationChange } = props;

  const {
    searchTerm,
    setSearchTerm,
    isSearching,
    selectedItem,
    inputRef,
    displayItems,
    handleClearInput,
    handleSelectItem,
  } = useDestinationSearch({
    value: destination,
    onChange: onDestinationChange,
    onClose: () => onOpenChange(false),
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="mb-6">
          <DrawerTitle className="hidden" />
          <DrawerDescription className="hidden" />

          <SearchInput
            value={searchTerm}
            inputRef={inputRef}
            onChange={setSearchTerm}
            onClear={handleClearInput}
          />
        </DrawerHeader>

        <DestinationList
          items={displayItems}
          selectedItem={selectedItem}
          onSelect={handleSelectItem}
          isSearching={isSearching}
        />

        {/* <DrawerFooter className="p-0">
          <div className="grid grid-cols-[1fr_0.6fr] gap-3 border-t p-4 sm:p-6">
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
          </div>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
}
