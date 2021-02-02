import { createStore, Store } from "vuex";
import { Customer, Drone, Order, Stock } from "@/types";
import { getItem } from "@/services/local-storage";

export interface State {
  orders: Order[];
  stocks: Stock[];
  customers: Customer[];
  drones: Drone[];
}

export const store = createStore<State>({
  state: {
    orders: [],
    stocks: [],
    customers: [],
    drones: []
  },
  actions: {
    fetchOrders({ state }) {
      state.orders = getItem<Order[]>("orders");
    },
    fetchStocks({ state }) {
      state.stocks = getItem<Stock[]>("stocks");
    },
    fetchCustomers({ state }) {
      state.customers = getItem<Customer[]>("customers");
    },
    fetchDrones({ state }) {
      state.drones = getItem<Drone[]>("drones");
    }
  }
});

export function useStore() {
  return store as Store<State>;
}
