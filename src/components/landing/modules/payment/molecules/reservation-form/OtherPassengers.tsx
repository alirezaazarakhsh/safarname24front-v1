import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { Input } from './Input';
import { FormSchema, Person } from '../../helpers/type';

import { PassengersNoteBook } from './PassengersNoteBook';
import { Control, useFieldArray, useFormContext } from 'react-hook-form';

import { GrClear } from 'react-icons/gr';

type Props = {
  length: number;
  roomIndex: number;
  control: Control<FormSchema> | undefined;
};

// ------------------------------

export function OtherPassengers(props: Props) {
  const { control, roomIndex, length } = props;

  const { setValue } = useFormContext<FormSchema>();
  const { fields: otherFields } = useFieldArray({
    control: control,
    name: `rooms.${roomIndex}.passengers.other_passengers`,
  });

  function fillPassenger(idx: number, passengerData: Person) {
    setValue(
      `rooms.${roomIndex}.passengers.other_passengers.${idx}`,
      passengerData,
    );
  }

  function clearPassenger(idx: number) {
    setValue(`rooms.${roomIndex}.passengers.other_passengers.${idx}`, {
      first_name: '',
      last_name: '',
      national_code: '',
    });
  }

  if (!length) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-cs08 font-bold flex gap-2">سایر مسافران :</h4>

      {otherFields.map((field, idx) => (
        <div
          key={field.id}
          className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5"
        >
          <Input
            placeholder="نام مسافر"
            name={`rooms.${roomIndex}.passengers.other_passengers.${idx}.first_name`}
          />

          <Input
            placeholder="نام خانوادگی مسافر"
            name={`rooms.${roomIndex}.passengers.other_passengers.${idx}.last_name`}
          />

          <Input
            isNationalId
            placeholder="کد ملی مسافر"
            name={`rooms.${roomIndex}.passengers.other_passengers.${idx}.national_code`}
          />

          <div className="h-10 flex justify-end">
            <PassengersNoteBook idx={idx} fillPassenger={fillPassenger} />

            <Tooltip>
              <TooltipTrigger
                type="button"
                onClick={() => clearPassenger(idx)}
                className="bg-cs-red/5 w-10 mr-3.5 flex-center border border-cs-red/10 rounded-lg"
              >
                <GrClear size={20} color="#f30f26" />
              </TooltipTrigger>

              <TooltipContent>پاک سازی اطلاعات مسافر</TooltipContent>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  );
}
