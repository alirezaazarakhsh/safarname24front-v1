import { useDatePickerDispatch } from '@/context';

// --------------------------------

export function ClearDateRangeButton() {
  const dispatch = useDatePickerDispatch();

  function handleClearDateRange() {
    dispatch({
      type: 'value',
      payload: undefined,
    });

    dispatch({
      type: 'confirmed-value',
      payload: undefined,
    });
  }

  return (
    <button
      className="bg-cs-red text-white text-cs08 font-semibold px-5 py-2 rounded-lg"
      onClick={handleClearDateRange}
    >
      پاک کردن
    </button>
  );
}
