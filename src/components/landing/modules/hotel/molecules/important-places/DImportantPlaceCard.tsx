import { Data } from '../../ImportantPlaces';
import { ICCarInRoad, ICUser } from '@/components/icons';

type Props = {
  importantPlace: Data;
  slideIsActive: boolean;
};

// -----------------------------------------

export default function DImportantPlaceCard(props: Props) {
  const {
    slideIsActive,
    importantPlace: { title, distance, driving_time, walking_time },
  } = props;

  return (
    <div
      className={`relative z-10 bg-white h-full px-5 py-4 flex flex-col border-2 overflow-hidden rounded-xl transition-colors duration-200 ease-in-out ${
        slideIsActive ? 'border-cs-blue/50' : 'border-zinc-200'
      }`}
    >
      {/* Title */}
      <span className="text-zinc-800 text-cs09 font-extrabold">{title}</span>

      {/* Distance => by-car | on-foot | Total */}
      <div className="text-cs08 font-semibold mt-auto flex-between items-center">
        <div className="flex-center gap-2">
          <div className="w-9 h-9 flex-center border border-zinc-200 rounded-md">
            <ICCarInRoad />
          </div>

          <div className="flex-center gap-1">
            <span>ماشین</span>
            <span>:</span>
            <span>{driving_time}</span>
            <span>دقیقه</span>
          </div>
        </div>

        <div className="flex-center gap-2">
          <div className="w-9 h-9 flex-center border border-zinc-200 rounded-md">
            <ICUser />
          </div>

          <div className="flex-center gap-1">
            <span>پیاده روی</span>
            <span>:</span>
            <span>{walking_time}</span>
            <span>دقیقه</span>
          </div>
        </div>

        <div className="absolute top-5 left-5 text-zinc-800 font-semibold flex-center gap-1 xl:static">
          <span>مسافت کلی</span>
          <span>:</span>
          <span>{distance}</span>
          <span>کیلومتر</span>
        </div>
      </div>

      {/* Active-Style */}
      <div
        className={`absolute inset-0 -z-10 transition-all duration-200 ease-in-out ${
          slideIsActive ? 'bg-cs-blue/5' : ''
        }`}
      ></div>
    </div>
  );
}
