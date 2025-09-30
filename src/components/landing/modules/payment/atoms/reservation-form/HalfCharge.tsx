import { numberSeparation } from '@/utils';
import { IoIosCheckmark } from 'react-icons/io';

import { usePaymentInvoiceDispatch } from '@/context';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  price: number;
  roomIndex: number;
  type: 'enter' | 'exit';
};

// ------------------------------

export function HalfCharge(props: Props) {
  const { type, price, roomIndex } = props;

  const { control } = useFormContext();
  const dispatch = usePaymentInvoiceDispatch();

  function handleToggle(field: any) {
    field.onChange(!field.value);
    dispatch({
      payload: price,
      type: 'half-charges',
      actionType: field.value ? 'remove' : 'add',
    });
  }

  if (!price) return null;

  return (
    <Controller
      control={control}
      name={`rooms.${roomIndex}.half_charges.${type}.enabled`}
      render={({ field }) => (
        <button
          type="button"
          onClick={() => handleToggle(field)}
          className="h-11 bg-zinc-100 text-cs08 font-semibold px-4 pr-3 flex-between gap-4 rounded-cs-10"
        >
          <div className="flex items-center gap-1">
            <div
              className={`w-[1.3rem] ml-1.5 aspect-square flex-center overflow-hidden rounded-[5px] transition-colors ease-in-out ${
                field.value ? 'bg-zinc-300/80' : 'bg-zinc-200'
              }`}
            >
              <IoIosCheckmark
                color="#333"
                className={`full-size transition-all ease-in-out ${
                  field.value ? 'opacity-100' : 'opacity-0'
                }`}
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
      )}
    />
  );
}
