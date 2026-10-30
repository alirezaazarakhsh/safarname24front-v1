type CityDestination = {
  id: string;
  type: 'city';

  slug: string;
  city: string;
  province: string;

  accommodationsCount: number;
};

type HotelDestination = {
  id: string;
  type: 'hotel';

  slug: string;
  city: string;
  hotel: string;
  stars: number;
  address: string;
};

type DestinationType = Destination['type'];
type Destination = CityDestination | HotelDestination;

type DestinationState = {
  slug: string;
  name: string;

  type: DestinationType;
};

type CityMappingItem = {
  id: string;
  name: string;
  slug: string;
  province: string;
};

type CitiesMapping = Record<string, CityMappingItem>;

// ------------------------------

export type {
  Destination,
  CitiesMapping,
  DestinationType,
  CityDestination,
  HotelDestination,
  DestinationState,
};
