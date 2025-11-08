type Room = {
  accept_need: number;
  capacity: number;
  customer_club_points: number;
  descriptions: string;
  dont_accept_need: number;
  extra_capacity: number;
  hotel: number;
  hotel_name: string;
  id: number;
  image: string;
  name: string;
  night_count: number;
  room_number: number;
  room_services: string;
  price: {
    discount_amount: number;
    discount_date: string;
    discount_percentage: number;
    extra_capacity_price: number;
    is_fixed_discount_one_time: boolean;
    total_price: number;
    total_price_discount: number;
    tourist_price: number;
    user_level: string;
  };
  price_calendar: {
    date: string;
    day: string;
    month: string;
    status: 'open' | 'close';
    price: {
      discount_amount: number;
      discount_date: string;
      discount_percentage: number;
      extra_capacity_price: number;
      is_fixed_discount_one_time: boolean;
      price: number;
      price_after_discount: number;
      tourist_price: number;
      user_level: string;
    };
  }[];
};

export type { Room };
