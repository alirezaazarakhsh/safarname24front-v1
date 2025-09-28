import { axiosInstance } from '@/utils/axios';
import { mapRoomsToForm } from './mapRoomsToForm';
import { Person, RoomForm } from '../helpers/type';

type Response = {
  reserver: Person;
  rooms: RoomForm[];
};

// ------------------------------

export async function getFormDefaultValues(trackingCode: string | null) {
  try {
    const response = await axiosInstance<Response>(
      `/hotel/reservation/form/${trackingCode}`,
    );

    const data = response.data;
    const isEmpty = !data.rooms[0].passengers.main_passenger.first_name;

    if (isEmpty) {
      return { reserver: data.reserver, rooms: mapRoomsToForm(data.rooms) };
    } else return { reserver: data.reserver, rooms: data.rooms };
  } catch (error) {
    throw new Error('an error occurred');
  }
}
