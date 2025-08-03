import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';

type Props = {
  direction?: string;
  handleClick?: () => void;
};

// --------------------------------

export function MonthNavigationButton(props: Props) {
  const { direction, handleClick } = props;

  return (
    <button onClick={handleClick}>
      {direction === 'right' ? (
        <ArrowRight2 size={14} color="#444" />
      ) : (
        <ArrowLeft2 size={14} color="#444" />
      )}
    </button>
  );
}
