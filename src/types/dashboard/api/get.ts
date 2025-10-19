// Creating the type of returned data from api (GET)
export interface GETPaginationAPILayout<T> {
  count: number;
  total_pages: number;
  current_page: number;
  results: T;
}

export interface GETReservationItem {
  uuid: string;
  user: number;
  room_dates: number[];
  passengers: number[];
  extra_passengers: number[];
  paid_price: number;
  status:
    | 'payment'
    | 'pending_approve'
    | 'approved'
    | 'rejected'
    | 'failed'
    | 'success'
    | 'expired';
  fail_reason: string;
  expired_date: string;
  additional_details: string;
  has_check_in_half_day_charge: boolean;
  has_check_out_half_day_charge: boolean;
  created: string;
  updated: string;
}

export interface GETPersonalProfile {
  first_name: string;
  last_name: string;
  email: string;
  national_code: string;
  image: string | null;
  postal_code: string;
  address: string;
  level: number | null;
  level_name: null | string;
  phone_number: string;
  card_numbers: {
    id: number;
    card_number: string;
    iban: string;
    account_holder_name: string;
  }[];
}

export interface GETLegalProfile {
  organization_name: string;
  national_id: string;
  registeration_number: string;
  economical_code: string;
  phone_number: string;
  postal_code: string;
  address: string;
  email: string | null;
  image: string;
  status: 'checking' | 'accpeted' | 'rejected';
  reject_reason: string | null;
  documents: string | null;
  card_numbers: {
    id: number;
    card_number: string;
    account_holder_name: string;
    iban: string;
  }[];
}

export interface GETUploadedDocumentItem {
  id: number;
  file: string;
  profile: number;
}

export interface GETPassengerItem {
  id: number;
  first_name: string;
  last_name: string;
  identification_code: string;
  phone_number: string;
}

export interface GETFavoriteItem {
  id: number;
  title: string;
  thumbnails: [string, string, string];
}

export interface GETHotel {
  type: 'hotel';
  id: number;
  actual_id: number;
  name: string;
  slug: string;
  city: {
    id: number;
    name: string;
    slug: string;
    image: number;
    hotels_number: number;
    show_in_homepage: boolean;
    province: string;
  };
  address: string;
  main_image: string;
  stars: number;
  residence_type: string;
  price: number;
  price_after_discount: number;
  discount_percentage: number;
  discount_date: string | null;
  rating: number;
  average_score: number;
  comment_count: number;
  reservation_count: number;
  night_count: number;
  public_tags: {
    id: number;
    title: string;
  }[];
}

export interface GETArticle {
  type: 'article';
  id: number;
  actual_id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnail: string;
  published_date: string;
}

export interface GETFavoriteItemSingle {
  id: number;
  title: string;
  items: Array<GETHotel | GETArticle>;
}

export type GETCustomerClubRoomListItem =
  | {
      id: number;
      discount_type: 'room';
      code: string;
      discount_value: string;
      usage_limit: number;
      remaining_uses: number;
      required_points: number;
      user_level: number;
      created_at: string;
      expires_at: string;
      activation_rules: string;
      room: {
        id: number;
        title: string;
        hotel_name: string;
        hotel_main_image: string;
      };
    }
  | {
      id: number;
      discount_type: 'hotel';
      code: string;
      discount_value: string;
      usage_limit: number;
      remaining_uses: number;
      required_points: number;
      user_level: number;
      created_at: string;
      expires_at: string;
      activation_rules: string;
      hotel: {
        id: number;
        hotel_name: string;
        main_image: string;
      };
    };

export interface GETCustomerClubShoppingCentreListItem {
  id: number;
  shopping_center_name: string;
  shopping_center_image: string | null;
  discount_value: string;
  is_public: boolean;
  code: string;
  usage_limit: number;
  required_points: number;
  expires_at: string;
  activation_rules: string;
  user: number;
  user_level: number;
  activated_users: number[];
  users: number[];
}

export interface GETWalletBalance {
  balance: number;
}

export interface GETNotificationItem {
  id: number;
  title: string;
  message: string;
  status: 'new' | 'important';
  users: string;
  created_date_jalali: string;
  created_time: string;
  send_to_all: boolean;
  read_by: string;
  is_read: boolean;
}

export interface GETCreditCardItem {
  card_number: string;
  sheba_number: string;
  profile_type: string;
}

export interface GETUserLevelItem {
  title: string;
  color: string;
  icon: {
    title: string;
    url: string;
  };
}

export interface GETUserPoints {
  points: number;
}

export interface GETCustomerClubListItem {
  id: number;
  expires_at: string;
  user: string;
  discount_type: 'تخفیف مرکز خرید' | 'تخفیف اتاق';
  code: string;
  discount_value: string;
  required_points: number;
  activated_at: string;
  reward_claimed: boolean;
  related_info: {
    shopping_center_name?: string;
    room_id?: number;
    room_name?: string;
  };
}

export interface GETLegalNotes {
  description: string;
}

export type GETReservation = GETReservationItem[];
export type GETNotifications = GETNotificationItem[];
export type GETUploadedDocuments = GETUploadedDocumentItem[];
export type GETUserLevels = {
  data: GETUserLevelItem[];
};
export type GetCreditCards = GETPaginationAPILayout<GETCreditCardItem[]>;
export type GETPasssengers = GETPaginationAPILayout<GETPassengerItem[]>;
export type GETFavorites = GETFavoriteItem[];
export type GETFavoritesSingle = GETPaginationAPILayout<GETFavoriteItemSingle>;
export type GETCustomerClubList = GETPaginationAPILayout<
  GETCustomerClubListItem[]
>;
export type GETCustomerClubRoomList = GETPaginationAPILayout<
  GETCustomerClubRoomListItem[]
>;
export type GETCustomerClubShoppingCentreList = GETPaginationAPILayout<
  GETCustomerClubShoppingCentreListItem[]
>;
