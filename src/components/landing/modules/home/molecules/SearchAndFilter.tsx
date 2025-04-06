export default function SearchAndFilter() {
  return (
    <div className="absolute z-10 bottom-10 inset-x-24 bg-[--clr-main-light] h-32 px-8 flex items-center gap-8 rounded-2xl">
      <SearchItem
        title="انتخاب شهر یا هتل"
        subtitle="شهر یا هتل (داخلی, خارجی)"
      />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <SearchItem
        title="تاریخ ورود و خروج هتل"
        subtitle="تاریخ را وارد نمایید"
      />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <SearchItem title="تعداد شب اقامت" subtitle="5 شب" />

      <span className="w-[2px] h-6 bg-zinc-300 rounded"></span>

      <SearchItem title="مسافران" subtitle="تعداد مسافر و اتاق" />

      <button className="bg-cs-red text-zinc-100 text-cs08 font-bold px-11 py-4 mr-auto rounded-cs-10">
        جستجو
      </button>
    </div>
  );
}

// ------------------------------------------

type Props = {
  title: string;
  subtitle: string;
};

function SearchItem(props: Props) {
  const { title, subtitle } = props;

  return (
    <div className="flex flex-col justify-center gap-y-2">
      <span className="text-zinc-800 text-cs85 font-extrabold">{title}</span>
      <span className="text-zinc-500 text-cs08 font-semibold">{subtitle}</span>
    </div>
  );
}
