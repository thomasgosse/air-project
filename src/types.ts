export interface Customer {
  id: string;
  x: number;
  y: number;
}

interface Item {
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

export interface Store {
  id: string;
  x: number;
  y: number;
  stock: Item[];
}
