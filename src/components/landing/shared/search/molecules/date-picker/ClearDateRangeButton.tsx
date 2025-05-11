import { useSearchDispatch } from '@/context/SearchContext';

// --------------------------------

export default function ClearDateRangeButton() {
  const dispatch = useSearchDispatch();

  function handleClearDateRange() {
    dispatch({
      type: 'DATE',
      payload: { actionType: 'DATE-VALUES', values: undefined },
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
