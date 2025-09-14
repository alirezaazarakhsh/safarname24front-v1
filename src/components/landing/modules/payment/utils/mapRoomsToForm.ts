import { payment } from '../helpers/constant';
import { Person, RoomForm } from '../helpers/type';

// ------------------------------

export function mapRoomsToForm(rooms: RoomForm[]): RoomForm[] {
  return rooms.map((room) => {
    const emptyPassenger: Person = payment.person;

    return {
      id: room.id,
      name: room.name,
      capacity: room.capacity,
      half_charges: room.half_charges,
      extra_capacity: room.extra_capacity,
      discount_on_purchase: room.discount_on_purchase,
      extra_capacity_price: room.extra_capacity_price,
      passengers: {
        main_passenger: { ...emptyPassenger },
        other_passengers: Array(room.capacity - 1)
          .fill(null)
          .map(() => ({
            ...emptyPassenger,
          })),
        extra_capacity_passengers: [],
      },
    };
  });
}
