import { payment } from '../helpers/constant';
import { mapRoomsToForm } from './mapRoomsToForm';

// ------------------------------

export async function getFormDefaultValues() {
  const isEmpty = true;
  const isError = false;

  const { person, rooms } = payment;

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (isError) throw new Error('an error occurred');

  if (isEmpty) {
    return { reserver: person, rooms: mapRoomsToForm(rooms) };
  }

  return { reserver: person, rooms: rooms };
}
