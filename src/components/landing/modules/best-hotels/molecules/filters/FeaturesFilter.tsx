type Props = {};

// -------------------------------------

export default function FeaturesFilter(props: Props) {
  const {} = props;

  return (
    <div className="py-5 grid gap-4 lg:px-5">
      <span className="text-cs85 font-bold">فیلتر امکانات</span>

      <button className="h-11 bg-cs-dark-blue text-white text-cs08 font-semibold rounded-lg transition-colors duration-200 ease-in-out hover:bg-cs-dark-blue/95">
        برای مشاهده فیلتر ها کلیک کنید
      </button>
    </div>
  );
}
