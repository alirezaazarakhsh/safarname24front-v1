type Person = {
  first_name: string;
  last_name: string;
  phone_number: string;
  national_code: string;
};

// ------------------------------

type FormSchema = {
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
};

// ------------------------------

const reservation = {
  reservation_id: 'BH56E6FG',
  hotel_id: 1,
  hotel_slug: 'parsianazadi',
  hotel_name: 'پارسیان آزادی',
  city: 'تهران',
  province: 'تهران',
  number_of_nights: 4,
  date: {
    enter: '1404/06/03',
    exit: '1404/06/03',
  },
  time: {
    enter: '14:00',
    exit: '13:00',
  },
  reserver: {
    first_name: '',
    last_name: '',
    phone_number: '',
    national_code: '',
  },
  rooms: [
    {
      id: 5,
      name: 'یک تخته (اقامت 7 ساعته)',
      capacity: 2,
      extra_capacity: 2,
      extra_capacity_price: 1500000,
      passengers: {
        main_passenger: {
          first_name: '',
          last_name: '',
          phone_number: '',
          national_code: '',
        },
        other_passengers: [
          {
            first_name: '',
            last_name: '',
            phone_number: '',
            national_code: '',
          },
        ],
        extra_capacity_passengers: [
          {
            first_name: '',
            last_name: '',
            phone_number: '',
            national_code: '',
          },
        ],
      },
    },
    {
      id: 5,
      name: 'یک 2 تخته (اقامت 14 ساعته)',
      capacity: 3,
      extra_capacity: 1,
      extra_capacity_price: 2000000,
      passengers: {
        main_passenger: {
          first_name: '',
          last_name: '',
          phone_number: '',
          national_code: '',
        },
        other_passengers: [
          {
            first_name: '',
            last_name: '',
            phone_number: '',
            national_code: '',
          },
        ],
        extra_capacity_passengers: [
          {
            first_name: '',
            last_name: '',
            phone_number: '',
            national_code: '',
          },
        ],
      },
    },
  ],
  half_charge: {
    enter: false,
    exit: false,
  },
  invoice: {},
  description: '',
};

// ------------------------------

const formDetail = {
  reserver: [
    { name: 'reserver.first_name', placeholder: 'نام رزرو کننده' },
    { name: 'reserver.last_name', placeholder: 'نام خانوادگی رزرو کننده' },
    { name: 'reserver.phone_number', placeholder: 'شماره همراه رزرو کننده' },
    { name: 'reserver.national_code', placeholder: 'کد ملی رزرو کننده' },
  ],
  rooms: reservation.rooms.map((room, index) => ({
    main_passenger: [
      {
        name: `rooms[${index}].passengers.main_passenger.first_name`,
        placeholder: `نام مسافر اصلی`,
      },
      {
        name: `rooms[${index}].passengers.main_passenger.last_name`,
        placeholder: `نام خانوادگی مسافر اصلی`,
      },
      {
        name: `rooms[${index}].passengers.main_passenger.phone_number`,
        placeholder: `شماره همراه مسافر اصلی`,
      },
      {
        name: `rooms[${index}].passengers.main_passenger.national_code`,
        placeholder: `کد ملی مسافر اصلی`,
      },
    ],
    other_passengers: Array(room.capacity - 1)
      .fill(null)
      .map((_, i) => [
        {
          name: `rooms[${index}].passengers.other_passengers[${i}].first_name`,
          placeholder: `نام مسافر`,
        },
        {
          name: `rooms[${index}].passengers.other_passengers[${i}].last_name`,
          placeholder: `نام خانوادگی مسافر`,
        },
        {
          name: `rooms[${index}].passengers.other_passengers[${i}].phone_number`,
          placeholder: `شماره همراه مسافر`,
        },
        {
          name: `rooms[${index}].passengers.other_passengers[${i}].national_code`,
          placeholder: `کد ملی مسافر`,
        },
      ]),
    extra_capacity_passengers: Array(room.extra_capacity)
      .fill(null)
      .map((_, i) => [
        {
          name: `rooms[${index}].passengers.extra_capacity_passengers[${i}].first_name`,
          placeholder: `نام مسافر اضافه`,
        },
        {
          name: `rooms[${index}].passengers.extra_capacity_passengers[${i}].last_name`,
          placeholder: `نام خانوادگی مسافر اضافه`,
        },
        {
          name: `rooms[${index}].passengers.extra_capacity_passengers[${i}].phone_number`,
          placeholder: `شماره همراه مسافر اضافه`,
        },
        {
          name: `rooms[${index}].passengers.extra_capacity_passengers[${i}].national_code`,
          placeholder: `کد ملی مسافر اضافه`,
        },
      ]),
  })),
};

// ------------------------------

export { formDetail, reservation };
export type { FormSchema, Person };
