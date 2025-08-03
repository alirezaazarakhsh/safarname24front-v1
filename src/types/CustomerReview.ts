// Home-Page
// ============================

type HomeCustomerReview = {
  id: number;
  image: string;
  fullname: string;
  rate: number;
  desc: string;
};

// Hotel-Page
// ============================

type HotelReviewsAverage = {
  average_score: number;
  items: Array<{ title: string; average: number }>;
};

type HotelCustomerReview = {
  text: string;
  stars: number;
  last_name: string;
  user_image: string;
  first_name: string;
  created_date: string;
  created_time: string;
  strengths: { title: string; is_positive: boolean; is_negative: boolean }[];
  weaknesses: { title: string; is_positive: boolean; is_negative: boolean }[];
};

// -----------------------------

export type { HomeCustomerReview, HotelReviewsAverage, HotelCustomerReview };
