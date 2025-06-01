type Props = {
  discountPercentage: number;
};

// -----------------------------------------------

export default function DiscountPercentage(props: Props) {
  const { discountPercentage } = props;
  if (!discountPercentage) return null;

  return (
    <div className="absolute top-2.5 right-2.5 w-max h-7 px-2.5 pt-0.5 bg-cs-red text-zinc-100 text-cs75 font-extrabold flex-center gap-0.5 rounded-md">
      <span>{discountPercentage.toFixed()}</span>
      <span>%</span>
      <span className="mr-0.5 hidden lg:block">تخفیف</span>
    </div>
  );
}
