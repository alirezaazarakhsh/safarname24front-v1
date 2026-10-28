import { cn } from 'cn';
import { Button } from '@/components/ui/button';

type Props = {
  selectedCount: number;
  onClick: () => void;
  className?: string;
};

// ------------------------------

export default function ConfirmButton(props: Props) {
  const { selectedCount, onClick, className = '' } = props;

  const getButtonText = () => {
    if (selectedCount === 0) return 'انتخاب تاریخ ورود';
    if (selectedCount === 1) return 'انتخاب تاریخ خروج';
    return 'تایید و ادامه';
  };

  const isCompleted = selectedCount === 2;

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={!isCompleted}
      className={cn('sm:font-semibold', className)}
    >
      {getButtonText()}
    </Button>
  );
}
