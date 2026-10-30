import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClearSelectionButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const ClearSelectionButton: React.FC<ClearSelectionButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={'px-5'}
      disabled={disabled}
      variant={'destructive'}
    >
      <Trash />
      <span>پاک کردن</span>
    </Button>
  );
};
