'use client';

import { useMemo } from 'react';
import { Plus } from 'lucide-react';

import PassengerRoom from './PassengerRoom';
import { usePassengersContext, usePassengersDispatch } from '@/context';

type Props = {
  handleClose: () => void;
};

type Passengers = Array<{
  id: string;
  adults: number;
  children: number;
}>;

const MAX_ROOM = 3;
function calculateTotalPeople(passengers: Passengers) {
  return passengers.reduce((total, passenger) => {
    return total + passenger.adults + passenger.children;
  }, 0);
}

// -----------------------------------

export default function PassengersContent(props: Props) {
  const { handleClose } = props;

  const { rooms } = usePassengersContext();
  const dispatch = usePassengersDispatch();

  const totalPeople = useMemo(() => {
    return calculateTotalPeople(rooms);
  }, [rooms]);

  return (
    <>
      {/* === Rooms */}
      <div
        dir="rtl"
        className={`h-fit grid gap-4 overflow-auto custom-scrollbar ${rooms.length > 2 ? 'max-h-[18rem] pl-5' : 'max-h-[21rem] pl-6'}`}
      >
        {rooms.map((passenger) => (
          <PassengerRoom key={passenger.id} {...passenger} />
        ))}

        {/* === Add-Room */}
        <button
          disabled={rooms.length >= MAX_ROOM}
          className="w-fit ml-auto flex items-center gap-1.5 disabled:opacity-50"
          onClick={() => dispatch({ type: 'add' })}
        >
          <Plus color="#222" size={16} />
          <span className="text-zinc-800 text-cs85 font-bold lg:text-cs08">
            افزودن اتاق
          </span>
        </button>
      </div>

      {/* === Submit */}
      <div className="w-full h-11 flex pl-6 mt-6 lg:pl-5 lg:mt-4">
        <button
          onClick={() => {
            handleClose();
            dispatch({
              type: 'confirmed-passengers',
              payload: {
                rooms: rooms.length,
                passengers: totalPeople,
              },
            });
          }}
          className={`w-full bg-cs-dark-blue text-white text-cs85 font-semibold flex-center gap-1.5 rounded-cs-10 lg:text-cs08`}
        >
          <span>تایید</span>

          <div className="flex-center gap-0.5">
            (<span className="w-3 text-center">{totalPeople}</span>
            <span>مسافر</span>
            <span>,</span>
            <span className="w-3 text-center">{rooms.length}</span>
            <span>اتاق</span>)
          </div>
        </button>
      </div>
    </>
  );
}
