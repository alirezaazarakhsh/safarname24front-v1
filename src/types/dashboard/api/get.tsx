// Creating the type of returned data from api (GET)
interface GETReservationItem {
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

export interface GETPersonalProfileItem {
  first_name: string;
  last_name: string;
  email: string;
  national_code: string;
  image: string;
  postal_code: string;
  address: string;
  level: number;
}

export type GETReservation = GETReservationItem[];
export type GETPersonalProfiles = GETPersonalProfileItem[];
