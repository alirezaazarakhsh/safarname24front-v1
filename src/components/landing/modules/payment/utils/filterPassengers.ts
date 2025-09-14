import { Person } from '../helpers/type';

type Props = {
  passengers: Person[];
  searchedValue: string;
};

// ------------------------------

export function filterPassengers(props: Props) {
  const { passengers, searchedValue } = props;

  return searchedValue
    ? passengers.filter(
        (passenger) =>
          passenger.first_name
            .toLowerCase()
            .trim()
            .includes(searchedValue.toLowerCase().trim()) ||
          passenger.last_name
            .toLowerCase()
            .trim()
            .includes(searchedValue.toLowerCase().trim()) ||
          passenger.national_code
            .trim()
            .includes(searchedValue.toLowerCase().trim()) ||
          passenger.phone_number
            .trim()
            .includes(searchedValue.toLowerCase().trim()),
      )
    : passengers;
}
