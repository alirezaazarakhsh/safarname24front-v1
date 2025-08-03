import { useDatePickerContext } from '@/context';

// --------------------------------

export function MDatePickerTrigger() {
  const { confirmedValue } = useDatePickerContext();

  return (
    <>
      {confirmedValue ? (
        <>
          <span>{confirmedValue[0].format()}</span>
          <span>|</span>
          {confirmedValue[1].format()}
        </>
      ) : (
        <>
          <span>تاریخ ورود</span>
          <span>|</span>
          <span>تاریخ خروج</span>
        </>
      )}
    </>
  );
}
