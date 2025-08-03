export type Hotel = {
  id:number
  name: string;
  slug: string;
  city: {
    name: string;
    province: string;
    show_in_homepage: boolean;
  };
  main_image: string;
  stars: number;
  total_price: number;
  rating: number;
  discount_expiry: string;
  average_score: number;
  discount_percentage: 0;
  original_total_price: number;
};
