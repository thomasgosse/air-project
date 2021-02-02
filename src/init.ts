import customers from "../data/customers.json";
import drones from "../data/drones.json";
import orders from "../data/orders.json";
import stocks from "../data/stocks.json";

import { Customer, Drone, Order, Stock } from "./types";

const keys = ["customers", "drones", "orders", "stocks"];

type Datas = {
  customers: Customer[];
  drones: Drone[];
  orders: Order[];
  stocks: Stock[];
};

const datas: Datas = { customers, drones, orders, stocks };

export default function init(): void {
  keys.forEach(key => {
    const exists = localStorage.getItem(key);
    if (!exists) {
      const data = datas[key as keyof Datas];
      const dataJson = JSON.stringify(data);
      localStorage.setItem(key, dataJson);
    }
  });
}
