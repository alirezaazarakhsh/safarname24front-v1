import {
  AddButton,
  PriceGuide,
  RemoveButton,
} from '../../atoms/reservation-form';

import { Input } from './Input';
import { FormSchema, Person } from '../../helpers/type';
import { PassengersNoteBook } from './PassengersNoteBook';

import { usePaymentInvoiceDispatch } from '@/context';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  length: number;
  roomIndex: number;
  passengerPrice: number;
  control: Control<FormSchema> | undefined;
};

// ------------------------------

export function ExtraCapacityPassengers(props: Props) {
  const { passengerPrice, control, roomIndex, length } = props;

  const dispatch = usePaymentInvoiceDispatch();
  const { setValue } = useFormContext<FormSchema>();

  const {
    fields: extraFields,
    append: addExtraPassenger,
    remove: removeExtraPassenger,
  } = useFieldArray({
    control: control,
    name: `rooms.${roomIndex}.passengers.extra_capacity_passengers`,
  });

  function addPassenger() {
    addExtraPassenger({
      first_name: '',
      last_name: '',
      national_code: '',
    });
    dispatch({
      type: 'extra-passengers',
      actionType: 'add',
      payload: passengerPrice,
    });
  }

  function fillPassenger(idx: number, passengerData: Person) {
    setValue(
      `rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}`,
      passengerData,
    );
  }

  function removePassenger(idx: number) {
    removeExtraPassenger(idx);
    dispatch({
      type: 'extra-passengers',
      actionType: 'remove',
      payload: passengerPrice,
    });
  }

  if (!length) return null;

  return (
    <div className="space-y-4">
      {/* === Extra-Capacity-Passengers (Titles) */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <h4 className="text-cs08 font-bold flex gap-2">نفرات اضافه :</h4>

          <AddButton
            onClick={addPassenger}
            disabled={extraFields.length >= length}
          />
        </div>

        <PriceGuide price={passengerPrice} />
      </div>

      {/* === Extra-Capacity-Passengers */}
      {extraFields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5"
        >
          <Input
            placeholder="نام مسافر"
            name={`rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}.first_name`}
          />
          <Input
            placeholder="نام خانوادگی مسافر"
            name={`rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}.last_name`}
          />

          <Input
            isNationalId
            placeholder="کد ملی مسافر"
            name={`rooms.${roomIndex}.passengers.extra_capacity_passengers.${idx}.national_code`}
          />

          <div className="h-10 flex">
            <PassengersNoteBook idx={idx} fillPassenger={fillPassenger} />
            <RemoveButton onClick={removePassenger} idx={idx} />
          </div>
        </div>
      ))}
    </div>
  );
}
