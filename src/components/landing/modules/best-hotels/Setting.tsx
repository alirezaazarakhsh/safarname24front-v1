type Props = {};

// -------------------------------------

export function Setting(props: Props) {
  const {} = props;

  return (
    <div className="text-zinc-800 text-cs75 font-bold mb-12 hidden grid-cols-[1fr_9rem] items-end gap-20 xl:grid">
      <div className="grid grid-cols-[1fr_1fr_0.4fr_0.6fr] gap-4">
        <div className="space-y-3">
          <span>انتخاب شهر یا هتل</span>

          <div className="bg-zinc-200/40 text-zinc-600 font-semibold h-12 px-4 flex items-center gap-1 rounded-lg">
            <span>شهر یا هتل (داخلی , خارجی)</span>
          </div>
        </div>

        <div className="space-y-3">
          <span>تاریخ ورود و خروج هتل</span>

          <div className="bg-zinc-200/40 text-zinc-600 font-semibold h-12 px-4 flex items-center gap-1 rounded-lg">
            <span>2 شهریور ماه 1403</span>
            <span>-</span>
            <span>11 شهریور ماه 1403</span>
          </div>
        </div>

        <div className="space-y-3">
          <span>مدت شب اقامت</span>

          <div className="bg-zinc-200/40 text-zinc-600 font-semibold h-12 px-4 flex items-center gap-1 rounded-lg">
            <span>9</span>
            <span>َشب</span>
          </div>
        </div>

        <div className="space-y-3">
          <span>مسافران</span>

          <div className="bg-zinc-200/40 text-zinc-600 font-semibold h-12 px-4 flex items-center gap-1 rounded-lg">
            <span>2 بزرگسال</span>
            <span>,</span>
            <span>2 اتاق</span>
          </div>
        </div>
      </div>

      {/* Search-Button */}
      <button className="bg-cs-dark-blue text-zinc-100 h-12 hidden rounded-lg lg:block">
        جستجو هتل
      </button>
    </div>
  );
}
