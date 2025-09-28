import { useState } from 'react';
import { numberSeparation } from '@/utils';

import { IoIosCheckmark } from 'react-icons/io';
import { usePaymentInvoiceDispatch } from '@/context';

type Props = {
  price: number;
  enabled: boolean;
  type: 'enter' | 'exit';
};

// ------------------------------

export function HalfCharge(props: Props) {
  const { type, enabled, price } = props;
  const [isActive, setActive] = useState(enabled);

  const dispatch = usePaymentInvoiceDispatch();

  function handleToggleIsActive() {
    setActive((prevValue) => !prevValue);
    dispatch({
      payload: price,
      type: 'half-charges',
      actionType: isActive ? 'remove' : 'add',
    });
  }

  if (!price) return null;

  return (
    <button
      type="button"
      onClick={handleToggleIsActive}
      className="h-11 bg-zinc-100 text-cs08 font-semibold px-4 pr-3 flex-between gap-4 rounded-cs-10"
    >
      <div className="flex items-center gap-1">
        <div
          className={`w-[1.3rem] ml-1.5 aspect-square flex-center overflow-hidden rounded-[5px] transition-colors ease-in-out ${isActive ? 'bg-zinc-300/80' : 'bg-zinc-200'}`}
        >
          <IoIosCheckmark
            color="#333"
            className={`full-size transition-all ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        <span>نیم شارژ</span>
        <span>{type === 'enter' ? 'ورود' : 'خروج'}</span>:
      </div>

      <div className="flex items-center gap-1">
        <span>{numberSeparation(price)}</span>
        <span>تومان</span>
      </div>
    </button>
  );
}
