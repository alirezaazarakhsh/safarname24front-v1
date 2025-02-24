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
  rate: number;
  comment: string;
  standards: Array<{ title: string; value: number }>;
};

type HotelCustomerReview = {
  avatar: string;
  fullname: string;
  date: string;
  time: string;
  rate: number;
  comment: string;
  points: {
    positive: string[];
    negative: string[];
  };
};

// -----------------------------

export type { HomeCustomerReview, HotelReviewsAverage, HotelCustomerReview };
