import { Button } from '@/components/ui/button';
import { cn } from 'cn';

interface ConfirmButtonProps {
  onClick: () => void;
  disabled: boolean;
  label?: string;
  className?: string;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  disabled,
  className,
  label = 'تایید مقصد',
}) => {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn('px-6', className)}
      // className={`rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm transition ${
      //   !disabled
      //     ? 'cursor-pointer bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
      //     : 'cursor-not-allowed bg-gray-200 text-gray-400'
      // }`}
    >
      {label}
    </Button>
  );
};
