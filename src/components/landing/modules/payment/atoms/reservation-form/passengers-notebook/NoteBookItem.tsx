import { Person } from '../../../helpers/type';

type Props = {
  idx: number;
  passenger: Person;
  handleCloseSheet: () => void;
  fillPassenger: (idx: number, passengerData: Person) => void;
};

// ------------------------------

export function NoteBookItem(props: Props) {
  const { idx, passenger, fillPassenger, handleCloseSheet } = props;

  function choosePassenger() {
    fillPassenger(idx, passenger);
    handleCloseSheet();
  }

  return (
    <div className="text-zinc-800 text-cs85 font-semibold py-4 space-y-2 first:pt-0 last:pb-0">
      <div className="mb-3 flex-between items-center">
        <span>
          * {passenger.first_name} {passenger.last_name}
        </span>

        <button
          onClick={choosePassenger}
          className="bg-zinc-100 h-9 text-cs08 px-4 rounded-lg"
        >
          انتخاب
        </button>
      </div>

      <div className="flex-between items-center">
        <span>شماره همراه :</span>
        <span className="text-zinc-600">{passenger.phone_number}</span>
      </div>

      <div className="flex-between items-center">
        <span>کد ملی :</span>
        <span className="text-zinc-600">{passenger.national_code}</span>
      </div>
    </div>
  );
}
