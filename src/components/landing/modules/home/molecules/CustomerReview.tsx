import Image from 'next/image';
import { Star1 } from 'iconsax-react';

import 'react-circular-progressbar/dist/styles.css';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

type Props = {
  rate: number;
  text: string;
  commenter: string;
  evaluation: string;
  commenter_image: string;
};

// ------------------------------------------------

export default function CustomerReview(props: Props) {
  const { text, commenter, commenter_image, rate, evaluation } = props;

  function exportBasedOnImport(
    rate: number,
    type: 'color' | 'text' | 'colorText',
  ) {
    if (type === 'color') {
      return rate > 3
        ? '#22c55e'
        : rate <= 3 && rate > 1.5
          ? '#f97316'
          : '#ef4444';
    } else if (type === 'text') {
      return rate > 3
        ? 'پیشنهاد میکنم'
        : rate <= 3 && rate > 1.5
          ? 'قابل قبول'
          : 'پیشنهاد نمیکنم';
    } else
      return rate > 3
        ? 'text-green-600'
        : rate <= 3 && rate > 1.5
          ? 'text-orange-600'
          : 'text-red-600';
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-[0_0.5rem_1rem_rgba(0,0,0,0.02)]">
      <div className="h-12 flex gap-3">
        {/* Image */}
        <div className="relative bg-zinc-100 w-12 overflow-hidden rounded-lg">
          {commenter_image && (
            <Image
              width={100}
              height={100}
              src={commenter_image}
              alt="customer-avatar"
              className="full-size object-cover"
            />
          )}
        </div>

        {/* Full-Name | Vote-Type */}
        <div className="flex flex-col justify-center gap-1">
          <span className="max-w-32 text-zinc-800 text-cs85 font-bold truncate">
            {commenter}
          </span>

          <span
            className={`text-cs08 font-semibold ${exportBasedOnImport(rate, 'colorText')}`}
          >
            {evaluation}
          </span>
        </div>

        {/* Rating */}
        <div className="w-12 mr-auto">
          <CircularProgressbar
            value={rate}
            maxValue={5}
            strokeWidth={9}
            text={`${Number(rate)}`}
            className="font-extrabold"
            styles={buildStyles({
              textSize: '30px',
              textColor: `${exportBasedOnImport(rate, 'color')}`,
              trailColor: '#f4f4f5',
              pathColor: `${exportBasedOnImport(rate, 'color')}`,
            })}
          />
        </div>
      </div>

      {/* Separator */}
      <div className="bg-zinc-200 h-[1px] my-5 rounded"></div>

      {/* Description */}
      <p className="text-zinc-500 text-cs08/5 text-justify font-medium line-clamp-6">
        {text}
      </p>

      {/* Stars */}
      <div className="relative w-max mt-6 mb-2 mx-auto flex-center gap-1.5">
        {/* All-Stars */}
        {[1, 2, 3, 4, 5].map((_) => (
          <Star1
            key={_}
            size={24}
            color="#333"
            variant="Bulk"
            className="opacity-20"
          />
        ))}

        {/* Rate-Stars */}
        <div className="absolute left-0 flex gap-1.5">
          {Array.from({ length: Math.floor(rate) }, (_, i) => i).map((_) => (
            <Star1 key={_} variant="Bulk" size={24} color="#333" />
          ))}
        </div>
      </div>
    </div>
  );
}
