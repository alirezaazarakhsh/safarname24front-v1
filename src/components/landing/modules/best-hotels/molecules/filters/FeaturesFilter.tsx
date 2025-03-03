type Props = {};

// -------------------------------------

export default function FeaturesFilter(props: Props) {
  const {} = props;

  return (
    <div className="py-5 grid gap-4 xl:px-5">
      <span className="text-cs85 font-bold">فیلتر امکانات</span>

      <button className="h-10 bg-cs-dark-blue text-white text-cs75 font-semibold rounded-lg transition-colors duration-200 ease-in-out hover:bg-cs-dark-blue/95">
        برای مشاهده فیلتر کلیک کنید
      </button>
    </div>
  );
}
