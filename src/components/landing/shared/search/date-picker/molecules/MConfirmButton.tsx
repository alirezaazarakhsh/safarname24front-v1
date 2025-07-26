import { useMemo } from 'react';
import { useDatePickerContext, useDatePickerDispatch } from '@/context';

type Props = {
  handleClose: () => void;
};

// -----------------------------------

export function MConfirmButton(props: Props) {
  const { handleClose } = props;

  const dispatch = useDatePickerDispatch();
  const { value } = useDatePickerContext();

  const valuesIsExist = value?.[0] && value?.[1];

  const numberOfNights = useMemo(() => {
    if (!valuesIsExist) return;
    return (value[1].unix - value[0].unix) / 86400;
  }, [value, valuesIsExist]);

  function handleConfirmedValues() {
    dispatch({
      type: 'confirmed-value',
      payload: value,
    });

    handleClose();
  }

  return (
    <button
      onClick={handleConfirmedValues}
      className="bg-cs-dark-blue h-11 text-white text-cs85 font-semibold mt-6 flex-center gap-1 rounded-cs-10 transition-colors duration-200 ease-in-out"
    >
      <span>تایید</span>
      <span>{numberOfNights}</span>
      <span>شب اقامت</span>
    </button>
  );
}
