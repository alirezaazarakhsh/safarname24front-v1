import { Trash } from 'iconsax-react';
import { RoomConfigButton } from './RoomConfigButton';
import { usePassengersContext, usePassengersDispatch } from '@/context';

type Props = {
  id: string;
  adults: number;
  children: number;
};

const roomNames = ['اول', 'دوم', 'سوم'];

// -----------------------------------

export default function PassengerRoom(props: Props) {
  const { id, adults, children } = props;

  const { rooms } = usePassengersContext();
  const dispatch = usePassengersDispatch();

  return (
    <div className="pb-4 grid gap-4 border-b border-zinc-300 last:pb-0 last:border-none">
      {/* === Room-Number & Delete */}
      <div className="flex-between items-center">
        <div className="text-cs95 font-bold flex-center gap-1 lg:text-cs85">
          <span>اتاق</span>

          <span>
            {roomNames[rooms.findIndex((passenger) => passenger.id === id)]}
          </span>
        </div>

        {rooms[0]?.id !== id && (
          <button
            className="bg-cs-red/10 h-8 px-3.5 flex-center gap-2 rounded-md"
            onClick={() =>
              dispatch({
                type: 'remove',
                payload: id,
              })
            }
          >
            <span className="text-cs-red text-cs75 font-semibold pt-0.5">
              حذف
            </span>
            <Trash size={16} color="#f30f26" />
          </button>
        )}
      </div>

      {/* === Adults-Number */}
      <div className="flex-between items-center gap-4">
        <div className="text-[clamp(0.8rem,3vw,0.9rem)] font-bold flex-center gap-1.5 lg:text-cs08">
          <span>بزرگسال</span>
          <span className="text-zinc-600 lg:text-cs75">(12 سال به بالا)</span>
        </div>

        <div className="flex-center gap-2.5">
          <RoomConfigButton
            disabled={adults === 10}
            type="increment"
            onClick={() =>
              dispatch({
                type: 'edit',
                payload: {
                  id,
                  action: 'increase',
                  property: 'adults',
                },
              })
            }
          />

          <span className="w-4 text-cs09 text-center font-bold">{adults}</span>

          <RoomConfigButton
            disabled={adults === 1}
            type="decrement"
            onClick={() =>
              dispatch({
                type: 'edit',
                payload: {
                  id,
                  action: 'decrease',
                  property: 'adults',
                },
              })
            }
          />
        </div>
      </div>

      {/* === Child-Number */}
      <div className="flex-between items-center gap-4">
        <div className="text-[clamp(0.8rem,3vw,0.9rem)] font-bold flex-center gap-1.5 lg:text-cs08">
          <span>کودک</span>
          <span className="text-zinc-600 lg:text-cs75">(تا 12 سال)</span>
        </div>

        <div className="flex-center gap-2.5">
          <RoomConfigButton
            disabled={children === 10}
            type="increment"
            onClick={() =>
              dispatch({
                type: 'edit',
                payload: {
                  id,
                  action: 'increase',
                  property: 'children',
                },
              })
            }
          />

          <span className="w-4 text-cs09 text-center font-bold">
            {children}
          </span>

          <RoomConfigButton
            disabled={children === 0}
            type="decrement"
            onClick={() =>
              dispatch({
                type: 'edit',
                payload: {
                  id,
                  action: 'decrease',
                  property: 'children',
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
