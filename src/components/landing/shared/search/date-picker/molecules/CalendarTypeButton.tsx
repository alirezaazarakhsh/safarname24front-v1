import { useDatePickerContext, useDatePickerDispatch } from '@/context';

// -----------------------------------

export function CalendarTypeButton() {
  const dispatch = useDatePickerDispatch();
  const { calendarType } = useDatePickerContext();

  return (
    <button
      onClick={() => dispatch({ type: 'calendar-type', payload: undefined })}
      className="absolute -top-1 right-0 text-[clamp(0.7rem,3vw,0.8rem)] font-sans font-semibold px-3 py-1.5 flex-center gap-1 border border-zinc-200 rounded-md bg-zinc-100/50 lg:text-cs08 lg:static lg:py-2 lg:px-5 lg:rounded-lg"
    >
      <span>{calendarType === 'persian' ? 'میلادی' : 'شمسی'}</span>
      <span>تبدیل به تقویم</span>
    </button>
  );
}
