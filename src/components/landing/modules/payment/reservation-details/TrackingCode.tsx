import IconsaxIcons from '@/components/icons/iconsaxIcons';

// ------------------------------

export default function TrackingCode() {
  return (
    <div className="flex items-center gap-3.5">
      <div className="bg-zinc-100 w-12 h-12 flex-center rounded-lg lg:hidden">
        <IconsaxIcons name={'Clock'} size={22} />
      </div>

      <div className="text-cs85 flex flex-col gap-1 lg:flex-row lg:gap-2">
        <span className="font-bold lg:text-zinc-600">کد پیگیری رزرو هتل :</span>
        <span className="text-zinc-600 font-inter font-semibold">#4354354</span>
      </div>
    </div>
  );
}
