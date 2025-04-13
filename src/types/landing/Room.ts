type BaseInfo = {
  title: string;
  desc: string;
  capacity: number;
  services: string;
  extraCapacity: number;
  customerClub: number;
  totalPrice: number;
};

type NormalRoom = BaseInfo & {
  discount: {
    purchase: number | null;
    percentage: number | null;
    deadline: string | null;
  };
};

type PackedRoom = BaseInfo & {
  pricePerNight: number;
  discount: {
    purchase: number | null;
  };
};

export type { NormalRoom, PackedRoom };
