export type Restaurant = {
  name: string;
  address: string;
};

export type User = {
  username: string;
  email: string;
};

export type Item = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = Item & {
  quantity: number;
};
