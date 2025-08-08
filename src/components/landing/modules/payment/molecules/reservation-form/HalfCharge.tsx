'use client';

import { useState } from 'react';
import { numberSeparation } from '@/utils';
import { IoIosCheckmark } from 'react-icons/io';

type Props = {
  price?: number;
  type: 'enter' | 'exit';
};

// ------------------------------

export function HalfCharge(props: Props) {
  const { type, price } = props;
  const [isActive, setActive] = useState(false);

  function handleToggleIsActive() {
    setActive((prevValue) => !prevValue);
  }

  return (
    <button
      className="bg-zinc-100 text-cs08 font-semibold px-4 py-3.5 flex-between rounded-cs-10"
      onClick={handleToggleIsActive}
    >
      <div className="flex items-center gap-1">
        <div
          className={`w-5 ml-1.5 aspect-square flex-center overflow-hidden rounded-[5px] transition-colors ease-in-out ${isActive ? 'bg-zinc-300/80' : 'bg-zinc-200'}`}
        >
          <IoIosCheckmark
            color="#333"
            className={`full-size transition-all ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <span>نیم شارژ</span>
        <span>{type === 'enter' ? 'ورود' : 'خروج'}</span>
        <span>هتل :</span>
      </div>

      <div className="flex items-center gap-1">
        <span>{numberSeparation(price || 0)}</span>
        <span>تومان</span>
      </div>
    </button>
  );
}
