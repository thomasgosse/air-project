export interface Customer {
  id: string;
  x: number;
  y: number;
}

export interface Item {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  basket: Item[];
}

export interface Drone {
  id: string;
  x: number;
  y: number;
  autonomy: number;
}

export interface Stock {
  id: string;
  x: number;
  y: number;
  stock: Item[];
}
