type ReservationDetail = {
  city_name: string;
  hotel_name: string;
  hotel_star: number;
  province_name: string;
  number_of_rooms: number;
  number_of_nights: number;
  date: { enter: string; exit: string };
  time: { enter: string; exit: string };
  half_charges: { enter: HalfCharge; exit: HalfCharge };
};

// ------------------------------

type Invoice = {
  total_price: number;
  final_price: number;
  nights_count: number;
  half_charges: number;
  discount_code: number;
  wallet_withdraw: number;
  extra_passengers: number;
  discount_on_purchase: number;
};

// ------------------------------

type Person = {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_code: string;
};

// ------------------------------

type HalfCharge = { enabled: boolean; price: number };

// ------------------------------

type RoomPassengers = {
  main_passenger: Person;
  other_passengers: Omit<Person, 'phone_number'>[];
  extra_capacity_passengers: Omit<Person, 'phone_number'>[];
};

// ------------------------------

type RoomForm = {
  id: number;
  name: string;
  capacity: number;
  extra_capacity: number;
  passengers: RoomPassengers;
  discount_on_purchase: number;
  extra_capacity_price: number;
  half_charges: { enter: HalfCharge; exit: HalfCharge };
};

// ------------------------------

type FormSchema = {
  reserver: Person;
  rooms: RoomForm[];
};

// ------------------------------

export type { FormSchema, Person, RoomForm, ReservationDetail, Invoice };
