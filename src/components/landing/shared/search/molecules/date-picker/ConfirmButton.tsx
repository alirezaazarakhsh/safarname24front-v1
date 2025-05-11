import { useEffect, useMemo, useState } from 'react';
import { useSearchContext, useSearchDispatch } from '@/context/SearchContext';

type Props = {
  handleClose: () => void;
};

// -----------------------------------

export default function ConfirmButton(props: Props) {
  const { handleClose } = props;

  const {
    date: { values },
  } = useSearchContext();
  const dispatch = useSearchDispatch();

  const [error, setError] = useState(false);
  const valuesCheck = values && values[0] && values[1];

  const numberOfNights = useMemo(() => {
    if (!valuesCheck) return;
    return (values[1].unix - values[0].unix) / 86400;
  }, [values, valuesCheck]);

  // === Handling Error Based-On-Values
  useEffect(() => {
    if (valuesCheck) setError(false);
  }, [valuesCheck]);

  function handleConfirmedDateChange() {
    if (valuesCheck) {
      dispatch({
        type: 'DATE',
        payload: { actionType: 'CONFIRMED-DATE', confirmedDate: values },
      });
      handleClose();
      return;
    }

    setError(true);
  }

  return (
    <button
      onClick={handleConfirmedDateChange}
      className={`h-11 text-white text-cs85 font-semibold mt-6 flex-center gap-1 rounded-cs-10 transition-colors duration-200 ease-in-out ${error ? 'bg-cs-red' : 'bg-cs-dark-blue'}`}
    >
      {valuesCheck ? (
        <>
          <span>تایید</span>
          <span>{numberOfNights}</span>
          <span>شب اقامت</span>
        </>
      ) : error ? (
        <span>تاریخ انتخاب نشده است !</span>
      ) : (
        <span>تایید ادامه فرآیند</span>
      )}
    </button>
  );
}
