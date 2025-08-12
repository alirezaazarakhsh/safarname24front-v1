type City = {
  slug: string;
  name: string;
  hotels_number: number;
  province: { name: string };
};

type Hotel = {
  stars: number;
  name: string;
  slug: string;
  city: { name: string };
};

export type { City, Hotel };
