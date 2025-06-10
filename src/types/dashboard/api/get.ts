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

export interface GETLegalProfileItem {
  organization_name: string;
  national_id: string;
  registeration_number: string;
  economical_code: string;
  phone_number: string;
  postal_code: string;
  address: string;
  email: string;
  image: string;
  status: 'checking' | 'accpeted' | 'rejected';
  reject_reason: string;
  documents: {
    id: string;
    file: string;
    profile: number;
  }[];
}

export interface GETUploadedDocumentItem {
  id: number;
  file: string;
  profile: number;
}

export interface GETPassengerItem {
  first_name: string;
  last_name: string;
  is_foreign: boolean;
  national_code: string;
  passport_code: string;
  phone_number: string;
}

export interface GETFavoriteItem {
  id: number;
  title: string;
  images: string;
}

export type GETReservation = GETReservationItem[];
export type GETPersonalProfiles = GETPersonalProfileItem[];
export type GETLegalProfiles = GETLegalProfileItem[];
export type GETUploadedDocuments = GETUploadedDocumentItem[];
export type GETPasssengers = GETPaginationAPILayout<GETPassengerItem[]>;
export type GETFavorites = GETPaginationAPILayout<GETFavoriteItem[]>;
