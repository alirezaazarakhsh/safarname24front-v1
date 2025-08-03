import Image from 'next/image';

import { ICStar } from '@/components/icons';
import { HotelCustomerReview } from '@/types';
import { MinusCircle, PlusCircle } from 'lucide-react';

// -----------------------------------------

export default function Review(props: HotelCustomerReview) {
  const {
    created_date,
    created_time,
    first_name,
    last_name,
    stars,
    strengths,
    text,
    user_image,
    weaknesses,
  } = props;

  return (
    <div className="relative h-full bg-white p-5 border rounded-xl">
      {/* Avatar | FullName | Date */}
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="bg-zinc-100 w-12 h-12 overflow-hidden rounded-full lg:w-12 lg:h-12">
          {user_image && (
            <Image
              src={user_image}
              alt={'customer-avatar'}
              width={100}
              height={100}
              className="full-size object-contain"
            />
          )}
        </div>

        <div className="flex-1 flex flex-col items-start space-y-1">
          <div className="w-40 text-zinc-800 text-cs85 font-extrabold truncate lg:text-cs09 lg:max-w-48 xl:max-w-72">
            {first_name + ' ' + last_name}
          </div>
        </div>
      </div>

      {/* Comment */}
      <div className="h-[3.9rem] text-zinc-600 text-cs08/5 text-justify font-semibold pl-4 my-5 overflow-auto custom-scrollbar lg:h-10">
        {text}
      </div>

      {/* Points */}
      <div className="h-[7.8rem] overflow-auto custom-scrollbar lg:h-14">
        <div className="w-fit grid gap-3 lg:grid-cols-2 lg:gap-12">
          {/* Positive */}
          <div className="space-y-3 truncate">
            {strengths?.map((point, index) => (
              <div key={index} className="-mr-0.5 flex items-center gap-2">
                <PlusCircle color="#fff" fill="#39B533" />

                <span className="flex-1 text-zinc-600 text-cs08 font-semibold pl-4 truncate">
                  {point.title}
                </span>
              </div>
            ))}
          </div>

          {/* Negative */}
          <div className="space-y-3 truncate">
            {weaknesses?.map((point, index) => (
              <div key={index} className="-mr-0.5 flex items-center gap-2">
                <MinusCircle color="#fff" fill="#FF4949" />

                <span className="flex-1 text-zinc-600 text-cs08 font-semibold pl-4 truncate">
                  {point.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time | Rate (Small-Screen) */}
      <div className="h-9 top-5 left-5 text-zinc-100 text-cs08 font-semibold flex justify-end gap-3 mt-6 lg:mt-0 lg:absolute">
        <div className="bg-cs-dark-blue px-4 flex-center gap-1.5 rounded-lg">
          <span>{created_date}</span>
        </div>

        <div className="bg-cs-red px-4 flex-center gap-2 rounded-lg">
          <ICStar />
          <span className="pt-0.5">{stars}</span>
        </div>
      </div>
    </div>
  );
}
