import { RoomForm } from '../../helpers/type';

type Props = { room: RoomForm };

// ------------------------------

export function RoomTable(props: Props) {
  const { room } = props;

  return (
    <table className="min-w-[500px] w-full text-zinc-600 text-center text-cs08 font-semibold overflow-auto">
      <thead>
        <tr className="bg-zinc-100/50 text-zinc-800 h-11">
          <th>نوع مسافر</th>
          <th>نام</th>
          <th>نام خانوادگی</th>
          <th>کد ملی</th>
          <th>شماره همراه</th>
        </tr>
      </thead>

      <tbody>
        <tr className="h-11 border-t">
          <td>مسافر اصلی</td>
          <td>{room.passengers.main_passenger.first_name}</td>
          <td>{room.passengers.main_passenger.last_name}</td>
          <td>{room.passengers.main_passenger.national_code}</td>
          <td>{room.passengers.main_passenger.phone_number}</td>
        </tr>

        {room.passengers.other_passengers.map((passenger, idx) => (
          <tr key={idx} className="h-11 border-t">
            <td>مسافر</td>
            <td>{passenger.first_name}</td>
            <td>{passenger.last_name}</td>
            <td>{passenger.national_code}</td>
            <td>- - - - - -</td>
          </tr>
        ))}

        {room.passengers.extra_capacity_passengers.map((passenger, idx) => (
          <tr key={idx} className="h-11 border-t">
            <td>نفر اضافه</td>
            <td>{passenger.first_name}</td>
            <td>{passenger.last_name}</td>
            <td>{passenger.national_code}</td>
            <td>- - - - - -</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
