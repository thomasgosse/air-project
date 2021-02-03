import { createStore, Store as VueStore } from "vuex";
import { Customer, Drone, Order, Store, Plan } from "@/types";
import { getItem } from "@/services/local-storage";

export interface State {
  orders: Order[];
  stores: Store[];
  customers: Customer[];
  drones: Drone[];
  plans: Plan[];
}

export const store = createStore<State>({
  state: {
    orders: [],
    stores: [],
    customers: [],
    drones: [],
    plans: []
  },
  actions: {
    fetchOrders({ state }) {
      state.orders = getItem<Order[]>("orders") || [];
    },
    fetchStores({ state }) {
      state.stores = getItem<Store[]>("stores") || [];
    },
    fetchCustomers({ state }) {
      state.customers = getItem<Customer[]>("customers") || [];
    },
    fetchDrones({ state }) {
      state.drones = getItem<Drone[]>("drones") || [];
    },
    fetchPlans({ state }) {
      state.plans = getItem<Plan[]>("plans") || [];
    },
    createPlan(
      { state },
      {
        draftPlan,
        orderId,
        energyCost
      }: { draftPlan: Plan; orderId: string; energyCost: number }
    ) {
      state.plans.push(draftPlan);

      // Update order, removing the selected product
      const i1 = state.orders.findIndex(order => order.id === orderId);
      const i2 = state.orders[i1].basket.findIndex(
        item => item.productId === draftPlan.productId
      );
      state.orders[i1].basket[i2].quantity += -1;

      // Update drone autonomy
      const i3 = state.drones.findIndex(drone => drone.id === draftPlan.drone);
      state.drones[i3].autonomy += -energyCost;

      // Update store stock
      const i4 = state.stores.findIndex(store => store.id === draftPlan.store);
      const i5 = state.stores[i4].stock.findIndex(
        item => item.productId === draftPlan.productId
      );
      state.stores[i4].stock[i5].quantity += -1;
    }
  },
  getters: {
    ordersEmptyItemFiltered(state): Order[] {
      return state.orders.map(order => ({
        customerId: order.customerId,
        id: order.id,
        basket: order.basket.filter(item => item.quantity > 0)
      }));
    }
  }
});

export function useStore() {
  return store as VueStore<State>;
}
