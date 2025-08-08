type Person = {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_code: string;
};

type Reservation = {
  reservation_id: string;
  hotel_id: number;
  hotel_slug: string;
  hotel_name: string;
  city: string;
  province: string;
  number_of_nights: number;
  date: {
    enter: string;
    exit: string;
  };
  time: {
    enter: string;
    exit: string;
  };
  reserver: Person;
  rooms: Array<{
    room_id: number;
    room_name: string;
    room_capacity: number;
    room_extra_capacity: number;
    room_extra_capacity_price: number;
    passengers: {
      main_passenger: Person;
      other_passengers: Array<Person>;
      extra_capacity_passengers: Array<Person>;
    };
  }>;
  half_charge: {
    enter: boolean;
    exit: boolean;
  };
  invoice: {};
  description: string;
};
