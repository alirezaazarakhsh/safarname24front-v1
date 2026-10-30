import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { DestinationState } from '../../model/types';
import DestinationSearchDialog from './destination-search-dialog';
import DestinationSearchDrawer from './destination-search-drawer';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  destination: DestinationState | null;
  onDestinationChange: (destination: DestinationState | null) => void;
};

// ------------------------------

export function DestinationSearchWrapper(props: Props) {
  const { open, onOpenChange, destination, onDestinationChange } = props;

  const isDrawer = useMediaQuery('(max-width: 640px)');

  return (
    <>
      {isDrawer ? (
        <DestinationSearchDrawer
          open={open}
          onOpenChange={onOpenChange}

          destination={destination}
          onDestinationChange={(destination) =>
            onDestinationChange(destination)
          }
        />
      ) : (
        <DestinationSearchDialog
          open={open}
          onOpenChange={onOpenChange}

          destination={destination}
          onDestinationChange={(destination) =>
            onDestinationChange(destination)
          }
        />
      )}
    </>
  );
}
