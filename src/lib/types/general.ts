// ------------------------------

type City = {
  id: string;
  city: string;
  image: string;
  province: string;
};

type TopCities = City & {
  accommodations_count: number;
};

type FAQ = {
  answer: string;
  question: string;
};

// ------------------------------

export type { City, TopCities, FAQ };
